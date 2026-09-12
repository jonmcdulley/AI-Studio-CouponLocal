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

const logo = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const deal = (
  id: string, store: string, offer: string, description: string,
  category: string, code: string, affiliateUrl: string, domain: string,
  region: Region = "global", expiryDate = "2027-12-31"
): Coupon => ({
  id, store, offer, description, category,
  expiryDate, code, requiresPrinting: false,
  affiliateUrl, logo: logo(domain), region,
});

const REAL_DEALS: Coupon[] = [

  // ── Travel ──────────────────────────────────────────────────────────────────
  deal("ia-airalo-1",     "Airalo eSIM",      "15% Off — Use Code WELCOME15",               "Buy eSIMs for 200+ countries. New users save 15% at checkout.",                              "Travel",    "WELCOME15",   "https://invl.me/clnwn30",   "airalo.com",           "global"),
  deal("ia-klook-1",      "Klook Travel",     "10% Off First Booking",                      "New users get 10% off first booking. Use code KLOOKFIRSTIN at checkout.",                   "Travel",    "KLOOKFIRSTIN","https://invl.me/clnwmzc",   "klook.com",            "global"),
  deal("ia-kkday-1",      "KKday Global",     "5% Off First Booking + Up to 90% Off Tours", "New users get 5% off first experience. Up to 90% off select tours worldwide.",               "Travel",    "KKDAYNEW",    "https://invl.me/clnwn1k",   "kkday.com",            "global"),
  deal("ia-zen-1",        "Zen Hotels",       "Best Hotel Deals in Asia",                   "Compare and book great hotel deals across Asia.",                                            "Travel",    "",            "https://invl.app/clnwn08",  "zenhotels.com",        "global"),
  deal("ia-trainpal-1",   "TrainPal",         "Save on Train Tickets",                      "Book discounted train tickets across Europe and Asia.",                                      "Travel",    "",            "https://invl.us/clnwn00",   "trainpal.com",         "global"),
  deal("ia-airpaz-1",     "Airpaz Global",    "Cheap Flights Worldwide",                    "Search and book cheap flights worldwide on the Airpaz app.",                                 "Travel",    "",            "https://invl.me/clnwmzk",   "airpaz.com",           "global"),
  deal("ia-supersports-1","Supersports TH",   "Sports Gear & Apparel Deals",                "Thailand's leading sports retailer. Top brands at great prices.",                           "Travel",    "",            "https://invl.me/clnwn0q",   "supersports.co.th",    "global"),

  // ── Fashion — PH ────────────────────────────────────────────────────────────
  deal("ia-zalora-1",     "Zalora PH",        "25% Off First App Order",                    "New customers get 25% off first in-app purchase (min. spend ₱2,195).",                      "Fashion",   "APP25",       "https://invl.me/clnwmzp",   "zalora.com.ph",        "PH"),
  deal("ia-shopee-1",     "Shopee PH",        "Daily Deals & Flash Sales",                  "Millions of products with daily vouchers and flash sales on Shopee PH.",                    "Shopping",  "",            "https://invl.me/clnwn2h",   "shopee.ph",            "PH"),
  deal("ia-ck-1",         "Charles & Keith",  "New Arrivals — Bags, Shoes & More",          "Shop the latest bags, shoes and accessories from Charles & Keith PH.",                      "Fashion",   "",            "https://invl.me/clnwn0i",   "charleskeith.com",     "PH"),
  deal("ia-juice-1",      "Juice Store PH",   "Latest Tech & Gadgets",                      "Philippines' premier Apple Premium Reseller and tech lifestyle store.",                      "Tech",      "",            "https://invl.me/clnwn3y",   "juicestore.com",       "PH"),

  // ── Fashion — Global ────────────────────────────────────────────────────────
  deal("ia-shein-1",      "Shein Global",     "Up to 60% Off + Extra 30% New Users",        "New users: up to 60% off sitewide. Use code SHEINNEW for extra savings.",                   "Fashion",   "SHEINNEW",    "https://miniurl.app/clnfk9b","shein.com",           "global"),
  deal("ia-taobao-1",     "Taobao",           "Up to 18% Off Selected Items",               "Shop millions of products from China's largest marketplace.",                                "Fashion",   "",            "https://invl.me/clnwn35",   "taobao.com",           "global"),
  deal("ia-bernardelli-1","Bernardelli",      "Premium Italian Fashion",                    "Explore premium Italian fashion and lifestyle products worldwide.",                          "Fashion",   "",            "https://invl.me/clnwmzt",   "bernardelli.com",      "global"),
  deal("ia-lovebonito-1", "Love Bonito",      "Modern Women's Fashion — Up to 10.5% Off",   "Singapore-born womenswear brand with thoughtfully designed everyday pieces.",               "Fashion",   "",            "https://invl.me/clnwmzf",   "lovebonito.com",       "global"),
  deal("ia-lovebonito-ph","Love Bonito PH",   "Women's Fashion — Free Shipping in PH",      "Shop Love Bonito's latest collection with free shipping to Philippines.",                   "Fashion",   "",            "https://invl.me/clnwn4g",   "lovebonito.com",       "PH"),
  deal("rk-jansport-1",   "JanSport",         "2% Off Backpacks & Bags",                    "America's most iconic backpack brand. School bags, daypacks and travel packs.",             "Fashion",   "",            "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=528972.272&type=3&subid=0", "jansport.com", "global"),
  deal("rk-oxygen-1",     "Oxygen Clothing",  "7.5% Off Fashion",                           "Discover unique fashion styles. Great selection of women's clothing.",                      "Fashion",   "",            "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=1068147.3&type=3&subid=0", "oxygenclothing.co.uk", "global"),
  deal("cj-avidlove-1",   "Avidlove",         "Up to 12% Off Lingerie & Nightwear",         "Shop sexy lingerie, sleepwear and nightwear. Affordable and high-quality styles.",          "Fashion",   "",            "https://www.kqzyfj.com/click-101742508-15740856", "avidlove.com", "global"),
  deal("cj-bollman-1",    "Bollman Hat Co.",  "10% Off Hats & Headwear",                    "America's oldest hat manufacturer. Wide selection of premium hats for men and women.",      "Fashion",   "",            "https://www.dpbolvw.net/click-101742508-15734945", "bollmanhats.com", "global"),

  // ── Beauty — Global ─────────────────────────────────────────────────────────
  deal("ia-foreo-1",      "FOREO",            "Skincare Tech — Up to 30% Off",              "Swedish beauty-tech brand. Smart facial cleansing devices and anti-aging tools.",           "Beauty",    "",            "https://invl.me/clnwmzh",   "foreo.com",            "global"),
  deal("ia-stylevana-1",  "Stylevana",        "19% Off + Free Gifts on Orders $69+",        "Korean and Japanese beauty brands. Use code NSJVC3 for 19% off.",                          "Beauty",    "NSJVC3",      "https://miniurl.app/clnwmzn","stylevana.com",        "global"),
  deal("rk-fragrance-1",  "FragranceNet",     "World's Largest Discount Fragrance Store",   "17,000+ discounted brand name fragrances, skincare and haircare. Free US shipping.",        "Beauty",    "",            "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=507761.10001163&type=3&subid=0", "fragrancenet.com", "global"),
  deal("cj-smartbuy-1",   "SmartBuyGlasses",  "8% Off Designer Eyewear",                    "Shop thousands of designer sunglasses and prescription glasses at discounted prices.",       "Beauty",    "",            "https://www.dpbolvw.net/click-101742508-15734264", "smartbuyglasses.com", "global"),
  deal("cj-cornea-1",     "CorneaCare",       "10% Off Eye Health Products",                "Premium eye health supplements and dry eye relief products. Doctor-formulated.",            "Beauty",    "",            "https://www.jdoqocy.com/click-101742508-17074279", "corneacare.com", "global"),

  // ── Beauty — PH ─────────────────────────────────────────────────────────────
  deal("ia-sephora-1",    "Sephora PH",       "Top Beauty Brands & Skincare",               "Shop premium beauty, skincare and makeup from the world's top brands.",                     "Beauty",    "",            "https://invl.me/clnwn1w",   "sephora.ph",           "PH"),

  // ── Tech — Global ───────────────────────────────────────────────────────────
  deal("cj-nordvpn-1",    "NordVPN",          "Up to 67% Off + 3 Months Free",              "The world's leading VPN. Lightning-fast speeds, military-grade encryption.",                "Tech",      "",            "https://www.anrdoezrs.net/click-101742508-13914989", "nordvpn.com", "global"),
  deal("cj-surfshark-1",  "Surfshark VPN",    "Up to 82% Off VPN Plans",                    "Award-winning VPN with unlimited devices. Fast, secure and affordable.",                   "Tech",      "",            "https://www.dpbolvw.net/click-101742508-15736773", "surfshark.com", "global"),
  deal("ia-protonvpn-1",  "Proton VPN",       "Up to 70% Off — Code Inside",                "Use code VPNINTROPRICE2025 at checkout. World's most trusted VPN.",                        "Tech",      "VPNINTROPRICE2025", "https://invl.me/clnwn3f", "protonvpn.com",   "global"),
  deal("ia-banggood-1",   "Banggood Global",  "Up to 21% Off Gadgets & Electronics",        "Huge discounts on gadgets, electronics and accessories worldwide.",                         "Tech",      "BANGGOOD21",  "https://invl.me/clnwn21",   "banggood.com",         "global"),
  deal("ia-wegic-1",      "Wegic AI",         "Up to 31% Off AI Website Builder",           "Create stunning websites with AI in minutes. No coding needed.",                            "Tech",      "WEGIC31",     "https://invl.us/clnwn3c",   "wegic.ai",             "global"),
  deal("ia-sider-1",      "Sider AI",         "Up to 49% Off AI Assistant",                 "AI-powered assistant for browsing, writing and productivity.",                              "Tech",      "SIDER49",     "https://invl.me/clnwn3m",   "sider.ai",             "global"),
  deal("ia-wps-1",        "WPS Software",     "Up to 49% Off Office Suite",                 "Full office suite: Writer, Spreadsheet and Presentation tools.",                            "Tech",      "WPS49",       "https://invl.app/clnwn3i",  "wps.com",              "global", "2027-06-16"),
  deal("rk-lg-1",         "LG Singapore",     "2% Off LG Electronics",                      "Shop the latest LG TVs, home appliances and electronics.",                                  "Tech",      "",            "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=1613791.2&type=3&subid=0", "lg.com/sg", "global"),
  deal("cj-gearup-1",     "GearUP",           "Up to 70% Off Gaming Gear",                  "Premium gaming peripherals and accessories at massive discounts.",                          "Tech",      "",            "https://www.dpbolvw.net/click-101742508-17255582", "gearup.gg", "global"),
  deal("cj-rexing-1",     "Rexing",           "10% Off Dash Cams & Car Tech",               "Top-rated dash cameras and car accessories. Protect yourself on the road.",                "Tech",      "",            "https://www.jdoqocy.com/click-101742508-15735466", "rexingusa.com", "global"),

  // ── Education ───────────────────────────────────────────────────────────────
  deal("ia-udemy-1",      "Udemy",            "Up to 14% Off Online Courses",               "Learn from top instructors worldwide. Thousands of courses available.",                     "Education", "UDEMY14",     "https://invl.me/clnwn2s",   "udemy.com",            "global"),

  // ── Dining ──────────────────────────────────────────────────────────────────
  deal("ia-byfood-1",     "byFood",           "5% Off Food Tours & Cooking Classes",        "Book unique food tours and cooking classes across Asia.",                                   "Dining",    "SAKURA2026",  "https://invl.us/clnwn0a",   "byfood.com",           "global"),

  // ── Lifestyle ───────────────────────────────────────────────────────────────
  deal("cj-freshcoffee-1","Fresh Roasted Coffee","10% Off Specialty Coffee & Tea",          "Award-winning freshly roasted specialty coffee delivered to your door.",                    "Lifestyle", "",            "https://www.jdoqocy.com/click-101742508-15735914", "freshroastedcoffee.com", "global"),
  deal("cj-peets-1",      "Peet's Coffee",    "10% Off — The Original Craft Coffee",        "Fresh-from-the-roastery coffee delivered to your door.",                                   "Lifestyle", "",            "https://www.kqzyfj.com/click-101742508-15734720", "peets.com", "global"),
  deal("cj-sleepbeyond-1","Sleep & Beyond",   "Organic Wool Bedding — 10% Off",             "100% certified organic cotton and wool comforters, pillows and sheets.",                   "Lifestyle", "",            "https://www.anrdoezrs.net/click-101742508-15735285", "sleepandbeyond.com", "global"),
  deal("cj-honiture-1",   "Honiture",         "10% Off Home Appliances",                    "Smart home appliances including robot vacuums, air purifiers and more.",                   "Lifestyle", "",            "https://www.tkqlhce.com/click-101742508-17281030", "honiture.com", "global"),
  deal("cj-velocity-1",   "Velocity Outdoor", "5% Off Crossbows & Archery Gear",            "Premium crossbows and archery equipment from Ravin, CenterPoint and Valhalla.",            "Lifestyle", "",            "https://www.kqzyfj.com/click-101742508-15734445", "velocityoutdoor.com", "global"),
  deal("cj-diecast-1",    "Diecast",          "10% Off Die-Cast Models & Collectibles",     "Shop thousands of die-cast model cars, planes and collectibles.",                          "Lifestyle", "",            "https://www.anrdoezrs.net/click-101742508-15734880", "diecastmodelswholesale.com", "global"),
  deal("cj-braceability-1","BraceAbility",    "8% Off Braces & Orthotics",                  "Doctor-recommended braces and supports for back, knee, ankle and more.",                   "Lifestyle", "",            "https://www.anrdoezrs.net/click-101742508-15735828", "braceability.com", "global"),

  // ── Lifestyle — PH ──────────────────────────────────────────────────────────
  deal("ia-flower-1",     "FlowerAdvisor PH", "Send Flowers Across the Philippines",        "Deliver fresh flowers and gifts anywhere in the Philippines.",                              "Lifestyle", "",            "https://invl.me/clnwmzv",   "floweradvisor.com",    "PH"),
];

