import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, ChevronRight, X, Tag } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  category: string;
  date: string;
  content: string[];
}

const articles: Article[] = [
  {
    id: '1',
    title: '10 Ways to Save More on Every Online Order',
    summary: 'Simple habits that stack up to serious savings — without spending hours hunting for deals.',
    readTime: '4 min read',
    category: 'Shopping Tips',
    date: 'May 6, 2026',
    content: [
      'Online shopping has never been easier — but neither has accidentally overpaying. Here are 10 tried-and-true tactics savvy shoppers use to cut costs on every order.',
      '1. Always search for a coupon code before checkout. Spending 30 seconds on CouponHunter before hitting "Place Order" regularly saves 5–20% on purchases.',
      '2. Use cashback credit cards. Pairing a coupon with a cashback card means double savings on the same purchase.',
      '3. Shop via affiliate links. Many coupon sites — including CouponHunter — link directly to deals through affiliate programs, sometimes unlocking exclusive discounts unavailable elsewhere.',
      '4. Add to cart, then wait. Leaving items in your cart for 24–48 hours often triggers automated discount emails from retailers.',
      '5. Sign up for email lists strategically. New subscriber discounts (typically 10–15% off) are usually sent within minutes — use them and unsubscribe after.',
      '6. Stack deals: use a site-wide coupon on top of an already-discounted item. Many stores allow this.',
      '7. Compare across platforms. The same product is often listed at different prices on different marketplaces — always check.',
      '8. Buy during off-peak seasons. Electronics are cheapest in January; fashion markdowns hit in February and August.',
      '9. Use browser extensions that automatically apply coupon codes at checkout.',
      '10. Set price alerts on items you want but aren\'t urgently needed. Patience is the most underrated saving strategy.',
    ],
  },
  {
    id: '2',
    title: 'How Affiliate Coupon Sites Work (And Why It\'s Good for You)',
    summary: 'The honest explanation of how free coupon sites make money — and why that means better deals for shoppers.',
    readTime: '3 min read',
    category: 'How It Works',
    date: 'May 5, 2026',
    content: [
      'If you\'ve ever wondered how a site can offer free coupons and still exist — here\'s the transparent answer.',
      'Coupon sites like CouponHunter partner with brands and retailers through affiliate networks (like Involve Asia, Rakuten, and CJ Affiliate). When you click a deal and make a purchase, the retailer pays us a small referral commission.',
      'Here\'s the key part: this commission comes out of the retailer\'s marketing budget, not your pocket. You pay exactly what you\'d pay going directly to the site — often less, because the coupon we provide reduces your total.',
      'Why do retailers do this? Because affiliate traffic converts better than cold traffic. They\'d rather give 5% to a referral partner than spend that on ads with uncertain returns.',
      'What this means for you: the deals are real, the discounts are genuine, and using a coupon site costs you nothing. It\'s genuinely a win-win-win between shoppers, retailers, and sites like ours.',
      'The only thing to watch for is sites that promote fake or expired codes just to generate clicks. At CouponHunter, we only list deals from verified affiliate partners — which means we only get paid when the deal actually works for you.',
    ],
  },
  {
    id: '3',
    title: 'The Best Times of Year to Shop Each Category',
    summary: 'A month-by-month guide to maximizing your savings based on retailer discount cycles.',
    readTime: '5 min read',
    category: 'Strategy',
    date: 'May 4, 2026',
    content: [
      'Retailers run deep discounts on predictable cycles. Learning these rhythms is one of the highest-leverage things you can do as a shopper.',
      'January: Electronics and TVs hit their lowest prices post-holidays. Retailers clear inventory ahead of new model launches at CES.',
      'February: Winter clothing goes on clearance (50–70% off), and Valentine\'s Day items drop sharply after Feb 14.',
      'March–April: Fitness equipment and gym memberships are heavily discounted as the "New Year motivation" surge fades.',
      'May: Mattresses, furniture, and home goods see major sales around Memorial Day (US) and similar holidays in other markets.',
      'June–July: Mid-year sales dominate in Southeast Asia (think 6.6, 7.7 sale events on Lazada and Shopee). Travel deals also peak for off-peak summer bookings.',
      'August: Back-to-school season drives discounts on laptops, tablets, stationery, and clothing.',
      'October: Beauty and skincare brands launch heavy promotions ahead of the holiday season.',
      'November: The biggest shopping month globally — Black Friday, Cyber Monday, and 11.11 (Singles Day) drive record discounts across every category.',
      'December: Last-minute holiday deals on gifts, plus end-of-year clearance on everything from cars to appliances.',
      'Pro tip: bookmark CouponHunter and check it specifically during these windows — our affiliate partners tend to push their best codes during peak sale periods.',
    ],
  },
  {
    id: '4',
    title: 'Digital vs. Printable Coupons: Which Should You Use?',
    summary: 'A quick guide to understanding the difference and when each type gives you the best savings.',
    readTime: '3 min read',
    category: 'How It Works',
    date: 'May 3, 2026',
    content: [
      'Coupons come in two main forms these days: digital and printable. Each has its place, and knowing the difference saves both money and frustration.',
      'Digital coupons are applied online — either via a code entered at checkout, or through a special affiliate link that automatically applies the discount. They\'re instant, require no printing, and are perfect for online shopping.',
      'Printable coupons are generated as PDFs or images that you print at home and present at a physical store. They\'re still widely used by grocery chains, pharmacies, and local retailers.',
      'Which is better? It depends on where you\'re shopping. For online orders, digital coupons win every time — no hassle, instant savings. For in-store shopping at supermarkets or local chains, printable coupons often unlock deals that aren\'t available online.',
      'On CouponHunter, we label each coupon clearly: "Digital" means click and use online; "Printable" means you\'ll need to print it. Some deals offer both formats.',
      'A common mistake is printing a digital coupon and trying to use it in-store — retailers won\'t accept it. Always check the label before assuming.',
      'Our recommendation: use digital coupons for convenience and printables when shopping locally. Together they cover nearly every saving scenario.',
    ],
  },
  {
    id: '5',
    title: 'How to Use CouponHunter\'s QR Scanner',
    summary: 'Found a coupon code in a store or magazine? Here\'s how to scan and save it in seconds.',
    readTime: '2 min read',
    category: 'App Guide',
    date: 'May 2, 2026',
    content: [
      'CouponHunter includes a built-in QR code and barcode scanner — here\'s how to make the most of it.',
      'When to use it: When you spot a coupon QR code on product packaging, in a store window, on a receipt, or in a printed flyer.',
      'How to use it: Tap the "Scan" button in the app header or the scan button in the bottom navigation bar. Allow camera access when prompted. Point your camera at the QR code or barcode and hold steady.',
      'What happens next: If the code is from a CouponHunter partner, we\'ll automatically match it to the relevant deal and save it to your collection. If it\'s an unknown code, we\'ll save it as a generic coupon with the raw code so you can use it later.',
      'Saved scanned coupons appear in your "Saved" tab alongside any deals you\'ve hearted manually.',
      'Tips for better scanning: make sure the code is well-lit, hold the phone parallel to the code (not at an angle), and keep it about 15–20cm away for best focus.',
      'The scanner works with standard QR codes, EAN-13 barcodes, UPC codes, and most common coupon formats used by major retailers.',
    ],
  },
];

