#!/usr/bin/env node
/**
 * SEO by Role — Build Pipeline
 * Converts Articles/*.md to dist/articles/*.html
 * Copies static pages to dist/
 * Generates article index, role indexes, sitemap
 */

const fs = require('fs');
const path = require('path');
const { parseFrontmatter, markdownToHtml } = require('./md-to-html');
const shared = require('./shared');

const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'Articles');
const DIST = path.join(ROOT, 'dist');

// Ensure dist directories
fs.mkdirSync(path.join(DIST, 'articles'), { recursive: true });

// Copy base.css
fs.copyFileSync(path.join(ROOT, 'base.css'), path.join(DIST, 'base.css'));

// --- Parse all articles ---
function loadArticles() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    const { meta, body } = parseFrontmatter(raw);
    const slug = file.replace('.md', '');
    const htmlBody = markdownToHtml(body);
    return { slug, meta, htmlBody, file };
  });
}

const articles = loadArticles();
console.log(`Parsed ${articles.length} articles`);

// --- Build article pages ---
function buildArticlePage(article) {
  const { slug, meta, htmlBody } = article;
  const role = meta.role || 'executives';
  const roleMeta = shared.getRoleMeta(role);
  const url = `${shared.SITE.url}/articles/${slug}.html`;

  const breadcrumbs = [
    { name: 'Home', url: shared.SITE.url },
    { name: roleMeta ? roleMeta.label : 'Articles', url: roleMeta ? `${shared.SITE.url}/${role}.html` : `${shared.SITE.url}/articles.html` },
    { name: meta.title, url },
  ];

  const head = shared.buildHead({
    title: meta.title,
    description: meta.description || '',
    url,
    type: 'article',
    role,
  });

  const jsonLdBlocks = [
    shared.buildJsonLd(shared.articleJsonLd({
      title: meta.title,
      description: meta.description || '',
      url,
      datePublished: meta.date ? meta.date.replace(/\./g, '-') : '2026-01-19',
      author: meta.author,
    })),
    shared.buildJsonLd(shared.breadcrumbJsonLd(breadcrumbs)),
  ];

  const breadcrumbHtml = `<div class="breadcrumb">
    <a href="/">Home</a>
    <span class="sep">/</span>
    ${roleMeta ? `<a href="/${role}.html">${roleMeta.label}</a><span class="sep">/</span>` : ''}
    <span>${meta.title}</span>
  </div>`;

  const roleTag = roleMeta
    ? `<span class="article-role-tag" style="background-color: ${roleMeta.tint}; color: ${roleMeta.tagColor};">${roleMeta.label}</span>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head}
${jsonLdBlocks.join('\n')}
</head>
<body>
${shared.buildNav()}

<main>
  <div class="container-narrow">
    ${breadcrumbHtml}
    <div class="article-header">
      ${roleTag}
      <h1>${meta.title}</h1>
      <div class="article-meta">
        <span>By ${meta.author || shared.SITE.author}</span>
        <span>&middot;</span>
        <span>${meta.date || ''}</span>
      </div>
    </div>
    <div class="article-content">
      ${htmlBody}
    </div>
  </div>
</main>

${shared.buildFooter()}
${shared.buildNavScript()}
</body>
</html>`;
}

articles.forEach(article => {
  const html = buildArticlePage(article);
  const outPath = path.join(DIST, 'articles', `${article.slug}.html`);
  fs.writeFileSync(outPath, html);
  console.log(`  Built: articles/${article.slug}.html`);
});

// --- Copy static HTML pages ---
function copyStaticPages() {
  const staticPages = ['index.html', 'articles.html',
    'executives.html', 'product-managers.html', 'developers.html',
    'content-teams.html', 'founders.html', 'marketing-managers.html'
  ];

  staticPages.forEach(page => {
    const src = path.join(ROOT, page);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(DIST, page));
      console.log(`  Copied: ${page}`);
    }
  });
}

copyStaticPages();

// --- Generate articles index data (for generate-indexes.js) ---
const articlesData = articles.map(a => ({
  slug: a.slug,
  title: a.meta.title,
  description: a.meta.description || '',
  role: a.meta.role || 'executives',
  date: a.meta.date || '',
  author: a.meta.author || shared.SITE.author,
}));

fs.writeFileSync(
  path.join(DIST, '_articles.json'),
  JSON.stringify(articlesData, null, 2)
);

console.log(`\nBuild complete. ${articles.length} articles, output in dist/`);
