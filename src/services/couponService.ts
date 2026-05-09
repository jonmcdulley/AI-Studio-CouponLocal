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
  expiryDate = "2026-12-31"
): Coupon => ({
  id, store, offer, description, category,
  expiryDate, code, requiresPrinting: false,
  affiliateUrl, logo: logo(domain),
});

// ─── Deals ────────────────────────────────────────────────────────────────────
const REAL_DEALS: Coupon[] = [

  // ── Travel ──────────────────────────────────────────────────────────────────
  deal("ia-airalo-1",    "Airalo eSIM",      "15% Off — Use Code WELCOME15",       "Buy eSIMs for 200+ countries. New users save 15% at checkout.",                       "Travel",    "WELCOME15",            "https://invl.me/clnfka0",    "airalo.com"),
  deal("ia-klook-1",     "Klook Travel",     "12% Off Hotels + 60% Off Tours",     "Use code TRENTAHINKLOOKHOTELS for 12% off hotels. Up to 60% off tours.",              "Travel",    "TRENTAHINKLOOKHOTELS", "https://invl.me/clng02e",    "klook.com"),
  deal("ia-jetpac-1",    "Jetpac Global",    "Global eSIM & Travel Insurance",     "Stay connected anywhere with eSIM data plans and travel insurance.",                  "Travel",    "JETPAC",               "https://invl.me/clng029",    "jetpacglobal.com"),
  deal("ia-zen-1",       "Zen Hotels",       "Best Hotel Deals in Asia",           "Compare and book great hotel deals across Asia.",                                     "Travel",    "ZENHOTEL",             "https://invl.app/clnfk9k",   "zenhotels.com"),
  deal("ia-kkday-1",     "KKday Global",     "Tours & Activities Worldwide",       "Book tours, day trips and experiences across Asia and beyond.",                       "Travel",    "KKDAY35",              "https://invl.me/clnfk9w",    "kkday.com"),
  deal("ia-trainpal-1",  "TrainPal",         "Save on Train Tickets",              "Book discounted train tickets across Europe and Asia.",                               "Travel",    "TRAINPAL",             "https://invl.us/clnfk9q",    "trainpal.com"),
  deal("ia-airpaz-1",    "Airpaz Global",    "Cheap Flights Worldwide",            "Search and book cheap flights worldwide on the Airpaz app.",                          "Travel",    "AIRPAZ",               "https://invl.me/clnfqhm",    "airpaz.com"),

  // ── Fashion ─────────────────────────────────────────────────────────────────
  deal("ia-shein-1",     "Shein Global",     "Up to 60% Off + Extra 30% New Users","New users: up to 60% off sitewide. Use code SHEINNEW for extra savings.",            "Fashion",   "SHEINNEW",             "https://miniurl.app/clnfk9b","shein.com"),
  deal("ia-zalora-1",    "Zalora PH",        "25% Off First App Order",            "New customers get 25% off first in-app purchase (min. spend ₱2,195).",               "Fashion",   "APP25",                "https://invl.me/clng084",    "zalora.com.ph"),
  deal("ia-shopee-1",    "Shopee PH",        "Daily Deals & Flash Sales",          "Millions of products with daily vouchers and flash sales on Shopee PH.",              "Fashion",   "SHOPEEPH",             "https://invl.me/clng080",    "shopee.ph"),
  deal("ia-taobao-1",    "Taobao",           "Up to 18% Off Selected Items",       "Shop millions of products from China's largest marketplace.",                         "Fashion",   "TAOBAO18",             "https://invl.me/clnfk9p",    "taobao.com"),
  deal("ia-ck-1",        "Charles & Keith",  "New Arrivals — Bags, Shoes & More",  "Shop the latest bags, shoes and accessories from Charles & Keith PH.",               "Fashion",   "CK6",                  "https://invl.me/clnfk9t",    "charleskeith.com"),
  deal("ia-bernardelli-1","Bernardelli",     "Premium Italian Fashion",            "Explore premium Italian fashion and lifestyle products worldwide.",                   "Fashion",   "BERN56",               "https://invl.me/clnfk9z",    "bernardelli.com"),

  // ── Beauty ──────────────────────────────────────────────────────────────────
  deal("ia-sephora-1",   "Sephora PH",       "Top Beauty Brands & Skincare",       "Shop premium beauty, skincare and makeup from the world's top brands.",              "Beauty",    "SEPHORA56",            "https://invl.me/clnfka2",    "sephora.ph"),
  deal("ia-papique-1",   "Papique",          "Premium Beauty & Skincare",          "Discover curated beauty and skincare products delivered to your door.",              "Beauty",    "PAPIQUE7",             "https://invl.us/clnfqhf",    "papique.com"),
  deal("ia-stylevana-1", "Stylevana",        "K-Beauty & J-Beauty Deals",          "Shop Korean and Japanese beauty brands at great prices.",                            "Beauty",    "STYLEVANA",            "https://miniurl.app/clng02d","stylevana.com"),

  // ── Tech ────────────────────────────────────────────────────────────────────
  deal("ia-protonvpn-1", "Proton VPN",       "Up to 70% Off — Code Inside",        "Use code VPNINTROPRICE2025 at checkout. World's most trusted VPN.",                  "Tech",      "VPNINTROPRICE2025",    "https://invl.me/clnfk9v",    "protonvpn.com"),
  deal("ia-banggood-1",  "Banggood Global",  "Up to 21% Off Gadgets & Electronics","Huge discounts on gadgets, electronics and accessories worldwide.",                  "Tech",      "BANGGOOD21",           "https://invl.me/clnfk96",    "banggood.com"),
  deal("ia-wegic-1",     "Wegic AI",         "Up to 31% Off AI Website Builder",   "Create stunning websites with AI in minutes. No coding needed.",                     "Tech",      "WEGIC31",              "https://invl.us/clnfk98",    "wegic.ai"),
  deal("ia-sider-1",     "Sider AI",         "Up to 49% Off AI Assistant",         "AI-powered assistant for browsing, writing and productivity.",                       "Tech",      "SIDER49",              "https://invl.me/clnfk9a",    "sider.ai"),
  deal("ia-wps-1",       "WPS Software",     "Up to 49% Off Office Suite",         "Full office suite: Writer, Spreadsheet and Presentation tools.",                     "Tech",      "WPS49",                "https://invl.app/clnfk9n",   "wps.com", "2027-06-16"),

  // ── Education ───────────────────────────────────────────────────────────────
  deal("ia-udemy-1",     "Udemy",            "Up to 14% Off Online Courses",       "Learn from top instructors worldwide. Thousands of courses available.",              "Education", "UDEMY14",              "https://invl.me/clnfk9h",    "udemy.com"),

  // ── Dining ──────────────────────────────────────────────────────────────────
  deal("ia-byfood-1",    "byFood",           "Food Tours & Cooking Classes",       "Book unique food tours and cooking classes across Asia.",                            "Dining",    "BYFOOD",               "https://invl.us/clnfk95",    "byfood.com"),

  // ── Lifestyle ───────────────────────────────────────────────────────────────
  deal("ia-flower-1",    "FlowerAdvisor PH", "Send Flowers Across the Philippines","Deliver fresh flowers and gifts anywhere in the Philippines.",                       "Lifestyle", "FLOWER6",              "https://invl.me/clnfk9x",    "floweradvisor.com"),
];

// ─── Exports ──────────────────────────────────────────────────────────────────
export async function searchCoupons(location: string, query = ""): Promise<Coupon[]> {
  const today = new Date().toISOString().split("T")[0];
  const active = REAL_DEALS.filter(c => c.expiryDate >= today);
  if (!query) return active;
  const q = (query + " " + location).toLowerCase();
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
    { name: "Shopee Vouchers",  url: "https://invl.me/clng080", type: "coupon", description: "Daily vouchers and flash deals on Shopee Philippines.",         logo: logo("shopee.ph")      },
    { name: "Klook Activities", url: "https://invl.me/clng02e", type: "flyer",  description: "Discounted tours, activities and travel experiences.",            logo: logo("klook.com")      },
    { name: "Zalora Sale",      url: "https://invl.me/clng084", type: "flyer",  description: "Fashion deals and seasonal sales across top brands.",             logo: logo("zalora.com.ph")  },
    { name: "Airalo eSIM",      url: "https://invl.me/clnfka0", type: "coupon", description: "Buy eSIMs for travel in 200+ countries. No physical SIM needed.", logo: logo("airalo.com")     },
  ];
}