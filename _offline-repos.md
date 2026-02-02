# Domain Status Audit — 2026-02-02

Checked all 13 domains listed in the `sameAs` schema markup in `src/layouts/Base.astro`.

## Online (3)

| Domain | Notes |
|--------|-------|
| scalewithsearch.com | SEO agency site, indexed with multiple pages |
| victorvalentineromo.com | Personal consultant site, 4+ pages indexed |
| comicstripai.com | AI comic generator, homepage indexed |

## Offline / Not Indexed (10)

| Domain | Notes |
|--------|-------|
| aifirstsearch.com | No search index results |
| browserprompt.com | No search index results |
| creatinepedia.com | No search index results |
| polytraffic.com | No search index results |
| tattooremovalnear.com | No search index results |
| organicarbitrage.com | No search index results |
| aipaypercrawl.com | No search index results |
| b2bvic.com | No search index results |
| seobyrole.com | This repo — needs Netlify deployment |
| quickfixseo.com | No search index results |

## Recommendation

Consider removing offline domains from the `sameAs` array in `src/layouts/Base.astro` (lines 31-45) until those sites are live. Invalid `sameAs` references can confuse search engines and dilute entity signals.
