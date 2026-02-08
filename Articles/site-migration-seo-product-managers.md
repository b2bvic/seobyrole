---
title:: Site Migration SEO for Product Managers: Prevent 60% Traffic Drops
description:: Product managers own migration success. Build SEO into sprint planning, coordinate with engineering, and measure post-launch recovery correctly.
focus_keyword:: site migration seo product managers
category:: Product Management
author:: Victor Valentine Romo
date:: 2026.02.08
---

# Site Migration SEO for Product Managers: Prevent 60% Traffic Drops

Your Q1 roadmap includes a platform migration. Engineering estimates 8 weeks. Your SEO manager mentioned "redirect mapping" in passing. You assumed engineering would handle it. Launch day arrives. Traffic drops 65% by day 3. Your CEO asks why organic revenue is down $200K monthly.

Site migrations are product launches where the stakes are retention, not acquisition. Existing traffic is the baseline—your job is preserving it, not growing it. Product managers who treat migrations as engineering-only projects discover, too late, that SEO requirements weren't scoped, tested, or validated.

This guide frames site migration as a product initiative: requirements gathering, sprint planning, launch criteria, and post-launch monitoring. If you're the PM responsible for a migration, this is your playbook.

## Why Product Managers Own Migration SEO

**Misconception**: "The SEO team handles SEO."

**Reality**: SEO teams identify requirements. Engineering implements them. Product managers coordinate, prioritize, and validate. Without PM ownership, requirements fall through the cracks during execution.

**Common failure mode**:
- SEO team provides a redirect mapping spreadsheet (5,000 URLs)
- Engineering says "we'll handle it"
- Engineering implements 80% of redirects, deprioritizes edge cases
- Edge cases include the 20% of pages generating 80% of traffic
- Launch happens, traffic collapses

**PM's role**: Ensure the redirect mapping is (1) complete, (2) tested, (3) deployed correctly, and (4) validated post-launch. Own the outcome, not just the process.

## Pre-Migration: Requirements Gathering (Sprint -4 to -2)

### User Story 1: Redirect Mapping

**As a** search engine crawler
**I want** all old URLs to redirect to equivalent new URLs with 301 status codes
**So that** I can transfer rankings and indexation to the new site structure

**Acceptance criteria**:
- [ ] Every URL in current sitemap has a mapped redirect destination
- [ ] Priority pages (top 20% by traffic) have 1:1 URL matches
- [ ] No redirect chains (old → intermediate → new should be old → new)
- [ ] 301 (permanent) redirects, not 302 (temporary)
- [ ] Redirect mapping spreadsheet reviewed and approved by SEO team

**Definition of Done**:
- Spreadsheet with columns: Old URL, New URL, Priority (P0/P1/P2)
- All P0 and P1 URLs tested on staging environment
- Engineering confirms all redirects implementable within timeline

**Engineering estimate**: 2-3 sprints for 5K+ redirects, depending on implementation method (.htaccess vs. application-level)

### User Story 2: Content Parity

**As a** user
**I want** the same content, features, and information on the new site
**So that** my experience is consistent and I can complete my tasks

**Acceptance criteria**:
- [ ] All high-traffic pages (top 100 by organic sessions) have equivalent content on new site
- [ ] Title tags and meta descriptions preserved or intentionally updated
- [ ] Images, videos, and media migrated or replaced with equivalents
- [ ] Internal linking structure preserved (no orphan pages)
- [ ] Forms, CTAs, and conversion paths functional

**Definition of Done**:
- Content audit spreadsheet comparing old vs. new site (columns: URL, Word Count Old, Word Count New, Delta %)
- QA pass on top 20 pages confirms content equivalency
- SEO team approves content parity

### User Story 3: Technical SEO Configuration

**As a** search engine crawler
**I want** technical SEO elements (sitemaps, robots.txt, canonicals, schema) correctly configured
**So that** I can crawl, index, and rank the new site efficiently

