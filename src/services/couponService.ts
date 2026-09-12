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
  deal("ia-airalo-1",     "Airalo eSIM",      "15% Off — New Users Code NEWTOAIRALO15",     "Buy eSIMs for 200+ countries. New users save 15% with code NEWTOAIRALO15. Existing users get 10% off with AIRALOESIM10.",  "Travel", "NEWTOAIRALO15", "https://invl.me/clnwn30", "airalo.com", "global", "2026-12-31"),
  deal("ia-klook-1",      "Klook Travel",     "10% Off First Booking",                      "New users get 10% off first booking. Use code KLOOKFIRSTIN at checkout. Great deals on tours, tickets & transfers.",        "Travel", "KLOOKFIRSTIN",  "https://invl.me/clnwmzc", "klook.com",  "global"),
  deal("ia-kkday-1",      "KKday Global",     "Up to 90% Off Tours & Activities",           "Huge discounts on tours worldwide. New users get extra savings on first experience.",                                        "Travel", "",              "https://invl.me/clnwn1k", "kkday.com",  "global"),
  deal("ia-zen-1",        "Zen Hotels",       "Best Hotel Deals in Asia",                   "Compare and book great hotel deals across Asia. No booking fees.",                                                           "Travel", "",              "https://invl.app/clnwn08","zenhotels.com","global"),
  deal("ia-trainpal-1",   "TrainPal",         "Save on Train Tickets Worldwide",            "Book discounted train tickets across Europe and Asia. Split ticketing saves up to 60%.",                                    "Travel", "",              "https://invl.us/clnwn00", "trainpal.com","global"),
  deal("ia-airpaz-1",     "Airpaz",           "Cheap Flights Worldwide",                    "Search and book cheap flights worldwide. Compare hundreds of airlines in one place.",                                        "Travel", "",              "https://invl.me/clnwmzk", "airpaz.com", "global"),
  deal("ia-supersports-1","Supersports TH",   "Sports Gear & Apparel",                      "Thailand's leading sports retailer. Top brands including Nike, Adidas, and more.",                                          "Fashion","",              "https://invl.me/clnwn0q", "supersports.co.th","global"),

  // ── Fashion — PH ────────────────────────────────────────────────────────────
  deal("ia-zalora-1",     "Zalora PH",        "25% Off First App Order",                    "New customers get 25% off first in-app purchase. Minimum spend ₱2,195.",                                                    "Fashion","APP25",          "https://invl.me/clnwmzp", "zalora.com.ph","PH"),
  deal("ia-shopee-1",     "Shopee PH",        "Daily Deals & Flash Sales",                  "Millions of products with daily vouchers and flash sales on Shopee Philippines.",                                           "Shopping","",             "https://invl.me/clnwn2h", "shopee.ph",  "PH"),
  deal("ia-ck-1",         "Charles & Keith",  "New Arrivals — Bags, Shoes & Accessories",   "Shop the latest Charles & Keith bags, shoes and accessories. Free delivery in PH.",                                        "Fashion","",              "https://invl.me/clnwn0i", "charleskeith.com","PH"),
  deal("ia-juice-1",      "Juice Store PH",   "Latest Apple Products & Tech",               "Philippines' premier Apple Premium Reseller. iPhones, MacBooks, iPads and accessories.",                                    "Tech",   "",              "https://invl.me/clnwn3y", "juicestore.com","PH"),

  // ── Fashion — Global ────────────────────────────────────────────────────────
  deal("ia-shein-1",      "Shein",            "Up to 60% Off Sitewide",                     "Trendy fashion at unbeatable prices. New users get extra savings on first order.",                                           "Fashion","",              "https://miniurl.app/clnfk9b","shein.com","global"),
  deal("ia-taobao-1",     "Taobao",           "Up to 18% Off Selected Items",               "Shop millions of products from China's largest marketplace with worldwide shipping.",                                        "Fashion","",              "https://invl.me/clnwn35", "taobao.com", "global"),
  deal("ia-bernardelli-1","Bernardelli",      "Premium Italian Fashion",                    "Explore premium Italian fashion and lifestyle products shipped worldwide.",                                                   "Fashion","",              "https://invl.me/clnwmzt", "bernardelli.com","global"),
  deal("ia-lovebonito-1", "Love Bonito",      "Women's Fashion — Thoughtfully Designed",    "Singapore-born womenswear brand. Everyday pieces designed with intention, shipped across Asia.",                            "Fashion","",              "https://invl.me/clnwmzf", "lovebonito.com","global"),
  deal("ia-lovebonito-ph","Love Bonito PH",   "Women's Fashion — Free Shipping in PH",      "Shop Love Bonito's latest collection with free shipping to the Philippines.",                                               "Fashion","",              "https://invl.me/clnwn4g", "lovebonito.com","PH"),
  deal("rk-jansport-1",   "JanSport",         "America's #1 Backpack Brand",                "Shop JanSport backpacks, bags and accessories. The iconic brand trusted by students worldwide.",                            "Fashion","",              "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=528972.272&type=3&subid=0","jansport.com","global"),
  deal("rk-oxygen-1",     "Oxygen Clothing",  "7.5% Off Women's Fashion",                   "Discover unique women's fashion styles. Great selection of dresses, tops and more.",                                        "Fashion","",              "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=1068147.3&type=3&subid=0","oxygenclothing.co.uk","global"),
  deal("cj-avidlove-1",   "Avidlove",         "Lingerie & Nightwear — Great Prices",        "Shop quality lingerie, sleepwear and nightwear. Stylish designs at affordable prices.",                                     "Fashion","",              "https://www.kqzyfj.com/click-101742508-15740856","avidlove.com","global"),
  deal("cj-bollman-1",    "Bollman Hat Co.",  "Premium Hats Since 1868",                    "America's oldest hat manufacturer. Wide selection of premium hats, caps and headwear for men and women.",                   "Fashion","",              "https://www.dpbolvw.net/click-101742508-15734945","bollmanhats.com","global"),

  // ── Beauty ──────────────────────────────────────────────────────────────────
  deal("ia-foreo-1",      "FOREO",            "Smart Skincare Devices — Up to 30% Off",     "Swedish beauty-tech brand. Award-winning facial cleansing devices and anti-aging tools.",                                   "Beauty", "",              "https://invl.me/clnwmzh", "foreo.com",  "global"),
  deal("ia-stylevana-1",  "Stylevana",        "Korean & Japanese Beauty",                   "Shop top Korean and Japanese beauty brands. Free gifts on qualifying orders.",                                               "Beauty", "",              "https://miniurl.app/clnwmzn","stylevana.com","global"),
  deal("ia-sephora-1",    "Sephora PH",       "Premium Beauty & Skincare",                  "Shop premium beauty, skincare and makeup from the world's top brands in the Philippines.",                                  "Beauty", "",              "https://invl.me/clnwn1w", "sephora.ph", "PH"),
  deal("rk-fragrance-1",  "FragranceNet",     "Discount Fragrances — Up to 80% Off",        "World's largest discount fragrance store. 17,000+ brand name fragrances with free US shipping.",                           "Beauty", "",              "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=507761.10001163&type=3&subid=0","fragrancenet.com","global"),
  deal("cj-smartbuy-1",   "SmartBuyGlasses",  "Designer Eyewear Up to 50% Off",             "Shop thousands of designer sunglasses and prescription glasses at discounted prices. Free shipping available.",             "Beauty", "",              "https://www.dpbolvw.net/click-101742508-15734264","smartbuyglasses.com","global"),
  deal("cj-cornea-1",     "CorneaCare",       "Eye Health Supplements — Doctor Formulated", "Premium dry eye relief and eye health supplements. Developed by ophthalmologists.",                                         "Beauty", "",              "https://www.jdoqocy.com/click-101742508-17074279","corneacare.com","global"),

  // ── Tech ────────────────────────────────────────────────────────────────────
  deal("cj-nordvpn-1",    "NordVPN",          "Up to 69% Off + 3 Months Free",              "World's leading VPN service. Lightning-fast speeds with military-grade encryption. No coupon needed — discount auto-applied.", "Tech","",             "https://www.anrdoezrs.net/click-101742508-13914989","nordvpn.com","global"),
  deal("cj-surfshark-1",  "Surfshark VPN",    "Up to 85% Off + 3 Months Free",              "Award-winning VPN with unlimited devices. No coupon needed — discount auto-applied at checkout.",                           "Tech", "",              "https://www.dpbolvw.net/click-101742508-15736773","surfshark.com","global"),
  deal("ia-protonvpn-1",  "Proton VPN",       "Up to 70% Off — Privacy First VPN",          "World's most trusted VPN built by the team behind ProtonMail. Swiss-based, no logs policy.",                               "Tech", "",              "https://invl.me/clnwn3f", "protonvpn.com","global"),
  deal("ia-banggood-1",   "Banggood",         "Up to 21% Off Gadgets & Electronics",        "Huge discounts on gadgets, electronics, tools and accessories shipped worldwide.",                                           "Tech", "",              "https://invl.me/clnwn21", "banggood.com","global"),
  deal("ia-wegic-1",      "Wegic AI",         "AI Website Builder",                         "Create stunning websites with AI in minutes. No coding or design skills needed.",                                            "Tech", "",              "https://invl.us/clnwn3c", "wegic.ai",   "global"),
  deal("ia-sider-1",      "Sider AI",         "AI Assistant for Browsers",                  "AI-powered assistant for Chrome. Summarize, translate, write and chat across any website.",                                  "Tech", "",              "https://invl.me/clnwn3m", "sider.ai",   "global"),
  deal("ia-wps-1",        "WPS Software",     "Office Suite — Writer, Sheets & More",       "Full-featured office suite compatible with Microsoft Office. Available on all platforms.",                                   "Tech", "",              "https://invl.app/clnwn3i","wps.com",    "global", "2027-06-16"),
  deal("rk-lg-1",         "LG Singapore",     "LG TVs, Appliances & Electronics",           "Shop the latest LG products. TVs, refrigerators, washing machines and more from the official LG Singapore store.",         "Tech", "",              "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=1613791.2&type=3&subid=0","lg.com/sg","global"),
  deal("cj-gearup-1",     "GearUP",           "Gaming Gear & Boosting Services",            "Level up your gaming experience with premium gear and professional game boosting services.",                                 "Tech", "",              "https://www.dpbolvw.net/click-101742508-17255582","gearup.gg","global"),
  deal("cj-rexing-1",     "Rexing",           "Dash Cams & Car Tech",                       "Top-rated dash cameras for cars and trucks. Protect yourself on the road with clear 4K footage.",                           "Tech", "",              "https://www.jdoqocy.com/click-101742508-15735466","rexingusa.com","global"),

  // ── Education ───────────────────────────────────────────────────────────────
  deal("ia-udemy-1",      "Udemy",            "Online Courses From $9.99",                  "Learn from expert instructors worldwide. 210,000+ courses in tech, business, design and more.",                             "Education","",           "https://invl.me/clnwn2s", "udemy.com",  "global"),

  // ── Dining ──────────────────────────────────────────────────────────────────
  deal("ia-byfood-1",     "byFood",           "Food Tours & Cooking Classes in Asia",       "Book unique food experiences across Japan, Korea and Asia. Taught by local chefs.",                                          "Dining", "",              "https://invl.us/clnwn0a", "byfood.com", "global"),

  // ── Lifestyle ───────────────────────────────────────────────────────────────
  deal("cj-freshcoffee-1","Fresh Roasted Coffee","Specialty Coffee Delivered Fresh",        "Award-winning freshly roasted specialty coffee. Hundreds of single-origin and blended roasts delivered to your door.",      "Lifestyle","",           "https://www.jdoqocy.com/click-101742508-15735914","freshroastedcoffee.com","global"),
  deal("cj-peets-1",      "Peet's Coffee",    "Craft Coffee Since 1966",                    "Fresh-from-the-roastery coffee delivered to your door. The original craft coffee roaster.",                                  "Lifestyle","",           "https://www.kqzyfj.com/click-101742508-15734720","peets.com","global"),
  deal("cj-sleepbeyond-1","Sleep & Beyond",   "Organic Wool Bedding",                       "100% certified organic cotton and wool bedding. Comforters, pillows and sheets for better sleep.",                          "Lifestyle","",           "https://www.anrdoezrs.net/click-101742508-15735285","sleepandbeyond.com","global"),
  deal("cj-honiture-1",   "Honiture",         "Smart Home Appliances",                      "Robot vacuums, air purifiers and smart home gadgets. Clean smarter, not harder.",                                           "Lifestyle","",           "https://www.tkqlhce.com/click-101742508-17281030","honiture.com","global"),
  deal("cj-braceability-1","BraceAbility",    "Braces & Orthotics — Doctor Recommended",   "Medical-grade braces and supports for back, knee, wrist, ankle and more. Ships worldwide.",                                 "Lifestyle","",           "https://www.anrdoezrs.net/click-101742508-15735828","braceability.com","global"),
  deal("cj-diecast-1",    "Diecast Models",   "Die-Cast Model Cars & Collectibles",         "Shop thousands of die-cast model cars, planes and collectibles from top brands worldwide.",                                  "Lifestyle","",           "https://www.anrdoezrs.net/click-101742508-15734880","diecastmodelswholesale.com","global"),
  deal("cj-velocity-1",   "Velocity Outdoor", "Crossbows & Archery Equipment",              "Premium crossbows and archery gear from Ravin, CenterPoint and Valhalla brands.",                                           "Lifestyle","",           "https://www.kqzyfj.com/click-101742508-15734445","velocityoutdoor.com","global"),
  deal("ia-flower-1",     "FlowerAdvisor PH", "Send Flowers & Gifts in the Philippines",   "Deliver fresh flowers and gifts anywhere in the Philippines. Same-day delivery available.",                                  "Lifestyle","",           "https://invl.me/clnwmzv","floweradvisor.com","PH"),
];

