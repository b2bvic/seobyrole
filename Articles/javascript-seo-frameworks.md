---
title:: JavaScript SEO: Framework-Specific Optimization for React, Vue, and Angular
description:: Technical guide to JavaScript SEO for modern frameworks. Learn rendering strategies, indexation solutions, and performance optimization for React, Vue, and Angular.
focus_keyword:: JavaScript SEO frameworks
category:: seo-roles
author:: Victor Valentine Romo
date:: 2026.02.08
---

# JavaScript SEO: Framework-Specific Optimization for React, Vue, and Angular

**JavaScript frameworks**—React, Vue, Angular, Next.js, Nuxt, SvelteKit—power modern web applications but introduce SEO challenges. Client-side rendering delays content availability to crawlers, dynamic routing confuses indexation, and heavy JavaScript bundles slow page speed. Sites built with these frameworks often suffer from poor organic visibility despite having valuable content.

This guide provides framework-specific solutions to make JavaScript-powered sites crawlable, indexable, and performant.

## The Core Problem: Client-Side Rendering

Traditional HTML sites send fully-rendered content to browsers. **Client-side rendering (CSR)** sends minimal HTML and relies on JavaScript to build the page after it loads. Search engine crawlers historically struggled with CSR because they executed JavaScript inconsistently.

**Googlebot** now renders JavaScript, but with limitations:

**Rendering queue delays:** Googlebot indexes the initial HTML immediately but queues JavaScript rendering for later—sometimes days later. This delays indexation of dynamically generated content.

**Rendering budget constraints:** Google allocates limited resources to rendering JavaScript. Complex apps with heavy JavaScript bundles may not render fully.

**Crawl inefficiency:** Googlebot must execute JavaScript for every page, consuming more crawl budget than static HTML sites.

**Other search engines lag:** Bing, Yandex, Baidu, and DuckDuckGo render JavaScript less reliably than Google. Sites relying on CSR lose visibility in these engines.

## Rendering Strategies Compared

Four primary rendering strategies exist for JavaScript frameworks, each with distinct SEO implications.

### Client-Side Rendering (CSR)

**How it works:** Server sends minimal HTML shell. JavaScript executes in the browser to fetch data and render content.

**SEO impact:**
- Slowest time-to-content for crawlers
- Requires JavaScript execution for indexation
- High risk of indexation delays or failures
- Poor Core Web Vitals (slow LCP, high CLS)

**When to use:** Internal dashboards, authenticated apps, tools where SEO doesn't matter.

**Avoid for:** Public content sites, e-commerce, blogs, marketing sites.

### Server-Side Rendering (SSR)

**How it works:** Server generates fully-rendered HTML for each request. JavaScript hydrates the page in the browser to enable interactivity.

**SEO impact:**
- Crawlers receive fully-rendered HTML immediately
- Fast time-to-content, improves LCP
- No rendering delays or JavaScript dependency
- Higher server costs (rendering on every request)

**When to use:** Content-heavy sites, e-commerce, news sites, marketing pages.

**Frameworks supporting SSR:** Next.js (React), Nuxt (Vue), Angular Universal (Angular), SvelteKit (Svelte).

### Static Site Generation (SSG)

**How it works:** Site pre-renders all pages to static HTML at build time. Server serves static files without per-request rendering.

**SEO impact:**
- Fastest delivery—static HTML served instantly
- Zero JavaScript dependency for crawlers
- Best Core Web Vitals performance
- Requires rebuild for content updates

**When to use:** Blogs, documentation sites, marketing sites with infrequent updates, landing pages.

**Frameworks supporting SSG:** Next.js, Nuxt, Gatsby, SvelteKit, Astro.

### Incremental Static Regeneration (ISR)

**How it works:** Pre-renders pages at build time but regenerates them in the background at defined intervals. Combines SSG speed with dynamic data.

**SEO impact:**
- Fast initial load like SSG
- Content stays fresh without full rebuilds
- Crawlers receive static HTML immediately
- Complex caching logic required

**When to use:** E-commerce product pages, content sites with frequent updates, news sites.

**Frameworks supporting ISR:** Next.js, Nuxt (via `revalidate` options).

## Framework-Specific Recommendations

### React (Create React App, Vite)

**Default setup:** Pure CSR. Bad for SEO.

**Solution:** Migrate to **Next.js** for SSR or SSG. Next.js is the industry-standard React framework for SEO-optimized React apps.

**Next.js rendering options:**
- `getServerSideProps`: SSR for dynamic content (user-specific pages, real-time data)
- `getStaticProps`: SSG for static content (blog posts, product pages)
- `revalidate` in `getStaticProps`: ISR for frequently updated content

