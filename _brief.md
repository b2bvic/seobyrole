---
domain:: seobyrole.com
status:: concept
category:: SEO Education
monetization:: course platform + content affiliate
priority:: 3
---

# SEO By Role

## Concept

Most SEO content treats readers as if they all need the same knowledge. A CMO managing SEO spend doesn't need to understand technical crawl budgets. A developer implementing schema doesn't need to know how to pitch SEO value to stakeholders. SEO By Role segments education by job function, delivering only the knowledge each role needs to be effective in their specific context. This isn't beginner vs advanced—it's strategist vs implementer vs evangelist.

## Positioning

**The Gap:** SEO education defaults to "here's how to do SEO" without acknowledging that different roles have different responsibilities, constraints, and success metrics. A founder needs to know if SEO is worth the investment. A content writer needs to balance keyword optimization with readability. A product manager needs to advocate for SEO in a roadmap full of competing priorities.

**The Angle:** Role-specific playbooks that respect the reader's constraints. No fluff about "SEO best practices." Just: here's what you're responsible for, here's how to execute it, here's how to communicate results to the people above and below you.

**Differentiation from SWS Core:** Scale With Search targets agency owners and consultants. SEO By Role targets in-house practitioners who execute SEO inside larger organizations. SWS teaches you to sell and deliver SEO. SEO By Role teaches you to survive and succeed in an environment where SEO is one of fifty priorities.

## Target Audience

**Primary:**
- Mid-level marketing managers at companies with 50-500 employees
- Content strategists/managers tasked with "doing SEO" without formal training
- Product managers whose roadmap includes SEO-dependent features
- Developers who implement SEO but don't understand the why

**Secondary:**
- Founders evaluating whether to invest in SEO
- CMOs managing SEO spend and vendor relationships
- Freelance writers trying to command higher rates by offering "SEO writing"

**Pain Points:**
1. "I'm responsible for SEO but I don't know what I don't know"
2. "SEO tutorials assume I have full control—I have to negotiate for dev resources"
3. "I can't tell if our agency is doing good work or just sending reports"
4. "I need to justify SEO investment to executives who want immediate ROI"
5. "Generic SEO advice doesn't account for my industry/company stage/tech stack"

## Monetization Model

**Primary Revenue:**
- Role-specific mini-courses ($97-$297 each)
- SEO By Role Fundamentals bundle (all roles, $497)
- Team licenses for companies (5-seat minimum, $1,500)

**Secondary Revenue:**
- Affiliate partnerships with SEO tools (Ahrefs, Screaming Frog, etc.) via role-specific tool recommendations
- Sponsored "tool stack" guides for each role
- Upsell to SWS flagship courses for users who outgrow the role-based content

**Lead Generation:**
- Free role-based SEO audit checklists (email gate)
- "SEO Responsibility Matrix" tool (shows what each role should own)
- Weekly newsletter with role-specific case studies

## Content Strategy

### Pillar Topics

1. **SEO for Executives** (repurpose existing SWS content)
   - ROI modeling and budget allocation
   - Evaluating agencies and in-house teams
   - SEO in the context of broader digital strategy
   - Board-level reporting on organic performance

2. **SEO for Product Managers**
   - Building the business case for SEO features
   - Roadmap prioritization frameworks (SEO vs other initiatives)
   - Cross-functional collaboration (dev, design, content)
   - Measuring SEO impact on product adoption

3. **SEO for Developers**
   - Technical SEO implementation (Core Web Vitals, structured data, crawlability)
   - JavaScript frameworks and SEO (React, Next.js, etc.)
   - Automated SEO testing in CI/CD pipelines
   - When to push back on "SEO requests" that hurt UX

4. **SEO for Content Teams**
   - Keyword research that doesn't kill creativity
   - Balancing search intent with brand voice
   - Content-to-conversion optimization
   - Managing content velocity vs content quality

5. **SEO for Founders**
   - SEO vs paid: when to invest in organic
   - Hiring your first SEO (employee vs agency vs freelancer)
   - SEO for pre-product-market-fit companies
   - Avoiding SEO snake oil and false promises

6. **SEO for Marketing Managers**
   - Channel integration (SEO + paid + email + social)
   - Attribution and proving SEO contribution
   - Managing SEO vendors and freelancers
   - Career pathing: specialist vs generalist

### Content Types

- **Playbooks:** Step-by-step guides for role-specific workflows (e.g., "The PM's Guide to Scoping an SEO Project")
- **Decision Trees:** Interactive tools for choosing between options (e.g., "Should You Hire an Agency or Build In-House?")
- **Case Studies:** Real examples of role-specific SEO wins and failures
- **Templates:** Pitch decks, one-pagers, dashboards, OKRs for each role
- **Interviews:** Practitioners explaining how SEO works in their specific role/company
- **Tool Stacks:** Recommended tools for each role (affiliate opportunity)

## Technical Stack

**Hosting:** Vercel or Netlify (static site, fast global CDN)

**CMS:** Notion as backend (Victor already uses it) → publish via Super.so or Notaku (no-code Notion-to-site)
- Alternative: Obsidian Publish (if content lives in vault)
- Alternative 2: Custom Next.js site pulling from markdown (more control, more dev time)

