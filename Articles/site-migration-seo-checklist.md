title:: Developer's Checklist for SEO-Safe Site Migrations
description:: A developer's checklist for site migrations that preserve SEO value. Covers redirect mapping, URL patterns, testing, and post-migration monitoring.
focus_keyword:: site migration SEO checklist
category:: developers
author:: Victor Valentine Romo
date:: 2026.02.07

# Developer's Checklist for SEO-Safe Site Migrations

A site migration SEO checklist prevents the most common cause of catastrophic organic traffic loss: changes to URL structure, domain, or platform executed without redirect mapping, content preservation, and technical validation. The typical site migration, executed without SEO planning, loses 20-40% of organic traffic. Some never recover.

The checklist below is not a strategy document — it's an engineering specification. Every item is testable, automatable, and has a clear pass/fail criterion. If you're planning a domain change, CMS switch, URL restructure, HTTP-to-HTTPS transition, or site redesign that alters URL patterns, this is the operational guide.

## Pre-Migration Phase (4-8 Weeks Before Launch)

### 1. Complete URL Inventory

Crawl the current site with **Screaming Frog** and export every URL that returns a 200 status code. This is your source-of-truth URL list. Cross-reference against:

- **Google Search Console** — all indexed URLs (Coverage report > Valid)
- XML sitemap URLs — every URL in your current sitemap
- **Google Analytics 4** — all URLs that received organic traffic in the last 12 months
- Backlink data — all URLs with inbound links from **Ahrefs** or **Majestic**

The union of these four sources represents every URL that carries SEO value. Missing a URL means losing its organic equity permanently.

### 2. Build the Redirect Map

For every URL in the inventory, define the destination URL on the new site. This is a 1:1 mapping — each old URL maps to exactly one new URL that serves the equivalent or closest-match content.

Rules for redirect mapping:

- Content pages map to their equivalent content page (same content, new URL)
- Category pages map to equivalent category pages
- Pagination pages map to the first page of the equivalent paginated series
- Parameter URLs map to the clean equivalent
- URLs with no equivalent map to the most relevant parent page, never to the homepage

The redirect map is a spreadsheet with three columns: old URL, new URL, and redirect type (301 permanent for all SEO-relevant redirects).

### 3. Validate Content Parity

For your top 50 pages by organic traffic (from **Google Analytics 4**), verify that the new version preserves:

- The same or improved title tag
- The same or improved meta description
- The same heading structure (H1, H2, H3 hierarchy)
- The same or expanded body content
- The same or improved [structured data](/articles/structured-data-implementation.html)
- Internal links to the same destinations (updated to new URL patterns)

Content parity ensures that the pages **Google** ranked retain the signals that earned those rankings. Redesigning content simultaneously with migrating URLs doubles the risk — separate the migration from content changes when possible.

### 4. Preserve Internal Linking Architecture

Export the internal link graph from **Screaming Frog**. The new site's internal linking should maintain the same structural relationships. Pages that received 50 internal links on the old site should receive equivalent internal links on the new site.

Orphaned pages — pages that existed in the old site's link structure but receive no internal links in the new site — lose organic equity rapidly. Verify that no high-traffic page becomes orphaned during the migration.

### 5. Configure Server-Side Redirects

Implement redirects at the server level (web server configuration or edge function), not through JavaScript or meta refresh tags. **Googlebot** follows server-side 301 redirects efficiently. Client-side redirects introduce delays and may not transfer SEO signals reliably.

For **Nginx**:

```nginx
location /old-path/ {
  return 301 /new-path/;
}
```

For **Apache** (.htaccess):

```apache
Redirect 301 /old-path/ https://example.com/new-path/
```

For **Cloudflare** or **Vercel**: use platform-specific redirect configuration files that support bulk redirect rules.

### 6. Update XML Sitemaps

Generate a new XML sitemap reflecting the new URL structure. Include only URLs that return 200 status codes on the new site. Remove all old URLs. Submit the new sitemap to **Google Search Console** immediately after migration.

