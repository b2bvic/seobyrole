---
title:: Hreflang Implementation Guide: International SEO for Multilingual Sites
description:: Hreflang tags tell Google which language/region versions of pages exist. Incorrect implementation causes duplicate content penalties and wrong-language search results. Here's the complete specification.
focus_keyword:: hreflang implementation guide
category:: seo-roles
author:: Victor Valentine Romo
date:: 2026.02.08
---

# Hreflang Implementation Guide: International SEO for Multilingual Sites

**Hreflang** is an HTML attribute that tells Google which language and regional versions of a page exist. It prevents duplicate content issues when the same content appears in multiple languages, and ensures users see results in their language.

Most international sites implement hreflang incorrectly—or not at all. The result: English content ranks in Spain, Spanish content ranks in the US, and Google treats translated pages as duplicate content.

This guide explains hreflang syntax, when to use it, how to implement it (HTML tags, sitemaps, HTTP headers), how to troubleshoot errors, and platform-specific implementations for WordPress, Next.js, and headless CMS.

## When You Need Hreflang

**Use hreflang if:**
- You have multiple language versions of pages (English, Spanish, French, etc.)
- You have regional variants of the same language (US English, UK English, Australian English)
- You serve different content by country (prices in USD vs. EUR, different shipping policies)

**Don't use hreflang if:**
- You have one language/region only
- Your multilingual content is on different domains with no overlap (unrelated sites)

## Hreflang Syntax and Attributes

### Basic Format

```html
<link rel="alternate" hreflang="language-region" href="URL" />
```

**Example:**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/page" />
<link rel="alternate" hreflang="es-es" href="https://example.com/es-es/page" />
<link rel="alternate" hreflang="fr-fr" href="https://example.com/fr-fr/page" />
```

### Language Codes (ISO 639-1)

**Common language codes:**
- `en` = English
- `es` = Spanish
- `fr` = French
- `de` = German
- `it` = Italian
- `pt` = Portuguese
- `zh` = Chinese
- `ja` = Japanese
- `ko` = Korean

**Full list:** [ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

### Region Codes (ISO 3166-1 Alpha-2)

**Common region codes:**
- `US` = United States
- `GB` = United Kingdom
- `CA` = Canada
- `AU` = Australia
- `ES` = Spain
- `MX` = Mexico
- `FR` = France
- `DE` = Germany

**Full list:** [ISO 3166-1 alpha-2 codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

### Language-Only vs. Language-Region

**Language-only (no region):**
```html
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
```

**Use when:** Content applies to all regions speaking that language.

**Language-region (specific):**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/page" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/page" />
```

**Use when:** Content differs by region (prices, shipping, terminology).

**Rule:** Be as specific as necessary. If US and UK English pages are identical, use `en`. If they differ (colour vs. color, $ vs. £), use `en-us` and `en-gb`.

### X-Default (Fallback for Unmatched Users)

**Syntax:**
```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

**Purpose:** Specifies a default page for users whose language/region doesn't match any hreflang tag.

**Use case:** User searches in Japanese, but you only have English, Spanish, and French. `x-default` points them to your English homepage or language selector.

**Best practice:** Set `x-default` to your language selector page or primary language (usually English).

## Implementation Methods

### Method 1: HTML Tags (Most Common)

Add hreflang tags to the `<head>` section of each page.

**Example (English page):**
```html
<head>
  <link rel="alternate" hreflang="en" href="https://example.com/en/about" />
  <link rel="alternate" hreflang="es" href="https://example.com/es/acerca-de" />
  <link rel="alternate" hreflang="fr" href="https://example.com/fr/a-propos" />
  <link rel="alternate" hreflang="x-default" href="https://example.com/en/about" />
</head>
```

**Critical rule:** Each page must reference **itself** and **all alternate versions** (including `x-default`).

**Example (Spanish page):**
```html
<head>
  <link rel="alternate" hreflang="en" href="https://example.com/en/about" />
  <link rel="alternate" hreflang="es" href="https://example.com/es/acerca-de" />
  <link rel="alternate" hreflang="fr" href="https://example.com/fr/a-propos" />
  <link rel="alternate" hreflang="x-default" href="https://example.com/en/about" />
</head>
```

**Why:** Hreflang is bidirectional. English page tells Google the Spanish version exists. Spanish page must tell Google the English version exists.

### Method 2: XML Sitemap (Scalable for Large Sites)

**Use when:** You have 100+ pages per language (adding HTML tags to every page is tedious).

**Sitemap syntax:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/en/about</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/about" />
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/acerca-de" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/a-propos" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/en/about" />
  </url>
  <url>
    <loc>https://example.com/es/acerca-de</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/about" />
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/acerca-de" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/a-propos" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/en/about" />
  </url>
</urlset>
```

