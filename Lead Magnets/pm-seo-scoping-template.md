---
domain:: seobyrole.com
type:: lead magnet
target-role:: Product Manager
format:: PDF + Google Doc Template
funnel:: PM Scoping → SEO for Product Managers course
frameworks:: LISEC, Observer Protocol
status:: production-ready
---

# The Product Manager's SEO Scoping Template

## Turn "Improve SEO" Into Sprint-Ready Tickets Developers Won't Hate

---

## INTRODUCTION: THE SCOPING GAP

You're tasked with "improving SEO" but engineering wants actionable tickets, not vague requests.

Without a structured scoping process, SEO projects stall in the backlog while revenue-driving features ship. Your PM knows SEO matters. Leadership approved the initiative. But nothing moves because no one can answer: "What exactly are we building, and how long will it take?"

The issue isn't that SEO is hard to prioritize. The issue is that SEO work is poorly defined.

Developers can't estimate effort for "optimize content" or "fix technical issues." They need acceptance criteria, measurable outcomes, and implementation boundaries. When you can't provide those, SEO gets pushed to "next sprint" indefinitely.

This template solves that problem. It translates SEO outcomes into scoped, sprint-ready tasks with RICE scoring, acceptance criteria, and stakeholder alignment built in.

---

## THE SEO-PRODUCT FIT FRAMEWORK

Before you scope anything, you need to understand how SEO maps to product outcomes.

### SEO Work Falls Into 4 Categories

**1. Performance Optimization**
- Affects: Core Web Vitals, page load speed, mobile experience
- Measurable by: Lighthouse scores, Time to Interactive, Largest Contentful Paint
- Business impact: Improved conversion rates, reduced bounce, better search rankings
- Dev ownership: Frontend engineering, platform/infra teams

**2. Structured Data Implementation**
- Affects: Rich snippets, knowledge panels, SERP feature eligibility
- Measurable by: Schema validation, rich result appearance in Google Search Console
- Business impact: Higher click-through rates from search results
- Dev ownership: Frontend engineering, sometimes backend depending on CMS

**3. Content Architecture**
- Affects: Internal linking, URL structure, crawl efficiency
- Measurable by: Crawl depth, indexed pages, internal link distribution
- Business impact: Better topic coverage in search, more pages ranking
- Dev ownership: Platform/CMS team, sometimes requires backend routing changes

**4. Indexation Control**
- Affects: What Google can crawl, index, and rank
- Measurable by: Indexed page count, canonical coverage, robots.txt compliance
- Business impact: Prevents duplicate content penalties, controls what ranks
- Dev ownership: Platform team, deployment pipeline (for robots.txt)

**How to use this:**

When someone says "we need to improve SEO," ask: "Which category?" Then route it to the right team with the right scoping approach.

---

## SEO SCOPING TEMPLATE (COPY/PASTE FOR JIRA, LINEAR, ASANA)

### Template Structure

Every SEO ticket needs 5 components:

