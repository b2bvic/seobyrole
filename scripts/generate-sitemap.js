#!/usr/bin/env node
/**
 * SEO by Role — Sitemap Generator
 * Produces dist/sitemap.xml from built HTML files
 */

const fs = require('fs');
const path = require('path');
const shared = require('./shared');

const DIST = path.resolve(__dirname, '..', 'dist');
const BASE = shared.SITE.url;

const today = new Date().toISOString().split('T')[0];

const urls = [];

// Homepage
urls.push({ loc: `${BASE}/`, changefreq: 'weekly', priority: '1.0' });

// Role pages
shared.ROLES.forEach(role => {
  urls.push({ loc: `${BASE}/${role.slug}.html`, changefreq: 'weekly', priority: '0.8' });
});

// Articles index
urls.push({ loc: `${BASE}/articles.html`, changefreq: 'weekly', priority: '0.7' });

// Individual articles
const articlesDir = path.join(DIST, 'articles');
if (fs.existsSync(articlesDir)) {
  fs.readdirSync(articlesDir).filter(f => f.endsWith('.html')).forEach(file => {
    urls.push({ loc: `${BASE}/articles/${file}`, changefreq: 'monthly', priority: '0.6' });
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
console.log(`Sitemap generated: ${urls.length} URLs`);

// Also generate robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml`;

fs.writeFileSync(path.join(DIST, 'robots.txt'), robots);
console.log('robots.txt generated');
