/**
 * SEO by Role — Shared Components
 * Injects mega nav, footer, head includes, and JSON-LD into all pages.
 * Used by build.js and retemplate.js
 */

const SITE = {
  name: 'SEO by Role',
  url: 'https://seobyrole.com',
  description: 'SEO education tailored to your role. Different strategies for executives, product managers, developers, content teams, founders, and marketing managers.',
  author: 'Victor Valentine Romo',
  org: 'Scale With Search',
};

const ROLES = [
  { slug: 'executives', label: 'Executives', icon: '👔', color: '#f59e0b', tint: '#fef3c7', sub: 'SEO for C-Suite', tagColor: '#92400e' },
  { slug: 'product-managers', label: 'Product Managers', icon: '📋', color: '#3b82f6', tint: '#dbeafe', sub: 'SEO in the Product Roadmap', tagColor: '#1e40af' },
  { slug: 'developers', label: 'Developers', icon: '⚙️', color: '#10b981', tint: '#d1fae5', sub: 'Technical SEO Implementation', tagColor: '#065f46' },
  { slug: 'content-teams', label: 'Content Teams', icon: '✏️', color: '#ec4899', tint: '#fce7f3', sub: 'SEO-Informed Content Strategy', tagColor: '#9d174d' },
  { slug: 'founders', label: 'Founders', icon: '🚀', color: '#6366f1', tint: '#e0e7ff', sub: 'SEO as Growth Lever', tagColor: '#3730a3' },
  { slug: 'marketing-managers', label: 'Marketing Managers', icon: '📊', color: '#14b8a6', tint: '#ccfbf1', sub: 'SEO Within Marketing Ops', tagColor: '#0f766e' },
];

function getRoleMeta(slug) {
  return ROLES.find(r => r.slug === slug) || null;
}

function getRoleLabel(slug) {
  const role = getRoleMeta(slug);
  return role ? role.label : slug;
}

function buildHead({ title, description, url, type = 'website', role = null, article = null }) {
  const canonical = url || SITE.url;
  const pageTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  const desc = description || SITE.description;

  let head = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${pageTitle}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${pageTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${SITE.name}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${pageTitle}">
<meta name="twitter:description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Karla:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/base.css">`;

  // Entity rel="me" links
  head += `
<link rel="me" href="https://scalewithsearch.com">
<link rel="me" href="https://aifirstsearch.com">
<link rel="me" href="https://browserprompt.com">`;

  return head;
}

function buildNav() {
  const dropdownItems = ROLES.map(r =>
    `<a href="/${r.slug}.html" class="dropdown-role-link">
      <span class="role-dot" style="background-color: ${r.color}"></span>
      <span>
        <span class="dropdown-role-name">${r.label}</span>
        <span class="dropdown-role-sub">${r.sub}</span>
      </span>
    </a>`
  ).join('\n');

  return `<nav class="mega-nav">
  <div class="nav-inner">
    <a href="/" class="logo">
      <span class="logo-mark">SBR</span>
      SEO by Role
    </a>
    <ul class="nav-links" id="navLinks">
      <li class="nav-dropdown" id="roleDropdown">
        <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
          By Role
          <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>
        </button>
        <div class="dropdown-panel">
          ${dropdownItems}
        </div>
      </li>
      <li><a href="/articles.html">All Articles</a></li>
      <li><a href="/#faq">FAQ</a></li>
      <li><a href="/#roles" class="nav-cta">Pick Your Role</a></li>
    </ul>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;
}

function buildFooter() {
  const roleLinks = ROLES.map(r =>
    `<li><a href="/${r.slug}.html">${r.label}</a></li>`
  ).join('\n');

  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>About SEO by Role</h4>
        <p>SEO education tailored to your job function. Executives, PMs, developers, content teams, founders, and marketing managers each get strategies designed for their constraints, responsibilities, and success metrics.</p>
        <p style="margin-top: 1rem;">A <a href="https://scalewithsearch.com" rel="me" style="color: #84cc16;">Scale With Search</a> property.</p>
      </div>
      <div class="footer-col">
        <h4>By Role</h4>
        <ul>
          ${roleLinks}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Popular Guides</h4>
        <ul>
          <li><a href="/articles/seo-for-product-managers.html">SEO for Product Managers</a></li>
          <li><a href="/articles/technical-seo-for-developers.html">Technical SEO for Developers</a></li>
          <li><a href="/articles/seo-for-founders-seo-vs-paid.html">SEO vs Paid for Founders</a></li>
          <li><a href="/articles/seo-responsibility-matrix.html">SEO Responsibility Matrix</a></li>
          <li><a href="/articles/how-to-audit-seo-agency.html">How to Audit an SEO Agency</a></li>
          <li><a href="/articles/seo-for-cmos-managing-seo-spend.html">SEO Spend for CMOs</a></li>
          <li><a href="/articles/seo-for-content-teams-keyword-research.html">Keyword Research for Content Teams</a></li>
          <li><a href="/articles/seo-forecasting-executive-scrutiny.html">SEO Forecasting</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>From Scale With Search</h4>
        <ul>
          <li><a href="https://scalewithsearch.com" rel="me">Scale With Search</a></li>
          <li><a href="https://aifirstsearch.com" rel="me">AI First Search</a></li>
          <li><a href="https://browserprompt.com" rel="me">Browser Prompt</a></li>
          <li><a href="https://seobyrole.com" rel="me">SEO by Role</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} SEO by Role. All rights reserved.</span>
      <div class="entity-links">
        <a href="/sitemap.xml">Sitemap</a>
        <a href="/articles.html">Articles</a>
      </div>
    </div>
  </div>
</footer>`;
}

function buildNavScript() {
  return `<script>
(function() {
  // Role dropdown toggle
  var dd = document.getElementById('roleDropdown');
  if (dd) {
    var trigger = dd.querySelector('.nav-dropdown-trigger');
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      dd.classList.toggle('open');
      trigger.setAttribute('aria-expanded', dd.classList.contains('open'));
    });
    document.addEventListener('click', function(e) {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  // Mobile toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
    });
  }
  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(el) { el.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });
})();
</script>`;
}

function buildJsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 0)}</script>`;
}

function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      '@type': 'Organization',
      name: SITE.org,
      url: 'https://scalewithsearch.com',
    },
  };
}

function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.org,
    url: 'https://scalewithsearch.com',
    sameAs: [
      'https://seobyrole.com',
      'https://aifirstsearch.com',
      'https://browserprompt.com',
    ],
  };
}

function articleJsonLd({ title, description, url, datePublished, author }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    author: { '@type': 'Person', name: author || SITE.author },
    publisher: { '@type': 'Organization', name: SITE.org, url: 'https://scalewithsearch.com' },
  };
}

function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

module.exports = {
  SITE,
  ROLES,
  getRoleMeta,
  getRoleLabel,
  buildHead,
  buildNav,
  buildFooter,
  buildNavScript,
  buildJsonLd,
  websiteJsonLd,
  organizationJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
};