### 7. Set Up Monitoring Infrastructure

Before migration, establish baselines in **Google Search Console** and **Google Analytics 4** for:

- Total organic clicks (daily, weekly, monthly)
- Organic clicks by top 50 pages
- Average position for top 100 keywords
- Total indexed pages
- Core Web Vitals scores

These baselines are your comparison points post-migration. Without pre-migration baselines, you can't quantify impact.

## Migration Day Execution

### 8. Deploy During Low-Traffic Hours

Execute the migration during the lowest-traffic window for your site (typically 2-5am local time for your primary audience). This minimizes user impact if something goes wrong and provides time to verify before peak hours.

### 9. Activate All Redirects Simultaneously

Do not deploy redirects incrementally. All redirects should go live at the same time as the new site. Partial deployment creates a window where some old URLs return 404 while others redirect — confusing crawlers and potentially resulting in deindexation of unreachable pages.

### 10. Verify Redirect Accuracy

Run an automated check against every row in the redirect map. For each old URL:

- Send an HTTP request (do not follow redirects)
- Verify the response is 301
- Verify the `Location` header matches the intended destination
- Follow the redirect and verify the destination returns 200

Script this verification:

```bash
while IFS=, read -r old new; do
  status=$(curl -o /dev/null -s -w "%{http_code}" -I "$old")
  location=$(curl -s -I "$old" | grep -i location | awk '{print $2}' | tr -d '\r')
  echo "$old -> $location (Status: $status)"
done < redirect-map.csv
```

Any mismatch requires immediate correction.

### 11. Submit New Sitemap to Google Search Console

Submit the updated XML sitemap within an hour of migration. Use the Sitemaps report in **Google Search Console** for the new property. If you changed domains, add and verify the new domain property before migration day.

### 12. Test Canonical Tags

Every page on the new site should have a self-referencing canonical tag pointing to its own canonical URL:

```html
<link rel="canonical" href="https://newdomain.com/new-path/">
```

Verify that no canonical tags still reference old URLs. **Screaming Frog** can audit this across the entire site in a single crawl.

### 13. Validate robots.txt

Confirm the new site's robots.txt does not block critical pages or resources. A common migration error: the staging environment's robots.txt (which blocks all crawlers) gets deployed to production.

```
# Correct production robots.txt
User-agent: *
Allow: /
Sitemap: https://newdomain.com/sitemap.xml
```

### 14. Check HTTPS Configuration

If the migration involves an HTTP-to-HTTPS transition, verify:

- All HTTP URLs redirect to HTTPS equivalents (not just the homepage)
- Mixed content errors are resolved (no HTTP resources loaded on HTTPS pages)
- HSTS headers are configured
- The SSL certificate covers all subdomains if applicable

## Post-Migration Monitoring (Days 1-90)

### Days 1-7: Critical Monitoring

Check daily:

- **Google Search Console** Coverage report — watch for spikes in "Excluded" or "Error" URLs
- **Google Search Console** indexed page count — should remain stable or increase
- Organic traffic in **GA4** — compare against pre-migration daily averages
- Server logs — monitor for unexpected 404 responses from **Googlebot**

A 10-15% traffic dip in the first week is normal. A 30%+ dip signals a redirect problem, indexation issue, or content loss that needs immediate investigation.

### Days 7-30: Stabilization Monitoring

Check weekly:

- Keyword ranking positions for top 100 keywords (use **SEMrush** or **Ahrefs** rank tracking)
- Organic conversion rates — ensure new page layouts don't degrade conversion
- Crawl stats in **Google Search Console** — verify **Googlebot** is crawling the new site at pre-migration rates
- Redirect chain creation — verify no chains longer than 2 hops exist

### Days 30-90: Recovery Tracking

Check monthly:

- Organic traffic versus pre-migration baseline
- Indexed page count versus pre-migration count
- [Core Web Vitals](/articles/core-web-vitals-engineering.html) field data — CWV metrics update on a 28-day rolling basis, so the new site's scores appear 4-6 weeks post-migration
- Backlink profile — ensure external links are being followed through redirects to the new URLs

Traffic should return to pre-migration levels within 4-8 weeks for well-executed migrations. If organic traffic hasn't recovered by week 12, investigate specific pages and keywords that lost position — the problem is likely redirect accuracy, content parity, or technical issues on those specific pages.

## Domain Change Specifics

### If You're Changing Domains

In **Google Search Console**, use the Change of Address tool. This signals to **Google** that the old domain's equity should transfer to the new domain. The tool is available only after both domains are verified in GSC.

Maintain the old domain and its redirects for a minimum of 12 months. Do not let the old domain expire. Do not remove redirects after a few months. External sites linking to the old domain need those redirects to pass equity to the new domain indefinitely.

### If You're Consolidating Subdomains

Subdomains are treated as separate sites by **Google**. Consolidating blog.example.com into example.com/blog requires the same redirect rigor as a domain change. Map every subdomain URL to its new path and implement 301 redirects.

## Automation and Tooling for Large Migrations

### Scripted Redirect Verification

For migrations involving thousands of URLs, manual redirect verification is impractical. Build automated verification that runs continuously:

```python
import requests
import csv

def verify_redirects(map_file, output_file):
    results = []
    with open(map_file) as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                resp = requests.head(row['old_url'], allow_redirects=False, timeout=10)
                actual_location = resp.headers.get('Location', '')
                status = resp.status_code
                match = actual_location.rstrip('/') == row['new_url'].rstrip('/')
                results.append({
                    'old_url': row['old_url'],
                    'expected': row['new_url'],
                    'actual': actual_location,
                    'status': status,
                    'match': match
                })
            except Exception as e:
                results.append({
                    'old_url': row['old_url'],
                    'expected': row['new_url'],
                    'actual': f'ERROR: {e}',
                    'status': 0,
                    'match': False
                })

    with open(output_file, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=results[0].keys())
        writer.writeheader()
        writer.writerows(results)

    failed = [r for r in results if not r['match']]
    print(f"Verified {len(results)} redirects. {len(failed)} failures.")
    return failed
```

Schedule this verification to run hourly during the first 48 hours post-migration. Redirect failures discovered within hours are far less damaging than failures discovered after a week of **Googlebot** crawling.

### Content Parity Auditing

For large migrations, build a content comparison tool that fetches both the old page (via Wayback Machine or pre-migration snapshot) and the new page, then compares key SEO elements:

- Title tag match
- Meta description match
- H1 match
- Body content word count comparison (flag if new page has 20%+ fewer words)
- Internal link count comparison
- [Structured data](/articles/structured-data-implementation.html) presence

Automated parity checking at scale prevents the most common silent migration failure: pages that technically redirect correctly but serve diminished content at the destination.

### Crawl Monitoring During Migration

Run continuous crawl monitoring during and after the migration. **ContentKing** (now part of **Conductor**) provides real-time monitoring that alerts on changes to titles, meta descriptions, canonical tags, and indexability status. **Lumar** (formerly DeepCrawl) provides scheduled crawl comparisons.

For teams without enterprise monitoring tools, schedule **Screaming Frog** crawls at T+1 hour, T+24 hours, T+72 hours, and T+7 days post-migration. Compare each crawl against the pre-migration baseline. Differences that aren't accounted for in the migration plan require investigation.

## The Migration Communication Plan

### Internal Stakeholders

Brief all teams that touch the website: engineering, content, marketing, customer support, and sales. Each team needs to know: what's changing, when it's changing, what might break temporarily, and who to contact if they discover problems.

Sales teams in particular need advance notice if client-facing URLs change. Nothing damages a sales relationship faster than sending a prospect a link that 404s because the migration wasn't communicated.

### External Communication