export default function BlogPage() {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="min-h-screen pb-24 px-4 pt-6 max-w-2xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {selectedArticle ? (
          <motion.div
            key="article"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            {/* Article Header */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-6 hover:underline"
            >
              <ChevronRight size={16} className="rotate-180" />
              Back to Tips
            </button>

            <div className="mb-6">
              <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-lg mb-3">
                {selectedArticle.category}
              </span>
              <h1 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {selectedArticle.readTime}
                </div>
                <span>·</span>
                <span>{selectedArticle.date}</span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedArticle.content.map((paragraph, i) => (
                <p key={i} className={`leading-relaxed ${i === 0 ? 'text-gray-700 font-medium text-base' : 'text-gray-500 text-sm'}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={18} className="text-indigo-600" />
              <div>
                <h1 className="text-xl font-black text-gray-900">Saving Tips & Guides</h1>
                <p className="text-xs text-gray-400">Expert advice to help you shop smarter</p>
              </div>
            </div>

            <div className="space-y-4">
              {articles.map((article, i) => (
                <motion.button
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedArticle(article)}
                  className="w-full text-left p-5 bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                          {article.category}
                        </span>
                      </div>
                      <h2 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          {article.readTime}
                        </div>
                        <span>·</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 transition-colors shrink-0 mt-1" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
