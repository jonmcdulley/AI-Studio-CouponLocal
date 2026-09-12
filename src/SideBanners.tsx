import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BannerDeal {
  id: string;
  store: string;
  offer: string;
  code?: string;
  affiliateUrl: string;
  logo: string;
  category: string;
  color: string;
}

const BANNER_DEALS: BannerDeal[] = [
  { id: "airalo",     store: "Airalo eSIM",          offer: "15% Off — New Users",      code: "NEWTOAIRALO15", affiliateUrl: "https://invl.me/clnwn30",                              logo: "https://www.google.com/s2/favicons?domain=airalo.com&sz=64",             category: "Travel",    color: "from-sky-500 to-blue-600"       },
  { id: "klook",      store: "Klook",                offer: "10% Off First Booking",    code: "KLOOKFIRSTIN",  affiliateUrl: "https://invl.me/clnwmzc",                              logo: "https://www.google.com/s2/favicons?domain=klook.com&sz=64",              category: "Travel",    color: "from-red-500 to-pink-600"       },
  { id: "kkday",      store: "KKday",                offer: "Up to 90% Off Tours",      code: "",              affiliateUrl: "https://invl.me/clnwn1k",                              logo: "https://www.google.com/s2/favicons?domain=kkday.com&sz=64",              category: "Travel",    color: "from-orange-500 to-red-500"     },
  { id: "nordvpn",    store: "NordVPN",              offer: "Up to 69% Off",            code: "",              affiliateUrl: "https://www.anrdoezrs.net/click-101742508-13914989",   logo: "https://www.google.com/s2/favicons?domain=nordvpn.com&sz=64",            category: "Tech",      color: "from-blue-600 to-indigo-700"    },
  { id: "surfshark",  store: "Surfshark VPN",        offer: "Up to 85% Off",            code: "",              affiliateUrl: "https://www.dpbolvw.net/click-101742508-15736773",     logo: "https://www.google.com/s2/favicons?domain=surfshark.com&sz=64",          category: "Tech",      color: "from-cyan-500 to-blue-600"      },
  { id: "foreo",      store: "FOREO",                offer: "Up to 30% Off",            code: "",              affiliateUrl: "https://invl.me/clnwmzh",                              logo: "https://www.google.com/s2/favicons?domain=foreo.com&sz=64",              category: "Beauty",    color: "from-purple-500 to-indigo-600"  },
  { id: "stylevana",  store: "Stylevana",            offer: "Korean & Japanese Beauty", code: "NSJVC3",        affiliateUrl: "https://miniurl.app/clnwmzn",                          logo: "https://www.google.com/s2/favicons?domain=stylevana.com&sz=64",          category: "Beauty",    color: "from-pink-500 to-rose-600"      },
  { id: "shein",      store: "Shein",                offer: "Up to 60% Off Sitewide",   code: "",              affiliateUrl: "https://miniurl.app/clnfk9b",                          logo: "https://www.google.com/s2/favicons?domain=shein.com&sz=64",              category: "Fashion",   color: "from-gray-700 to-gray-900"      },
  { id: "zalora",     store: "Zalora PH",            offer: "25% Off First App Order",  code: "APP25",         affiliateUrl: "https://invl.me/clnwmzp",                              logo: "https://www.google.com/s2/favicons?domain=zalora.com.ph&sz=64",          category: "Fashion",   color: "from-yellow-500 to-orange-600"  },
  { id: "avidlove",   store: "Avidlove",             offer: "Lingerie & Nightwear",     code: "",              affiliateUrl: "https://www.kqzyfj.com/click-101742508-15740856",      logo: "https://www.google.com/s2/favicons?domain=avidlove.com&sz=64",           category: "Fashion",   color: "from-rose-500 to-pink-700"      },
  { id: "lovebonito", store: "Love Bonito",          offer: "Women's Fashion",          code: "",              affiliateUrl: "https://invl.me/clnwmzf",                              logo: "https://www.google.com/s2/favicons?domain=lovebonito.com&sz=64",         category: "Fashion",   color: "from-fuchsia-500 to-purple-700" },
  { id: "protonvpn",  store: "Proton VPN",           offer: "Up to 70% Off",            code: "",              affiliateUrl: "https://invl.me/clnwn3f",                              logo: "https://www.google.com/s2/favicons?domain=protonvpn.com&sz=64",          category: "Tech",      color: "from-violet-600 to-purple-700"  },
  { id: "sleepbeyond",store: "Sleep & Beyond",       offer: "Organic Wool Bedding",     code: "",              affiliateUrl: "https://www.anrdoezrs.net/click-101742508-15735285",   logo: "https://www.google.com/s2/favicons?domain=sleepandbeyond.com&sz=64",     category: "Lifestyle", color: "from-teal-500 to-emerald-600"   },
  { id: "freshcoffee",store: "Fresh Roasted Coffee", offer: "Specialty Coffee Fresh",   code: "",              affiliateUrl: "https://www.jdoqocy.com/click-101742508-15735914",     logo: "https://www.google.com/s2/favicons?domain=freshroastedcoffee.com&sz=64", category: "Lifestyle", color: "from-amber-600 to-orange-700"   },
  { id: "peets",      store: "Peet's Coffee",        offer: "Craft Coffee Since 1966",  code: "",              affiliateUrl: "https://www.kqzyfj.com/click-101742508-15734720",      logo: "https://www.google.com/s2/favicons?domain=peets.com&sz=64",              category: "Lifestyle", color: "from-green-700 to-emerald-800"  },
  { id: "udemy",      store: "Udemy",                offer: "Courses From $9.99",       code: "",              affiliateUrl: "https://invl.me/clnwn2s",                              logo: "https://www.google.com/s2/favicons?domain=udemy.com&sz=64",              category: "Education", color: "from-indigo-500 to-blue-700"    },
  { id: "fragrance",  store: "FragranceNet",         offer: "Up to 80% Off Fragrances", code: "",              affiliateUrl: "https://click.linksynergy.com/fs-bin/click?id=DjjCStI9eQo&offerid=507761.10001163&type=3&subid=0", logo: "https://www.google.com/s2/favicons?domain=fragrancenet.com&sz=64", category: "Beauty", color: "from-pink-600 to-rose-700" },
  { id: "smartbuy",   store: "SmartBuyGlasses",      offer: "Designer Eyewear 50% Off", code: "",              affiliateUrl: "https://www.dpbolvw.net/click-101742508-15734264",     logo: "https://www.google.com/s2/favicons?domain=smartbuyglasses.com&sz=64",    category: "Beauty",    color: "from-blue-500 to-cyan-600"      },
  { id: "banggood",   store: "Banggood",             offer: "Up to 21% Off Gadgets",    code: "",              affiliateUrl: "https://invl.me/clnwn21",                              logo: "https://www.google.com/s2/favicons?domain=banggood.com&sz=64",           category: "Tech",      color: "from-red-600 to-orange-700"     },
  { id: "shopee",     store: "Shopee PH",            offer: "Daily Flash Sales",        code: "",              affiliateUrl: "https://invl.me/clnwn2h",                              logo: "https://www.google.com/s2/favicons?domain=shopee.ph&sz=64",              category: "Shopping",  color: "from-orange-500 to-red-600"     },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function BannerCard({ deal, onClick }: { deal: BannerDeal; onClick: () => void }) {
  return (
    <motion.a
      href={deal.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.03 }}
      className={`block w-full rounded-2xl bg-gradient-to-br ${deal.color} text-white shadow-lg overflow-hidden cursor-pointer`}
    >
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">{deal.category}</span>
          <ExternalLink size={13} className="opacity-60" />
        </div>
        <div className="flex items-center gap-2">
          <img
            src={deal.logo}
            alt={deal.store}
            className="w-8 h-8 rounded-lg bg-white/20 p-1 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="font-bold text-base leading-tight">{deal.store}</span>
        </div>
        <div className="text-2xl font-black leading-tight">{deal.offer}</div>
        {deal.code ? (
          <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
            <span className="font-mono font-black text-sm tracking-widest">{deal.code}</span>
          </div>
        ) : (
          <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
            <span className="text-sm font-bold">Shop Now →</span>
          </div>
        )}
        <div className="text-[10px] opacity-50 text-center">Sponsored Deal</div>
      </div>
    </motion.a>
  );
}

