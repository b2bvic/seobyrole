#!/usr/bin/env node
/**
 * SEO by Role — Generate Index Pages
 * Reads _articles.json from dist/ and generates:
 * - articles.html (all articles index)
 * - Per-role index pages (if not hand-crafted)
 */

const fs = require('fs');
const path = require('path');
const shared = require('./shared');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const articlesData = JSON.parse(fs.readFileSync(path.join(DIST, '_articles.json'), 'utf-8'));

// --- All Articles page ---
function buildArticlesIndex() {
  const head = shared.buildHead({
    title: 'All Articles',
    description: 'SEO guides tailored to your role. Browse articles for executives, product managers, developers, content teams, founders, and marketing managers.',
    url: `${shared.SITE.url}/articles.html`,
  });

  const cards = articlesData.map(a => {
    const role = shared.getRoleMeta(a.role);
    return `<a href="/articles/${a.slug}.html" class="article-card" data-role="${a.role}">
      <span class="article-role-tag">${role ? role.label : a.role}</span>
      <h3 class="article-title">${a.title}</h3>
      <p class="article-excerpt">${a.description}</p>
    </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head}
${shared.buildJsonLd(shared.websiteJsonLd())}
</head>
<body>
${shared.buildNav()}

<main>
  <div class="container">
    <div class="section">
      <h1>All Articles</h1>
      <p class="text-secondary" style="max-width: 600px; margin-bottom: 2.5rem;">SEO strategies tailored to your role. Each guide addresses the constraints, responsibilities, and success metrics unique to your position.</p>
      <div class="grid-2">
        ${cards}
      </div>
    </div>
  </div>
</main>

${shared.buildFooter()}
${shared.buildNavScript()}
</body>
</html>`;
}

fs.writeFileSync(path.join(DIST, 'articles.html'), buildArticlesIndex());
console.log('Generated: articles.html');

// --- Per-role index pages ---
shared.ROLES.forEach(role => {
  const rolePath = path.join(ROOT, `${role.slug}.html`);
  // Only generate if a hand-crafted page does not exist at root
  if (fs.existsSync(rolePath)) {
    console.log(`Skipping ${role.slug}.html (hand-crafted version exists)`);
    return;
  }

  const roleArticles = articlesData.filter(a => a.role === role.slug);
  const head = shared.buildHead({
    title: `SEO for ${role.label}`,
    description: `${role.sub}. SEO education designed for ${role.label.toLowerCase()} — strategies, frameworks, and guides tailored to your role.`,
    url: `${shared.SITE.url}/${role.slug}.html`,
  });

  const cards = roleArticles.map(a =>
    `<a href="/articles/${a.slug}.html" class="article-card" data-role="${a.role}">
      <h3 class="article-title">${a.title}</h3>
      <p class="article-excerpt">${a.description}</p>
    </a>`
  ).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
${shared.buildJsonLd(shared.breadcrumbJsonLd([
    { name: 'Home', url: shared.SITE.url },
    { name: role.label, url: `${shared.SITE.url}/${role.slug}.html` },
  ]))}
</head>
<body>
${shared.buildNav()}

<main>
  <div class="container">
    <div class="role-hero" data-role="${role.slug}">
      <span class="role-badge">${role.icon} ${role.label}</span>
      <h1>${role.sub}</h1>
      <p class="role-hero-sub">SEO education designed for ${role.label.toLowerCase()}. Strategies, frameworks, and operational guides that respect your constraints and speak your language.</p>
    </div>
    <div class="section">
      <h2>Guides for ${role.label}</h2>
      <div class="grid-2" style="margin-top: 1.5rem;">
        ${cards}
      </div>
    </div>
  </div>
</main>

${shared.buildFooter()}
${shared.buildNavScript()}
</body>
</html>`;

  fs.writeFileSync(path.join(DIST, `${role.slug}.html`), html);
  console.log(`Generated: ${role.slug}.html`);
});

console.log('Index generation complete.');
