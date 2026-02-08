---
title:: HTTP Status Codes for SEO: What Developers and SEOs Need to Know About 3xx, 4xx, and 5xx Errors
description:: Wrong HTTP status codes break crawling, waste crawl budget, and tank rankings. Here's what each status code means for SEO and when to use 301 vs. 302 vs. 404 vs. 410.
focus_keyword:: http status codes seo
category:: seo-roles
author:: Victor Valentine Romo
date:: 2026.02.08
---

# HTTP Status Codes for SEO: What Developers and SEOs Need to Know About 3xx, 4xx, and 5xx Errors

HTTP status codes are three-digit responses servers send when browsers or Googlebot request pages. Most developers know `200 OK` and `404 Not Found`. But subtle differences between redirect types (`301` vs. `302` vs. `307`), error handling (`404` vs. `410` vs. `soft 404`), and server errors (`500` vs. `503`) have massive SEO consequences.

Using the wrong status code wastes crawl budget, breaks link equity transfer, confuses Google about which URLs to index, and can cause entire sites to disappear from search results.

This guide explains which status codes matter for SEO, when to use each, how to audit them, and how to fix common misconfigurations.

## HTTP Status Code Categories

**1xx (Informational):** Request received, processing continues (rare, not SEO-relevant)

**2xx (Success):** Request succeeded
- **200 OK:** Page loaded successfully (this is what you want)

**3xx (Redirection):** Further action needed (client should follow redirect)
- **301 Moved Permanently:** Old URL permanently redirected to new URL
- **302 Found:** Temporary redirect (old URL will return)
- **307 Temporary Redirect:** Like 302, but method/body preserved
- **308 Permanent Redirect:** Like 301, but method/body preserved

**4xx (Client Error):** Request contains bad syntax or can't be fulfilled
- **404 Not Found:** Page doesn't exist
- **410 Gone:** Page existed but was permanently removed
- **403 Forbidden:** Server refuses request (authentication required)

**5xx (Server Error):** Server failed to fulfill valid request
- **500 Internal Server Error:** Generic server error
- **503 Service Unavailable:** Server temporarily down (maintenance)

## 2xx Status Codes (Success)

### 200 OK (The Goal)

**What it means:** Page loaded successfully. Googlebot indexes it.

**When to use:** For all pages you want indexed.

**SEO impact:** This is the default state. Pages returning 200 are crawled, indexed, and ranked.

**What NOT to do:** Don't return 200 for pages that don't exist (soft 404—see below).

## 3xx Status Codes (Redirects)

### 301 Moved Permanently (The SEO-Safe Redirect)

**What it means:** This URL has permanently moved to a new location. Update bookmarks, links, and search engines.

**When to use:**
- Migrating URLs (old structure → new structure)
- Switching domains (example.com → newexample.com)
- Canonicalizing URLs (http → https, www → non-www)
- Consolidating duplicate content (multiple URLs → one canonical URL)

**SEO impact:**
- **Passes 90-99% of link equity (PageRank)** from old URL to new URL
- Google eventually replaces old URL with new URL in search results
- Timeline: 2-4 weeks for Google to recognize and transfer rankings

**Example:**
```
Request: GET /old-page
Response: 301 Moved Permanently
Location: /new-page
```

**Implementation (Nginx):**
```nginx
location /old-page {
  return 301 /new-page;
}
```

**Implementation (Apache .htaccess):**
```apache
Redirect 301 /old-page /new-page
```

**Implementation (Next.js):**
```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301
      },
    ];
  },
};
```

### 302 Found (Temporary Redirect, Risky for SEO)

**What it means:** This URL is temporarily redirecting to another location. Original URL will return.

**When to use:**
- A/B testing (redirect 50% of traffic to variant)
- Temporary maintenance (redirect to "under construction" page)
- Geo-targeting (redirect users based on location, but URL structure stays same)

**SEO impact:**
- **Does NOT pass full link equity** (Google may not transfer rankings)
- Google **keeps the original URL in the index**, not the destination URL
- If redirect becomes permanent, switch to 301 immediately

**Common mistake:** Developers use 302 for permanent migrations. This prevents rankings from transferring.

**Example:**
```
Request: GET /promo-page
Response: 302 Found
Location: /landing-page
```

**When Google sees 302:** "This is temporary. Keep indexing the original URL. Don't transfer rankings."

**When to switch to 301:** If redirect has been in place for 6+ months, it's no longer temporary. Use 301.

### 307 Temporary Redirect (Method-Preserving 302)

**What it means:** Like 302, but guarantees HTTP method (POST, GET) is preserved during redirect.

**When to use:** Redirecting POST requests (e.g., form submissions) where data must be preserved.

**SEO impact:** Same as 302 (temporary, no ranking transfer).

