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

function collectPlaybookPaths(node, currentPath = [], collectedPaths = []) {
    if (node && typeof node === 'object') {
        for (const key in node) {
            if (!node.hasOwnProperty(key)) continue;

            const newPath = [...currentPath, key];
            if (key === 'playbook' || key === 'basePlaybook') {
                if (node[key] && typeof node[key] === 'object' && (node[key].title || node[key].focus || node[key].introduction || node[key].actionableTasks || node[key].executionSteps)) {
                    collectedPaths.push({
                        pathParts: newPath, 
                        data: node[key]
                    });
                }
            } else if (typeof node[key] === 'object' && key !== 'meta' && key !== 'questionnaire') {
                collectPlaybookPaths(node[key], newPath, collectedPaths);
            }
        }
    }
    return collectedPaths;
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
const topicalTerms = [...new Set([...topicalEntities, ...topicalAttributes, ...topicalConcepts])].join(', ');

const results = collectPlaybookPaths(appData.content);

const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
const baseOutputDir = path.join(outputDir, 'base');
if (!fs.existsSync(baseOutputDir)) fs.mkdirSync(baseOutputDir);

fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(outputDir, 'index.html'));

const pagePaths = [];

results.forEach(({ pathParts, data }) => {
    let slug;
    let filenameForSitemap;
    let actualFilePath;
    const isBasePlaybook = pathParts[pathParts.length - 1] === 'basePlaybook';

    if (isBasePlaybook) {
        const basePathParts = pathParts.slice(0, -1);
        slug = slugify(basePathParts);
        filenameForSitemap = `base/${slug}.html`;
        actualFilePath = path.join(baseOutputDir, `${slug}.html`);
    } else {
        slug = slugify(pathParts);
        filenameForSitemap = `${slug}.html`;
        actualFilePath = path.join(outputDir, `${slug}.html`);
    }
    pagePaths.push(filenameForSitemap);

    const title = data.title || appData.meta.title;
    const description = data.focus || appData.meta.welcomeMessage;
    const canonical = `https://YOUR_DOMAIN/${filenameForSitemap}`;
    const robots = 'index, follow';
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': title,
        'description': description,
        'author': 'The Strategic SEO Playbook',
        'mainEntityOfPage': canonical
    };

    const relatedLinks = results.filter(r => {
        const currentPathForComparison = isBasePlaybook ? pathParts.slice(0, -1).join('-') : pathParts.join('-');
        const relatedPathForComparison = r.pathParts[r.pathParts.length - 1] === 'basePlaybook' ? r.pathParts.slice(0, -1).join('-') : r.pathParts.join('-');
        return slugify(currentPathForComparison.split('-')) !== slugify(relatedPathForComparison.split('-'));
    })
        .slice(0, 5)
        .map(r => {
            let relHref;
            let relSlugForTitle;
            const isRelatedBasePlaybook = r.pathParts[r.pathParts.length - 1] === 'basePlaybook';
            if (isRelatedBasePlaybook) {
                const relBasePathParts = r.pathParts.slice(0, -1);
                relSlugForTitle = slugify(relBasePathParts);
                relHref = `base/${relSlugForTitle}.html`;
            } else {
                relSlugForTitle = slugify(r.pathParts);
                relHref = `${relSlugForTitle}.html`;
            }
            const relTitle = (r.data.title || relSlugForTitle).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<li><a href="${relHref}" class="text-blue-700 underline">${relTitle}</a></li>`;
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

    let mainContent = '';
    if (data.title) {
        mainContent += `<h1 class="font-heading text-4xl font-black brand-text-blue mb-6">${data.title}</h1>`;
    }
    if (data.introduction) { // General introduction for the playbook itself
        mainContent += `<p class="brand-secondary-text mb-4">${data.introduction}</p>`;
    }
    // Department-specific intro could be added here if available and desired in static pages

    if (data.focus) {
        mainContent += `<div class="mb-6 p-6 brand-light-blue-bg rounded-lg shadow">
                            <h3 class="font-heading text-2xl font-black text-blue-700 mb-2">Primary Focus:</h3>
                            <p class="brand-secondary-text text-base">${data.focus}</p>
                          </div>`;
    }

    if (data.actionableTasks && Array.isArray(data.actionableTasks) && data.actionableTasks.length > 0) {
        mainContent += `<h3 class="font-heading text-2xl font-black text-blue-700 mt-8 mb-4">Actionable Tasks:</h3>`;
        data.actionableTasks.forEach((task) => {
            mainContent += `<div class="mb-4 border border-slate-200 rounded-lg shadow-md p-5 bg-slate-50">
                                <h4 class="font-heading text-lg tracking-wider brand-dark-text mb-2">${task.title}</h4>
                                <p class="brand-secondary-text text-base leading-relaxed">${task.description}</p>
                             </div>`;
        });
    }

    if (data.executionSteps && Array.isArray(data.executionSteps) && data.executionSteps.length > 0) {
        mainContent += '<h3 class="font-heading text-2xl font-black text-blue-700 mt-10 mb-4">Detailed Execution Steps:</h3><ol class="execution-steps-list space-y-5 brand-secondary-text bg-slate-50 p-6 rounded-lg border border-slate-200 shadow">';
        data.executionSteps.forEach(s => {
            mainContent += `<li class="mb-3 pb-3 border-b border-slate-200 last:border-b-0 last:pb-0"><strong>${s.step || s.title}</strong>: ${s.details || s.description}</li>`;
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
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@500&family=Faster+One&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'DM Sans', sans-serif;
                font-weight: 500; 
            }
            .font-display { 
                font-family: 'Cruiser', 'Faster One', sans-serif; /* Fallback to Faster One then generic */
            }
            .font-heading {
                font-family: 'Bebas Neue', sans-serif;
                font-weight: normal; 
                letter-spacing: 0.05em;
            }
            .brand-pink-bg { background-color: #FF69B4; }
            .brand-blue-bg { background-color: #D1E9FF; }
            .brand-light-blue-bg { background-color: #EBF5FF; }
            .brand-text-pink { color: #FF1493; }
            .brand-text-pink-hover:hover { color: #FF69B4; }
            .brand-text-blue { color: #1E3A8A; }
            .brand-dark-text { color: #172554; }
            .brand-secondary-text { color: #475569; }
            .content-section { display: none; } /* For SPA, not directly used by static but good for consistency if reusing JS */
            .content-section.active { display: block; }
            .question-step { display: none; } /* For SPA */
            .question-step.active { display: block; } /* For SPA */
            .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
            .accordion-content.open { max-height: 1000px;  transition: max-height 0.5s ease-in; }
        </style>
        <meta name="description" content="${enrichedDescription}">
        <link rel="canonical" href="${canonical}">
        <meta name="robots" content="${robots}">
        <script type="application/ld+json">
            ${JSON.stringify(enrichedSchema)}
        </script>
    </head>
    <body class="bg-slate-50">
        <div class="container mx-auto p-4 md:p-8 max-w-5xl brand-dark-text bg-white shadow-xl rounded-lg my-8">
            <div class="animate__animated animate__fadeInUp animate__fast">
                ${mainContent}
            </div>
        ${supplementaryContent && `<div class="animate__animated animate__fadeInUp animate__fast mt-12 border-t pt-8">${supplementaryContent.replace(/class="bg-white/g, 'class="bg-slate-50 p-4 rounded-lg shadow transition-all duration-300 hover:scale-105 hover:shadow-xl')} </div>`}
        </div>
    </body>
    </html>
    `;
    fs.writeFileSync(actualFilePath, pageHtml, 'utf8');
    console.log('Generated:', filenameForSitemap);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pagePaths.map(p => `  <url><loc>https://YOUR_DOMAIN/${p}</loc></url>`).join('\n')}\n</urlset>`;
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap, 'utf8');

const robotsTxt = `User-agent: *\nAllow: /\nSitemap: https://YOUR_DOMAIN/sitemap.xml\n`;
fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt, 'utf8');

if (topicalAuthorityMd) {
    const taHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="robots" content="noindex, nofollow, noarchive, noimageindex, nosnippet">\n<title>Topical Authority Lessons (Internal Reference)</title>\n</head>\n<body>\n<pre>${topicalAuthorityMd.replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;')}</pre>\n</body>\n</html>`;
    fs.writeFileSync(path.join(outputDir, 'topical-authority-lessons.html'), taHtml, 'utf8');
}

fs.copyFileSync(path.join(__dirname, 'appData.json'), path.join(outputDir, 'appData.json'));

console.log('Static page generation complete!');
