import React from 'react';
import { motion } from 'motion/react';
import { Ticket, Search, Heart, Scan, MapPin, Shield, Zap, Globe, Mail, ExternalLink } from 'lucide-react';

const features = [
  {
    icon: <Search size={22} className="text-indigo-600" />,
    title: 'Smart Coupon Search',
    description: 'Our AI-powered search finds the best deals for your location in real time — no manual browsing needed.',
  },
  {
    icon: <MapPin size={22} className="text-indigo-600" />,
    title: 'Location-Based Deals',
    description: 'We surface coupons relevant to where you are, whether you\'re in Manila, New York, or anywhere in between.',
  },
  {
    icon: <Heart size={22} className="text-indigo-600" />,
    title: 'Save Your Favorites',
    description: 'Bookmark deals you love and access them anytime — even offline. Your saved coupons are always with you.',
  },
  {
    icon: <Scan size={22} className="text-indigo-600" />,
    title: 'QR & Barcode Scanner',
    description: 'Spot a coupon in the wild? Scan it directly in the app and we\'ll save it to your collection instantly.',
  },
  {
    icon: <Shield size={22} className="text-indigo-600" />,
    title: 'Verified Deals Only',
    description: 'Every coupon we surface comes from verified affiliate partners and trusted coupon networks.',
  },
  {
    icon: <Zap size={22} className="text-indigo-600" />,
    title: 'Always Up to Date',
    description: 'Deals are refreshed regularly. Expired coupons are flagged automatically so you never waste a trip.',
  },
];

const faqs = [
  {
    q: 'Is CouponHunter free to use?',
    a: 'Yes, completely free. We earn a small commission from affiliate partners when you use a deal — at no extra cost to you.',
  },
  {
    q: 'How do the coupons work?',
    a: 'Click "Use Now" on any digital coupon to go directly to the merchant\'s site with the deal applied. For printable coupons, click "Print Now" and bring the printed copy to the store.',
  },
  {
    q: 'Are the deals available worldwide?',
    a: 'We support a growing list of global merchants. Some deals may be region-specific — set your location for the most relevant results.',
  },
  {
    q: 'How do I report an expired or broken deal?',
    a: 'Email us at support@couponhunter.coupons and we\'ll investigate and remove it promptly.',
  },
  {
    q: 'Can I use CouponHunter on mobile?',
    a: 'Absolutely. The site is fully optimized for mobile, and the QR scanner works with your phone camera.',
  },
];

interface AboutPageProps {
  onClose: () => void;
}

export default function AboutPage({ onClose }: AboutPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="min-h-screen pb-24 px-4 pt-6 max-w-2xl mx-auto"
    >
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-4">
          <Ticket size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">About CouponHunter</h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-md mx-auto">
          We help everyday shoppers save money on the things they already buy — using AI to surface the best deals, faster.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-indigo-600 rounded-3xl p-6 mb-8 text-white shadow-xl shadow-indigo-200">
        <div className="flex items-center gap-2 mb-3">
          <Globe size={18} className="text-indigo-200" />
          <span className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Our Mission</span>
        </div>
        <p className="text-white/90 text-base leading-relaxed">
          Saving money shouldn't require hunting through dozens of sites or clipping paper coupons. CouponHunter 
          aggregates the best deals from trusted affiliate partners worldwide — so you get more value with less effort.
        </p>
      </div>

      {/* How It Works */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">How It Works</h2>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Set your location', desc: 'We use it to surface deals near you or from global merchants you shop with.' },
            { step: '2', title: 'Browse or search', desc: 'Filter by category or search for a specific store or product type.' },
            { step: '3', title: 'Tap to use', desc: 'Click any coupon to go directly to the deal, or print it for in-store use.' },
            { step: '4', title: 'Save your favorites', desc: 'Heart any deal to save it — access your saved coupons anytime.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm"
            >
              <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-1">{faq.q}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl mb-8">
        <h3 className="font-bold text-amber-800 text-sm mb-1">Affiliate Disclosure</h3>
        <p className="text-amber-700 text-xs leading-relaxed">
          CouponHunter participates in affiliate programs including Involve Asia, Rakuten, and CJ Affiliate. 
          When you click a deal and make a purchase, we may earn a small commission — at no additional cost to you. 
          This helps us keep the site free and the deals fresh.
        </p>
      </div>

      {/* Contact */}
      <div className="p-5 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Get in touch</h3>
          <p className="text-gray-500 text-xs mt-0.5">Questions, broken links, partnership inquiries</p>
        </div>
        <a
          href="mailto:support@couponhunter.coupons"
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
        >
          <Mail size={12} />
          Email us
        </a>
      </div>
    </motion.div>
  );
}
