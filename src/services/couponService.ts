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

const REAL_DEALS: Coupon[] = [
{
  id: "ia-jetpac-1",
  store: "Jetpac Global",
  offer: "Travel eSIM & Insurance",
  description: "Stay connected anywhere with global eSIM data plans and travel insurance.",
  category: "Travel",
  expiryDate: "2026-12-31",
  code: "JETPAC",
  requiresPrinting: false,
  affiliateUrl: "https://invl.me/clng029",
  logo: "https://www.google.com/s2/favicons?domain=jetpacglobal.com&sz=64"
},
{
  id: "ia-zalora-1",
  store: "Zalora PH",
  offer: "Up to 3.5% Cashback",
  description: "Shop the latest fashion, shoes and accessories from top brands.",
  category: "Fashion",
  expiryDate: "2026-12-31",
  code: "ZALORA",
  requiresPrinting: false,
  affiliateUrl: "https://invl.me/clng084",
  logo: "https://www.google.com/s2/favicons?domain=zalora.com.ph&sz=64"
},
{
  id: "ia-stylevana-1",
  store: "Stylevana",
  offer: "K-Beauty & J-Beauty Deals",
  description: "Discover Korean and Japanese beauty brands at great prices.",
  category: "Beauty",
  expiryDate: "2026-12-31",
  code: "STYLEVANA",
  requiresPrinting: false,
  affiliateUrl: "https://miniurl.app/clng02d",
  logo: "https://www.google.com/s2/favicons?domain=stylevana.com&sz=64"
},
{
  id: "ia-klook-1",
  store: "Klook Travel",
  offer: "Up to 60% Off Weekend Stays",
  description: "Book tours, activities and hotel stays across TW, TH, MY, PH & SG.",
  category: "Travel",
  expiryDate: "2026-12-31",
  code: "KLOOK60",
  requiresPrinting: false,
  affiliateUrl: "https://invl.me/clng02e",
  logo: "https://www.google.com/s2/favicons?domain=klook.com&sz=64"
},  
{ id: "ia-ck-1", store: "Charles & Keith PH", offer: "Up to 6% Cashback", description: "Shop the latest bags, shoes & accessories.", category: "Fashion", expiryDate: "2026-12-31", code: "CK35", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk9t", logo: "https://www.google.com/s2/favicons?domain=charleskeith.com&sz=64" },
  { id: "ia-byfood-1", store: "byFood", offer: "4.2% Commission", description: "Book food tours & cooking classes across Asia.", category: "Dining", expiryDate: "2026-12-31", code: "BYFOOD", requiresPrinting: false, affiliateUrl: "https://invl.us/clnfk95", logo: "https://www.google.com/s2/favicons?domain=byfood.com&sz=64" },
  { id: "ia-zen-1", store: "Zen Hotels", offer: "3.5% Commission", description: "Find great hotel deals across Asia.", category: "Travel", expiryDate: "2026-12-31", code: "ZENHOTEL", requiresPrinting: false, affiliateUrl: "https://invl.app/clnfk9k", logo: "https://www.google.com/s2/favicons?domain=zenhotels.com&sz=64" },
  { id: "ia-trainpal-1", store: "TrainPal", offer: "1.4% Commission", description: "Save on train tickets across Europe & Asia.", category: "Travel", expiryDate: "2026-12-31", code: "TRAINPAL", requiresPrinting: false, affiliateUrl: "https://invl.us/clnfk9q", logo: "https://www.google.com/s2/favicons?domain=trainpal.com&sz=64" },
  { id: "ia-flower-1", store: "FlowerAdvisor PH", offer: "6% Commission", description: "Send flowers & gifts anywhere in the Philippines.", category: "Lifestyle", expiryDate: "2026-12-31", code: "FLOWER6", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk9x", logo: "https://www.google.com/s2/favicons?domain=floweradvisor.com&sz=64" },
  { id: "ia-shopee-1", store: "Shopee PH", offer: "2.8% Cashback", description: "Shop millions of products on Shopee Philippines with cashback.", category: "Fashion", expiryDate: "2026-12-31", code: "SHOPEEPH", requiresPrinting: false, affiliateUrl: "https://invl.me/clng080", logo: "https://www.google.com/s2/favicons?domain=shopee.ph&sz=64" },
  { id: "ia-banggood-1", store: "Banggood Global", offer: "Up to 21% OFF", description: "Gadgets, electronics and more at huge discounts worldwide.", category: "Tech", expiryDate: "2026-12-31", code: "BANGGOOD21", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk96", logo: "https://www.google.com/s2/favicons?domain=banggood.com&sz=64" },
  { id: "ia-wegic-1", store: "Wegic AI", offer: "Up to 31.5% OFF", description: "AI-powered website builder. Create stunning sites in minutes.", category: "Tech", expiryDate: "2026-12-31", code: "WEGIC31", requiresPrinting: false, affiliateUrl: "https://invl.us/clnfk98", logo: "https://www.google.com/s2/favicons?domain=wegic.ai&sz=64" },
  { id: "ia-sider-1", store: "Sider AI", offer: "Up to 49% OFF", description: "AI assistant for browsing, writing and productivity.", category: "Tech", expiryDate: "2026-12-31", code: "SIDER49", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk9a", logo: "https://www.google.com/s2/favicons?domain=sider.ai&sz=64" },
  { id: "ia-shein-1", store: "Shein Global", offer: "Up to 60% OFF", description: "Trendy fashion at unbeatable prices. Up to 60% off exclusive deals.", category: "Fashion", expiryDate: "2026-12-31", code: "SHEIN60", requiresPrinting: false, affiliateUrl: "https://miniurl.app/clnfk9b", logo: "https://www.google.com/s2/favicons?domain=shein.com&sz=64" },
  { id: "ia-udemy-1", store: "Udemy", offer: "Up to 14% OFF", description: "Learn anything with online courses from top instructors worldwide.", category: "Education", expiryDate: "2026-12-31", code: "UDEMY14", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk9h", logo: "https://www.google.com/s2/favicons?domain=udemy.com&sz=64" },
  { id: "ia-wps-1", store: "WPS Software", offer: "Up to 49% OFF", description: "Office suite alternative with Writer, Spreadsheet & Presentation.", category: "Tech", expiryDate: "2027-06-16", code: "WPS49", requiresPrinting: false, affiliateUrl: "https://invl.app/clnfk9n", logo: "https://www.google.com/s2/favicons?domain=wps.com&sz=64" },
  { id: "ia-taobao-1", store: "Taobao", offer: "Up to 18.3% OFF", description: "Shop millions of products from China's largest marketplace.", category: "Fashion", expiryDate: "2026-12-31", code: "TAOBAO18", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk9p", logo: "https://www.google.com/s2/favicons?domain=taobao.com&sz=64" },
  { id: "ia-protonvpn-1", store: "Proton VPN", offer: "Up to 70% OFF", description: "Secure your internet with the world's most trusted VPN service.", category: "Tech", expiryDate: "2026-12-31", code: "PROTON70", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk9v", logo: "https://www.google.com/s2/favicons?domain=protonvpn.com&sz=64" },
  { id: "ia-kkday-1", store: "KKday Global", offer: "Up to 3.5% OFF", description: "Book tours, activities and experiences across Asia and worldwide.", category: "Travel", expiryDate: "2026-12-31", code: "KKDAY35", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk9w", logo: "https://www.google.com/s2/favicons?domain=kkday.com&sz=64" },
  { id: "ia-bernardelli-1", store: "Bernardelli Store", offer: "5.6% Commission", description: "Premium Italian fashion and lifestyle products worldwide.", category: "Fashion", expiryDate: "2026-12-31", code: "BERN56", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfk9z", logo: "https://www.google.com/s2/favicons?domain=bernardelli.com&sz=64" },
  { id: "ia-airalo-1", store: "Airalo eSIM", offer: "Up to 14% OFF", description: "Buy eSIMs for travel in 200+ countries. No physical SIM needed.", category: "Travel", expiryDate: "2026-12-31", code: "AIRALO14", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfka0", logo: "https://www.google.com/s2/favicons?domain=airalo.com&sz=64" },
  { id: "ia-sephora-1", store: "Sephora PH", offer: "Up to 5.6% Cashback", description: "Shop premium beauty, skincare and makeup from top brands.", category: "Beauty", expiryDate: "2026-12-31", code: "SEPHORA56", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfka2", logo: "https://www.google.com/s2/favicons?domain=sephora.ph&sz=64" },
  { id: "ia-papique-1", store: "Papique", offer: "7% Commission", description: "Discover premium beauty and skincare products. Earn cashback on every purchase.", category: "Beauty", expiryDate: "2026-12-31", code: "PAPIQUE7", requiresPrinting: false, affiliateUrl: "https://invl.us/clnfqhf", logo: "https://www.google.com/s2/favicons?domain=papique.com&sz=64" },
  { id: "ia-airpaz-1", store: "Airpaz Global", offer: "0.98% Cashback", description: "Find the perfect flight deal for your trip. Book cheap flights worldwide on the Airpaz app.", category: "Travel", expiryDate: "2026-12-31", code: "AIRPAZ", requiresPrinting: false, affiliateUrl: "https://invl.me/clnfqhm", logo: "https://www.google.com/s2/favicons?domain=airpaz.com&sz=64" },
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
  return ["Travel", "Fashion", "Tech", "Dining", "Entertainment", "Beauty", "Education"];
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
    { name: "Shopee Vouchers", url: "https://shopee.ph/voucher", type: "coupon", description: "Daily vouchers and flash deals on Shopee Philippines.", logo: "https://www.google.com/s2/favicons?domain=shopee.ph&sz=64" },
    { name: "Agoda Deals", url: "https://www.agoda.com/deals", type: "flyer", description: "Best hotel deals across Asia and worldwide.", logo: "https://www.google.com/s2/favicons?domain=agoda.com&sz=64" },
    { name: "Klook Activities", url: "https://www.klook.com/en-PH/deals/", type: "flyer", description: "Discounted tours, activities and travel experiences.", logo: "https://www.google.com/s2/favicons?domain=klook.com&sz=64" },
    { name: "Zalora Sale", url: "https://www.zalora.com.ph/sale/", type: "flyer", description: "Fashion deals and seasonal sales across top brands.", logo: "https://www.google.com/s2/favicons?domain=zalora.com.ph&sz=64" },
  ];
}