// ─── Geo Detection ────────────────────────────────────────────────────────────
let cachedRegion: Region | null = null;

function detectRegionFromLocation(location: string): Region | null {
  const loc = location.toLowerCase();
  const usKeywords = ["usa", "united states", ", us", "new york", "los angeles",
    "chicago", "houston", "san francisco", "seattle", "california", "texas", "florida"];
  const phKeywords = ["philippines", "manila", "cebu", "davao", "quezon", "makati",
    "pasig", "taguig", "pilipinas", "cavite", "laguna", "bulacan", "butuan"];
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
    { name: "Shopee PH",       url: "https://invl.me/clnwn2h", type: "coupon", description: "Daily vouchers and flash deals on Shopee Philippines.",          logo: logo("shopee.ph")     },
    { name: "Klook Travel",    url: "https://invl.me/clnwmzc", type: "flyer",  description: "Discounted tours, activities and travel experiences worldwide.",  logo: logo("klook.com")     },
    { name: "Zalora PH",       url: "https://invl.me/clnwmzp", type: "flyer",  description: "Fashion deals and seasonal sales across top brands.",             logo: logo("zalora.com.ph") },
    { name: "Airalo eSIM",     url: "https://invl.me/clnwn30", type: "coupon", description: "eSIMs for 200+ countries. Use code NEWTOAIRALO15 for 15% off.",   logo: logo("airalo.com")    },
  ];
}