**Rare in practice.** Most sites use 302.

### 308 Permanent Redirect (Method-Preserving 301)

**What it means:** Like 301, but guarantees HTTP method is preserved.

**When to use:** Permanent redirects where POST data must be preserved (rare use case).

**SEO impact:** Same as 301 (passes link equity).

**Browser support:** Modern browsers (Chrome, Firefox, Safari) support 308, but older browsers may not. Stick with 301 unless you have a specific need for 308.

## 4xx Status Codes (Client Errors)

### 404 Not Found (The Acceptable Error)

**What it means:** The requested page doesn't exist on this server.

**When to use:**
- Page was deleted and has no replacement
- URL was never valid (typo, malformed link)
- Temporary content expired (event pages, time-limited promotions)

**SEO impact:**
- Google removes 404 pages from the index (eventually)
- **No link equity passes** from 404 pages
- High volumes of 404s (100s-1000s) don't directly hurt rankings, but waste crawl budget

**Example:**
```
Request: GET /nonexistent-page
Response: 404 Not Found
```

**What NOT to do:**
- Don't 404 pages that should redirect (if a replacement exists, use 301)
- Don't create custom 404 pages that return 200 status (soft 404—see below)

**Best practice:** Monitor 404 errors in **Google Search Console** → **Coverage** → **Excluded**. Fix high-traffic 404s with 301 redirects or restore content.

### 410 Gone (The Definitive Deletion)

**What it means:** This page existed but was **permanently removed** and will **never return**.

**When to use:**
- Discontinued products (e-commerce)
- Expired promotions with no replacement
- Content you want Google to de-index immediately

**SEO impact:**
- Google removes 410 pages from index **faster** than 404 (within days vs. weeks)
- Signals "stop crawling this URL forever"

**When to use 410 vs. 404:**
- **404:** "This page doesn't exist" (could be temporary, typo, or never existed)
- **410:** "This page existed, but we deleted it on purpose"

**Example:**
```
Request: GET /deleted-product
Response: 410 Gone
```

**Implementation (Nginx):**
```nginx
location /deleted-product {
  return 410;
}
```

**Rare in practice.** Most sites use 404 for deleted content. Use 410 only if you want aggressive de-indexing.

### 403 Forbidden (Authentication Required)

**What it means:** You don't have permission to access this resource.

**When to use:**
- Admin panels (users must log in)
- Restricted content (membership sites, paywalled content)

**SEO impact:**
- Google **won't index** 403 pages (Googlebot can't log in)
- Don't use 403 for public pages you want indexed

**Common mistake:** Accidentally protecting public pages with 403 (blocks Googlebot).

### Soft 404 (The Silent Killer)

**What it is:** A page that returns `200 OK` but contains "Page Not Found" content.

**Example:**
```
Request: GET /missing-page
Response: 200 OK
Body: <h1>404 - Page Not Found</h1>
```

**Why it's bad:**
- Google sees 200 status (thinks page exists)
- Google sees thin content (flags as low quality)
- Result: Google indexes a broken page, wasting crawl budget and diluting site quality

**Google Search Console error:** "Soft 404" under **Coverage** → **Excluded**.

**Fix:** Return proper 404 status code instead of 200.

**Implementation (Nginx):**
```nginx
error_page 404 /404.html;
location = /404.html {
  internal;
  # Returns 404 status with custom HTML
}
```