1. **User Story** (Why this matters)
2. **Acceptance Criteria** (How we know it's done)
3. **Technical Scope** (What exactly gets built/changed)
4. **Impact Forecast** (Expected outcome in measurable terms)
5. **Dependencies** (Who else needs to be involved)

---

### TEMPLATE 1: PAGE SPEED OPTIMIZATION

**User Story:**
As a [user/visitor], I need pages to load in under 3 seconds so I don't abandon before seeing content, which improves our organic conversion rate and search rankings.

**Acceptance Criteria:**
- [ ] Lighthouse Performance score ≥ 90 on mobile
- [ ] Largest Contentful Paint (LCP) < 2.5 seconds
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Verified in Google Search Console Core Web Vitals report (28-day rolling average)

**Technical Scope:**
- Lazy-load below-the-fold images using native `loading="lazy"` attribute
- Implement next-gen image formats (WebP with JPG fallback)
- Defer non-critical JavaScript (analytics, chat widgets, A/B testing scripts)
- Inline critical CSS for above-the-fold content
- Enable Brotli compression on text assets (HTML, CSS, JS)

**Impact Forecast:**
- Current avg LCP: 4.2s → Target: 2.3s
- Expected mobile conversion lift: +8-12% based on industry benchmarks
- SEO impact: Improved Core Web Vitals ranking factor (minor boost, not primary driver)

**Dependencies:**
- Design team: Approve WebP conversion for brand assets
- Marketing: Confirm which tracking scripts can be deferred
- DevOps: Enable Brotli on CDN/web server config

**RICE Score:**
- Reach: 100% of organic mobile traffic (~45K monthly users)
- Impact: 2 (moderate – improves UX + rankings)
- Confidence: 80% (well-documented performance improvements)
- Effort: 5 sprint points (2-3 days frontend dev)
- **RICE Total: (45000 × 2 × 0.8) / 5 = 14,400**

**Time Box:** 1 sprint (if dependencies are pre-cleared)

---

### TEMPLATE 2: STRUCTURED DATA IMPLEMENTATION (PRODUCT SCHEMA)

**User Story:**
As a potential customer searching for our products, I need to see rich snippets (price, availability, ratings) in search results so I can evaluate fit before clicking, which increases qualified traffic and reduces bounce rate.

**Acceptance Criteria:**
- [ ] Valid Product schema on all product pages (verified via Google Rich Results Test)
- [ ] Includes: name, image, description, SKU, brand, price, availability, aggregateRating
- [ ] Zero errors in Google Search Console Rich Results report
- [ ] Rich snippets appearing in Search Console Performance report within 14 days

**Technical Scope:**
- Add JSON-LD structured data to product page template
- Pull product data from existing database fields (price, stock status, review aggregates)
- Add schema validation to CI/CD pipeline (prevent regressions on deploy)
- Implement fallback handling for products without reviews (omit `aggregateRating` to avoid warnings)

**Impact Forecast:**
- Expected CTR lift: +15-25% on product pages with rich snippets
- Baseline CTR (no snippet): 3.2% → Target: 4.0%+
- Affects ~400 product pages, ~85K monthly impressions

**Dependencies:**
- Product team: Confirm which fields map to schema properties (SKU format, brand naming)
- Legal/Compliance: Approve displaying price in search results (if regulated industry)

**RICE Score:**
- Reach: 85,000 monthly impressions
- Impact: 3 (high – directly improves CTR and qualified traffic)
- Confidence: 90% (proven impact from rich snippets)
- Effort: 8 sprint points (3-4 days dev + QA)
- **RICE Total: (85000 × 3 × 0.9) / 8 = 28,687**

**Time Box:** 1 sprint

---

### TEMPLATE 3: INTERNAL LINKING ARCHITECTURE

**User Story:**
As a search engine crawler, I need clear pathways to discover all important pages within 3 clicks from the homepage so that valuable content gets indexed and ranked, which increases our search visibility.

**Acceptance Criteria:**
- [ ] All target pages (defined in attached spreadsheet) reachable within 3 clicks from homepage
- [ ] No orphan pages (pages with zero internal links pointing to them)
- [ ] Crawl depth distribution: 80% of pages at depth ≤ 3
- [ ] Verified via Screaming Frog crawl report (before/after comparison)

**Technical Scope:**
- Add contextual links to related content within article bodies (content team work, but requires dev support for CMS enhancements)
- Implement "Related Articles" component on blog template (pulls from taxonomy or manual curation)
- Create automated internal link suggestions in CMS (optional, higher effort)
- Build programmatic breadcrumb navigation tied to URL structure

**Impact Forecast:**
- Current orphan pages: 47 → Target: 0
- Expected indexation improvement: +35-50 pages indexed within 30 days
- Long-tail traffic lift: +10-15% as deeper pages gain ranking eligibility

**Dependencies:**
- Content team: Add contextual links to existing articles (100+ articles, ~2 weeks)
- Design: Approve "Related Articles" component mockups
- Product: Decide if automated link suggestions fit CMS roadmap (defer to Phase 2 if not)

**RICE Score:**
- Reach: Affects 400+ blog pages, ~120K monthly sessions
- Impact: 2 (moderate – improves indexation, not immediate revenue)
- Confidence: 70% (traffic lift less predictable than CTR improvements)
- Effort: 13 sprint points (5-6 days dev + content work)
- **RICE Total: (120000 × 2 × 0.7) / 13 = 12,923**

**Time Box:** 2 sprints (1 sprint dev, 1 sprint content execution)

---

### TEMPLATE 4: CANONICAL TAG IMPLEMENTATION

**User Story:**
As Google's indexing system, I need clear signals about which version of duplicate pages to rank so I don't split ranking authority across URLs, which consolidates SEO value and prevents duplicate content penalties.

**Acceptance Criteria:**
- [ ] All product pages with URL parameters include `rel="canonical"` pointing to clean URL
- [ ] Pagination pages use `rel="canonical"` to self (not to page 1, per Google guidelines)
- [ ] Zero duplicate content warnings in Google Search Console Coverage report
- [ ] Canonical coverage report shows 95%+ "Submitted URL is canonical"

**Technical Scope:**
- Dynamically generate canonical tags in page `<head>` based on URL patterns
- Handle edge cases:
  - Filtered views (e.g., `/products?color=red` → canonical to `/products`)
  - Paginated listings (e.g., `/blog/page/2` → canonical to self, not page 1)
  - Session IDs or tracking parameters (strip before canonical)
- Add canonical validation to automated testing suite

**Impact Forecast:**
- Current duplicate content issues: 230 pages flagged in GSC → Target: <10
- Expected ranking consolidation: Pages with split authority merge to single URL, improving rankings
- Traffic impact: Hard to forecast (prevent ranking dilution rather than create new rankings)

**Dependencies:**
- SEO team: Provide canonical rules matrix (which URL patterns map to which canonical)
- QA: Test across all product filters and pagination scenarios

**RICE Score:**
- Reach: 230 affected pages, ~40K monthly sessions
- Impact: 2 (moderate – prevents ranking loss, doesn't create new rankings)
- Confidence: 85% (well-understood technical fix)
- Effort: 5 sprint points (2-3 days dev)
- **RICE Total: (40000 × 2 × 0.85) / 5 = 13,600**

**Time Box:** 1 sprint

---

### TEMPLATE 5: XML SITEMAP GENERATION

**User Story:**
As Google's crawl scheduler, I need an up-to-date list of all important URLs to crawl so I can efficiently discover new content and recrawl updated pages, which improves indexation speed and search visibility.

**Acceptance Criteria:**
- [ ] XML sitemap auto-generates on content publish/update (no manual sitemap edits)
- [ ] Includes: canonical URLs, last modified date, priority (optional), changefreq (optional)
- [ ] Excludes: noindex pages, admin URLs, duplicate parameter URLs
- [ ] Submitted to Google Search Console and validates with zero errors
- [ ] Sitemap size: <50MB and <50,000 URLs (create sitemap index if exceeding limits)

**Technical Scope:**
- Build sitemap generation script that queries CMS for published pages
- Filter logic: Exclude pages with `noindex` tag, URL parameters, staging environments
- Set `lastmod` based on actual content update timestamp (not server file change time)
- Auto-submit sitemap to Google Search Console API on deploy (optional enhancement)
- Create sitemap index if URL count exceeds 50K

**Impact Forecast:**
- Current sitemap: Manually updated, 3-6 week lag on new content → Target: Real-time on publish
- Expected indexation speed improvement: New pages indexed in 2-3 days vs 2-3 weeks
- Affects all new content: ~80 pages/month

**Dependencies:**
- DevOps: Sitemap hosting location, CDN caching rules (must not cache sitemap)
- SEO team: Priority scoring logic (if using `<priority>` tag)

**RICE Score:**
- Reach: All new content (80 pages/month × 12 = 960 pages/year)
- Impact: 2 (moderate – speeds indexation but doesn't guarantee rankings)
- Confidence: 90% (standard SEO infrastructure)
- Effort: 5 sprint points (2-3 days dev)
- **RICE Total: (960 × 2 × 0.9) / 5 = 345**

**Time Box:** 1 sprint

---

## TECHNICAL SEO IMPACT ASSESSMENT MATRIX

Use this matrix to evaluate whether an SEO request affects product, engineering effort, or both.

| SEO Request | Impact Area | Dev Effort | Product Effort | Priority Tier |
|-------------|-------------|------------|----------------|---------------|
| Fix page speed (LCP, CLS) | User experience + Rankings | High (3-5 days) | Low (approve asset changes) | **Tier 1: Critical** |
| Add structured data | Search appearance (CTR) | Medium (2-4 days) | Low (confirm data mapping) | **Tier 2: High** |
| Implement canonical tags | Prevent ranking dilution | Low (1-3 days) | None | **Tier 2: High** |
| Internal linking changes | Content discoverability | Low (1-2 days for automation) | High (content team work) | **Tier 3: Medium** |
| XML sitemap automation | Indexation speed | Low (2-3 days) | None | **Tier 2: High** |
| URL structure changes | Crawl efficiency + UX | High (5-10 days + migration) | High (redirect planning) | **Tier 1: Critical** (but high risk) |
| Meta description updates | CTR (minor) | None (CMS field update) | Medium (content team) | **Tier 4: Low** (content-led) |
| Robots.txt optimization | Crawl budget allocation | Low (1 day) | None | **Tier 3: Medium** |
| Hreflang tags (multi-region) | International targeting | Medium (3-5 days) | Medium (regional content strategy) | **Tier 2: High** (if multi-region) |
| Image alt text optimization | Accessibility + Image SEO | None (content update) | Medium (content team) | **Tier 4: Low** (accessibility-led) |

**How to use this:**

When an SEO request comes in, map it to this matrix to understand:

1. Does this require dev work or content work?
2. What's the effort-to-impact ratio?
3. Should this be scoped as a sprint task or a content initiative?

---

## CROSS-FUNCTIONAL STAKEHOLDER COMMUNICATION TEMPLATES

### Template 1: Pitching SEO Work to Engineering Leadership

**Subject:** [Sprint Planning] Scoping SEO Work for Q2 Roadmap

**Email Body:**

Hi [Engineering Manager],

I'm scoping SEO initiatives for Q2 and want to align with the engineering roadmap to avoid last-minute requests.

Here's what I'm proposing:

**High-Impact, Low-Effort Wins (Total: 8 sprint points)**
1. Canonical tag implementation → Fixes duplicate content affecting 230 pages
2. XML sitemap automation → Removes manual work from content team, speeds indexation

**Medium-Effort, High-ROI Projects (Total: 13 sprint points)**
3. Structured data for products → Expected +15-25% CTR lift on 400 product pages
4. Page speed optimization → Targeting LCP <2.5s, estimated +8-12% mobile conversion improvement

**Why these matter:**
These aren't "SEO vanity metrics." They directly impact:
- Conversion rates (page speed)
- Qualified traffic (structured data CTR)
- Preventing ranking dilution (canonicals)

**What I need from you:**
- Feasibility check: Does this fit Q2 capacity?
- Effort validation: Do my sprint point estimates align with your team's experience?
- Dependencies: Who else needs to be looped in (DevOps, platform team)?

I've attached detailed scoping docs with acceptance criteria and RICE scoring for prioritization.

Happy to discuss in tomorrow's planning sync.

[Your Name]

---

### Template 2: Communicating SEO Work to Product Stakeholders

**Subject:** SEO Impact Analysis for [Product Feature Launch]

**Email Body:**

Hi [Product Manager],

I reviewed the [Product Feature] launch plan and flagged a few SEO considerations that could affect discoverability post-launch.

**Opportunity:**
If we launch this feature with structured data + internal linking support, we can drive an estimated +20K monthly organic sessions within 90 days (based on search volume for target keywords).

**What's needed:**
1. Add FAQ schema to feature pages (2 sprint points, dev team)
2. Build "Related Features" component for cross-linking (5 sprint points, platform team)
3. Ensure new URLs follow SEO-friendly structure: `/features/[feature-name]` (already in spec ✓)

**Trade-offs:**
- If we skip structured data, we lose rich snippet eligibility → lower CTR from search
- If we skip internal linking, discoverability takes 4-6 months longer (Google has to find pages through external backlinks instead)

**My recommendation:**
Prioritize structured data (high impact, low effort). Defer internal linking to Phase 2 if roadmap is tight.

Want to sync on this before sprint planning?

[Your Name]

---

### Template 3: Managing Content Team Collaboration

**Subject:** [Action Required] Internal Linking Audit – 100 Articles by EOW

**Email Body:**

Hi [Content Team Lead],

We're scoping an internal linking project to improve SEO discoverability. The dev work is scheduled for Sprint 14, but we need content updates to happen in parallel.

**What I need from your team:**

Add 3-5 contextual internal links to existing articles using this criteria:
- Link to related content (use the "Related Topics" spreadsheet I shared)
- Use descriptive anchor text (not "click here")
- Target 100 articles by end of Sprint 13 (before dev work begins)

**Why this matters:**
This eliminates 47 orphan pages that aren't getting indexed. Expected traffic impact: +10-15% long-tail organic growth.

**Resources:**
- [Link to spreadsheet with article assignments + suggested links]
- [Link to internal linking guidelines doc]

Let me know if this timeline works or if we need to adjust scope.

[Your Name]

---

### Template 4: Explaining SEO Delays to Executives

**Subject:** SEO Project Update – Timeline Adjustment

**Email Body:**

Hi [Executive],

Quick update on the SEO initiatives we discussed in last month's roadmap review.

**What's on track:**
- Structured data implementation → Launched last sprint, rich snippets now appearing for 60% of product pages
- Canonical tags → Deployed, duplicate content warnings dropped from 230 to 12

**What's delayed:**
- Page speed optimization → Pushed to Q3 due to frontend framework migration taking priority

**Why the delay:**
The page speed work requires changes to image loading logic, which conflicts with the React 18 migration happening this quarter. Doing both simultaneously creates regression risk.

**Revised timeline:**
- Q2: Complete React migration
- Q3 Sprint 1: Implement lazy loading + WebP conversion (original page speed scope)

**Business impact of delay:**
- We're leaving an estimated +8-12% mobile conversion improvement on the table for 3 additional months
- That's roughly [$X,XXX] in deferred revenue based on current mobile traffic

**Trade-off:**
The React migration unlocks 5 other roadmap items worth more than the SEO delay cost. Net positive decision.

Let me know if you want to re-prioritize or if this makes sense given the bigger picture.

[Your Name]

---

## PRIORITY SCORING FOR SEO VS FEATURE TRADE-OFFS

### RICE Scoring Refresher (SEO Context)

**Reach:** How many users/pages/sessions does this affect?
- Use monthly organic traffic or session counts (not total traffic, just organic)
- For indexation fixes, use page count affected

**Impact:** How much will this improve outcomes?
- 3 = Massive (e.g., fixing site-wide indexation block, structured data with proven CTR lift)
- 2 = Moderate (e.g., page speed improvements, internal linking)
- 1 = Low (e.g., meta description updates, minor schema additions)
- 0.5 = Minimal (e.g., cosmetic SEO tweaks with no measurable impact)

**Confidence:** How sure are you about the impact forecast?
- 100% = Proven pattern (e.g., fixing broken canonicals)
- 80% = Industry benchmarks (e.g., page speed → conversion correlation)
- 50% = Educated guess (e.g., new content strategy with no historical data)

**Effort:** Sprint points (use your team's existing estimation scale)

**Formula:** RICE Score = (Reach × Impact × Confidence) / Effort

---

### Worked Example: SEO vs Product Feature Trade-Off

**Scenario:** You have 21 sprint points available. Two initiatives are competing for the same sprint:

**Option A: Product Feature – Add "Save for Later" Button**
- Reach: 45,000 monthly active users
- Impact: 2 (moderate – improves UX, uncertain conversion impact)
- Confidence: 60% (hypothesis-driven, not validated)
- Effort: 13 sprint points
- **RICE: (45000 × 2 × 0.6) / 13 = 4,154**

**Option B: SEO Initiative – Implement Product Schema**
- Reach: 85,000 monthly impressions on product pages
- Impact: 3 (high – proven CTR lift from rich snippets)
- Confidence: 90% (backed by Google case studies + competitor analysis)
- Effort: 8 sprint points
- **RICE: (85000 × 3 × 0.9) / 8 = 28,687**

**Decision:** SEO initiative scores 6.9x higher. Ship structured data first, then evaluate if remaining points (21 - 8 = 13) justify the product feature.

---

### When RICE Scoring Fails (and What to Do Instead)

RICE breaks down when:

1. **Strategic alignment trumps ROI** (e.g., executive mandate, competitive response)
2. **Dependencies force sequencing** (e.g., can't do internal linking until CMS migration finishes)
3. **Long-term bets don't score well** (e.g., content investments that compound over 12+ months)

**What to do:**

Add a "Strategic Modifier" category:
- **Strategic Priority Tier 1:** Executive mandate, competitive threat, regulatory compliance → Auto-prioritize regardless of RICE
- **Strategic Priority Tier 2:** Unlocks future roadmap items, architectural foundation work → Boost RICE by 1.5x
- **Strategic Priority Tier 3:** Nice-to-have, exploratory, low confidence → Use RICE as-is

---

## QUARTERLY SEO REVIEW FRAMEWORK FOR PRODUCT MANAGERS

### Quarter-End SEO Retrospective (60-Minute Template)

**What to review:**

1. **Shipped SEO Work (15 min)**
   - What launched this quarter?
   - Did it ship on time, delayed, or descoped?
   - If delayed: Why? (Dependencies, scope creep, competing priorities?)

2. **Impact Validation (20 min)**
   - Did forecasted outcomes match reality?
   - Example metrics:
     - Page speed: Did LCP improve as expected?
     - Structured data: Are rich snippets appearing? CTR change?
     - Internal linking: Did orphan pages get indexed?
   - If results missed target: What assumptions were wrong?

3. **Backlog Grooming (15 min)**
   - What SEO work is still waiting?
   - Should it stay in backlog, get re-scoped, or killed?
   - New SEO opportunities discovered this quarter?

4. **Stakeholder Feedback (10 min)**
   - What did engineering say about SEO scoping quality?
   - Did content team hit their internal linking targets?
   - Any exec questions about SEO ROI you couldn't answer?

**Output:** 3 action items for next quarter (1 quick win, 1 high-impact project, 1 process improvement)

---

### SEO Health Metrics to Track (Product Context)

These aren't vanity metrics. These are the numbers that tell you if SEO is working without needing to become an SEO expert.

| Metric | What It Measures | Where to Find It | Good Benchmark |
|--------|------------------|------------------|----------------|
| **Organic Sessions** | Total traffic from Google/Bing search | Google Analytics → Acquisition → Organic Search | Month-over-month growth ≥ 5% |
| **Indexed Pages** | How many pages Google is ranking | Google Search Console → Coverage → Valid | 90%+ of published pages |
| **Core Web Vitals (Mobile)** | Page speed/UX signals | Google Search Console → Experience → Core Web Vitals | >75% URLs in "Good" category |
| **Average CTR (Organic)** | How often searchers click your results | Google Search Console → Performance → Average CTR | >3% (varies by industry) |
| **Crawl Errors** | Pages Google can't access | Google Search Console → Coverage → Errors | <1% of total pages |
| **Rich Snippet Coverage** | Pages with enhanced SERP features | Google Search Console → Enhancements → [Schema Type] | 80%+ valid (if structured data is implemented) |

**How often to check:**
- Weekly: Organic sessions (spot anomalies early)
- Monthly: Indexed pages, CTR, crawl errors
- Quarterly: Core Web Vitals, rich snippet coverage

---

## WHEN TO SAY NO TO SEO REQUESTS

### Red Flags That Signal "This Isn't Worth It"

**1. The request has no measurable outcome**

❌ "Optimize meta descriptions for brand consistency"
✅ "Rewrite meta descriptions for top 50 pages to improve CTR (current avg: 2.1%, target: 3.5%)"

If you can't define success criteria, you can't prioritize it against other work.

---

**2. The effort-to-impact ratio is terrible**

Example: "Manually add alt text to 10,000 images for SEO"

- Effort: 40+ hours of content team work
- Impact: Minimal (Google uses surrounding text + filename to understand images anyway)
- Better alternative: Auto-generate descriptive alt text from product names + context

**When to say no:** Effort exceeds 5 sprint points and impact is <2 on RICE scale, unless it's a compliance requirement (accessibility).

---

**3. It conflicts with product experience**

Example: "Add keyword-rich headers to checkout flow for SEO"

SEO wants: "Buy [Product Category] Online – Fast Shipping"
UX wants: "Complete Your Order"

**When to say no:** If SEO optimization hurts conversion rates or user experience, the net business impact is negative. SEO should never win that trade-off.

**Exception:** If you can A/B test it and prove SEO changes don't hurt UX, then test before committing.

---

**4. It's based on outdated SEO practices**

Red flag phrases:
- "We need 2% keyword density"
- "Add exact-match keywords to every H2"
- "Buy backlinks to improve domain authority"

These are 2012 SEO tactics. Google's algorithm moved on. Your scoping process should too.

**When to say no:** If the SEO request cites "best practices" without linking to current Google documentation or case studies from the last 2 years, push back and ask for proof.

---

**5. The requester can't explain why it matters**

If your SEO stakeholder (agency, consultant, internal team) can't connect the request to a business outcome, they're probably following a checklist without understanding context.

**Good explanation:** "Implementing FAQ schema will make us eligible for featured snippets on 30 high-volume queries, which increases CTR from 3% to 8-12% based on industry benchmarks."

**Bad explanation:** "Google recommends FAQ schema, so we should add it."

**When to say no:** Request a business case before scoping. If they can't provide one, deprioritize.

---

## CALL TO ACTION: FULL SEO FOR PRODUCT MANAGERS PLAYBOOK

This template gives you the scoping process. But scoping is only 20% of the battle.

The other 80%:
- Building the business case so leadership approves SEO work
- Navigating stakeholder conflicts when SEO competes with product priorities
- Measuring impact in a way that connects to revenue, not just rankings
- Managing SEO agencies/consultants when you're not an SEO expert yourself

**The SEO for Product Managers course covers all of it.**

12 weeks. 4 high-leverage SEO plays designed specifically for PMs who don't control content, dev, or budget—but still need to ship SEO results.

You'll get:
- Stakeholder pitch templates (copy/paste for your next planning meeting)
- RICE scoring worksheets pre-filled with SEO benchmarks
- Cross-functional collaboration playbooks (how to work with dev/content/marketing without dependencies stalling you)
- Quarterly SEO review templates (so you can prove impact to leadership)

**Normally $197. Right now: $97.**

[Enroll in SEO for Product Managers →]

---

## APPENDIX: GLOSSARY OF SEO TERMS (FOR NON-SEO STAKEHOLDERS)

When you're scoping SEO work with engineering or explaining it to executives, you'll encounter jargon. Here's what it actually means in product terms.

| SEO Term | What It Actually Means | Why PMs Care |
|----------|------------------------|--------------|
| **Canonical Tag** | Tells Google which version of a duplicate page to rank | Prevents ranking authority from splitting across similar URLs (e.g., product filters, paginated listings) |
| **Core Web Vitals** | Google's page speed + UX metrics (LCP, FID, CLS) | Direct ranking factor + affects conversion rates |
| **Crawl Budget** | How many pages Google will crawl on your site per day | Matters for large sites (10K+ pages); affects indexation speed |
| **Indexed Pages** | Pages Google has stored and can show in search results | If pages aren't indexed, they can't rank (missing revenue opportunity) |
| **Internal Links** | Links from one page on your site to another | Helps Google discover content + distributes ranking authority across pages |
| **JSON-LD** | A code format for structured data | Enables rich snippets (star ratings, prices, FAQs in search results) |
| **LCP (Largest Contentful Paint)** | How long it takes for main content to load | Slow LCP → higher bounce rate + lower rankings |
| **Meta Description** | The preview text under your page title in search results | Affects CTR (whether people click), not rankings directly |
| **Noindex Tag** | Tells Google "don't show this page in search results" | Use for duplicate content, thin pages, or internal tools you don't want ranking |
| **Organic Traffic** | Visitors from unpaid search results (Google, Bing) | Free user acquisition (vs paid ads) |
| **Rich Snippets** | Enhanced search results with extra data (ratings, price, etc.) | Higher CTR → more traffic without ranking higher |
| **Robots.txt** | File that tells Google which pages to crawl or ignore | Prevent wasting crawl budget on unimportant pages (admin, staging, filters) |
| **Schema Markup** | Structured data that helps Google understand page content | Unlocks rich snippets, knowledge panels, SERP features |
| **SERP** | Search Engine Results Page (what you see after searching) | The competitive landscape for organic traffic |
| **Structured Data** | Code that labels content for search engines (products, articles, events) | Makes you eligible for rich results, which improve CTR |
| **XML Sitemap** | A file listing all important URLs on your site | Helps Google discover and index pages faster |

**How to use this:** When an SEO request includes unfamiliar terms, check this glossary first. If the term isn't here, ask the requester to explain it in product language before you scope the work.

---

## PRODUCTION NOTES

**How to use this template:**

1. **Download the Google Doc version** (editable, shareable with your team)
2. **Copy/paste scoping templates directly into Jira, Linear, Asana, or your project management tool**
3. **Use the RICE scoring examples to justify SEO work in sprint planning**
4. **Reference the stakeholder communication templates when pitching SEO to engineering, product, or executives**

**Need the full playbook?**

This template handles scoping. The SEO for Product Managers course handles everything else: prioritization, stakeholder management, impact measurement, and navigating organizational politics when SEO competes with product features.

[Enroll now at $97 →]

---

**License:** This template is free to use, modify, and share. Attribution appreciated but not required.

**Feedback?** Email vic@seobyrole.com with what worked (or didn't) when you used this in your sprint planning.

---

END OF TEMPLATE