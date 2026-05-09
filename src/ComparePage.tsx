import { useState } from "react";

interface Deal {
  store: string;
  offer: string;
  description: string;
  logo: string;
  affiliateUrl: string;
  commission: number;
}

interface CompareData {
  [key: string]: Deal[];
}

const COMPARE_DATA: CompareData = {
  Travel: [
    { store: "Airalo eSIM", offer: "Up to 14% OFF", description: "eSIMs for 200+ countries. No physical SIM needed.", logo: "https://www.google.com/s2/favicons?domain=airalo.com&sz=64", affiliateUrl: "https://invl.me/clnfka0", commission: 14 },
    { store: "KKday Global", offer: "Up to 3.5% OFF", description: "Tours, activities and experiences across Asia.", logo: "https://www.google.com/s2/favicons?domain=kkday.com&sz=64", affiliateUrl: "https://invl.me/clnfk9w", commission: 3.5 },
    { store: "Zen Hotels", offer: "3.5% Commission", description: "Great hotel deals across Asia.", logo: "https://www.google.com/s2/favicons?domain=zenhotels.com&sz=64", affiliateUrl: "https://invl.app/clnfk9k", commission: 3.5 },
    { store: "Airpaz Global", offer: "0.98% Cashback", description: "Cheap flights worldwide on the Airpaz app.", logo: "https://www.google.com/s2/favicons?domain=airpaz.com&sz=64", affiliateUrl: "https://invl.me/clnfqhm", commission: 0.98 },
  ],
  Fashion: [
    { store: "Shopee PH", offer: "2.8% Cashback", description: "Millions of products with cashback.", logo: "https://www.google.com/s2/favicons?domain=shopee.ph&sz=64", affiliateUrl: "https://invl.me/clnfk8z", commission: 2.8 },
    { store: "Shein Global", offer: "Up to 60% OFF", description: "Trendy fashion at unbeatable prices.", logo: "https://www.google.com/s2/favicons?domain=shein.com&sz=64", affiliateUrl: "https://miniurl.app/clnfk9b", commission: 60 },
    { store: "Charles & Keith PH", offer: "Up to 3.5% Cashback", description: "Latest bags, shoes and accessories.", logo: "https://www.google.com/s2/favicons?domain=charleskeith.com&sz=64", affiliateUrl: "https://invl.me/clnfk9t", commission: 3.5 },
    { store: "Taobao", offer: "Up to 18.3% OFF", description: "Millions of products from China's largest marketplace.", logo: "https://www.google.com/s2/favicons?domain=taobao.com&sz=64", affiliateUrl: "https://invl.me/clnfk9p", commission: 18.3 },
  ],
  Beauty: [
    { store: "Sephora PH", offer: "Up to 5.6% Cashback", description: "Premium beauty, skincare and makeup.", logo: "https://www.google.com/s2/favicons?domain=sephora.ph&sz=64", affiliateUrl: "https://invl.me/clnfka2", commission: 5.6 },
    { store: "Papique", offer: "7% Commission", description: "Premium beauty and skincare products.", logo: "https://www.google.com/s2/favicons?domain=papique.com&sz=64", affiliateUrl: "https://invl.us/clnfqhf", commission: 7 },
  ],
};

const ALL_DEALS: Deal[] = Object.values(COMPARE_DATA).flat();

function DealCard({ deal, rank }: { deal: Deal; rank?: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        {rank === 1 && (
          <span className="inline-block mb-2 px-2 py-0.5 text-xs font-bold bg-yellow-50 text-yellow-600 border border-yellow-200 rounded-full">
            Best Deal
          </span>
        )}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={deal.logo}
            alt={deal.store}
            className="w-10 h-10 rounded-xl object-contain border border-gray-100 p-1 bg-white"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div>
            <div className="font-bold text-gray-800 text-sm">{deal.store}</div>
            <div className="text-indigo-600 font-semibold text-sm">{deal.offer}</div>
          </div>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mb-4">{deal.description}</p>
      </div>
      
        <a href={deal.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
      >
        Get Deal
      </a>
    </div>
  );
}

export default function ComparePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Travel");

  const searchResults = search.trim()
    ? ALL_DEALS.filter((d) =>
        d.store.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.offer.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const categoryIcons: { [key: string]: string } = {
    Travel: "Travel",
    Fashion: "Fashion",
    Beauty: "Beauty",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pb-24 md:p-8">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Compare Deals</h1>
          <p className="text-gray-500">Find the best deal across multiple stores before you buy</p>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search deals across all stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-base"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              x
            </button>
          )}
        </div>

        {search.trim() ? (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {searchResults.length > 0
                ? searchResults.length + " results for " + search
                : "No results for " + search}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((deal, i) => (
                <DealCard key={i} deal={deal} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-3 mb-6 flex-wrap">
              {Object.keys(COMPARE_DATA).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    "px-5 py-2 rounded-full font-semibold text-sm transition-all " +
                    (activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300")
                  }
                >
                  {categoryIcons[cat]} {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPARE_DATA[activeCategory]
                .slice()
                .sort((a, b) => b.commission - a.commission)
                .map((deal, i) => (
                  <DealCard key={i} deal={deal} rank={i + 1} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}