**Implementation (Next.js):**
```javascript
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

Next.js automatically returns 404 status for this page.

## 5xx Status Codes (Server Errors)

### 500 Internal Server Error (The Site Breaker)

**What it means:** Server encountered an error and couldn't fulfill the request.

**Common causes:**
- Broken server configuration
- Code errors (PHP fatal error, unhandled exception)
- Database connection failure

**SEO impact:**
- **Catastrophic if persistent.** Googlebot sees 500, assumes site is broken, **stops crawling**
- Pages drop from index within days if errors persist
- Rankings tank site-wide

**What to do:**
1. Check server error logs immediately
2. Fix code or configuration issues
3. Monitor **Google Search Console** → **Coverage** → **Server error (5xx)**
4. If site was down briefly (<24 hours), Google typically doesn't penalize

**Example:**
```
Request: GET /any-page
Response: 500 Internal Server Error
```

### 503 Service Unavailable (The Maintenance Mode)

**What it means:** Server is temporarily unavailable (planned maintenance, overload).

**When to use:**
- Scheduled maintenance
- Server upgrades
- Traffic spike overload (graceful degradation)

**SEO impact:**
- **Short-term (< 24 hours):** Google pauses crawling, no penalty
- **Long-term (> 7 days):** Google may de-index pages

**Best practice:** Include `Retry-After` header to tell Google when to come back.

**Example:**
```
Response: 503 Service Unavailable
Retry-After: 3600
```

(Tells Googlebot to retry in 1 hour.)

**Implementation (Nginx, maintenance mode):**
```nginx
location / {
  return 503;
  add_header Retry-After 3600;
}
```

## Status Code Chains (Redirect Chains)

**What they are:** A URL redirects to another URL, which redirects to another URL.

**Example:**
```
/old-page → 301 → /intermediate-page → 301 → /final-page
```

**SEO impact:**
- **Wastes crawl budget** (Googlebot must follow multiple redirects)
- **Dilutes link equity** (each redirect loses ~1-5% of PageRank)
- **Slows page load** (users and bots wait for multiple HTTP round trips)

**Fix:** Always redirect directly to final destination.

**Before:**
```
/old-page → 301 → /temp-page → 301 → /new-page
```

**After:**
```
/old-page → 301 → /new-page
/temp-page → 301 → /new-page
```

**How to detect:** Use **Screaming Frog** or **Ahrefs Site Audit** to find redirect chains.

## Status Code Loops (Redirect Loops)

**What they are:** Page A redirects to Page B, which redirects back to Page A.

**Example:**
```
/page-a → 301 → /page-b
/page-b → 301 → /page-a
```

**SEO impact:**
- **Complete indexing failure.** Googlebot can't resolve final destination.
- Pages drop from index.
- Users see "Too many redirects" error.

**How to detect:** **Google Search Console** → **Coverage** → **Redirect error**.

**Fix:** Remove circular logic in redirect rules.

## Crawl Budget and Status Codes

**Crawl budget** = number of pages Googlebot crawls on your site in a given timeframe.

**Status codes that waste crawl budget:**
- **Redirect chains** (3+ redirects)
- **404 errors** (if Googlebot keeps retrying)
- **Soft 404s** (Googlebot thinks page exists, indexes thin content)
- **500 errors** (Googlebot retries failed requests)

**Status codes that conserve crawl budget:**
- **301 redirects** (direct, no chains)
- **410 Gone** (tells Googlebot to stop crawling permanently)

**Rule:** Fix redirect chains, monitor 404 errors, return proper status codes.

## Auditing Status Codes

### Tool 1: Google Search Console

**Path:** **Indexing** → **Pages**

**What to check:**
- **Server error (5xx):** Fix immediately (site down)
- **Redirect error:** Fix redirect chains and loops
- **Not found (404):** Review high-traffic 404s, add 301 redirects if replacements exist
- **Soft 404:** Fix pages returning 200 but showing "not found" content

### Tool 2: Screaming Frog

1. Crawl site
2. Go to **Response Codes** → **Client Error (4xx)** or **Server Error (5xx)**
3. Export URLs with errors
4. Fix or redirect

### Tool 3: Ahrefs Site Audit

1. Run site audit
2. Go to **Issues** → filter by "Broken pages" or "Redirect chains"
3. Export issues
4. Fix

## Quick Reference: Which Status Code to Use

| Scenario | Status Code |
|----------|-------------|
| Page loads successfully | 200 OK |
| Old URL permanently moved | 301 Moved Permanently |
| Temporary redirect (A/B test, geo-targeting) | 302 Found |
| Page deleted, no replacement | 404 Not Found |
| Page permanently removed, never returning | 410 Gone |
| Page requires login | 403 Forbidden |
| Server error (code bug, database failure) | 500 Internal Server Error |
| Planned maintenance | 503 Service Unavailable |

## Frequently Asked Questions

**Do 404 errors hurt SEO?**

Not directly. Having 404s is normal (broken external links, old URLs). But **high volumes** (1000s of 404s from internal links) waste crawl budget. Fix internal broken links.

**Should I redirect all 404s to the homepage?**

No. This creates soft 404s (Google sees unrelated content). Only redirect if a relevant replacement page exists.

**How long should I keep 301 redirects in place?**

Permanently. Once Google transfers rankings (4-8 weeks), removing the redirect causes the old URL to return 404, losing rankings.

**Can I chain multiple 301 redirects?**

Technically yes, but avoid it. Each redirect adds latency and loses ~1-5% link equity. Redirect directly to final destination.

**What's the difference between 301 and 308?**

Both are permanent redirects. 308 preserves HTTP method (POST → POST). 301 may change method (POST → GET). For most sites, use 301.

**How do I check what status code a URL returns?**

Use browser DevTools: Open page, press F12, go to **Network** tab, refresh page, check status code column.

**Or use curl:**
```bash
curl -I https://example.com/page
```

HTTP status codes aren't just technical details—they're instructions to Google about how to treat your URLs. Get them wrong, and you break crawling, indexing, and rankings site-wide. Get them right, and Google efficiently indexes your content while preserving link equity.