---
title:: Site Migration SEO Guide: Prevent Traffic Loss During Platform Changes
description:: Migrate websites without losing rankings. Pre-migration planning, redirect mapping, and post-launch monitoring for domain, platform, or protocol changes.
focus_keyword:: site migration seo
category:: Technical SEO
author:: Victor Valentine Romo
date:: 2026.02.08
---

# Site Migration SEO Guide: Prevent Traffic Loss During Platform Changes

Your agency recommended migrating to a new CMS. The redesign launched Friday. Monday morning, organic traffic dropped 60%. Google Search Console shows 4,000 404 errors. Your old URLs redirect to the homepage, not equivalent new pages. Recovery will take 6-12 months.

Site migrations destroy rankings when treated as IT projects instead of SEO projects. The new platform works perfectly—the URLs, redirects, and content structure don't. Google can't match old pages to new pages, treats the migration as mass deletions, and deindexes accordingly.

This guide covers four migration types: domain changes, platform changes, HTTP to HTTPS, and URL structure changes. The SEO methodology is identical—preserve URL mapping, maintain content parity, redirect correctly, monitor obsessively.

## Pre-Migration: Planning (2-4 Weeks Before Launch)

### 1. Crawl the Existing Site

**Objective**: Inventory every URL, understand current site structure, baseline metrics.

**Tools**: Screaming Frog, Sitebulb, or Semrush Site Audit

**What to export**:
- All URLs (including non-200 status codes)
- Title tags and meta descriptions
- H1s
- Word count per page
- Internal link counts (inbound links to each page)
- Response codes (200, 301, 404, 500)
- Canonical tags
- Noindex tags

**Why**: This becomes your redirect mapping source. If a URL isn't in your crawl export, you won't know to redirect it.

**Deliverable**: CSV file with 10-15K+ rows (for mid-size sites). Columns: Old URL, Title, Meta Description, Status Code, Inbound Links.

### 2. Identify High-Value Pages

**Objective**: Prioritize pages that generate traffic and conversions. These can't break.

**Method**:
1. Export organic landing pages from Google Analytics (last 12 months)
2. Sort by sessions, filter for top 20%
3. Cross-reference with conversion data—which pages generate leads/sales?
4. Tag these as "Priority 1" in your redirect mapping

**Why**: If homepage and 50 blog posts generate 80% of organic traffic, those are non-negotiable. The other 500 pages matter less. Triage matters when timelines are tight.

### 3. Export Backlinks

**Objective**: Preserve link equity by ensuring backlinked pages redirect correctly.

**Tool**: Ahrefs, Semrush, or Majestic

**What to export**:
- Target URL (the page on your site receiving the backlink)
- Referring domain
- Domain Rating of referring domain
- Anchor text

**Sort by**: Pages with the most referring domains (RDs)

**Why**: A page with 50 backlinks losing its redirect wastes more equity than 100 pages with zero backlinks. Prioritize pages with link authority.

### 4. Map Old URLs to New URLs

**Objective**: Create a 1:1 mapping of every old URL to its equivalent new URL.

**Process**:
1. Export all old URLs from crawl
2. Determine new URL structure (this requires collaboration with developers)
3. Map each old URL to its new equivalent

**Example mapping**:
```
Old URL: domain.com/blog/2024/01/email-marketing-tips
New URL: domain.com/blog/email-marketing-tips
```

**Edge cases**:
- **Page removed entirely**: Redirect to most relevant existing page (not homepage)
- **Multiple old pages consolidated into one**: All old URLs redirect to the consolidated page
- **New pages with no old equivalent**: No redirect needed (these are new content)

**Deliverable**: Spreadsheet with two columns: `Old URL` | `New URL`

**Quality check**: Every URL in your crawl export must have a mapping. No exceptions. Pages you choose not to redirect should be explicitly marked "Noindex" or "404 intentionally."

### 5. Set Up Staging Environment

**Objective**: Test the new site before going live.

