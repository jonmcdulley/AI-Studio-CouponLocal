import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://couponhunter.coupons';

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Coupon Hunter - Best Coupons, Promo Codes & Deals Online',
    description: 'Find the best coupon codes, promo codes, and deals from top US and international brands. Save on travel, fashion, beauty, tech and more.',
  },
  '/about': {
    title: 'About Coupon Hunter - Our Mission to Help You Save',
    description: 'Learn about Coupon Hunter, your trusted source for verified coupon codes, promo codes and deals from top global brands.',
  },
  '/blog': {
    title: 'Coupon Hunter Blog - Savings Tips, Deals & Promo Code Guides',
    description: 'Read the latest savings tips, deal guides, and promo code roundups on the Coupon Hunter blog.',
  },
  '/compare': {
    title: 'Compare Deals - Find the Best Price | Coupon Hunter',
    description: 'Compare the best deals, coupon codes and discounts side by side. Find the biggest savings across top brands at Coupon Hunter.',
  },
};

export function useCanonical() {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonical = BASE_URL + pathname;
    const meta = PAGE_META[pathname] ?? PAGE_META['/'];

    // ── Canonical tag ──────────────────────────────────────────
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;

    // ── Title ──────────────────────────────────────────────────
    document.title = meta.title;

    // ── Meta description ───────────────────────────────────────
    let descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.name = 'description';
      document.head.appendChild(descEl);
    }
    descEl.content = meta.description;

    // ── OG tags ────────────────────────────────────────────────
    const setOg = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setOg('og:title', meta.title);
    setOg('og:description', meta.description);
    setOg('og:url', canonical);

  }, [pathname]);
}
