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
}

export interface GroceryLink {
  name: string;
  url: string;
  type: 'coupon' | 'flyer';
  description: string;
  logo?: string;
}

// ─── Helper ───────────────────────────────────────────────────────────────────
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
  expiryDate = "2026-12-31"
): Coupon => ({
  id,
  store,
  offer,
  description,
  category,
  expiryDate,
  code,
  requiresPrinting: false,
  affiliateUrl,
  logo: logo(domain),
});

// ─── Deals ────────────────────────────────────────────────────────────────────
const REAL_DEALS: Coupon[] = [
  // Travel
  deal("ia-airalo-1",   "Airalo eSIM",      "15% OFF + Up to 14% Cashback",  "New users get 15% off with code WELCOME15. Buy eSIMs for travel in 200+ countries.",          "Travel",    "WELCOME15",             "https://invl.me/clnfka0",   "airalo.com"),
  deal("ia-klook-1",    "Klook Travel",     "12% Off Hotels + 60% Off Tours", "Use code TRENTAHINKLOOKHOTELS for 12% off hotels. Up to 60% off tours and activities.",        "Travel",    "TRENTAHINKLOOKHOTELS",  "https://invl.me/clng02e",   "klook.com"),
  deal("ia-jetpac-1",   "Jetpac Global",    "Travel eSIM & Insurance",        "Stay connected anywhere with global eSIM data plans and travel insurance.",                    "Travel",    "JETPAC",                "https://invl.me/clng029",   "jetpacglobal.com"),
  deal("ia-zen-1",      "Zen Hotels",       "3.5% Cashback",                  "Find great hotel deals across Asia.",                                                          "Travel",    "ZENHOTEL",              "https://invl.app/clnfk9k",  "zenhotels.com"),
  deal("ia-kkday-1",    "KKday Global",     "Up to 3.5% OFF",                 "Book tours, activities and experiences across Asia and worldwide.",                            "Travel",    "KKDAY35",               "https://invl.me/clnfk9w",   "kkday.com"),
  deal("ia-trainpal-1", "TrainPal",         "1.4% Cashback",                  "Save on train tickets across Europe and Asia.",                                                "Travel",    "TRAINPAL",              "https://invl.us/clnfk9q",   "trainpal.com"),
  deal("ia-airpaz-1",   "Airpaz Global",    "0.98% Cashback",                 "Book cheap flights worldwide on the Airpaz app.",                                              "Travel",    "AIRPAZ",                "https://invl.me/clnfqhm",   "airpaz.com"),

  // Fashion
  deal("ia-shein-1",    "Shein Global",     "Up to 60% OFF + Extra 30% New Users", "New users get up to 60% off. Use code SHEINNEW for extra savings at checkout.",          "Fashion",   "SHEINNEW",              "https://miniurl.app/clnfk9b","shein.com"),
  deal("ia-zalora-1",   "Zalora PH",        "25% Off First App Order",        "New customers get 25% off first in-app purchase (min. spend ₱2,195). Top fashion brands.",    "Fashion",   "APP25",                 "https://invl.me/clng084",   "zalora.com.ph"),
  deal("ia-shopee-1",   "Shopee PH",        "2.8% Cashback",                  "Shop millions of products on Shopee Philippines with cashback on every order.",               "Fashion",   "SHOPEEPH",              "https://invl.me/clng080",   "shopee.ph"),
  deal("ia-taobao-1",   "Taobao",           "Up to 18.3% OFF",                "Shop millions of products from China's largest marketplace.",                                  "Fashion",   "TAOBAO18",              "https://invl.me/clnfk9p",   "taobao.com"),
  deal("ia-ck-1",       "Charles & Keith",  "Up to 6% Cashback",              "Shop the latest bags, shoes and accessories from Charles & Keith.",                           "Fashion",   "CK6",                   "https://invl.me/clnfk9t",   "charleskeith.com"),
  deal("ia-bernardelli-1","Bernardelli",    "5.6% Cashback",                  "Premium Italian fashion and lifestyle products worldwide.",                                    "Fashion",   "BERN56",                "https://invl.me/clnfk9z",   "bernardelli.com"),

  // Beauty
  deal("ia-sephora-1",  "Sephora PH",       "Up to 5.6% Cashback",            "Shop premium beauty, skincare and makeup from top brands.",                                   "Beauty",    "SEPHORA56",             "https://invl.me/clnfka2",   "sephora.ph"),
  deal("ia-papique-1",  "Papique",          "7% Cashback",                    "Discover premium beauty and skincare products with cashback on every purchase.",              "Beauty",    "PAPIQUE7",              "https://invl.us/clnfqhf",   "papique.com"),
  deal("ia-stylevana-1","Stylevana",        "K-Beauty & J-Beauty Deals",      "Discover Korean and Japanese beauty brands at great prices.",                                  "Beauty",    "STYLEVANA",             "https://miniurl.app/clng02d","stylevana.com"),

  // Tech
  deal("ia-protonvpn-1","Proton VPN",       "Up to 70% OFF",                  "Use code VPNINTROPRICE2025 at checkout. The world's most trusted VPN service.",               "Tech",      "VPNINTROPRICE2025",     "https://invl.me/clnfk9v",   "protonvpn.com"),
  deal("ia-banggood-1", "Banggood Global",  "Up to 21% OFF",                  "Gadgets, electronics and more at huge discounts worldwide.",                                   "Tech",      "BANGGOOD21",            "https://invl.me/clnfk96",   "banggood.com"),
  deal("ia-wegic-1",    "Wegic AI",         "Up to 31.5% OFF",                "AI-powered website builder. Create stunning sites in minutes.",                                "Tech",      "WEGIC31",               "https://invl.us/clnfk98",   "wegic.ai"),
  deal("ia-sider-1",    "Sider AI",         "Up to 49% OFF",                  "AI assistant for browsing, writing and productivity.",                                         "Tech",      "SIDER49",               "https://invl.me/clnfk9a",   "sider.ai"),
  deal("ia-wps-1",      "WPS Software",     "Up to 49% OFF",                  "Office suite alternative with Writer, Spreadsheet and Presentation tools.",                   "Tech",      "WPS49",                 "https://invl.app/clnfk9n",  "wps.com", "2027-06-16"),

  // Education
  deal("ia-udemy-1",    "Udemy",            "Up to 14% OFF",                  "Learn anything with online courses from top instructors worldwide.",                           "Education", "UDEMY14",               "https://invl.me/clnfk9h",   "udemy.com"),

  // Dining
  deal("ia-byfood-1",   "byFood",           "4.2% Cashback",                  "Book food tours and cooking classes across Asia.",                                             "Dining",    "BYFOOD",                "https://invl.us/clnfk95",   "byfood.com"),

  // Lifestyle
  deal("ia-flower-1",   "FlowerAdvisor PH", "6% Cashback",                    "Send flowers and gifts anywhere in the Philippines.",                                          "Lifestyle", "FLOWER6",               "https://invl.me/clnfk9x",   "floweradvisor.com"),
];