**Requirements**:
- Staging domain (e.g., `staging.domain.com` or `dev.domain.com`)
- Identical content and structure to production
- All redirects implemented
- Noindex staging site (prevent Google from indexing it)

**Why**: Catch errors before launch. 90% of migration disasters are discovered post-launch because staging wasn't tested thoroughly.

### 6. Pre-Launch SEO Checklist

Run this checklist on staging 1-2 weeks before launch.

- [ ] All old URLs redirect to mapped new URLs (test 20-50 manually)
- [ ] Redirects return 301 status codes (not 302 temporary redirects)
- [ ] No redirect chains (old URL → intermediate URL → new URL should be old URL → new URL)
- [ ] Title tags and meta descriptions preserved (or intentionally updated)
- [ ] H1s match old site (or intentionally changed)
- [ ] Internal linking structure intact
- [ ] XML sitemap generated with new URLs
- [ ] robots.txt allows crawling (no accidental `Disallow: /`)
- [ ] Canonical tags point to correct URLs (self-referential on new URLs)
- [ ] Schema markup (JSON-LD) intact
- [ ] Noindex tags removed (staging often has noindex—must be removed for production)
- [ ] HTTPS enforced (if applicable)
- [ ] Mobile-responsive (test on actual devices)
- [ ] Page speed acceptable (run PageSpeed Insights on key pages)
- [ ] Forms and CTAs functional
- [ ] Analytics and GSC tracking codes installed

**Approval gate**: Stakeholders must sign off that SEO checklist is complete before launch. Don't skip this—most migration issues are preventable.

## Launch Day: Go-Live (Day 0)

### 1. Deploy Redirects

**Critical**: Redirects must deploy simultaneously with the new site. If the new site launches without redirects, even for an hour, Google will crawl 404s.

**Implementation methods**:
- **.htaccess** (Apache servers): Upload redirect rules file
- **Nginx config**: Add redirect rules to Nginx configuration
- **CDN/DNS level** (Cloudflare, Fastly): Configure redirects at edge
- **Application-level** (Next.js, Rails, Django): Implement redirects in code

**Test redirects immediately post-launch**: Visit 20-30 old URLs manually. Verify they redirect to correct new URLs with 301 status codes.

### 2. Submit New Sitemap to Google Search Console

**Steps**:
1. Generate XML sitemap with new URLs only (exclude old URLs)
2. Submit sitemap at `https://domain.com/sitemap.xml` in GSC
3. Request indexing for top 10-20 priority pages manually via URL Inspection Tool

**Why**: Google needs to discover new URLs quickly. Don't rely on organic crawling alone.

### 3. Monitor in Real-Time

**Metrics to watch (first 24 hours)**:
- **Google Search Console > Coverage Report**: Check for indexation errors, 404s, server errors
- **Server logs**: Monitor for 404 spikes
- **Google Analytics**: Watch organic traffic for sudden drops
- **SERP positions**: Use a rank tracker to check if top 10-20 keywords drop

**Set up alerts**: Configure GSC to email you immediately for critical issues (server errors, manual actions).

## Post-Launch: Monitoring and Fixes (Weeks 1-12)

### Week 1: Immediate Triage

**Daily tasks**:
- Check GSC Coverage report for new errors
- Fix any 404s (add missing redirects)
- Monitor organic traffic in GA—should stabilize within 3-7 days
- Check top 20 keywords in rank tracker—minor fluctuations are normal, 50%+ drops indicate problems

**Expected behavior**:
- **Days 1-3**: Traffic may drop 10-30% as Google recrawls
- **Days 4-7**: Traffic recovers to 85-100% of pre-migration baseline
- **Week 2**: Traffic stabilizes or begins growing

**Red flags**:
- Traffic drops >40% and doesn't recover by day 7
- Indexed pages drop >30% in GSC
- Top keywords drop out of top 20