**Submit to Google Search Console:**
1. Go to **Sitemaps**
2. Add sitemap URL (e.g., `https://example.com/sitemap_hreflang.xml`)
3. Click Submit

**Advantage:** Centralized management (easier to maintain than HTML tags on every page).

**Disadvantage:** Google must crawl sitemap to discover hreflang (slower than HTML tags).

### Method 3: HTTP Headers (For Non-HTML Files)

**Use when:** You have PDFs, images, or other non-HTML files with language variants.

**Example (PDF in multiple languages):**

**HTTP response header:**
```
Link: <https://example.com/en/whitepaper.pdf>; rel="alternate"; hreflang="en",
      <https://example.com/es/whitepaper.pdf>; rel="alternate"; hreflang="es",
      <https://example.com/fr/whitepaper.pdf>; rel="alternate"; hreflang="fr",
      <https://example.com/en/whitepaper.pdf>; rel="alternate"; hreflang="x-default"
```

**Implementation (Nginx):**
```nginx
location ~* \.pdf$ {
  add_header Link '<https://example.com/en/whitepaper.pdf>; rel="alternate"; hreflang="en"' always;
  add_header Link '<https://example.com/es/whitepaper.pdf>; rel="alternate"; hreflang="es"' always;
  add_header Link '<https://example.com/fr/whitepaper.pdf>; rel="alternate"; hreflang="fr"' always;
  add_header Link '<https://example.com/en/whitepaper.pdf>; rel="alternate"; hreflang="x-default"' always;
}
```

**Rare use case.** Most sites use HTML tags or sitemaps.

## Common Hreflang Mistakes

### Mistake 1: Missing Self-Reference

**Wrong:**
```html
<!-- English page -->
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page" />
```

**Right:**
```html
<!-- English page -->
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page" />
```

**Every page must reference itself** in hreflang tags.

### Mistake 2: Non-Bidirectional Links

**Wrong:**

```html
<!-- English page -->
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />

<!-- Spanish page (missing English reference) -->
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
```

**Right:**

Both pages must reference **all** language versions.

**English page:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
```

**Spanish page:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
```

### Mistake 3: Incorrect Language/Region Codes

**Wrong:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/english/page" />
<link rel="alternate" hreflang="spanish" href="https://example.com/spanish/page" />
```

**Right:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
```

**Use ISO 639-1 language codes** (2 letters) and **ISO 3166-1 region codes** (2 letters, uppercase).

### Mistake 4: Mixing Canonical and Hreflang

**Wrong:**
```html
<!-- Spanish page -->
<link rel="canonical" href="https://example.com/en/page" />
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
```

**Problem:** Canonical tells Google "this page is a duplicate of the English version." Hreflang tells Google "this is the Spanish version." Conflicting signals.

**Right:**
```html
<!-- Spanish page -->
<link rel="canonical" href="https://example.com/es/page" />
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
```

**Each language version should canonical to itself.**

### Mistake 5: Missing X-Default

**Wrong:**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/page" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/page" />
<link rel="alternate" hreflang="es-es" href="https://example.com/es-es/page" />
```

**Right:**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/page" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/page" />
<link rel="alternate" hreflang="es-es" href="https://example.com/es-es/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

**X-default is optional but recommended.** It provides a fallback for unmatched users.

## Platform-Specific Implementations

### WordPress (With Plugins)

**Plugin: WPML (Paid)**

WPML auto-generates hreflang tags.

**Setup:**
1. Install WPML (wpml.org)
2. Configure languages (Settings → Languages)
3. Enable "Language URL format" (e.g., `/en/`, `/es/`)
4. WPML automatically adds hreflang tags to all pages

**Plugin: Polylang (Free)**

**Setup:**
1. Install Polylang
2. Add languages (Settings → Languages)
3. Install "Polylang for WooCommerce" (if e-commerce)
4. Hreflang tags auto-generated

### Next.js (Internationalization)

**Built-in i18n support:**

**next.config.js:**
```javascript
module.exports = {
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
  },
};
```

**Auto-generated URLs:**
- `https://example.com/en/about` (English)
- `https://example.com/es/acerca-de` (Spanish)
- `https://example.com/fr/a-propos` (French)

**Hreflang implementation:**

