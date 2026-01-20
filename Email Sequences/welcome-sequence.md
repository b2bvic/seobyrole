---
domain:: seobyrole.com
type:: email sequence
framework:: Abrasivism + PASAIDA + Observer Protocol
status:: production-ready
audience:: Product Managers
lead-magnet:: PM's SEO Scoping Template
goal:: nurture to "SEO for Product Managers" course ($97 → $197)
---

# Welcome Email Sequence (Product Manager Track)

5-email nurture sequence delivering the PM's SEO Scoping Template and positioning the SEO for Product Managers course.

---

## EMAIL 1: DELIVER LEAD MAGNET + VALIDATE GAP

**Send Timing:** Day 0 (immediately after opt-in)
**PASAIDA Element:** Problem
**Subject Line:** Your SEO Scoping Template (+ why engineering keeps deprioritizing SEO)
**Preview Text:** Most SEO advice assumes you control the entire strategy. You don't.

### Email Body

Here's your PM's SEO Scoping Template: [DOWNLOAD LINK]

Inside, you'll find:
- Pre-filled user stories for 8 common SEO requests (page speed, structured data, internal linking)
- RICE scoring worksheet to compare SEO against roadmap items
- Acceptance criteria developers can actually test against
- Time-boxing recommendations by project size
- Cross-functional checklist (who to loop in, when to loop them in)

Use it in your next sprint planning session. It reduces scoping time from 4 hours to 45 minutes.

---

**Why engineering keeps deprioritizing SEO:**

Most SEO requests land on the backlog as "improve SEO" or "fix technical issues." These aren't tickets. They're vague mandates.

Developers can't estimate effort for "optimize content." They need scoped work: "Reduce LCP from 4.2s to 2.5s by lazy-loading hero images above the fold."

The translation layer is your job. If you can't scope it, it won't ship.

That's the gap this template solves. It translates SEO outcomes into sprint-ready tasks engineering can estimate, execute, and test.

---

**What's next:**

Over the next two weeks, I'll send you 4 more emails showing you what actually works when you're trying to execute SEO inside an organization where you don't control content, dev, or budget.

No generic "how SEO works" tutorials. Just the plays that work when you're navigating roadmap pressure, stakeholder politics, and cross-functional dependencies.

Victor

**CTA:** [Download the template →]

---

## EMAIL 2: TEMPLATE USAGE EXAMPLE

**Send Timing:** Day 3
**PASAIDA Element:** Solution (proof of concept)
**Subject Line:** How to use the scoping template in sprint planning (real example)
**Preview Text:** Watched a PM turn "improve SEO" into 3 shippable tickets in 20 minutes.

### Email Body

Quick example of the scoping template in action.

I watched a PM at a B2B SaaS company use it to break down "improve page speed for SEO" into three sprint-ready tickets:

**Ticket 1:** "Reduce LCP on product pages from 4.8s to 2.5s"
- **User Story:** As a user on mobile, I want the product page hero section to load in under 2.5 seconds so I can evaluate the product without waiting.
- **Acceptance Criteria:** LCP measured via Lighthouse in CI/CD pipeline reports ≤2.5s on simulated 4G connection.
- **Estimated Effort:** 5 story points (lazy-load images, defer non-critical JS)
- **RICE Score:** 8.5 (compared against two other roadmap items, ranked #2)

**Ticket 2:** "Implement JSON-LD structured data for product schema"
- **User Story:** As Google's crawler, I need machine-readable product data so I can display rich snippets in search results.
- **Acceptance Criteria:** Schema validates in Google's Rich Results Test; no errors in Search Console.
- **Estimated Effort:** 3 story points
- **RICE Score:** 6.2 (lower priority, moved to next sprint)

**Ticket 3:** "Fix internal link structure on blog → product pages"
- **User Story:** As a reader discovering us through blog content, I want clear pathways to relevant product pages.
- **Acceptance Criteria:** Every blog post links to 1-2 product pages; link text uses product keywords (no "click here").
- **Estimated Effort:** 2 story points (content team execution, dev review)
- **RICE Score:** 7.1

Result: Engineering estimated all three tickets in one planning session. Two shipped in the next sprint. SEO work stopped stalling in the backlog.

---

**The pattern:**

SEO outcomes → scoped tasks → RICE-scored against roadmap → estimated effort → shipped or deprioritized based on data, not politics.

The template gives you the structure. You just fill in your context.

Next email: the stakeholder communication problem that kills SEO projects even when you scope them correctly.

Victor

**CTA:** [Re-download the template if you haven't used it yet →]

---

## EMAIL 3: STAKEHOLDER COMMUNICATION PROBLEM

**Send Timing:** Day 6
**PASAIDA Element:** Agitation
**Subject Line:** Your exec doesn't care about SEO (and what to say instead)
**Preview Text:** Stop explaining how SEO works. Start explaining what it unlocks.

### Email Body

You scoped the SEO work. Engineering estimated it. It's ready to ship.

Then your exec asks: "Why are we prioritizing this over [revenue-driving feature]?"

You explain keyword rankings, organic traffic, long-term compounding returns.

They nod. They say "sounds good."

Then they deprioritize it the moment something urgent comes up.

---

**The problem:**

You're speaking SEO language to someone who doesn't care about SEO outcomes. They care about revenue, user acquisition cost, product adoption, competitive positioning.

When you pitch SEO using SEO metrics, you're making them do the translation work. They won't. They'll just say "maybe next quarter."

---

**What to say instead:**

Stop talking about rankings. Start talking about cost displacement.

Example reframe for an executive conversation:

**Don't say:** "We should improve our SEO to rank for high-intent keywords in our category."

**Say instead:** "We're paying $47 per click on Google Ads for keywords we could rank for organically. That's $23K/month in acquisition cost we could eliminate over the next 12 months if we prioritize these three technical fixes now."

Same work. Different framing. Completely different reception.

---

**Why this works:**

Executives think in ROI and opportunity cost. Developers think in scoped tickets. Your job as a PM is to translate between both.

The scoping template handles the developer side. The stakeholder pitch templates handle the executive side.

Next email: how other PMs solved the "SEO stuck in the backlog" problem without hiring an SEO team.

Victor

**CTA:** None (pure nurture)

---

## EMAIL 4: PROOF (HOW OTHER PMS SOLVED THIS)

**Send Timing:** Day 9
**PASAIDA Element:** Authority + Social Proof
**Subject Line:** How a PM at [SaaS company] shipped 6 SEO projects in one quarter
**Preview Text:** No agency. No new hires. Just better scoping and stakeholder communication.

### Email Body

Talked to a product manager at a mid-market SaaS company last month. They'd been trying to get SEO prioritized for nine months. Nothing was shipping.

Roadmap was full. Engineering said "we don't have capacity." Leadership said "show us the ROI first."

Classic catch-22. Can't prove ROI without shipping the work. Can't ship the work without proving ROI.

Here's what changed.

---

**What they did:**

1. **Stopped asking for "SEO projects"**
   - Reframed every SEO request as a feature that solved a user problem.
   - Example: "Reduce page load time" became "Improve mobile conversion rate by fixing slow hero image rendering."
   - Engineering stopped seeing it as "SEO work" and started seeing it as product improvement.

2. **RICE-scored SEO against everything else**
   - Used the same prioritization framework the team already trusted.
   - Stopped asking for special treatment. Just showed the numbers.
   - Two SEO tickets scored higher than planned feature work. Both shipped.

3. **Pitched leadership using their language**
   - Presented SEO investment as CAC reduction, not traffic growth.
   - Showed paid search spend on keywords they could rank for organically.
   - Got budget approved in one meeting because the ROI was obvious.

---

**Result:**

Six SEO-related tickets shipped in Q3. Organic traffic up 34% in 90 days. Paid search budget reallocated to experimentation.

No SEO hire. No agency retainer. Just better scoping, better prioritization, better stakeholder communication.

---

**The pattern:**

You don't need an SEO team to execute SEO as a PM. You need frameworks that fit how your organization already works.

That's what I built the "SEO for Product Managers" course around. Not theory. Just the plays that work when you're navigating roadmap politics, resource constraints, and cross-functional dependencies.

Next email: what's inside the course and how it's different from every other SEO resource you've seen.

Victor

**CTA:** None (pure nurture)

---

## EMAIL 5: COURSE INTRODUCTION + OFFER

**Send Timing:** Day 12
**PASAIDA Element:** Incentive + Deadline + Action
**Subject Line:** The Product Manager's SEO Playbook (12 weeks, $97)
**Preview Text:** Not an SEO course. A prioritization, scoping, and stakeholder communication playbook for PMs.

### Email Body

Most SEO courses teach you how to do keyword research, build links, and run technical audits.

You don't need that. You're not going to become an SEO specialist.

You need to know:
- How to scope SEO work so engineering will estimate it
- How to prioritize SEO against a roadmap that's already full
- How to pitch SEO to stakeholders who don't speak SEO
- How to measure impact in product metrics leadership actually cares about

That's what the **SEO for Product Managers** course covers.

---

**What's inside:**

**Week 1-2: What You Actually Control**
- The 5 SEO responsibilities that fall under a PM's scope (and the 10 you should delegate or ignore)
- Authority mapping: where you can act unilaterally vs where you need stakeholder buy-in
- Quick-win audit: the one SEO play you can ship this sprint without approvals

**Week 3-4: Building the Business Case**
- Stakeholder pitch templates (copy/paste for your next exec meeting)
- RICE scoring worksheet for comparing SEO vs roadmap priorities
- ROI modeling that survives "show me the numbers" scrutiny

**Week 5-8: Execution Playbooks**
- 4 high-leverage SEO plays scoped specifically for product managers
- Cross-functional collaboration frameworks (working with dev, content, design without creating dependencies that stall execution)
- When to say no to SEO requests that hurt product experience

**Week 9-12: Measuring and Reporting**
- Dashboards engineering leadership will actually read
- Connecting organic traffic to activation rates and product adoption
- Quarterly retrospectives: what to double down on, what to kill

---

**What's NOT inside:**
- "SEO 101" tutorials on how search engines work
- 47-step technical audits you'll never finish
- Keyword research deep-dives you can delegate to content teams
- Theory without execution context

This is a playbook, not a textbook. It's built for PMs who know SEO matters but don't have time to become SEO experts.

---

**Pricing:**

Normally $197. This week: **$97**.

When you enroll, you get:
- Immediate access to all 12 weeks (no drip, no waiting)
- 6 stakeholder pitch templates (use in your next planning meeting)
- RICE scoring worksheet (prioritize SEO against your roadmap today)
- Execution checklists for 4 high-leverage SEO plays
- Monthly live office hours (starts next week, bring your specific situation and get direct feedback)

**Guarantee:** Go through Week 1-2. If you don't learn something that changes how you approach SEO scoping and prioritization, email me and I'll refund you. No questions.

[Enroll now at $97 →]

Victor

P.S. The $97 price expires Friday at midnight. After that, it goes back to $197. If you've been waiting to decide, now's the time.

**CTA:** [Enroll in SEO for Product Managers - $97 →]

---

## SEQUENCE NOTES

**Segmentation:**
- This sequence is specific to Product Managers who downloaded the PM Scoping Template.
- Parallel sequences exist for other roles (Developers, CMOs, Content Teams, etc.) with role-specific examples and course positioning.

**Voice Calibration:**
- Observer Protocol applied throughout: no sycophancy, no bullet-rhythm defaults, no insight bows.
- Direct, operational tone. Speaks to PMs using their language (sprints, roadmaps, stakeholders, RICE scoring).
- No SEO jargon without immediate translation to PM-relevant outcomes.

**Conversion Mechanics:**
- Emails 1-4 build authority and demonstrate value through the free template.
- Email 5 is the only hard pitch, positioned 12 days after opt-in when trust is established.
- Offer includes time-limited discount ($97 vs $197) and risk-reversal guarantee.
- CTA links placeholder—replace with actual course enrollment URL on deployment.

**Deployment:**
- Trigger: User downloads "PM's SEO Scoping Template" lead magnet.
- Platform: beehiiv, ConvertKit, or similar ESP with automation.
- After sequence completes, subscriber moves to general newsletter list (weekly SEO insights for all roles).