**Implementation:**
```javascript
// SSG with ISR
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 3600, // Regenerate every hour
  };
}

// SSR
export async function getServerSideProps(context) {
  const data = await fetchUserData(context.req);
  return { props: { data } };
}
```

**Key optimizations:**
- Use `next/image` for automatic image optimization
- Enable `next/script` with `strategy="lazyOnload"` for third-party scripts
- Split code with dynamic imports to reduce bundle size
- Implement `next-sitemap` for automatic XML sitemap generation

### Vue (Vue CLI, Vite)

**Default setup:** CSR. Bad for SEO.

**Solution:** Migrate to **Nuxt** for SSR or SSG. Nuxt is Vue's equivalent to Next.js.

**Nuxt rendering modes:**
- `ssr: true`: SSR for all pages
- `target: 'static'`: SSG for static content
- `routeRules` with `swr`: ISR-like behavior

**Implementation:**
```javascript
// nuxt.config.js
export default {
  ssr: true,
  target: 'static',
  routeRules: {
    '/blog/**': { swr: 3600 }, // Revalidate blog pages hourly
  },
}
```

**Key optimizations:**
- Use `NuxtImg` component for automatic image optimization
- Enable `@nuxtjs/sitemap` module for XML sitemaps
- Implement `useSeoMeta` composable for meta tag management
- Lazy-load components with `defineAsyncComponent`

### Angular

**Default setup:** CSR. Bad for SEO.

**Solution:** Implement **Angular Universal** for SSR.

**Angular Universal setup:**
```bash
ng add @nguniversal/express-engine
```

This configures server-side rendering with an Express.js server.

**Key optimizations:**
- Use `TransferState` API to avoid duplicate HTTP requests on client hydration
- Implement lazy loading for feature modules
- Enable `prerender: true` in `angular.json` for SSG of static routes
- Use Angular's built-in image directive for automatic optimization

**Prerendering static routes:**
```json
// angular.json
"prerender": {
  "builder": "@nguniversal/builders:prerender",
  "options": {
    "routes": ["/", "/about", "/contact"]
  }
}
```

### Next.js

**Default setup:** Supports SSR, SSG, and ISR out of the box. Good for SEO if configured properly.

**Best practices:**
- Use SSG (`getStaticProps`) for content that updates infrequently
- Use ISR (`revalidate`) for content that updates hourly/daily
- Use SSR (`getServerSideProps`) only for user-specific or real-time data
- Avoid CSR for public-facing content pages

**Rendering decision tree:**
- Static content (about, landing pages) → SSG
- Blog posts, product pages → SSG + ISR
- Search results, user dashboards → SSR
- Interactive tools, calculators → CSR

### Nuxt

**Default setup:** Supports SSR and SSG. Good for SEO if configured properly.

**Best practices:**
- Set `ssr: true` for server-side rendering
- Use `target: 'static'` for static site generation
- Implement route-specific caching with `routeRules`
- Enable `@nuxtjs/sitemap` and `@nuxtjs/robots` modules

**Route-specific rendering:**
```javascript
// nuxt.config.js
export default {
  routeRules: {
    '/': { prerender: true }, // SSG for homepage
    '/blog/**': { swr: 3600 }, // ISR for blog posts
    '/api/**': { ssr: false }, // Skip SSR for API routes
  },
}
```

## Technical SEO Considerations for JavaScript Sites

### Indexation and Rendering

**Verify Googlebot rendering:** Use Google Search Console's URL Inspection tool to see how Googlebot renders your pages. Compare the rendered HTML to what you see in DevTools.

**Check for rendering errors:** Open the JavaScript console in Search Console's rendering preview. Fix any errors that prevent content from loading.

**Monitor indexation:** Track indexed pages in Search Console. Slow indexation growth signals rendering issues.

### Dynamic Routing and URLs

JavaScript frameworks often use client-side routing, which can confuse crawlers if implemented incorrectly.

**Use real URLs, not hash fragments:** Avoid `example.com/#/products`. Use `example.com/products`. Hash fragments aren't recognized as separate pages.

**Implement `pushState` routing:** Modern frameworks support HTML5 History API routing by default. Verify your router uses `pushState`, not hash-based routing.

**Ensure server handles routes:** For SSR/SSG, configure your server to handle all routes. A request to `example.com/products` should return the rendered product page, not a 404.

### Meta Tags and Open Graph

JavaScript frameworks dynamically inject meta tags, which can cause issues if rendered too late.

**Server-side meta tags:** Use SSR/SSG to render meta tags on the server. Googlebot reads server-rendered meta tags reliably.

