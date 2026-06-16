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
  logo?: string;
  region: "PH" | "US" | "global";
}

export interface GroceryLink {
  name: string;
  url: string;
  type: 'coupon' | 'flyer';
  description: string;
  logo?: string;
}

export type Region = "PH" | "US" | "global";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const logo = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const deal = (
  id: string,
  store: string,
  offer: string,
  description: string,
  category: string,
  code: string,
  affiliateUrl: string,
  domain: string,
  region: Region = "global",
  expiryDate = "2026-12-31"
): Coupon => ({
  id, store, offer, description, category,
  expiryDate, code, requiresPrinting: false,
  affiliateUrl, logo: logo(domain), region,
});

// ─── Deals ────────────────────────────────────────────────────────────────────
const REAL_DEALS: Coupon[] = [

  // ── Travel (global — works anywhere) ────────────────────────────────────────
  deal("ia-airalo-1",     "Airalo eSIM",      "15% Off — Use Code WELCOME15",               "Buy eSIMs for 200+ countries. New users save 15% at checkout.",                              "Travel",    "WELCOME15",          "https://invl.me/clnfka0",   "airalo.com",         "global"),
  deal("ia-klook-1",      "Klook Travel",     "10% Off First Booking",                      "New users get 10% off first booking. Use code KLOOKFIRSTIN at checkout. Great deals on tours, tickets & airport transfers.", "Travel", "KLOOKFIRSTIN", "https://invl.me/clng02e", "klook.com", "global"),
  deal("ia-kkday-1",      "KKday Global",     "5% Off First Booking + Up to 90% Off Tours", "New users get 5% off first experience. Up to 90% off select tours worldwide.",               "Travel",    "KKDAYNEW",           "https://invl.me/clnfk9w",   "kkday.com",          "global"),
  deal("ia-jetpac-1",     "Jetpac Global",    "Global eSIM & Travel Insurance",             "Stay connected anywhere with eSIM data plans and travel insurance.",                         "Travel",    "",                   "https://invl.me/clng029",   "jetpacglobal.com",   "global"),
  deal("ia-zen-1",        "Zen Hotels",       "Best Hotel Deals in Asia",                   "Compare and book great hotel deals across Asia.",                                            "Travel",    "",                   "https://invl.app/clnfk9k",  "zenhotels.com",      "global"),
  deal("ia-trainpal-1",   "TrainPal",         "Save on Train Tickets",                      "Book discounted train tickets across Europe and Asia.",                                      "Travel",    "",                   "https://invl.us/clnfk9q",   "trainpal.com",       "global"),
  deal("ia-airpaz-1",     "Airpaz Global",    "Cheap Flights Worldwide",                    "Search and book cheap flights worldwide on the Airpaz app.",                                 "Travel",    "",                   "https://invl.me/clnfqhm",   "airpaz.com",         "global"),
  deal("ia-agoda-1",      "Agoda",            "Genius Loyalty — 10-15% Off Hotels",         "Agoda Genius members get automatic 10-15% off select hotels. No code needed.",              "Travel",    "",                   "https://invl.me/clnfk9k",   "agoda.com",          "global"),
  deal("ia-booking-1",    "Booking.com",      "15% Early Booking Discount",                 "Book early and save up to 15% on hotels worldwide. No code needed.",                        "Travel",    "",                   "https://invl.me/clnfk9q",   "booking.com",        "global"),

  // ── Fashion — PH ────────────────────────────────────────────────────────────
  deal("ia-zalora-1",     "Zalora PH",        "25% Off First App Order",                    "New customers get 25% off first in-app purchase (min. spend ₱2,195).",                      "Fashion",   "APP25",              "https://invl.me/clng084",   "zalora.com.ph",      "PH"),
  deal("ia-shopee-1",     "Shopee PH",        "Daily Deals & Flash Sales",                  "Millions of products with daily vouchers and flash sales on Shopee PH.",                    "Shopping",  "",                   "https://invl.me/clng080",   "shopee.ph",          "PH"),
  deal("ia-ck-1",         "Charles & Keith",  "New Arrivals — Bags, Shoes & More",          "Shop the latest bags, shoes and accessories from Charles & Keith PH.",                      "Fashion",   "",                   "https://invl.me/clnfk9t",   "charleskeith.com",   "PH"),

  // ── Fashion — Global ────────────────────────────────────────────────────────
  deal("ia-shein-1",      "Shein Global",     "Up to 60% Off + Extra 30% New Users",        "New users: up to 60% off sitewide. Use code SHEINNEW for extra savings.",                   "Fashion",   "SHEINNEW",           "https://miniurl.app/clnfk9b","shein.com",          "global"),
  deal("ia-taobao-1",     "Taobao",           "Up to 18% Off Selected Items",               "Shop millions of products from China's largest marketplace.",                                "Fashion",   "",                   "https://invl.me/clnfk9p",   "taobao.com",         "global"),
  deal("ia-bernardelli-1","Bernardelli",      "Premium Italian Fashion",                    "Explore premium Italian fashion and lifestyle products worldwide.",                          "Fashion",   "",                   "https://invl.me/clnfk9z",   "bernardelli.com",    "global"),
  deal("ia-lovebonito-1", "Love Bonito",      "Modern Women's Fashion — Up to 10.5% Off",   "Singapore-born womenswear brand with thoughtfully designed everyday pieces, shipped across Asia and beyond.", "Fashion", "", "https://invl.me/clnjqxs", "lovebonito.com", "global"),

  // ── Fashion — US (CJ) ───────────────────────────────────────────────────────
  deal("cj-avidlove-1",   "Avidlove",         "Up to 12% Off Lingerie & Nightwear",         "Shop sexy lingerie, sleepwear and nightwear. Affordable and high-quality styles for women worldwide.", "Fashion", "", "https://www.tkqlhce.com/click-101742508-15719589", "avidlove.com", "global"),

  // ── Beauty — Global ─────────────────────────────────────────────────────────
  deal("ia-foreo-1",      "FOREO",            "Skincare Tech — Up to 30% Off",              "Swedish beauty-tech brand loved worldwide. Smart facial cleansing devices, anti-aging tools and more.", "Beauty", "", "https://invl.me/clnhxpx", "foreo.com", "global"),
  deal("ia-stylevana-1",  "Stylevana",        "19% Off + Free Gifts on Orders $69+",        "Shop Korean and Japanese beauty brands at great prices. Use code NSJVC3 for 19% off plus free gifts on orders $69 or more.", "Beauty", "NSJVC3",        "https://miniurl.app/clng02d","stylevana.com",      "global"),

  // ── Beauty — PH ─────────────────────────────────────────────────────────────
  deal("ia-sephora-1",    "Sephora PH",       "Top Beauty Brands & Skincare",               "Shop premium beauty, skincare and makeup from the world's top brands.",                     "Beauty",    "",                   "https://invl.me/clnfka2",   "sephora.ph",         "PH"),
  deal("ia-papique-1",    "Papique",          "Premium Beauty & Skincare",                  "Discover curated beauty and skincare products delivered to your door.",                     "Beauty",    "",                   "https://invl.us/clnfqhf",   "papique.com",        "PH"),

  // ── Beauty — Asia ────────────────────────────────────────────────────────────
  deal("ia-watsons-my-1", "Watsons Malaysia", "Health & Beauty Deals",                      "Malaysia's leading health and beauty retailer. Skincare, makeup, wellness and more.",       "Beauty",    "",                   "https://invl.me/clnhxq6",   "watsons.com.my",     "global"),
  deal("ia-watsons-sg-1", "Watsons Singapore","Health & Beauty Deals",                      "Singapore's trusted health and beauty destination. Top brands at great prices.",            "Beauty",    "",                   "https://invl.me/clnhxqb",   "watsons.com.sg",     "global"),
  deal("ia-watsons-id-1", "Watsons Indonesia","Health & Beauty Deals",                      "Indonesia's favourite health and beauty store. Wide range of skincare and wellness.",       "Beauty",    "",                   "https://invl.me/clnhxqd",   "watsons.co.id",      "global"),

  // ── Health — US (CJ) ────────────────────────────────────────────────────────
  deal("cj-sleepbeyond-1","Sleep & Beyond",   "Organic Wool Bedding — 10% Off",             "Top 3 wool bedding brand in the US. 100% certified organic cotton and wool comforters, pillows, sheets and more.", "Health", "", "https://www.jdoqocy.com/click-101742508-13814440", "sleepandbeyond.com", "global"),

  // ── Lifestyle — US (CJ) ─────────────────────────────────────────────────────
  deal("cj-freshcoffee-1","Fresh Roasted Coffee","10% Off Specialty Coffee & Tea",           "Award-winning freshly roasted specialty coffee delivered to your door. Hundreds of single-origin and blended roasts.", "Lifestyle", "", "https://www.tkqlhce.com/click-101742508-14515066", "freshroastedcoffee.com", "global"),
  deal("cj-peets-1",      "Peet's Coffee",    "10% Off — The Original Craft Coffee",        "Fresh-from-the-roastery coffee delivered to your door. Peet's sources the highest quality beans roasted by hand.", "Lifestyle", "", "https://www.anrdoezrs.net/click-101742508-13970947", "peets.com", "global"),

  // ── Tech — Global ───────────────────────────────────────────────────────────
  deal("ia-protonvpn-1",  "Proton VPN",       "Up to 70% Off — Code Inside",                "Use code VPNINTROPRICE2025 at checkout. World's most trusted VPN.",                         "Tech",      "VPNINTROPRICE2025",  "https://invl.me/clnfk9v",   "protonvpn.com",      "global"),
  deal("ia-banggood-1",   "Banggood Global",  "Up to 21% Off Gadgets & Electronics",        "Huge discounts on gadgets, electronics and accessories worldwide.",                         "Tech",      "BANGGOOD21",         "https://invl.me/clnfk96",   "banggood.com",       "global"),
  deal("ia-wegic-1",      "Wegic AI",         "Up to 31% Off AI Website Builder",           "Create stunning websites with AI in minutes. No coding needed.",                            "Tech",      "WEGIC31",            "https://invl.us/clnfk98",   "wegic.ai",           "global"),
  deal("ia-sider-1",      "Sider AI",         "Up to 49% Off AI Assistant",                 "AI-powered assistant for browsing, writing and productivity.",                              "Tech",      "SIDER49",            "https://invl.me/clnfk9a",   "sider.ai",           "global"),
  deal("ia-wps-1",        "WPS Software",     "Up to 49% Off Office Suite",                 "Full office suite: Writer, Spreadsheet and Presentation tools.",                            "Tech",      "WPS49",              "https://invl.app/clnfk9n",  "wps.com",            "global", "2027-06-16"),

  // ── Education — Global ──────────────────────────────────────────────────────
  deal("ia-udemy-1",      "Udemy",            "Up to 14% Off Online Courses",               "Learn from top instructors worldwide. Thousands of courses available.",                     "Education", "UDEMY14",            "https://invl.me/clnfk9h",   "udemy.com",          "global"),

  // ── Dining ──────────────────────────────────────────────────────────────────
  deal("ia-byfood-1",     "byFood",           "5% Off Food Tours & Cooking Classes",        "Book unique food tours and cooking classes across Asia. Use code SAKURA2026.",              "Dining",    "SAKURA2026",         "https://invl.us/clnfk95",   "byfood.com",         "global"),

  // ── Lifestyle — PH ──────────────────────────────────────────────────────────
  deal("ia-flower-1",     "FlowerAdvisor PH", "Send Flowers Across the Philippines",        "Deliver fresh flowers and gifts anywhere in the Philippines.",                              "Lifestyle", "",                   "https://invl.me/clnfk9x",   "floweradvisor.com",  "PH"),
];

