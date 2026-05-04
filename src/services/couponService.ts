import { GoogleGenAI } from "@google/genai";

export interface Coupon {
  id: string;
  store: string;
  offer: string;
  description: string;
  category: string;
  expiryDate: string;
  code: string;
  requiresPrinting: boolean;
  affiliateUrl?: string;
  sourceUrl?: string;
}

export interface GroceryLink {
  name: string;
  url: string;
  type: 'coupon' | 'flyer';
  description: string;
}

const REAL_DEALS: Coupon[] = [
  { id: "ia-trip-1", store: "Trip.com", offer: "Up to 5.6% OFF", description: "Book hotels, flights & tours worldwide. Upsized commission deal — limited time.", category: "Travel", expiryDate: "2026-08-17", code: "TRIP56", requiresPrinting: false, affiliateUrl: "https://invl.me/aff_m?offer_id=103062&aff_id=1082572" },
  { id: "ia-traveloka-1", store: "Traveloka", offer: "Up to 3.45% OFF", description: "Flights, hotels & experiences across Asia. Great rates for SEA travel.", category: "Travel", expiryDate: "2027-02-27", code: "TRAVELOKA345", requiresPrinting: false, affiliateUrl: "https://invl.me/aff_m?offer_id=103515&aff_id=1082572" },
  { id: "ia-hotels-1", store: "Hotels.com", offer: "3.15% Cashback", description: "Exclusive hotel deals worldwide. Limited-time Japan hotel discounts.", category: "Travel", expiryDate: "2026-05-31", code: "HOTELSPH", requiresPrinting: false, affiliateUrl: "https://invl.me/aff_m?offer_id=102739&aff_id=1082572" },
  { id: "ia-expedia-1", store: "Expedia", offer: "Up to 3.85% OFF", description: "Bundle flights + hotels for maximum savings. Japan deals available now.", category: "Travel", expiryDate: "2026-05-31", code: "EXPEDIAPH", requiresPrinting: false, affiliateUrl: "https://invl.me/aff_m?offer_id=102564&aff_id=1082572" },
  { id: "ia-tiktok-1", store: "TikTok Shop", offer: "Up to 56% OFF", description: "Massive discounts on TikTok Shop Philippines. New deals added daily.", category: "Fashion", expiryDate: "2026-12-31", code: "TIKTOK56", requiresPrinting: false, affiliateUrl: "https://invl.us/aff_m?offer_id=103944&aff_id=1082572" },
  { id: "ia-appsumo-1", store: "AppSumo", offer: "7% OFF", description: "Lifetime deals on software & digital tools for entrepreneurs and developers.", category: "Tech", expiryDate: "2026-12-31", code: "APPSUMO7", requiresPrinting: false, affiliateUrl: "https://invl.us/aff_m?offer_id=103910&aff_id=1082572" },
  { id: "ia-binge-1", store: "BINGE Movies & TV", offer: "USD $5.60 Bonus", description: "Stream the latest movies and TV shows. Sign up and earn a cashback bonus.", category: "Entertainment", expiryDate: "2026-12-31", code: "BINGE560", requiresPrinting: false, affiliateUrl: "https://invl.us/aff_m?offer_id=103939&aff_id=1082572" },
  { id: "ia-ck-1", store: "Charles & Keith PH", offer: "Up to 3.5% Cashback", description: "Shop the latest bags, shoes & accessories.", category: "Fashion", expiryDate: "2026-12-31", code: "CK35", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk17" },
  { id: "ia-byfood-1", store: "byFood", offer: "4.2% Commission", description: "Book food tours & cooking classes across Asia.", category: "Dining", expiryDate: "2026-12-31", code: "BYFOOD", requiresPrinting: false, affiliateUrl: "https://invl.us/clnfk1r" },
  { id: "ia-zen-1", store: "Zen Hotels", offer: "3.5% Commission", description: "Find great hotel deals across Asia.", category: "Travel", expiryDate: "2026-12-31", code: "ZENHOTEL", requiresPrinting: false, affiliateUrl: "https://invl.app/clnfk1z" },
  { id: "ia-trainpal-1", store: "TrainPal", offer: "1.4% Commission", description: "Save on train tickets across Europe & Asia.", category: "Travel", expiryDate: "2026-12-31", code: "TRAINPAL", requiresPrinting: false, affiliateUrl: "https://invl.us/clnfk26" },
  { id: "ia-flower-1", store: "FlowerAdvisor PH", offer: "6% Commission", description: "Send flowers & gifts anywhere in the Philippines.", category: "Lifestyle", expiryDate: "2026-12-31", code: "FLOWER6", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk2m" },
];

export async function searchCoupons(location: string, query: string = ""): Promise<Coupon[]> {
  const q = (query + " " + location).toLowerCase();
  let results = REAL_DEALS.filter(coupon => {
    if (!query) return true;
    return coupon.store.toLowerCase().includes(q) || coupon.category.toLowerCase().includes(q) || coupon.description.toLowerCase().includes(q);
  });
  if (results.length === 0) results = REAL_DEALS;
  const today = new Date().toISOString().split("T")[0];
  return results.filter(c => c.expiryDate >= today);
}

export async function getSuggestedCategories(_location: string): Promise<string[]> {
  return ["Travel", "Fashion", "Tech", "Dining", "Entertainment", "Lifestyle"];
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`, { headers: { "Accept-Language": "en" } });
    const data = await res.json();
    const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || "";
    const country = data.address?.country || "";
    return city ? `${city}, ${country}` : `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  } catch {
    return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  }
}

export async function getGroceryLinks(_location: string): Promise<GroceryLink[]> {
  return [
    { name: "Shopee Vouchers", url: "https://shopee.ph/voucher", type: "coupon", description: "Daily vouchers and flash deals on Shopee Philippines." },
    { name: "Lazada Coupons", url: "https://www.lazada.com.ph/coupon/", type: "coupon", description: "Collect coupons and enjoy mega sales on Lazada." },
    { name: "Agoda Deals", url: "https://www.agoda.com/deals", type: "flyer", description: "Best hotel deals across Asia and worldwide." },
    { name: "Klook Activities", url: "https://www.klook.com/en-PH/deals/", type: "flyer", description: "Discounted tours, activities and travel experiences." },
    { name: "Zalora Sale", url: "https://www.zalora.com.ph/sale/", type: "flyer", description: "Fashion deals and seasonal sales across top brands." },
    { name: "Trip.com Promos", url: "https://www.trip.com/sale/", type: "coupon", description: "Flight and hotel promos for Asia and global travel." },
  ];
}