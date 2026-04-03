import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function withRetry<T>(fn: () => Promise<T>, retries: number = 2, delay: number = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const isRateLimit = error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED");
    
    if (retries > 0) {
      const nextDelay = isRateLimit ? delay * 2 : delay;
      console.warn(`Retrying after error: ${error.message}. Retries left: ${retries}. Delay: ${nextDelay}ms`);
      await new Promise(resolve => setTimeout(resolve, nextDelay));
      return withRetry(fn, retries - 1, nextDelay);
    }
    throw error;
  }
}

export interface Coupon {
  id: string;
  store: string;
  offer: string;
  description: string;
  category: string;
  expiryDate: string;
  code: string;
  requiresPrinting: boolean;
}

const FALLBACK_COUPONS: Coupon[] = [
  {
    id: "fb-1",
    store: "Whole Foods Market",
    offer: "$10 OFF",
    description: "Save $10 on your next organic grocery purchase of $50 or more.",
    category: "Groceries",
    expiryDate: "2026-12-31",
    code: "ORGANIC10",
    requiresPrinting: false
  },
  {
    id: "fb-2",
    store: "Starbucks",
    offer: "BOGO Free",
    description: "Buy one handcrafted beverage, get one free. Valid after 2 PM.",
    category: "Dining",
    expiryDate: "2026-12-31",
    code: "COFFEE2",
    requiresPrinting: false
  },
  {
    id: "fb-3",
    store: "Best Buy",
    offer: "15% OFF",
    description: "15% off any single tech accessory. In-store or online.",
    category: "Tech",
    expiryDate: "2026-12-31",
    code: "TECH15",
    requiresPrinting: false
  }
];

export async function searchCoupons(location: string, query: string = ""): Promise<Coupon[]> {
  try {
    return await withRetry(async () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const prompt = `Find current coupons and deals available in ${location}${query ? ` for ${query}` : ""}. 
      The current date is ${currentDate}. ONLY return coupons that are valid today and have not expired.
      Return a list of realistic or real coupons. 
      Include store name, offer details, a brief description, a category (e.g., Groceries, Dining, Fashion, Tech), and a validity/expiry date (must be in YYYY-MM-DD format and after ${currentDate}).
      Also generate a random alphanumeric coupon code for each.
      CRITICAL: For each coupon, determine if it is a digital coupon (can be used on a phone) or if it requires printing. Set "requiresPrinting" to true if it must be printed, false otherwise.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                store: { type: Type.STRING },
                offer: { type: Type.STRING },
                description: { type: Type.STRING },
                category: { type: Type.STRING },
                expiryDate: { type: Type.STRING },
                code: { type: Type.STRING },
                requiresPrinting: { type: Type.BOOLEAN },
              },
              required: ["id", "store", "offer", "description", "category", "expiryDate", "code", "requiresPrinting"],
            },
          },
        },
      });

      return JSON.parse(response.text || "[]");
    });
  } catch (e) {
    console.error("Failed to fetch coupons, using fallback:", e);
    return FALLBACK_COUPONS;
  }
}

export async function getSuggestedCategories(location: string): Promise<string[]> {
  const defaultCategories = ["Groceries", "Dining", "Fashion", "Electronics", "Health", "Travel"];
  try {
    return await withRetry(async () => {
      const prompt = `Based on the location "${location}", suggest 6-8 popular product categories that would have great digital coupons right now (e.g., "Organic Groceries", "Local Cafes", "Fitness Gear").`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
      });

      return JSON.parse(response.text || "[]");
    });
  } catch (e) {
    console.error("Failed to fetch categories, using fallback:", e);
    return defaultCategories;
  }
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    return await withRetry(async () => {
      const prompt = `Given the coordinates ${lat}, ${lng}, return ONLY the name of the city and state/country (e.g., "San Francisco, CA" or "London, UK"). Do not include any other text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      return response.text?.trim() || `${lat}, ${lng}`;
    });
  } catch (e) {
    console.error("Failed to reverse geocode, using coordinates:", e);
    return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  }
}

export interface GroceryLink {
  name: string;
  url: string;
  type: 'coupon' | 'flyer';
  description: string;
}

export async function getGroceryLinks(location: string): Promise<GroceryLink[]> {
  const defaultLinks: GroceryLink[] = [
    { name: "Kroger Digital Coupons", url: "https://www.kroger.com/cl/coupons/", type: "coupon", description: "Clip digital coupons for your next Kroger trip." },
    { name: "Safeway Weekly Ad", url: "https://www.safeway.com/weeklyad", type: "flyer", description: "View the latest deals at Safeway." }
  ];
  try {
    return await withRetry(async () => {
      const prompt = `Find 4-6 direct links to official grocery coupon pages or digital weekly flyers for major stores in or near ${location}.
      Return a list of objects with name, url, type (either 'coupon' or 'flyer'), and a short description.
      Focus on well-known retailers like Kroger, Safeway, Walmart, Target, Whole Foods, etc., that have online flyers or coupon portals.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                url: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['coupon', 'flyer'] },
                description: { type: Type.STRING },
              },
              required: ["name", "url", "type", "description"],
            },
          },
        },
      });

      return JSON.parse(response.text || "[]");
    });
  } catch (e) {
    console.error("Failed to fetch grocery links, using fallback:", e);
    return defaultLinks;
  }
}