If you have API consumers, documentation sites, or partner sites that link to specific URLs, notify them before migration. Provide the redirect map so they can update their links proactively. While redirects preserve functionality, direct links are always more reliable than redirect-dependent links.

For major domain changes, consider a public announcement. A blog post explaining the change, combined with email notification to your subscriber list, reduces confusion and branded search volume disruption.

### Rollback Plan

Every migration needs a documented rollback procedure: what happens if something goes catastrophically wrong? Define the trigger criteria (e.g., organic traffic drops 50% within 24 hours, or redirect verification fails for more than 5% of URLs) and the rollback steps (revert DNS, restore original site, deactivate redirects).

The existence of a rollback plan reduces anxiety during migration execution and enables faster decision-making if problems arise. The goal is never to use it — but knowing it exists changes the team's willingness to execute quickly and confidently.

## Common Migration Failures

### Failure 1: Redirect Loops

URL A redirects to URL B, which redirects back to URL A. Crawlers give up after a few loops and return a crawl error. Test every redirect for circular references.

### Failure 2: Redirect Chains

Old URL redirects to intermediate URL, which redirects to final URL. Each hop dilutes PageRank transfer and adds latency. Maximum two hops. Refactor chains to single-hop redirects.

### Failure 3: Soft 404s

The new site returns a 200 status code for URLs that should 404 (serving a generic "page not found" page with a 200 response). **Google** detects soft 404s and treats them as errors. Ensure non-existent URLs return actual 404 or 410 status codes.

### Failure 4: Lost Hreflang Tags

International sites that lose hreflang annotations during migration see search engines serve the wrong language version to users. Audit hreflang tags across all language variants post-migration.

## Frequently Asked Questions

### How long do I need to keep redirects active?

Indefinitely for domain changes. For URL path changes within the same domain, maintain redirects for a minimum of 12 months. External links pointing to old URLs need redirects to pass equity to the new pages. Removing redirects converts those external links into dead ends.

### Will my rankings drop during migration?

Temporary ranking fluctuations are normal. Expect 5-15% organic traffic variance in weeks 1-4, with recovery to pre-migration levels by weeks 4-8 for well-executed migrations. If rankings haven't stabilized by week 12, investigate redirect accuracy, content parity, and technical issues on affected pages.

### Should I migrate and redesign at the same time?

No. Separate the migration from the redesign by at least 8 weeks. Migrating URLs while simultaneously changing content, layouts, and navigation creates too many variables. If traffic drops post-migration, you can't determine whether the cause was the redirect implementation, the content changes, or the design changes.

### How do I handle pages that don't have an equivalent on the new site?

Redirect to the most relevant parent page or category page. Do not redirect to the homepage — this signals to **Google** that the content no longer exists, and the redirect passes minimal equity. If the content is truly being removed, return a 410 (Gone) status code rather than a 404.

### What's the difference between a 301 and 302 redirect for SEO?

A 301 indicates a permanent move — search engines transfer ranking signals to the destination URL. A 302 indicates a temporary move — search engines may retain the original URL in the index. For site migrations, always use 301 redirects. Using 302s delays or prevents the transfer of SEO equity to the new URLs.

### How do I handle URL parameters during migration?

If the old site used URL parameters for filtering, sorting, or tracking (e.g., `?category=shoes&sort=price`), map the most commonly crawled parameter combinations to their clean equivalents on the new site. Configure **Google Search Console's** URL Parameters tool (if available) to tell **Google** which parameters change page content and which don't. For parameters that don't change content (session IDs, tracking codes), configure the new site to handle them via canonical tags rather than indexing every parameter variation.

### Should we maintain the old site's analytics property or create a new one?

Maintain the existing **Google Analytics 4** property and update the tracking code on the new site. Creating a new property destroys historical comparison data. If you're changing domains, add the new domain to the existing GA4 data stream or create an additional stream within the same property. This preserves year-over-year comparison capability, which is essential for measuring migration impact and long-term organic performance trends.