// ─── Geo Detection ────────────────────────────────────────────────────────────
let cachedRegion: Region | null = null;

// Detect region from location string (overrides IP detection when user sets location)
function detectRegionFromLocation(location: string): Region | null {
  const loc = location.toLowerCase();
  const usKeywords = ["usa", "united states", ", us", ", ca", "new york", "los angeles",
    "chicago", "houston", "phoenix", "philadelphia", "san antonio", "san diego",
    "dallas", "san jose", "austin", "jacksonville", "san francisco", "seattle",
    "denver", "washington", "boston", "california", "texas", "florida", "new jersey"];
  const phKeywords = ["philippines", "manila", "cebu", "davao", "quezon", "makati",
    "pasig", "taguig", "ph", "pilipinas", "cavite", "laguna", "bulacan"];

  if (usKeywords.some(k => loc.includes(k))) return "US";
  if (phKeywords.some(k => loc.includes(k))) return "PH";
  return null;
}

export async function detectRegion(location?: string): Promise<Region> {
  // If user has set a location, try to infer region from it first
  if (location) {
    const fromLocation = detectRegionFromLocation(location);
    if (fromLocation) return fromLocation;
  }

  if (cachedRegion) return cachedRegion;
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const country: string = data.country_code || "";
    if (country === "PH") cachedRegion = "PH";
    else if (country === "US") cachedRegion = "US";
    else cachedRegion = "global";
  } catch {
    cachedRegion = "global";
  }
  return cachedRegion;
}