**Component: `SEOHead.js`**
```javascript
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEOHead() {
  const router = useRouter();
  const { locales, locale, asPath } = router;

  return (
    <Head>
      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hreflang={loc}
          href={`https://example.com/${loc}${asPath}`}
        />
      ))}
      <link
        rel="alternate"
        hreflang="x-default"
        href={`https://example.com${asPath}`}
      />
    </Head>
  );
}
```

### Headless CMS (Contentful + Next.js)

**Content model: Add locale field**

```json
{
  "name": "Page",
  "fields": [
    { "id": "title", "name": "Title", "type": "Symbol", "localized": true },
    { "id": "slug", "name": "Slug", "type": "Symbol", "localized": true },
    { "id": "body", "name": "Body", "type": "RichText", "localized": true }
  ]
}
```

**Contentful SDK fetch:**
```javascript
const entries = await client.getEntries({
  content_type: 'page',
  'fields.slug': slug,
  locale: 'en-US', // or 'es-ES', 'fr-FR'
});
```

**Hreflang generation:**
```javascript
export function generateHreflangTags(slug, locales) {
  return locales.map(locale => ({
    hreflang: locale,
    href: `https://example.com/${locale}/${slug}`,
  }));
}
```

## Validation and Troubleshooting

### Tool 1: Google Search Console

**Path:** **Settings** → **International Targeting** → **Language**

**What it shows:** Hreflang errors detected by Google.

**Common errors:**
- **No return tags:** Page A references Page B, but Page B doesn't reference Page A
- **Incorrect language code:** Used invalid ISO code (e.g., "english" instead of "en")
- **Conflicting declarations:** HTML tags vs. sitemap have different hreflang values

**Fix:** Correct errors, wait 2-4 weeks for Google to re-crawl and re-validate.

### Tool 2: Hreflang Tags Testing Tool

**URL:** [hreflang.org](https://www.hreflang.org/)

**What it does:** Crawls your page, extracts hreflang tags, validates syntax and bidirectionality.

**How to use:**
1. Enter URL
2. Click "Test"
3. Review errors and warnings

### Tool 3: Screaming Frog (Hreflang Audit)

1. Crawl site with **Screaming Frog**
2. Go to **Directives** → **Hreflang**
3. View hreflang implementation across site
4. Export errors for fixing

## Advanced Scenarios

### Scenario 1: Subdomain Per Language

**URL structure:**
- English: `https://example.com/page`
- Spanish: `https://es.example.com/page`
- French: `https://fr.example.com/page`

**Hreflang:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/page" />
<link rel="alternate" hreflang="es" href="https://es.example.com/page" />
<link rel="alternate" hreflang="fr" href="https://fr.example.com/page" />
```

**Same implementation.** Hreflang works across subdomains.

### Scenario 2: Separate Domain Per Language

**URL structure:**
- English: `https://example.com/page`
- Spanish: `https://example.es/page`
- French: `https://example.fr/page`

**Hreflang:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/page" />
<link rel="alternate" hreflang="es" href="https://example.es/page" />
<link rel="alternate" hreflang="fr" href="https://example.fr/page" />
```

**Same implementation.** Hreflang works across domains.

### Scenario 3: Dynamic Content (E-Commerce)

**Problem:** Product pages with region-specific pricing.

**Example:**
- `https://example.com/en-us/product` (shows $99)
- `https://example.com/en-gb/product` (shows £79)

**Hreflang:**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/product" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/product" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en-us/product" />
```

**Even if content is 90% identical, regional differences justify separate URLs and hreflang.**

## Frequently Asked Questions

**Do I need hreflang if I only have English (US) and English (UK) versions?**

Yes, if content differs (pricing, spelling, shipping). If content is identical, you don't need separate URLs or hreflang.

**Can I use hreflang for pages that aren't direct translations?**

Hreflang is for equivalent content in different languages/regions. If pages aren't equivalent (different topics), don't use hreflang.

**What if I have 10 languages? Do I need 10 hreflang tags on every page?**

Yes. Every page must reference all language versions (including itself and `x-default`). Use XML sitemap implementation to avoid HTML bloat.

**Does hreflang pass PageRank between language versions?**

No. Hreflang is not a ranking signal. It only affects which version users see based on their language/location.

**How long does it take for hreflang to work?**

2-4 weeks after implementation. Google must re-crawl all pages, validate bidirectionality, and update index.

Hreflang errors break international SEO silently—rankings drop in target countries, but you don't get notified. Implement once correctly, validate in **Google Search Console**, and audit quarterly to catch regressions.