// ─── Exports ──────────────────────────────────────────────────────────────────
export async function searchCoupons(location: string, query = ""): Promise<Coupon[]> {
  const q = (query + " " + location).toLowerCase();
  const today = new Date().toISOString().split("T")[0];
  const active = REAL_DEALS.filter(c => c.expiryDate >= today);
  if (!query) return active;
  const filtered = active.filter(c =>
    c.store.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q)
  );
  return filtered.length > 0 ? filtered : active;
}

export async function getSuggestedCategories(_location: string): Promise<string[]> {
  return ["Travel", "Fashion", "Tech", "Beauty", "Dining", "Education", "Lifestyle"];
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
    { name: "Shopee Vouchers",  url: "https://invl.me/clng080",  type: "coupon", description: "Daily vouchers and flash deals on Shopee Philippines.",        logo: logo("shopee.ph") },
    { name: "Klook Activities", url: "https://invl.me/clng02e",  type: "flyer",  description: "Discounted tours, activities and travel experiences.",           logo: logo("klook.com") },
    { name: "Zalora Sale",      url: "https://invl.me/clng084",  type: "flyer",  description: "Fashion deals and seasonal sales across top brands.",            logo: logo("zalora.com.ph") },
    { name: "Airalo eSIM",      url: "https://invl.me/clnfka0",  type: "coupon", description: "Buy eSIMs for travel in 200+ countries. No physical SIM needed.", logo: logo("airalo.com") },
  ];
}