export default function SideBanners() {
  const [shuffled, setShuffled] = useState<BannerDeal[]>([]);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);

  useEffect(() => {
    setShuffled(shuffle(BANNER_DEALS));
  }, []);

  useEffect(() => {
    if (shuffled.length === 0) return;
    const interval = setInterval(() => {
      setLeftIndex(prev => (prev + 2) % shuffled.length);
      setRightIndex(prev => (prev + 2) % shuffled.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [shuffled]);

  if (shuffled.length === 0) return null;

  const leftDeal = shuffled[leftIndex];
  const rightDeal = shuffled[rightIndex % shuffled.length];

  return (
    <>
      <div className="hidden 2xl:flex fixed left-4 top-1/2 -translate-y-1/2 w-[28rem] z-20 flex-col gap-3">
        <AnimatePresence mode="wait">
          <BannerCard key={leftDeal.id + '-left'} deal={leftDeal} onClick={() => {}} />
        </AnimatePresence>
        {shuffled[(leftIndex + 1) % shuffled.length] && (
          <AnimatePresence mode="wait">
            <BannerCard key={shuffled[(leftIndex + 1) % shuffled.length].id + '-left2'} deal={shuffled[(leftIndex + 1) % shuffled.length]} onClick={() => {}} />
          </AnimatePresence>
        )}
      </div>
      <div className="hidden 2xl:flex fixed right-4 top-1/2 -translate-y-1/2 w-[28rem] z-20 flex-col gap-3">
        <AnimatePresence mode="wait">
          <BannerCard key={rightDeal.id + '-right'} deal={rightDeal} onClick={() => {}} />
        </AnimatePresence>
        {shuffled[(rightIndex + 1) % shuffled.length] && (
          <AnimatePresence mode="wait">
            <BannerCard key={shuffled[(rightIndex + 1) % shuffled.length].id + '-right2'} deal={shuffled[(rightIndex + 1) % shuffled.length]} onClick={() => {}} />
          </AnimatePresence>
        )}
      </div>
    </>
  );
}