// ─── Exports ──────────────────────────────────────────────────────────────────
export async function searchCoupons(location: string, query = "", region?: Region): Promise<Coupon[]> {
  const today = new Date().toISOString().split("T")[0];
  const detectedRegion = region || await detectRegion(location);

  const active = REAL_DEALS.filter(c => {
    if (c.expiryDate < today) return false;
    return c.region === "global" || c.region === detectedRegion;
  });

  if (!query) return active;
  const q = query.toLowerCase();
  const filtered = active.filter(c =>
    c.store.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.offer.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q)
  );
  return filtered.length > 0 ? filtered : active;
}

export async function getSuggestedCategories(_location: string): Promise<string[]> {
  return ["Travel", "Fashion", "Tech", "Beauty", "Health", "Shopping", "Dining", "Education", "Lifestyle"];
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } }
    );
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
    { name: "Shopee Vouchers",  url: "https://invl.me/clng080", type: "coupon", description: "Daily vouchers and flash deals on Shopee Philippines.",         logo: logo("shopee.ph")      },
    { name: "Klook Activities", url: "https://invl.me/clng02e", type: "flyer",  description: "Discounted tours, activities and travel experiences.",            logo: logo("klook.com")      },
    { name: "Zalora Sale",      url: "https://invl.me/clng084", type: "flyer",  description: "Fashion deals and seasonal sales across top brands.",             logo: logo("zalora.com.ph")  },
    { name: "Airalo eSIM",      url: "https://invl.me/clnfka0", type: "coupon", description: "Buy eSIMs for travel in 200+ countries. No physical SIM needed.", logo: logo("airalo.com")     },
  ];
}