// ─── Geo Detection ────────────────────────────────────────────────────────────
let cachedRegion: Region | null = null;

function detectRegionFromLocation(location: string): Region | null {
  const loc = location.toLowerCase();
  const usKeywords = ["usa", "united states", ", us", ", ca", "new york", "los angeles",
    "chicago", "houston", "phoenix", "philadelphia", "san antonio", "san diego",
    "dallas", "san jose", "austin", "jacksonville", "san francisco", "seattle",
    "denver", "washington", "boston", "california", "texas", "florida", "new jersey"];
  const phKeywords = ["philippines", "manila", "cebu", "davao", "quezon", "makati",
    "pasig", "taguig", "ph", "pilipinas", "cavite", "laguna", "bulacan", "butuan"];

  if (usKeywords.some(k => loc.includes(k))) return "US";
  if (phKeywords.some(k => loc.includes(k))) return "PH";
  return null;
}

export async function detectRegion(location?: string): Promise<Region> {
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
  return ["Travel", "Fashion", "Tech", "Beauty", "Lifestyle", "Shopping", "Dining", "Education"];
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
    { name: "Shopee Vouchers",  url: "https://invl.me/clnwn2h", type: "coupon", description: "Daily vouchers and flash deals on Shopee Philippines.",         logo: logo("shopee.ph")      },
    { name: "Klook Activities", url: "https://invl.me/clnwmzc", type: "flyer",  description: "Discounted tours, activities and travel experiences.",            logo: logo("klook.com")      },
    { name: "Zalora Sale",      url: "https://invl.me/clnwmzp", type: "flyer",  description: "Fashion deals and seasonal sales across top brands.",             logo: logo("zalora.com.ph")  },
    { name: "Airalo eSIM",      url: "https://invl.me/clnwn30", type: "coupon", description: "Buy eSIMs for travel in 200+ countries. No physical SIM needed.", logo: logo("airalo.com")     },
  ];
}