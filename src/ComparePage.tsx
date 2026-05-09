import { useState } from "react";

interface Deal {
  store: string;
  offer: string;
  description: string;
  logo: string;
  affiliateUrl: string;
}

const logo = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const COMPARE_DATA: Record<string, Deal[]> = {
  Travel: [
    { store: "Airalo eSIM",   offer: "15% Off — Code WELCOME15",      description: "Buy eSIMs for 200+ countries. New users save 15% at checkout.",         logo: logo("airalo.com"),       affiliateUrl: "https://invl.me/clnfka0"  },
    { store: "Klook Travel",  offer: "12% Off Hotels + 60% Off Tours", description: "Use code TRENTAHINKLOOKHOTELS for 12% off hotels and 60% off tours.",   logo: logo("klook.com"),        affiliateUrl: "https://invl.me/clng02e"  },
    { store: "KKday Global",  offer: "Tours & Activities Worldwide",   description: "Book tours, day trips and experiences across Asia and beyond.",          logo: logo("kkday.com"),        affiliateUrl: "https://invl.me/clnfk9w"  },
    { store: "Airpaz Global", offer: "Cheap Flights Worldwide",        description: "Search and book cheap flights worldwide on the Airpaz app.",             logo: logo("airpaz.com"),       affiliateUrl: "https://invl.me/clnfqhm"  },
    { store: "Zen Hotels",    offer: "Best Hotel Deals in Asia",       description: "Compare and book great hotel deals across Asia.",                        logo: logo("zenhotels.com"),    affiliateUrl: "https://invl.app/clnfk9k" },
    { store: "Jetpac Global", offer: "Global eSIM & Travel Insurance", description: "Stay connected anywhere with eSIM data plans and travel insurance.",     logo: logo("jetpacglobal.com"), affiliateUrl: "https://invl.me/clng029"  },
  ],
  Fashion: [
    { store: "Shein Global",   offer: "Up to 60% Off + 30% New Users", description: "New users: up to 60% off sitewide. Use code SHEINNEW for extra savings.", logo: logo("shein.com"),        affiliateUrl: "https://miniurl.app/clnfk9b" },
    { store: "Zalora PH",      offer: "25% Off First App Order",        description: "New customers get 25% off first in-app purchase (min. spend ₱2,195).",   logo: logo("zalora.com.ph"),    affiliateUrl: "https://invl.me/clng084"     },
    { store: "Shopee PH",      offer: "Daily Deals & Flash Sales",      description: "Millions of products with daily vouchers and flash sales.",               logo: logo("shopee.ph"),        affiliateUrl: "https://invl.me/clng080"     },
    { store: "Taobao",         offer: "Up to 18% Off Selected Items",   description: "Shop millions of products from China's largest marketplace.",             logo: logo("taobao.com"),       affiliateUrl: "https://invl.me/clnfk9p"     },
    { store: "Charles & Keith",offer: "New Arrivals — Bags & Shoes",    description: "Shop the latest bags, shoes and accessories from Charles & Keith PH.",   logo: logo("charleskeith.com"), affiliateUrl: "https://invl.me/clnfk9t"     },
  ],
  Beauty: [
    { store: "Sephora PH",  offer: "Top Beauty Brands & Skincare",  description: "Shop premium beauty, skincare and makeup from the world's top brands.", logo: logo("sephora.ph"),    affiliateUrl: "https://invl.me/clnfka2"      },
    { store: "Papique",     offer: "Premium Beauty & Skincare",     description: "Curated beauty and skincare products delivered to your door.",           logo: logo("papique.com"),   affiliateUrl: "https://invl.us/clnfqhf"      },
    { store: "Stylevana",   offer: "K-Beauty & J-Beauty Deals",     description: "Shop Korean and Japanese beauty brands at great prices.",               logo: logo("stylevana.com"), affiliateUrl: "https://miniurl.app/clng02d"  },
  ],
};

const ALL_DEALS = Object.values(COMPARE_DATA).flat();

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
      
        href={deal.affiliateUrl}
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

  const categoryIcons: Record<string, string> = {
    Travel: "✈️",
    Fashion: "👗",
    Beauty: "💄",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pb-24 md:p-8">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Compare Deals</h1>
          <p className="text-gray-500">Find the best deal across multiple stores before you buy</p>
        </div>

        {/* Search */}
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
                ? `${searchResults.length} results for "${search}"`
                : `No results for "${search}"`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((deal, i) => (
                <DealCard key={i} deal={deal} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Category Tabs */}
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

            {/* Deal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPARE_DATA[activeCategory].map((deal, i) => (
                <DealCard key={i} deal={deal} rank={i + 1} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}