**Framework-specific solutions:**
- **Next.js:** Use `next/head` component or `generateMetadata` in App Router
- **Nuxt:** Use `useHead` composable or `head` option
- **Angular:** Use `Meta` and `Title` services from `@angular/platform-browser`

**Example (Next.js):**
```javascript
import Head from 'next/head';

export default function Page({ data }) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta property="og:title" content={data.title} />
      </Head>
      <main>{data.content}</main>
    </>
  );
}
```

### Structured Data (Schema.org)

Search engines use **structured data** to understand page content and generate rich results. JavaScript frameworks must inject structured data server-side.

**JSON-LD format:** Use JSON-LD in a `<script type="application/ld+json">` tag. This format is easiest to inject dynamically.

**Example (Next.js):**
```javascript
export default function Product({ product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Head>
      <div>{product.name}</div>
    </>
  );
}
```

### XML Sitemaps

JavaScript sites must generate XML sitemaps programmatically, especially for SSR/ISR pages where URLs aren't known at build time.

**Static site generation:** Generate sitemaps at build time using framework plugins.
- **Next.js:** `next-sitemap` package
- **Nuxt:** `@nuxtjs/sitemap` module
- **Angular:** Custom script or third-party tools

**Dynamic content:** For ISR or SSR sites, generate sitemaps server-side or via API routes that aggregate all URLs.

### Internal Linking

Ensure internal links use standard `<a href>` tags, not JavaScript click handlers. Framework routing components handle this correctly:

- **Next.js:** `<Link href="/page">` renders as `<a>`
- **Nuxt:** `<NuxtLink to="/page">` renders as `<a>`
- **Angular:** `<a routerLink="/page">` renders as `<a>`

Verify that crawlers can follow internal links by checking the rendered HTML.

## Performance Optimization

JavaScript frameworks load heavy bundles that harm Core Web Vitals. Optimize aggressively.

### Code Splitting

Split JavaScript bundles to load only necessary code per page.

**Next.js:** Automatic code splitting by page. Use dynamic imports for components:
```javascript
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

**Nuxt:** Use `defineAsyncComponent` for lazy loading:
```javascript
const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'));
```

**Angular:** Configure lazy loading in routing:
```typescript
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];
```

### Image Optimization

Images often account for 50%+ of page weight. Use framework-specific image components for automatic optimization.

**Next.js:** `next/image` component with automatic WebP conversion, lazy loading, and responsive sizing.

**Nuxt:** `NuxtImg` and `NuxtPicture` components with built-in optimization.

**Angular:** Use Angular's image directive for automatic optimization.

### Third-Party Scripts

Third-party scripts (analytics, ads, chat widgets) block rendering and harm performance. Load them asynchronously after main content renders.

**Next.js:** Use `next/script` with `strategy="lazyOnload"`:
```javascript
import Script from 'next/script';

<Script src="https://analytics.example.com/script.js" strategy="lazyOnload" />
```

**General approach:** Defer scripts with `defer` or `async` attributes. Load non-critical scripts after window load event.

### Hydration Optimization

**Hydration** is the process of attaching JavaScript event handlers to server-rendered HTML. Slow hydration delays interactivity and harms FID/INP.

**Partial hydration:** Frameworks like **Astro** and **Qwik** hydrate only interactive components, not the entire page.

**Progressive hydration:** Load and hydrate components as they enter the viewport, not on page load.

**Next.js Server Components:** Render non-interactive components server-side without hydration overhead.

## FAQ

**Do I need to migrate from Create React App to Next.js?**

If SEO matters for your site, yes. Create React App uses CSR, which delays indexation and harms performance. Next.js provides SSR/SSG with minimal migration effort.

**Can Googlebot render my JavaScript site?**

Googlebot renders most JavaScript, but with delays and resource constraints. SSR/SSG eliminates rendering dependency and ensures reliable indexation.

**Should I use SSR or SSG?**

Use SSG for content that updates infrequently (blog posts, landing pages). Use SSR for dynamic, user-specific content (dashboards, search results). Use ISR for content that updates periodically (product pages, news articles).

**How do I test if my JavaScript site is SEO-friendly?**

Use Google Search Console's URL Inspection tool to see how Googlebot renders your pages. Check for missing content, rendering errors, or slow time-to-content. Verify meta tags and structured data appear in the rendered HTML.

**Do other search engines render JavaScript?**

Bing renders JavaScript but less reliably than Google. Yandex, Baidu, and DuckDuckGo have limited JavaScript rendering. Use SSR/SSG to ensure compatibility with all search engines.

**What's the best framework for SEO?**

Next.js (React) and Nuxt (Vue) provide the best out-of-the-box SEO capabilities. Both support SSR, SSG, and ISR with minimal configuration. Angular Universal works but requires more manual setup.