export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: string;
}

export const SITE_DOMAIN = 'https://mybwn.com';
export const DEFAULT_OG_IMAGE = `${SITE_DOMAIN}/og-preview.png`;

export function updateSeoMeta(meta: Partial<SeoMeta>, path = window.location.pathname) {
  const title = meta.title || 'HSK Free Lab - 100% Free HSK Prep, Mock Tests & Pinyin Tools';
  const description = meta.description || 'Prepare for HSK 1, 2, and 3 with zero paywalls. Free timed mock exams, interactive pinyin tone trainer, and score calculator.';
  const canonicalUrl = meta.canonical || `${SITE_DOMAIN}${path === '/' ? '' : path}`;
  const imageUrl = meta.image || DEFAULT_OG_IMAGE;
  const ogType = meta.type || 'website';

  // 1. Document Title
  document.title = title;

  // 2. Helper for updating or creating meta tags
  const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard SEO Meta
  setMeta('name', 'description', description);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // Open Graph / Facebook / LinkedIn / Discord
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:site_name', 'HSK Free Lab');
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:image', imageUrl);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');

  // Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', imageUrl);
}
