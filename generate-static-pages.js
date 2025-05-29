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
            if (isRelatedBasePlaybook) { // Target is a base playbook
                const relBasePathParts = r.pathParts.slice(0, -1);
                relSlugForTitle = slugify(relBasePathParts);
                if (isBasePlaybook) { // Current page is also a base playbook
                    relHref = `${relSlugForTitle}.html`;
                } else { // Current page is NOT a base playbook (it's in root dist)
                    relHref = `base/${relSlugForTitle}.html`;
                }
            } else { // Target is NOT a base playbook (it's a specific playbook)
                relSlugForTitle = slugify(r.pathParts);
                if (isBasePlaybook) { // Current page IS a base playbook
                    relHref = `../${relSlugForTitle}.html`;
                } else { // Current page is NOT a base playbook
                    relHref = `${relSlugForTitle}.html`;
                }
            }
            const relTitle = (r.data.title || relSlugForTitle).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<li><a href="${relHref}" class="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150">${relTitle}</a></li>`;
        }).join('');
    const supplementarySection = relatedLinks ? `<section class="mt-12"><h2 class="font-heading text-xl mb-2 brand-dark-text">Related Playbooks</h2><ul>${relatedLinks}</ul></section>` : '';

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

    const siteTitle = appData.meta.title || 'SEO Playbook';
    const currentYear = new Date().getFullYear();
    const homeLinkPath = isBasePlaybook ? '../index.html' : 'index.html';

    const headerHtml = `
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <a href="${homeLinkPath}" class="font-heading text-2xl brand-text-blue dark:brand-text-blue-dark hover:opacity-80 transition-opacity">${siteTitle}</a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="${homeLinkPath}" class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Home</a>
                    <button id="theme-toggle" type="button" class="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-700 rounded-lg text-sm p-2.5">
                        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
    `;

    const footerHtml = `
    <footer class="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>&copy; ${currentYear} ${siteTitle}. All rights reserved.</p>
            <p class="mt-1"><a href="${homeLinkPath}" class="hover:underline">Home</a></p>
        </div>
    </footer>
    `;

    const themeToggleScript = `
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        function applyTheme(theme) {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                themeToggleLightIcon.classList.remove('hidden');
                themeToggleDarkIcon.classList.add('hidden');
            } else {
                document.documentElement.classList.remove('dark');
                themeToggleDarkIcon.classList.remove('hidden');
                themeToggleLightIcon.classList.add('hidden');
            }
        }
        const storedTheme = localStorage.getItem('color-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (storedTheme) {
            applyTheme(storedTheme);
        } else {
            applyTheme(systemPrefersDark ? 'dark' : 'light');
        }
        themeToggleBtn.addEventListener('click', function() {
            const currentThemeIsDark = document.documentElement.classList.contains('dark');
            const newTheme = currentThemeIsDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('color-theme', newTheme);
        });
    `;
    
    const updatedStyles = `
        body {
            font-family: 'DM Sans', sans-serif;
            font-weight: 500;
        }
        .font-display { 
            font-family: 'Cruiser', 'Faster One', sans-serif;
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
        .dark .brand-pink-bg { background-color: #EC4899; }
        .dark .brand-blue-bg { background-color: #1E40AF; } /* Darker blue for dark mode bg */
        .dark .brand-light-blue-bg { background-color: #1F2937; } /* Darker slate for light blue bg */
        .dark .brand-text-pink { color: #F472B6; }
        .dark .brand-text-pink-hover:hover { color: #EC4899; }
        .dark .brand-text-blue { color: #60A5FA; } /* Lighter blue for text on dark */
        .dark .brand-text-blue-dark { color: #93C5FD; } /* Even Lighter blue for header title on dark */
        .dark .brand-dark-text { color: #E5E7EB; } /* Lighter gray for dark text on dark */
        .dark .brand-secondary-text { color: #9CA3AF; } /* Lighter gray for secondary text on dark */
        .dark .execution-steps-list { background-color: #1F2937; border-color: #374151; }
        .dark .execution-steps-list li { border-color: #374151; }
        .dark div[class*="bg-slate-50"] { background-color: #1F2937; border-color: #374151; }
        .dark .border-slate-200 { border-color: #374151; }
        .dark .shadow-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1); }
        .dark .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
        .dark .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); }
        .content-section, .question-step { display: none; }
        .content-section.active, .question-step.active { display: block; }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
        .accordion-content.open { max-height: 1000px;  transition: max-height 0.5s ease-in; }
    `;

    const pageHtml = `
    <!DOCTYPE html>
    <html lang="en" class="">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@500&family=Faster+One&display=swap" rel="stylesheet">
        <style>${updatedStyles}</style>
        <meta name="description" content="${enrichedDescription}">
        <link rel="canonical" href="${canonical}">
        <meta name="robots" content="${robots}">
        <script type="application/ld+json">
            ${JSON.stringify(enrichedSchema)}
        </script>
    </head>
    <body class="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col min-h-screen transition-colors duration-300">
        ${headerHtml}
        <main class="flex-grow w-full container mx-auto p-4 md:p-6 lg:p-8 max-w-5xl bg-white dark:bg-slate-900 shadow-xl rounded-lg my-6 md:my-8">
            <div class="animate__animated animate__fadeInUp animate__fast">
                ${mainContent}
            </div>
            ${supplementaryContent && `<div class="animate__animated animate__fadeInUp animate__fast mt-12 border-t border-slate-200 dark:border-slate-700 pt-8">${supplementaryContent.replace(/class="bg-white/g, 'class="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg shadow transition-all duration-300 hover:scale-105 hover:shadow-xl"')}</div>`}
        </main>
        ${footerHtml}
        <script>${themeToggleScript}</script>
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