**If red flags occur**:
1. Verify all priority pages redirect correctly
2. Check for accidental noindex tags on new site
3. Ensure canonicals point to new URLs, not old
4. Verify new site is crawlable (not blocked by robots.txt)

### Month 1: Comprehensive Audit

**Crawl the new site**: Run Screaming Frog on the new site. Compare to pre-migration crawl.

**What to check**:
- **Indexed page count**: GSC Coverage > Valid pages. Should be within 10% of pre-migration count.
- **404 errors**: GSC Coverage > Excluded > Not Found. Investigate any URLs with significant traffic history.
- **Redirect chains**: New site shouldn't introduce additional redirects.
- **Orphan pages**: Pages with zero internal links (common after migrations).
- **Content parity**: Verify top 20 pages have same word count +/- 10%.

**Fix priorities**:
1. Add missing redirects for any 404s with backlinks or traffic history
2. Fix redirect chains
3. Add internal links to orphan pages

### Month 2-3: Refinement

**Track ranking recovery**: Use Ahrefs or Semrush to track keyword positions weekly. Most keywords should return to pre-migration positions (or better) within 60-90 days.

**Re-index priority pages**: If certain pages haven't recovered rankings, request re-indexing in GSC's URL Inspection Tool.

**Update external backlinks**: Reach out to high-DR referring domains if their backlinks still point to old URLs. Ask them to update links to new URLs. This preserves full link equity (redirects pass ~95% of link equity, direct links pass 100%).

## Migration Type-Specific Considerations

### Domain Migration (domain-old.com → domain-new.com)

