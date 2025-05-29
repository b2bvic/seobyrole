-



const fs = require('fs');
const path = require('path');

const appDataPath = path.join(__dirname, 'appData.json');
let appData;
try {
    appData = JSON.parse(fs.readFileSync(appDataPath, 'utf8'));
} catch (e) {
    console.error('Error reading appData.json:', e);
    process.exit(1);
}

function slugify(parts) {
    return parts
        .filter(Boolean)
        .map(p => p.toString().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase())
        .join('-');
}

function collectResults(node, pathParts = [], results = []) {
    if (node && typeof node === 'object') {
        if (node.playbook || node.basePlaybook) {
            results.push({
                pathParts: [...pathParts],
                data: node.playbook || node.basePlaybook
            });
        }
        for (const key in node) {
            if (typeof node[key] === 'object') {
                collectResults(node[key], [...pathParts, key], results);
            }
        }
    }
    return results;
}

const topicalAuthorityPath = path.join(__dirname, '{TA} Topical Authority Lessons-merged.md');
let topicalAuthorityMd = '';
let topicalEntities = [];
let topicalAttributes = [];
let topicalConcepts = [];
if (fs.existsSync(topicalAuthorityPath)) {
    topicalAuthorityMd = fs.readFileSync(topicalAuthorityPath, 'utf8');
    const entityMatches = topicalAuthorityMd.match(/\*\*Central Entity\*\*|Entity[- ]?oriented|entities?/gi) || [];
    const attributeMatches = topicalAuthorityMd.match(/attributes?/gi) || [];
    const conceptMatches = topicalAuthorityMd.match(/Topical Authority|Topical Map|Semantic SEO|Supplementary Content|Macro Semantics|Micro Semantics|Contextual|Relevance|Responsiveness/gi) || [];
    topicalEntities = Array.from(new Set(entityMatches.map(e => e.replace(/\*/g, '').trim())));
    topicalAttributes = Array.from(new Set(attributeMatches.map(a => a.replace(/\*/g, '').trim())));
    topicalConcepts = Array.from(new Set(conceptMatches.map(c => c.replace(/\*/g, '').trim())));
}

const results = collectResults(appData.content);

const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(outputDir, 'index.html'));

const pagePaths = [];

results.forEach(({ pathParts, data }) => {
    const slug = slugify(pathParts);
    const filename = slug + '.html';
    const filePath = path.join(outputDir, filename);
    pagePaths.push(filename);

    const title = data.title || appData.meta.title;
    const description = data.focus || appData.meta.welcomeMessage;
    const canonical = `https://YOUR_DOMAIN/${filename}`;
    const robots = 'index, follow';
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': title,
        'description': description,
        'author': 'The Strategic SEO Playbook',
        'mainEntityOfPage': canonical
    };

    const relatedLinks = results.filter(r => slugify(r.pathParts) !== slug)
        .slice(0, 5)
        .map(r => {
            const relSlug = slugify(r.pathParts);
            const relTitle = (r.data.title || relSlug).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<li><a href="${relSlug}.html" class="text-blue-700 underline">${relTitle}</a></li>`;
        }).join('');
    const supplementarySection = relatedLinks ? `<section class="mt-12"><h2 class="font-heading text-xl mb-2">Related Playbooks</h2><ul>${relatedLinks}</ul></section>` : '';

    const eavTriples = [
        { entity: 'SEO Playbook', attribute: 'Purpose', value: 'Guide professionals in applying advanced SEO and topical authority' },
        { entity: 'SEO Playbook', attribute: 'Audience', value: 'B2B teams and decision makers' },
        { entity: 'SEO Playbook', attribute: 'Central Entity', value: 'SEO Playbook' },
        { entity: 'SEO Playbook', attribute: 'Source Context', value: 'Strategic, role-based, and actionable SEO guidance' }
    ];

    const enrichedDescription = `${description} Central Entity: SEO Playbook. Source Context: Strategic SEO Playbook for B2B. Central Search Intent: How can a ${title} achieve their core goals using SEO? ${topicalTerms ? `This page is semantically enriched for topical authority and entity-oriented SEO: ${topicalTerms}.` : ''}`;
    const enrichedSchema = Object.assign({}, schema, {
        keywords: topicalTerms,
        about: ['SEO Playbook', ...topicalEntities],
        mainEntity: 'SEO Playbook',
        sourceContext: 'Strategic SEO Playbook for B2B',
        searchIntent: `How can a ${title} achieve their core goals using SEO?`,
        eavTriples: eavTriples
    });

    let mainContent = `<h1 class="font-heading text-3xl mb-4">${title}</h1>\n<p class="mb-6">${description}</p>`;
    if (data.executionSteps) {
        mainContent += '<h2 class="font-heading text-2xl mt-8 mb-2">How to Succeed</h2><ol class="mb-6">';
        data.executionSteps.forEach(s => {
            mainContent += `<li class="mb-2"><strong>${s.step}</strong>: ${s.details}</li>`;
        });
        mainContent += '</ol>';
    }
    if (data.keyTakeaway) {
        mainContent += `<div class="mt-10 p-8 brand-blue-bg text-white rounded-lg shadow-xl"><h3 class="font-heading text-2xl font-black mb-3">Key Takeaway</h3><p class="text-lg leading-relaxed">${data.keyTakeaway}</p></div>`;
    }

    let supplementaryContent = '';
    if (supplementarySection) {
        supplementaryContent += `<section class="mt-12">${supplementarySection}<p class="mt-4 text-sm">Explore related strategies and playbooks to expand your expertise and connect your SEO efforts across the entire digital landscape.</p></section>`;
    }

    const pageHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="description" content="${enrichedDescription}">
        <link rel="canonical" href="${canonical}">
        <meta name="robots" content="${robots}">
        <script type="application/ld+json">
            ${JSON.stringify(enrichedSchema)}
        </script>
    </head>
    <body>
        <div class="animate__animated animate__fadeInUp animate__fast">
            ${mainContent}
        </div>
        ${supplementaryContent && `<div class="animate__animated animate__fadeInUp animate__fast">${supplementaryContent.replace(/class="bg-white/g, 'class="bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl')} </div>`}
        
    </body>
    </html>
    `;
    fs.writeFileSync(filePath, pageHtml, 'utf8');
    console.log('Generated:', filename);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pagePaths.map(p => `  <url><loc>https://YOUR_DOMAIN/${p}</loc></url>`).join('\n')}\n</urlset>`;
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap, 'utf8');

const robotsTxt = `User-agent: *\nAllow: /\nSitemap: https://YOUR_DOMAIN/sitemap.xml\n`;
fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt, 'utf8');

if (topicalAuthorityMd) {
    const taHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="robots" content="noindex, nofollow, noarchive, noimageindex, nosnippet">\n<title>Topical Authority Lessons (Internal Reference)</title>\n</head>\n<body>\n<pre>${topicalAuthorityMd.replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;')}</pre>\n</body>\n</html>`;
    fs.writeFileSync(path.join(outputDir, 'topical-authority-lessons.html'), taHtml, 'utf8');
}

console.log('Static page generation complete!');
