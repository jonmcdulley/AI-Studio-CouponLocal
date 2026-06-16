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
  { id: "airalo",     store: "Airalo eSIM",         offer: "15% Off",              code: "WELCOME15",    affiliateUrl: "https://invl.me/clnfka0",                              logo: "https://www.google.com/s2/favicons?domain=airalo.com&sz=64",             category: "Travel",    color: "from-sky-500 to-blue-600"       },
  { id: "klook",      store: "Klook",               offer: "10% Off First Booking", code: "KLOOKFIRSTIN", affiliateUrl: "https://invl.me/clng02e",                              logo: "https://www.google.com/s2/favicons?domain=klook.com&sz=64",              category: "Travel",    color: "from-red-500 to-pink-600"       },
  { id: "kkday",      store: "KKday",               offer: "5% Off + 90% Off Tours",code: "KKDAYNEW",     affiliateUrl: "https://invl.me/clnfk9w",                              logo: "https://www.google.com/s2/favicons?domain=kkday.com&sz=64",              category: "Travel",    color: "from-orange-500 to-red-500"     },
  { id: "foreo",      store: "FOREO",               offer: "Up to 30% Off",         code: "",             affiliateUrl: "https://invl.me/clnhxpx",                              logo: "https://www.google.com/s2/favicons?domain=foreo.com&sz=64",              category: "Beauty",    color: "from-purple-500 to-indigo-600"  },
  { id: "stylevana",  store: "Stylevana",           offer: "19% Off + Free Gifts",  code: "NSJVC3",       affiliateUrl: "https://miniurl.app/clng02d",                          logo: "https://www.google.com/s2/favicons?domain=stylevana.com&sz=64",          category: "Beauty",    color: "from-pink-500 to-rose-600"      },
  { id: "shein",      store: "Shein",               offer: "Up to 60% Off",         code: "SHEINNEW",     affiliateUrl: "https://miniurl.app/clnfk9b",                          logo: "https://www.google.com/s2/favicons?domain=shein.com&sz=64",              category: "Fashion",   color: "from-gray-700 to-gray-900"      },
  { id: "avidlove",   store: "Avidlove",            offer: "12% Off Lingerie",      code: "",             affiliateUrl: "https://www.tkqlhce.com/click-101742508-15719589",     logo: "https://www.google.com/s2/favicons?domain=avidlove.com&sz=64",           category: "Fashion",   color: "from-rose-500 to-pink-700"      },
  { id: "lovebonito", store: "Love Bonito",         offer: "Up to 10.5% Off",       code: "",             affiliateUrl: "https://invl.me/clnjqxs",                              logo: "https://www.google.com/s2/favicons?domain=lovebonito.com&sz=64",         category: "Fashion",   color: "from-fuchsia-500 to-purple-700" },
  { id: "protonvpn",  store: "Proton VPN",          offer: "Up to 70% Off",         code: "VPNINTROPRICE2025", affiliateUrl: "https://invl.me/clnfk9v",                         logo: "https://www.google.com/s2/favicons?domain=protonvpn.com&sz=64",          category: "Tech",      color: "from-violet-600 to-purple-700"  },
  { id: "sleepbeyond",store: "Sleep & Beyond",      offer: "10% Off Bedding",       code: "",             affiliateUrl: "https://www.jdoqocy.com/click-101742508-13814440",     logo: "https://www.google.com/s2/favicons?domain=sleepandbeyond.com&sz=64",     category: "Health",    color: "from-teal-500 to-emerald-600"   },
  { id: "freshcoffee",store: "Fresh Roasted Coffee",offer: "10% Off Coffee & Tea",  code: "",             affiliateUrl: "https://www.tkqlhce.com/click-101742508-14515066",     logo: "https://www.google.com/s2/favicons?domain=freshroastedcoffee.com&sz=64", category: "Lifestyle", color: "from-amber-600 to-orange-700"   },
  { id: "peets",      store: "Peet's Coffee",       offer: "10% Off Craft Coffee",  code: "",             affiliateUrl: "https://www.anrdoezrs.net/click-101742508-13970947",   logo: "https://www.google.com/s2/favicons?domain=peets.com&sz=64",              category: "Lifestyle", color: "from-green-700 to-emerald-800"  },
  { id: "udemy",      store: "Udemy",               offer: "Up to 14% Off Courses", code: "UDEMY14",      affiliateUrl: "https://invl.me/clnfk9h",                              logo: "https://www.google.com/s2/favicons?domain=udemy.com&sz=64",              category: "Education", color: "from-indigo-500 to-blue-700"    },
];

// Shuffle array randomly
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">{deal.category}</span>
          <ExternalLink size={13} className="opacity-60" />
        </div>

        {/* Logo + Store */}
        <div className="flex items-center gap-2">
          <img
            src={deal.logo}
            alt={deal.store}
            className="w-8 h-8 rounded-lg bg-white/20 p-1 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="font-bold text-base leading-tight">{deal.store}</span>
        </div>

        {/* Offer */}
        <div className="text-2xl font-black leading-tight">{deal.offer}</div>

        {/* Code or CTA */}
        {deal.code ? (
          <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
            <span className="font-mono font-black text-sm tracking-widest">{deal.code}</span>
          </div>
        ) : (
          <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
            <span className="text-sm font-bold">Shop Now →</span>
          </div>
        )}

        {/* Sponsored label */}
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

  // Rotate every 6 seconds
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
      {/* Left Banner */}
      <div className="hidden 2xl:flex fixed left-4 top-1/2 -translate-y-1/2 w-[28rem] z-20 flex-col gap-3">
        <AnimatePresence mode="wait">
          <BannerCard key={leftDeal.id + '-left'} deal={leftDeal} onClick={() => {}} />
        </AnimatePresence>
        {/* Second card below */}
        {shuffled[(leftIndex + 1) % shuffled.length] && (
          <AnimatePresence mode="wait">
            <BannerCard
              key={shuffled[(leftIndex + 1) % shuffled.length].id + '-left2'}
              deal={shuffled[(leftIndex + 1) % shuffled.length]}
              onClick={() => {}}
            />
          </AnimatePresence>
        )}
      </div>

      {/* Right Banner */}
      <div className="hidden 2xl:flex fixed right-4 top-1/2 -translate-y-1/2 w-[28rem] z-20 flex-col gap-3">
        <AnimatePresence mode="wait">
          <BannerCard key={rightDeal.id + '-right'} deal={rightDeal} onClick={() => {}} />
        </AnimatePresence>
        {shuffled[(rightIndex + 1) % shuffled.length] && (
          <AnimatePresence mode="wait">
            <BannerCard
              key={shuffled[(rightIndex + 1) % shuffled.length].id + '-right2'}
              deal={shuffled[(rightIndex + 1) % shuffled.length]}
              onClick={() => {}}
            />
          </AnimatePresence>
        )}
      </div>
    </>
  );
}