**Additional steps**:
- Implement 301 redirects at DNS/server level (not just via canonical tags)
- Keep old domain active for 12+ months (don't let it expire)
- Update Google My Business, social profiles, and email signatures to new domain
- Monitor branded search volume—if people search for "Old Brand Name," rankings may drop until brand recognition shifts

**Expected timeline**: 90-180 days for full ranking recovery. Domain authority doesn't transfer instantly—new domain must build its own trust signals.

### Platform Migration (WordPress → Webflow, Shopify → Custom)

**Additional steps**:
- Preserve URL structure if possible (easiest approach)
- If URL structure changes, rely heavily on redirect mapping
- Ensure new CMS generates clean HTML (no render-blocking issues)
- Verify schema markup is re-implemented (often lost in CMS changes)
- Test form submissions and e-commerce functionality (broken conversion paths hurt more than rankings)

**Common pitfall**: New CMS auto-generates URLs differently (WooCommerce product URLs vs. custom URLs). Requires developer intervention to match old structure or comprehensive redirects.

### HTTP → HTTPS (Protocol Migration)

**Additional steps**:
- 301 redirect all `http://` URLs to `https://` equivalents
- Update internal links to `https://` (not just rely on redirects)
- Update canonical tags to `https://` versions
- Resubmit sitemap with `https://` URLs
- Update Google Search Console property (add `https://` version)

**Simplest migration type**: Protocol changes rarely cause ranking drops if implemented correctly. Google has confirmed HTTPS is a ranking factor (slight boost, not penalty for HTTP).

### URL Structure Redesign

**Examples**:
- Removing dates: `/blog/2024/01/15/post` → `/blog/post`
- Flattening hierarchy: `/category/subcategory/post` → `/blog/post`
- Removing parameters: `/products?id=123` → `/products/item-name`

**Additional steps**:
- Comprehensive redirect mapping (every old URL must redirect)
- Update all internal links to new structure (reduces redirect dependency)
- Inform search engines via sitemap submission

**Risk level**: High if redirect mapping is incomplete. Missing redirects = 404s = traffic loss.

## Measuring Success

**Metrics to track**:

**1. Indexed pages** (GSC Coverage Report)
- Target: Return to within 5-10% of pre-migration count within 30 days

**2. Organic traffic** (Google Analytics)
- Target: Return to 95-100% of pre-migration baseline within 60 days
- Allowable dip: 10-20% in weeks 1-2, recovering by week 4-6

**3. Keyword rankings** (Ahrefs/Semrush)
- Target: Top 20 keywords return to pre-migration positions +/- 2 positions within 90 days

**4. Backlink equity** (Ahrefs/Semrush)
- Target: Referring domains count remains stable (no mass drop indicating broken redirects)

**5. Core Web Vitals** (GSC or PageSpeed Insights)
- Target: New site maintains or improves CWV scores (LCP, FID, CLS)

**6. Conversion rate** (Google Analytics)
- Target: Organic conversion rate returns to within 5-10% of pre-migration baseline

**Success = all six metrics recover within 90 days**. If any metric is still >20% below baseline at day 90, the migration had unresolved SEO issues.

## Disaster Recovery: What If Traffic Doesn't Recover?

**Diagnosis checklist**:

1. **Verify redirects are live**: Test 50-100 old URLs manually. Use a bulk redirect checker tool.
2. **Check for noindex tags**: View source on new site, search for `<meta name="robots" content="noindex">`. This is the #1 cause of post-migration disasters.
3. **Verify new site is in GSC**: Ensure you added the new domain/protocol to GSC and are monitoring the correct property.
4. **Check robots.txt**: Visit `domain.com/robots.txt`. Ensure it doesn't block important pages.
5. **Review canonicals**: Canonical tags should point to the new URL, not old URLs.
6. **Crawl the new site**: Identify orphan pages, broken links, and structural issues.
7. **Check HTTPS enforcement**: If you migrated to HTTPS, ensure all pages load via HTTPS (not mixed content warnings).
8. **Verify content parity**: Did content get lost in migration? Compare word count and section headings.

**If all checks pass but traffic is still down**: Give it more time. Google takes 30-90 days to fully recrawl and reassess a migrated site. Resist the urge to revert—reverting causes a second migration and doubles recovery time.

## FAQ

**How long does it take for rankings to recover after a migration?**

Typical: 30-90 days for full recovery. Simple migrations (HTTPS, minor URL changes) recover faster. Complex migrations (domain + platform + structure changes simultaneously) take 90-180 days.

**Should I migrate during high-traffic or low-traffic seasons?**

Low-traffic seasons if you have seasonality (avoid Q4 if you're e-commerce). The dip during migration is less painful when baseline traffic is low.

**Can I migrate in phases, one section at a time?**

Yes. Migrate `/blog` first, then `/products`, then other sections. Reduces risk. Each phase needs its own redirect mapping and monitoring.

**What if I don't have resources to map every URL?**

Prioritize: Map top 20% of pages by traffic, all pages with backlinks, all pages ranking in top 20. For the rest, redirect to the most relevant category page or homepage (not ideal, but better than 404).

**Should I use 302 temporary redirects during migration?**

No. Use 301 permanent redirects. 302s tell Google "this is temporary, keep the old URL indexed." 301s tell Google "this page moved permanently, transfer rankings to the new URL."

**What if my old domain expires after migration?**

Keep it active for at least 12 months with redirects live. After 12 months, most link equity has transferred and rankings stabilized. Letting it expire too early risks link equity loss.

**How do I handle multilingual sites?**

Preserve hreflang tags across migration. Each language version needs its own redirect mapping. Test that hreflang points to new URLs, not old.

**What if I have to migrate but can't preserve URL structure?**

Redirect to the closest equivalent page. If no equivalent exists, redirect to the parent category. Last resort: redirect to homepage (but this loses specificity and rankings).

**Can I use JavaScript redirects instead of server-side 301s?**

No. JavaScript redirects don't pass link equity reliably. Google may not follow them. Use server-side 301 redirects (via .htaccess, Nginx, or application code).

Migrations are controlled emergencies. The site will change, rankings will fluctuate, traffic will dip temporarily. The goal isn't zero disruption—it's controlled disruption with 90-day recovery. Plan meticulously, test exhaustively, monitor obsessively. Most "failed" migrations failed at planning, not execution.