**Acceptance criteria**:
- [ ] XML sitemap generated with new URLs, submitted to GSC
- [ ] robots.txt allows crawling of all indexable pages
- [ ] Canonical tags self-referential (point to the page's own URL)
- [ ] Schema markup (JSON-LD) preserved from old site
- [ ] No accidental noindex tags on indexable pages
- [ ] Mobile-responsive and passes Google's Mobile-Friendly Test
- [ ] HTTPS enforced (if applicable)

**Definition of Done**:
- Staging site passes pre-launch SEO checklist (provided by SEO team)
- GSC setup complete for new domain/structure
- Analytics tracking codes installed and tested

## Sprint Planning: Breaking Down the Migration

### Sprint -4: Discovery and Baseline

**Deliverables**:
- Current site crawl (Screaming Frog export: all URLs, titles, meta descriptions, status codes)
- Google Analytics export: top 200 pages by organic traffic (last 12 months)
- Backlink export (Ahrefs/Semrush): pages with 5+ referring domains
- Redirect mapping spreadsheet (draft)

**Team involvement**:
- SEO team: Runs crawls, exports data, drafts redirect map
- PM: Reviews data, identifies high-risk pages (top traffic + top backlinks)
- Engineering: Reviews redirect map, confirms technical feasibility

**PM checkpoint**: Do we have a complete inventory of the current site? Are there pages we didn't know existed (old campaigns, forgotten subdirectories)?

### Sprint -3: Redirect Mapping Finalization

**Deliverables**:
- Finalized redirect mapping (all URLs mapped)
- Prioritization: P0 (must redirect), P1 (should redirect), P2 (nice-to-have)
- Engineering plan: which method to implement redirects (.htaccess, Nginx config, application-level)

**Team involvement**:
- SEO team: Finalizes mappings, handles edge cases (removed pages, consolidated pages)
- PM: Prioritizes if timeline requires cutting scope (ensure P0/P1 covered)
- Engineering: Implements redirects in staging environment

**PM checkpoint**: Are we confident we've mapped every important page? Did we account for URL parameters, pagination, and filter combinations?

### Sprint -2: Staging Deployment and QA

**Deliverables**:
- Staging site live with redirects implemented
- QA pass on top 50 pages (manually test redirects)
- Pre-launch SEO checklist completed

**Team involvement**:
- Engineering: Deploys staging site, implements redirects
- SEO team: Tests staging site, runs crawl, validates redirects
- QA team: Tests functionality (forms, checkout, user flows)
- PM: Owns checklist completion, blocks launch if critical issues remain

**PM checkpoint**: Have we tested edge cases (mobile, different browsers, various URL patterns)? Is staging a true replica of production?

### Sprint -1: Launch Readiness

**Deliverables**:
- Production deployment plan (timeline, rollback procedure)
- Monitoring dashboard setup (GSC, GA, rank tracker)
- Communication plan (internal stakeholders, customer support)

**Team involvement**:
- Engineering: Prepares production deploy, confirms rollback plan
- SEO team: Sets up post-launch monitoring, prepares triage plan
- PM: Coordinates launch timing, ensures all teams ready

**PM checkpoint**: Do we have a rollback plan if traffic collapses? Are stakeholders aware of expected 10-20% traffic dip in week 1?

### Sprint 0: Launch Week

**Go-live**: Deploy redirects simultaneously with new site. Monitor in real-time.

**Daily standups** (Days 1-5 post-launch):
- Review GSC Coverage report for new errors
- Check GA organic traffic (compare to pre-launch baseline)
- Monitor server logs for 404 spikes
- Check top 20 keyword rankings

**PM role**: Triage issues immediately. If traffic drops >30% by day 3 and doesn't stabilize, investigate:
1. Are redirects live? (Test 20-30 old URLs manually)
2. Is new site indexable? (Check for noindex tags, robots.txt blocks)
3. Are analytics tracking? (Verify GA4 and GSC data flowing)

## Key Metrics for Product Managers

### Leading Indicators (Days 1-7)

**1. Redirect success rate**

**How to measure**: Test 100 random old URLs. Count how many return 301 status codes to correct new URLs.

**Target**: 98%+ success rate

**Red flag**: <90% success rate indicates missing or misconfigured redirects

**2. Indexation errors (GSC Coverage Report)**

**How to measure**: GSC > Coverage > Excluded/Error tabs. Count new 404s, server errors, or noindex pages.

**Target**: <50 new errors in first 7 days

**Red flag**: >500 new errors indicates systemic problem (misconfigured redirects, robots.txt issues, noindex tags)

**3. Crawl rate (GSC Settings > Crawl Stats)**

**How to measure**: GSC > Settings > Crawl Stats. Check daily crawled pages.

**Expected behavior**: Crawl rate increases 20-50% in days 1-3 as Google recrawls redirects

**Red flag**: Crawl rate drops or shows excessive 404s/500s

### Lagging Indicators (Days 7-90)

**4. Organic traffic (Google Analytics)**

**How to measure**: GA4 > Acquisition > Traffic Acquisition > Organic Search sessions

**Expected timeline**:
- Days 1-7: Traffic drops 10-30% (normal recrawl period)
- Days 7-14: Traffic recovers to 85-95% of baseline
- Days 14-30: Traffic returns to 95-100%+ of baseline
- Days 30-90: Traffic resumes growth trajectory

**Red flag**: Traffic still <80% of baseline at day 30

**5. Indexed pages (GSC Coverage Report)**

**How to measure**: GSC > Coverage > Valid pages

**Target**: Return to within 10% of pre-migration indexed page count by day 30

**Red flag**: Indexed pages drop >30% and don't recover by day 30

**6. Keyword rankings (Rank tracker)**

**How to measure**: Track top 50 keywords weekly in Ahrefs, Semrush, or Moz

**Expected behavior**: Rankings fluctuate +/- 3-5 positions in weeks 1-4, stabilize by weeks 6-8

**Red flag**: Top 10 keywords drop out of top 20 and don't recover within 60 days

## Post-Launch: Triage and Optimization (Weeks 1-12)

### Week 1: Emergency Response

**Daily tasks**:
- Morning standup: Review overnight metrics (GSC errors, GA traffic, server logs)
- Fix any new 404s discovered (add missing redirects)
- Respond to customer support tickets (broken links, missing pages)

**PM role**: Prioritize fixes. Not all 404s are equal. A 404 on a page with 5,000 backlinks is critical. A 404 on a 2019 blog post with zero traffic is low priority.

**Expected issues**:
- 50-200 missed redirects (edge cases not in original mapping)
- Broken images or assets due to CDN misconfiguration
- Forms not submitting (engineering oversight)

**Escalation threshold**: If traffic drops >40% by day 5, escalate to executive team. Major issue likely (sitewide noindex, robots.txt block, redirect misconfiguration).

### Week 2-4: Stabilization

**Weekly tasks**:
- Full site recrawl (Screaming Frog) to identify new issues
- Compare indexed page count (GSC) to pre-migration baseline
- Update stakeholders: traffic recovery %, issues resolved, outstanding risks

**PM role**: Own the narrative. If traffic is 85% of baseline at week 2, communicate: "We're tracking to full recovery by week 4. Remaining issues are in the backlog and prioritized."

**Common discoveries**:
- Orphan pages (pages with zero internal links)
- Redirect chains introduced by the migration
- Content missing from migrated pages (engineering oversight)

### Month 2-3: Validation

**Objective**: Confirm full recovery or identify structural problems requiring deeper fixes.

**Monthly review** (with SEO team and engineering lead):
- Traffic: Recovered to 95%+ of baseline?
- Rankings: Top 20 keywords returned to pre-migration positions?
- Indexed pages: Within 10% of pre-migration count?
- Conversions: Organic conversion rate returned to baseline?

**If all metrics recovered**: Migration successful. Document learnings for future migrations.

**If metrics still <90% of baseline**: Deep dive required. Likely issues:
- URL structure change not properly redirected
- Content parity issues (migrated pages have less content than originals)
- Technical SEO regression (slow page speed, broken schema markup)

## Risk Mitigation: Building Safety Nets

### 1. Phased Migration

**Concept**: Migrate one section of the site at a time instead of all at once.

**Example**:
- Week 1: Migrate `/blog` (200 pages)
- Week 3: Migrate `/products` (500 pages)
- Week 5: Migrate `/resources` (100 pages)

**Benefit**: Limits blast radius. If blog migration fails, products remain unaffected.

**Trade-off**: Longer timeline. Users may encounter inconsistent experience (blog on new platform, products on old).

**When to use**: Large sites (5K+ pages), high-risk migrations (domain + platform change simultaneously), risk-averse organizations.

### 2. Rollback Plan

**Concept**: Ability to revert to old site within hours if migration fails catastrophically.

**Requirements**:
- Keep old site live but hidden (accessible via internal URL)
- DNS/CDN configuration allows instant switchback
- Redirect rules can be disabled quickly

**Trigger criteria**: Traffic drops >50% by day 3 with no clear fix path.

**PM role**: Define rollback criteria during planning. "If X happens, we roll back immediately." Get executive buy-in pre-launch.

### 3. Parallel Running

**Concept**: Run old and new sites simultaneously for 1-2 weeks. Gradually shift traffic from old to new.

**Implementation**:
- Week 1: 10% of traffic to new site (via load balancer or CDN routing)
- Week 2: 50% to new site
- Week 3: 100% to new site

**Benefit**: Catch issues at small scale before exposing entire user base.

**Trade-off**: Complex infrastructure setup. Requires engineering sophistication.

**When to use**: Critical sites (e-commerce generating $1M+/month revenue), sites with poor testing coverage.

## Stakeholder Communication

### Pre-Launch Communication (2 weeks before)

**Audience**: Executives, marketing team, customer support

**Message**:
"We're migrating [old site] to [new platform/domain] on [date]. Expected downtime: [none/minimal]. Expected temporary traffic dip: 10-20% in week 1, recovering by week 3. We've tested extensively on staging. Post-launch, we'll monitor 24/7 for issues."

**Goal**: Set expectations. Prevent panic when traffic dips slightly in week 1.

### Launch Day Communication

**Audience**: Internal teams

**Message**:
"Migration live as of [time]. Monitoring in progress. Initial metrics look good. Report any broken links or missing pages to [PM/SEO lead]."

**Goal**: Crowdsource issue detection. Customer support often catches broken links faster than engineering.

### Week 1 Update

**Audience**: Executives

**Message**:
"Migration update: Traffic at [X%] of baseline (expected range: 80-90%). [Y] issues resolved. [Z] issues in progress. Full recovery on track for week 3."

**Goal**: Demonstrate control. Show you're on top of it.

### Month 1 Retrospective

**Audience**: Executives, team

**Message**:
"Migration complete. Traffic recovered to [X%] of baseline. Key learnings: [what went well, what we'd do differently next time]. ROI: avoided $[X] in lost revenue by preventing 60% traffic drop scenario."

**Goal**: Capture learnings. Build case for proper SEO scoping in future migrations.

## Common PM Mistakes

**Treating migration as an engineering-only initiative**: PMs delegate to engineering, assume it's handled. Engineering doesn't understand SEO requirements. Launch fails.

**Not scoping SEO work in sprint planning**: Redirect mapping and testing aren't in Jira. Engineering deprioritizes. Launch happens without redirects.

**Launching Friday afternoon**: Issues discovered Monday. Lost 3 days of recovery time over the weekend.

**Not defining success metrics**: Team doesn't know if migration succeeded or failed. Arguments over "is this normal?" instead of comparing to pre-defined benchmarks.

**Ignoring edge cases**: "We'll redirect the top 80% of pages, the long tail doesn't matter." The long tail includes pages with major backlinks or conversion value.

**No rollback plan**: Traffic collapses, no way to revert quickly. Executives panic.

## FAQ

**How much engineering time should I budget for SEO requirements?**

20-30% of total migration effort. If migration is 8 weeks, budget 1.5-2.5 weeks for SEO-specific work (redirects, testing, configuration).

**Should I hire an agency to handle the migration?**

Agencies can audit and provide recommendations, but your engineering team still implements. Agencies are useful if your internal team lacks SEO expertise. Not a substitute for proper planning.

**What if engineering says redirects aren't feasible?**

Challenge that. Redirects are always feasible—question is cost and complexity. Ask: "What's the alternative?" (Hint: there isn't one. Redirects are non-negotiable.)

**Can I launch without redirects and add them post-launch?**

No. Even 24 hours without redirects causes indexation loss. Google crawls 404s, deindexes pages. Re-adding redirects later doesn't fully recover rankings.

**What if I'm migrating to a platform that doesn't support redirects?**

Some platforms (Wix, Squarespace, Webflow) have limited redirect functionality. Workarounds: (1) Use DNS-level redirects via Cloudflare. (2) Choose a different platform. (3) Accept traffic loss (not recommended).

**How do I convince executives to delay launch for SEO work?**

Quantify risk. "Last migration we didn't do SEO correctly cost us 60% traffic drop = $200K/month revenue loss for 6 months. Delaying 2 weeks to do this right costs $X in engineering time, saves $1.2M in lost revenue."

**What if traffic doesn't recover after 90 days?**

Conduct a post-mortem. Common causes: (1) URL structure changed significantly (Google treats it as a new site). (2) Content quality decreased (migrated pages have less content). (3) Technical SEO issues unresolved (slow speed, poor mobile UX).

**Should I migrate during high-traffic season or low-traffic season?**

Low-traffic if you have seasonality. If you're e-commerce, avoid Q4. If you're B2B, avoid end-of-quarter. The temporary traffic dip hurts less when baseline is low.

Product managers who own migration SEO deliver on-time, on-budget migrations without traffic loss. PMs who delegate and hope engineering "handles it" deliver disaster recovery projects. The only difference is 20 hours of planning and 40 hours of validation. Budget accordingly.