**Course Delivery:** Skool (matches SWS infrastructure) or Podia (easier team licenses)

**Email:** ConvertKit (SWS standard) with role-based segmentation

**Key Integrations:**
- Stripe for payments (team licensing requires customer portal)
- Ahrefs/SEMrush API for dynamic "role-specific keyword opportunities" tool
- Intercom or Drift for live chat (high-intent leads ask role-specific questions)

**Analytics:** Plausible (privacy-focused, no cookie banner) + Stripe revenue analytics

## Competitive Landscape

| Competitor | Strength | Weakness | Our Angle |
|------------|----------|----------|-----------|
| Moz Academy | Established brand, comprehensive | Generic, doesn't segment by role | We're hyper-focused on practitioner context |
| Ahrefs Academy | Free, tool-integrated | Biased toward Ahrefs workflows | Tool-agnostic, role-specific |
| HubSpot Academy | Free certifications, marketing context | Broad marketing focus, SEO is secondary | SEO-first, deeper practitioner knowledge |
| LinkedIn Learning | Corporate L&D budget access | Surface-level, outdated quickly | Practitioner-written, updated quarterly |
| SEO For The Rest Of Us (podcast) | Role-aware positioning | Audio-only, no structured curriculum | We offer structured learning paths |

**Unique Position:** We're the only SEO education platform that acknowledges practitioners operate under constraints (limited dev resources, budget politics, tool restrictions) and teaches around those constraints instead of pretending they don't exist.

## MVP Scope

**Phase 1 (Month 1-2):**
- Static homepage with role selector (6 roles)
- One complete mini-course: SEO for Executives (repurpose existing SWS content)
- One free lead magnet per role (6 checklists)
- Email capture and ConvertKit integration
- Stripe payment for single course purchase

**Phase 2 (Month 3-4):**
- Complete 2 more courses (Product Managers, Developers)
- Bundle pricing and team licenses
- Role-based newsletter (segment by role, send role-specific case studies)
- First affiliate integration (Ahrefs or Screaming Frog)

**Phase 3 (Month 5-6):**
- Complete remaining 3 courses (Content, Founders, Marketing Managers)
- Interactive tools (SEO Responsibility Matrix, ROI calculator)
- Community component (Skool or Discord) for cross-role collaboration
- First corporate team license customer

**Long-term:**
- Certification program (e.g., "Certified SEO Product Manager")
- Cohort-based courses with live Q&A
- Custom corporate training (white-label the content for internal L&D)

## Growth Levers

1. **LinkedIn organic content:** Role-specific posts ("You're a PM. Here's how to deprioritize bad SEO requests without looking like you don't care about growth") → drive to role-specific landing pages

2. **SEO-optimized role content:** Target searches like "SEO for product managers," "technical SEO for developers," "SEO executive dashboard"—low competition, high intent

3. **Tool partnerships:** Co-marketing with Ahrefs, Screaming Frog, Sitebulb—feature in their newsletters, we feature them in role-specific tool guides

4. **SWS audience spillover:** Existing SWS email list gets "refer your in-house clients to SEO By Role" messaging—agency owners send their clients here for training

5. **Corporate L&D sales:** Reach out to VP of Marketing at companies hiring for SEO roles—position as onboarding curriculum

6. **Slack/Discord communities:** Active participation in product management, developer, and marketing communities with role-specific SEO advice

## Risk Factors

**Market Risk:** "Is the market large enough for role-specific SEO education?" Mitigation: Start with the three highest-value roles (Executives, PMs, Developers) and validate before expanding.

**Content Maintenance:** SEO changes fast—role-specific content could become outdated. Mitigation: Build "evergreen principles" courses, not "here's how to use Google Search Console in 2026" tutorials.

**Cannibalization:** Does this compete with SWS flagship courses? Mitigation: SEO By Role is for employees, SWS is for entrepreneurs/consultants. Different audiences, complementary positioning.

**Positioning Confusion:** "Is this beginner or advanced?" Mitigation: It's neither—it's context-specific. A founder might be "advanced" in product but "beginner" in SEO. The role determines the curriculum, not the skill level.

**Team License Complexity:** Corporate sales require demos, invoicing, multi-seat management. Mitigation: Start with individual sales, add team licenses only after validating demand.

## Next Actions

- [x] Create domain brief
- [ ] Audit existing "SEO For Executives" content from SWS—identify what can be repurposed
- [ ] Outline the 6 role-specific course curriculums (one page each: modules, learning outcomes, templates included)
- [ ] Design role-selector homepage wireframe (user picks role → sees role-specific landing page)
- [ ] Write 6 lead magnet checklists (one per role, email gate)
- [ ] Choose tech stack: Notion → Super.so vs Obsidian Publish vs custom Next.js
- [ ] Set up ConvertKit role-based segmentation (tag by role, send role-specific sequences)
- [ ] Draft LinkedIn content calendar (30 role-specific posts, mix of all 6 roles)
- [ ] Identify 10 affiliate tools to feature in role-specific "tool stack" guides
- [ ] Validate demand: run LinkedIn poll "Which role needs SEO training most?" + DM outreach to 20 PMs/devs/executives
