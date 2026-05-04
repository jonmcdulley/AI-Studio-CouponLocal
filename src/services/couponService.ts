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
  sourceUrl?: string;
}

const FALLBACK_COUPONS: Coupon[] = [
  {
    id: "fb-1",
    store: "Target",
    offer: "Weekly Deals",
    description: "Check the Target Circle app for hundreds of weekly digital coupons and deals.",
    category: "Groceries",
    expiryDate: "2026-12-31",
    code: "CHECK CIRCLE",
    requiresPrinting: false,
    sourceUrl: "https://www.target.com/circle/dashboard"
  },
  {
    id: "fb-2",
    store: "CVS Pharmacy",
    offer: "ExtraCare Savings",
    description: "Link your ExtraCare card for personalized deals and manufacturer coupons.",
    category: "Health",
    expiryDate: "2026-12-31",
    code: "EXTRACARE",
    requiresPrinting: false,
    sourceUrl: "https://www.cvs.com/extracare/home"
  }
];

export async function searchCoupons(location: string, query: string = ""): Promise<Coupon[]> {
  try {
    return await withRetry(async () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const prompt = `STRICT REQUIREMENT: Find REAL, CURRENTLY ACTIVE coupons and deals available in or near ${location}${query ? ` for ${query}` : ""}. 
      The current date is ${currentDate}. You MUST use the Google Search tool to verify these deals exist right now.
      
      DO NOT:
      - Do not create fictional coupons.
      - Do not generate placeholders like "OFFER10" if a real code doesn't exist.
      - Do not return expired deals.

      DO:
      - Return only VERIFIED coupons from store websites, coupon portals (like RetailMeNot, Coupons.com), or official flyers.
      - If a store has a digital-only deal (like Target Circle or Kroger Digital), prioritize it.
      - Include the real store name, the specific offer (e.g. "20% Off Select Items"), a detailed description, category, and real expiry date.
      - If no specific code is needed (e.g. "automatic at checkout"), set code to "Auto-Applied".
      - Provide the source URL where the deal can be verified or accessed in "sourceUrl".
      
      Schema requirement: Return a list of objects matching the specified schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
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
                sourceUrl: { type: Type.STRING },
              },
              required: ["id", "store", "offer", "description", "category", "expiryDate", "code", "requiresPrinting", "sourceUrl"],
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
      const prompt = `Based on the location "${location}", identify REAL trending product categories or major retailers that currently have active digital coupon programs (e.g., "Whole Foods Deals", "CVS Pharmacy", "Local Dining"). 
      Focus on names of businesses or categories that users can actually find coupons for right now.`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
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
      const prompt = `STRICT REQUIREMENT: Find 4-6 direct links to REAL, OFFICIAL grocery coupon pages or digital weekly flyers for major stores in or near ${location}.
      Return a list of objects with name, url, type (either 'coupon' or 'flyer'), and a short description.
      You MUST use Google Search to find current, working URLs. No fictional URLs.
      Focus on major retailers like Kroger, Safeway, Walmart, Target, Publix, HEB, etc.`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
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
