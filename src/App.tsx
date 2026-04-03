import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Tag, 
  Calendar, 
  ChevronRight, 
  X, 
  Loader2, 
  Ticket,
  Smartphone,
  Printer,
  Info,
  Navigation,
  ExternalLink,
  BookOpen,
  Heart,
  Bookmark,
  Scan,
  QrCode
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { searchCoupons, getSuggestedCategories, reverseGeocode, getGroceryLinks, Coupon, GroceryLink } from './services/couponService';

const GLOBAL_CITIES = [
  "San Francisco, CA",
  "New York, NY",
  "London, UK",
  "Tokyo, Japan",
  "Paris, France",
  "Berlin, Germany",
  "Sydney, Australia",
  "Toronto, Canada",
  "Dubai, UAE",
  "Singapore",
  "Mumbai, India",
  "São Paulo, Brazil"
];

const LivelyBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: `url('https://drive.google.com/uc?export=download&id=1hMXQBZnN8e1M20sYnxYHAlZE2uG0ulzu')`,
          filter: 'blur(1px) brightness(0.95)'
        }} 
      />
      
      {/* Glassmorphism Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-indigo-50/60 backdrop-blur-[2px]" />
      
      {/* Animated Gradient Orbs for Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-[100px] animate-[pulse-slow_10s_infinite]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-200/20 blur-[120px] animate-[pulse-slow_15s_infinite_reverse]" />
    </div>
  );
};

export default function App() {
  const [location, setLocation] = useState<string>('');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempLocation, setTempLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [groceryLinks, setGroceryLinks] = useState<GroceryLink[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [savedCoupons, setSavedCoupons] = useState<Coupon[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('savedCoupons') : null;
    return saved ? JSON.parse(saved) : [];
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('savedCoupons', JSON.stringify(savedCoupons));
  }, [savedCoupons]);

  const toggleSave = (e: React.MouseEvent, coupon: Coupon) => {
    e.stopPropagation();
    setSavedCoupons(prev => {
      const isSaved = prev.some(c => c.id === coupon.id);
      if (isSaved) {
        return prev.filter(c => c.id !== coupon.id);
      } else {
        return [...prev, coupon];
      }
    });
  };

  const isSaved = (id: string) => savedCoupons.some(c => c.id === id);

  const initLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const cityName = await reverseGeocode(latitude, longitude);
            setLocation(cityName);
            await loadInitialData(cityName);
          } catch (err) {
            console.error("Reverse geocode error:", err);
            const coords = `${latitude}, ${longitude}`;
            setLocation(`Area near ${coords}`);
            await loadInitialData(`Area near ${coords}`);
          } finally {
            setIsLocating(false);
          }
        },
        async (error) => {
          console.error("Geolocation error:", error);
          const defaultLoc = "San Francisco, CA";
          setLocation(defaultLoc);
          await loadInitialData(defaultLoc);
          setIsLocating(false);
        }
      );
    } else {
      const defaultLoc = "New York, NY";
      setLocation(defaultLoc);
      loadInitialData(defaultLoc);
      setIsLocating(false);
    }
  };

  const loadInitialData = async (loc: string) => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        searchCoupons(loc),
        getSuggestedCategories(loc),
        getGroceryLinks(loc)
      ]);

      if (results[0].status === 'fulfilled') setCoupons(results[0].value);
      if (results[1].status === 'fulfilled') setCategories(results[1].value);
      if (results[2].status === 'fulfilled') setGroceryLinks(results[2].value);
      
      // Log errors for debugging but don't crash the UI
      results.forEach((res, i) => {
        if (res.status === 'rejected') {
          console.error(`Service ${i} failed:`, res.reason);
        }
      });
    } catch (err) {
      console.error("Unexpected error in loadInitialData:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearching(true);
    try {
      const results = await searchCoupons(location, searchQuery);
      setCoupons(results);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setSearching(false);
    }
  };

  const handleScannedCoupon = (data: string) => {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(data);
      if (parsed.store && parsed.offer) {
        const newCoupon: Coupon = {
          id: `scanned-${Date.now()}`,
          store: parsed.store,
          offer: parsed.offer,
          description: parsed.description || "Scanned digital coupon",
          category: parsed.category || "Scanned",
          expiryDate: parsed.expiryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          code: parsed.code || data.substring(0, 10),
          requiresPrinting: parsed.requiresPrinting ?? false
        };
        setSavedCoupons(prev => {
          if (prev.some(c => c.code === newCoupon.code)) return prev;
          return [...prev, newCoupon];
        });
        setIsScannerOpen(false);
        return;
      }
    } catch (e) {
      // Not JSON, handle as raw code
    }

    // Fallback: Create a generic coupon from the scanned code
    const genericCoupon: Coupon = {
      id: `scanned-${Date.now()}`,
      store: "Scanned Coupon",
      offer: "Special Deal",
      description: `Scanned code: ${data}`,
      category: "Scanned",
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      code: data,
      requiresPrinting: false
    };
    
    setSavedCoupons(prev => {
      if (prev.some(c => c.code === genericCoupon.code)) return prev;
      return [...prev, genericCoupon];
    });
    setIsScannerOpen(false);
  };

  const filteredCoupons = (showSavedOnly ? savedCoupons : coupons).filter(coupon => {
    const matchesCategory = !selectedCategory || 
      coupon.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(coupon.category.toLowerCase());

    return matchesCategory;
  });

  const digitalCoupons = filteredCoupons.filter(c => !c.requiresPrinting);
  const printableCoupons = filteredCoupons.filter(c => c.requiresPrinting);

  const isExpiringSoon = (expiryDate: string) => {
    try {
      const expiry = new Date(expiryDate);
      const now = new Date();
      const diffTime = expiry.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    } catch (e) {
      return false;
    }
  };

  const CouponCard = ({ coupon }: { coupon: Coupon }) => {
    const expiringSoon = isExpiringSoon(coupon.expiryDate);
    const saved = isSaved(coupon.id);
    
    return (
      <motion.div
        layoutId={coupon.id}
        key={coupon.id}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedCoupon(coupon)}
        className={cn(
          "bg-white/60 backdrop-blur-md border rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden",
          expiringSoon ? "border-red-200 shadow-red-100/50" : "border-white/40"
        )}
      >
        {expiringSoon && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 z-10"
          />
        )}
        
        <div className={cn(
          "absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full group-hover:scale-125 transition-transform duration-700 opacity-50",
          expiringSoon ? "bg-red-100/40" : (coupon.requiresPrinting ? "bg-orange-200/40" : "bg-indigo-200/40")
        )} />
        
        <div className="relative flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg",
                coupon.requiresPrinting ? "bg-orange-50 text-orange-600" : "bg-indigo-50 text-indigo-600"
              )}>
                {coupon.category}
              </span>
              {expiringSoon && (
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-red-50 text-red-600 animate-pulse border border-red-100">
                  Expiring Soon!
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{coupon.store}</h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => toggleSave(e, coupon)}
              className={cn(
                "p-2 rounded-full transition-all border",
                saved 
                  ? "bg-red-50 border-red-100 text-red-500 shadow-sm" 
                  : "bg-white/80 border-gray-100 text-gray-400 hover:text-red-400"
              )}
            >
              <Heart size={18} fill={saved ? "currentColor" : "none"} />
            </motion.button>
            <div className={cn(
              "text-xl font-black",
              expiringSoon ? "text-red-600" : (coupon.requiresPrinting ? "text-orange-600" : "text-indigo-600")
            )}>{coupon.offer}</div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {coupon.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className={cn(
            "flex items-center gap-1.5 text-xs font-medium",
            expiringSoon ? "text-red-500" : "text-gray-400"
          )}>
            <Calendar size={14} className={expiringSoon ? "animate-bounce" : ""} />
            <span>Expires: {coupon.expiryDate}</span>
          </div>
          <div className={cn(
            "flex items-center gap-1 font-bold text-sm",
            expiringSoon ? "text-red-600" : (coupon.requiresPrinting ? "text-orange-600" : "text-indigo-600")
          )}>
            {coupon.requiresPrinting ? "Print Now" : "Use Now"} <ChevronRight size={16} />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen text-[#1A1A1A] font-sans relative">
      <LivelyBackground />
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/40 backdrop-blur-xl border-b border-white/20 px-4 py-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 overflow-hidden">
                <img src="https://drive.google.com/uc?export=download&id=1MPfCFDpkVRnSOxJh3BNiuGVgusseQBAz" alt="Logo" className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
              </div>
              <h1 className="text-xl font-montserrat font-bold tracking-tight">
                Coupon<span className="text-orange-500">Local</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border bg-white/80 border-white text-indigo-600 hover:bg-indigo-50 shadow-sm"
              >
                <Scan size={14} />
                <span>Scan</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border",
                  showSavedOnly 
                    ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-200" 
                    : "bg-white/80 border-white text-gray-600 hover:bg-white"
                )}
              >
                <Heart size={14} fill={showSavedOnly ? "currentColor" : "none"} />
                <span>{showSavedOnly ? "Saved" : "Save"}</span>
                {savedCoupons.length > 0 && (
                  <span className={cn(
                    "ml-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px]",
                    showSavedOnly ? "bg-white text-red-500" : "bg-red-500 text-white"
                  )}>
                    {savedCoupons.length}
                  </span>
                )}
              </motion.button>
            <div 
                onClick={() => {
                  if (!isEditingLocation) {
                    setTempLocation(location);
                    setIsEditingLocation(true);
                  }
                }}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 transition-all group/loc",
                  !isEditingLocation && "hover:bg-indigo-50 hover:border-indigo-200 cursor-pointer"
                )}
              >
                <MapPin size={14} className="text-indigo-500 group-hover/loc:scale-110 transition-transform" />
                {isEditingLocation ? (
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (tempLocation.trim()) {
                          setLocation(tempLocation);
                          loadInitialData(tempLocation);
                        }
                        setIsEditingLocation(false);
                      }}
                    >
                      <input 
                        autoFocus
                        type="text"
                        className="bg-transparent border-none focus:ring-0 p-0 text-sm w-[120px] font-medium text-indigo-600"
                        value={tempLocation}
                        onChange={(e) => setTempLocation(e.target.value)}
                      />
                    </form>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
                      <div className="p-2 max-h-48 overflow-y-auto no-scrollbar">
                        {GLOBAL_CITIES.filter(city => 
                          city.toLowerCase().includes(tempLocation.toLowerCase())
                        ).map(city => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => {
                              setLocation(city);
                              loadInitialData(city);
                              setIsEditingLocation(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="truncate max-w-[150px]">
                    {isLocating ? 'Locating...' : (location || 'Set location')}
                  </span>
                )}
              </div>
              <button
                onClick={initLocation}
                disabled={isLocating}
                className="p-1.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all disabled:opacity-50"
                title="Use my current location"
              >
                {isLocating ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Navigation size={14} />
                )}
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search for stores or products..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-indigo-500" size={20} />
              </div>
            )}
          </form>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* AI Categories */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">AI Suggested Categories</h2>
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-10 w-24 bg-white/40 backdrop-blur-sm animate-pulse rounded-full shrink-0 border border-white/20" />
              ))
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border shrink-0 shadow-sm",
                    selectedCategory === null 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200" 
                      : "bg-white/60 backdrop-blur-md border-white/40 text-gray-600 hover:bg-white/80"
                  )}
                >
                  All Deals
                </motion.button>
                {categories
                  .filter(cat => coupons.some(coupon => 
                    coupon.category.toLowerCase().includes(cat.toLowerCase()) || 
                    cat.toLowerCase().includes(coupon.category.toLowerCase())
                  ))
                  .map((cat) => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={cn(
                        "px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border shrink-0 shadow-sm",
                        selectedCategory === cat 
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200" 
                          : "bg-white/60 backdrop-blur-md border-white/40 text-gray-600 hover:bg-white/80"
                      )}
                    >
                      {cat}
                    </motion.button>
                  ))}
              </>
            )}
          </div>
        </section>

        {/* Grocery Links & Flyers */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-indigo-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Grocery Flyers & Coupons</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-white/40 backdrop-blur-sm animate-pulse rounded-2xl border border-white/20" />
              ))
            ) : groceryLinks.length > 0 ? (
              groceryLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl hover:bg-white/80 transition-all group shadow-sm"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    link.type === 'flyer' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                  )}>
                    {link.type === 'flyer' ? <BookOpen size={24} /> : <Ticket size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="font-bold text-gray-900 truncate">{link.name}</h3>
                      <ExternalLink size={12} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{link.description}</p>
                  </div>
                </motion.a>
              ))
            ) : (
              <div className="col-span-full text-center py-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-dashed border-white/60">
                <p className="text-gray-400 text-xs">No direct links found for this area.</p>
              </div>
            )}
          </div>
        </section>

        {/* Coupon Sections */}
        <div className="space-y-12">
          {/* Digital Coupons */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-indigo-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  {selectedCategory ? `${selectedCategory} Digital Deals` : 'Digital Coupons'}
                </h2>
              </div>
              <span className="text-xs font-medium text-gray-400">{digitalCoupons.length} found</span>
            </div>

            <div className="space-y-4">
              {loading ? (
                Array(2).fill(0).map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-3xl" />
                ))
              ) : digitalCoupons.length > 0 ? (
                digitalCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))
              ) : !loading && (
                <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm">No digital coupons found.</p>
                </div>
              )}
            </div>
          </section>

          {/* Printable Coupons */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Printer size={18} className="text-orange-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  {selectedCategory ? `${selectedCategory} Printable Deals` : 'Printable Coupons'}
                </h2>
              </div>
              <span className="text-xs font-medium text-gray-400">{printableCoupons.length} found</span>
            </div>

            <div className="space-y-4">
              {loading ? (
                Array(1).fill(0).map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-3xl" />
                ))
              ) : printableCoupons.length > 0 ? (
                printableCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))
              ) : !loading && (
                <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm">No printable coupons found.</p>
                </div>
              )}
            </div>
          </section>

          {!loading && coupons.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                {location ? <Ticket size={32} /> : <MapPin size={32} />}
              </div>
              <h3 className="text-gray-900 font-bold mb-1">
                {location ? "No coupons found" : "Set your location"}
              </h3>
              <p className="text-gray-500 text-sm">
                {location 
                  ? "Try searching for something else or changing categories." 
                  : "Enter a city or use your current location to find deals nearby."}
              </p>
              {!location && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditingLocation(true)}
                  className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-lg shadow-indigo-200"
                >
                  Set Location
                </motion.button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Coupon Detail Modal */}
      <AnimatePresence>
        {selectedCoupon && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCoupon(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedCoupon.id}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-t border-white/40"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                    <Ticket size={32} />
                  </div>
                  <button 
                    onClick={() => setSelectedCoupon(null)}
                    className="p-2 bg-gray-100 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest block">{selectedCoupon.category}</span>
                      {isExpiringSoon(selectedCoupon.expiryDate) && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-red-100 animate-pulse">
                          Expiring Soon
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleSave(e, selectedCoupon)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border",
                        isSaved(selectedCoupon.id)
                          ? "bg-red-50 border-red-100 text-red-500"
                          : "bg-gray-50 border-gray-100 text-gray-400 hover:text-red-400"
                      )}
                    >
                      <Heart size={18} fill={isSaved(selectedCoupon.id) ? "currentColor" : "none"} />
                      <span>{isSaved(selectedCoupon.id) ? "Saved" : "Save Deal"}</span>
                    </motion.button>
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">{selectedCoupon.store}</h2>
                  <div className={cn(
                    "text-4xl font-black mb-4",
                    isExpiringSoon(selectedCoupon.expiryDate) ? "text-red-600" : "text-indigo-600"
                  )}>{selectedCoupon.offer}</div>
                  <p className="text-gray-500 leading-relaxed">{selectedCoupon.description}</p>
                  <div className={cn(
                    "mt-4 flex items-center gap-2 text-sm font-bold",
                    isExpiringSoon(selectedCoupon.expiryDate) ? "text-red-600" : "text-gray-400"
                  )}>
                    <Calendar size={16} className={isExpiringSoon(selectedCoupon.expiryDate) ? "animate-bounce" : ""} />
                    <span>Expires: {selectedCoupon.expiryDate}</span>
                  </div>
                </div>

                <div className={cn(
                  "rounded-3xl p-6 mb-8 border",
                  selectedCoupon.requiresPrinting ? "bg-orange-50 border-orange-100" : "bg-indigo-50 border-indigo-100"
                )}>
                  <div className="flex items-center gap-3 mb-4">
                    {selectedCoupon.requiresPrinting ? (
                      <Printer className="text-orange-600" size={24} />
                    ) : (
                      <Smartphone className="text-indigo-600" size={24} />
                    )}
                    <h4 className={cn(
                      "font-bold",
                      selectedCoupon.requiresPrinting ? "text-orange-900" : "text-indigo-900"
                    )}>
                      {selectedCoupon.requiresPrinting ? "Printable Coupon" : "Digital Redemption"}
                    </h4>
                  </div>
                  <p className={cn(
                    "text-sm mb-6",
                    selectedCoupon.requiresPrinting ? "text-orange-700/70" : "text-indigo-700/70"
                  )}>
                    {selectedCoupon.requiresPrinting 
                      ? "This coupon must be printed and presented at the store."
                      : "Show this code to the cashier at checkout. No printing required."}
                  </p>
                  
                  <div className={cn(
                    "bg-white rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-dashed",
                    selectedCoupon.requiresPrinting ? "border-orange-200" : "border-indigo-200"
                  )}>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">Coupon Code</div>
                    <div className="text-3xl font-mono font-black tracking-widest text-gray-900 mb-4">
                      {selectedCoupon.code}
                    </div>
                    {/* Simulated Barcode */}
                    <div className="w-full h-16 flex gap-1 items-stretch">
                      {Array(40).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-gray-900 flex-1" 
                          style={{ width: `${Math.random() * 4 + 1}px`, opacity: Math.random() > 0.3 ? 1 : 0.2 }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar size={18} />
                    <span>Valid until {selectedCoupon.expiryDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Info size={14} />
                    <span>Terms apply</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedCoupon(null)}
                className="w-full py-6 bg-gray-900 text-white font-bold text-lg hover:bg-black transition-colors"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}

        {isScannerOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b flex items-center justify-between bg-indigo-50">
                <div className="flex items-center gap-2">
                  <QrCode className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">Scan Coupon</h2>
                </div>
                <button 
                  onClick={() => setIsScannerOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div id="reader" className="overflow-hidden rounded-2xl border-2 border-dashed border-indigo-200" />
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Point your camera at a coupon barcode or QR code to automatically save it.
                  </p>
                </div>
              </div>
            </motion.div>
            <ScannerInitializer onScan={handleScannedCoupon} />
          </div>
        )}
      </AnimatePresence>

      {/* Footer Nav (Mobile Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-6 py-3 flex justify-around items-center z-40 sm:hidden">
        <button 
          onClick={() => setShowSavedOnly(false)}
          className={cn("flex flex-col items-center gap-1", !showSavedOnly ? "text-indigo-600" : "text-gray-400")}
        >
          <Ticket size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Deals</span>
        </button>
        <button 
          onClick={() => setIsScannerOpen(true)}
          className="flex flex-col items-center gap-1 text-indigo-600"
        >
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white -mt-8 shadow-lg shadow-indigo-200 border-4 border-white">
            <Scan size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Scan</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Search size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
        </button>
        <button 
          onClick={() => setShowSavedOnly(true)}
          className={cn("flex flex-col items-center gap-1", showSavedOnly ? "text-red-500" : "text-gray-400")}
        >
          <Heart size={24} fill={showSavedOnly ? "currentColor" : "none"} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Saved</span>
        </button>
      </nav>
    </div>
  );
}

const ScannerInitializer = ({ onScan }: { onScan: (data: string) => void }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { 
      fps: 10, 
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    }, false);

    scanner.render((decodedText) => {
      onScan(decodedText);
      scanner.clear();
    }, (error) => {
      // console.warn(error);
    });

    return () => {
      scanner.clear().catch(err => console.error("Scanner cleanup error", err));
    };
  }, [onScan]);

  return null;
};
