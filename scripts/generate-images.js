// generate-images.js — Build branded article header images (1200x675, 16:9)
// Design: dark gradient, lime accents, tight layout — SEO by Role brand
// Uses satori (HTML-like → SVG) + @resvg/resvg-js (SVG → PNG)
// Special: reads `role` frontmatter field for category pill color/label

const fs = require('fs');
const path = require('path');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');

const ARTICLES_DIR = path.join(__dirname, '..', 'Articles');
const IMAGES_DIR = path.join(__dirname, '..', 'dist', 'images', 'articles');
const FONTS_DIR = path.join(__dirname, '..', 'fonts');
const SKIP_FILES = ['README.md', '_brief.md', '_content-stack.md'];

const B = {
  lime: '#84cc16',
  slate: '#64748b',
  dark1: '#0a0f0a',
  dark2: '#111a11',
  dark3: '#080d08',
  muted: '#9ca3af',
};

const ROLE_COLORS = {
  'executives':        { color: '#f59e0b', label: 'Executives' },
  'product-managers':  { color: '#3b82f6', label: 'Product Managers' },
  'developers':        { color: '#10b981', label: 'Developers' },
  'content-teams':     { color: '#ec4899', label: 'Content Teams' },
  'founders':          { color: '#6366f1', label: 'Founders' },
  'marketing-managers': { color: '#14b8a6', label: 'Marketing Managers' },
};

const displayBold = fs.readFileSync(path.join(FONTS_DIR, 'PlusJakartaSans-Bold.ttf'));
const displaySemiBold = fs.readFileSync(path.join(FONTS_DIR, 'PlusJakartaSans-SemiBold.ttf'));
const bodyMedium = fs.readFileSync(path.join(FONTS_DIR, 'Karla-Medium.ttf'));
const bodyRegular = fs.readFileSync(path.join(FONTS_DIR, 'Karla-Regular.ttf'));

function parseFrontmatter(content) {
  const meta = {};
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return { meta, body: content };
  for (const line of fmMatch[1].split('\n')) {
    const match = line.match(/^(\w[\w_-]*)\s*::?\s*"?([^"]*)"?\s*$/);
    if (match && match[2].trim()) {
      meta[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body: content.slice(fmMatch[0].length).trim() };
}

function slugify(filename) {
  return filename.replace(/\.md$/, '');
}

function categoryMeta(role) {
  const r = (role || '').toLowerCase().trim();
  if (ROLE_COLORS[r]) return ROLE_COLORS[r];
  // Partial match fallback
  for (const [key, val] of Object.entries(ROLE_COLORS)) {
    if (r.includes(key) || key.includes(r)) return val;
  }
  return { color: B.lime, label: role || 'SEO' };
}

function buildImageTree(title, role) {
  const cm = categoryMeta(role);
  const fontSize = title.length > 70 ? 50 : title.length > 55 ? 56 : title.length > 40 ? 64 : 72;

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(145deg, ${B.dark1} 0%, ${B.dark2} 35%, ${B.dark3} 100%)`,
        fontFamily: 'PlusJakartaSans',
        position: 'relative',
      },
      children: [
        // Lime gradient strip at top
        {
          type: 'div',
          props: {
            style: {
              width: '100%',
              height: '4px',
              background: `linear-gradient(90deg, ${B.lime} 0%, ${B.slate} 40%, ${cm.color} 100%)`,
            },
          },
        },

        // Top bar: logo + nav hints
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 50px 0 50px',
            },
            children: [
              // Logo
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '10px' },
                  children: [
                    // SBR square
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '32px', height: '32px', background: B.lime,
                          borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        },
                        children: [{ type: 'div', props: { style: { fontSize: '10px', fontWeight: 700, color: '#18181b' }, children: 'SBR' } }],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', fontSize: '16px', fontWeight: 700 },
                        children: [
                          { type: 'div', props: { style: { color: '#ffffff' }, children: 'SEO by' } },
                          { type: 'div', props: { style: { color: B.lime, marginLeft: '5px' }, children: 'Role' } },
                        ],
                      },
                    },
                  ],
                },
              },
              // Nav hints
              {
                type: 'div',
                props: {
                  style: { display: 'flex', gap: '20px', fontFamily: 'Karla' },
                  children: ['Executives', 'Product', 'Developers', 'Content'].map(label => ({
                    type: 'div',
                    props: { style: { fontSize: '12px', fontWeight: 500, color: '#6b7280' }, children: label },
                  })),
                },
              },
            ],
          },
        },

        // Main content — vertically centered
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              padding: '0 50px',
              gap: '16px',
            },
            children: [
              // Category pill (role-based)
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center' },
                  children: [{
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: `${cm.color}18`, padding: '5px 14px', borderRadius: '999px',
                      },
                      children: [
                        { type: 'div', props: { style: { width: '7px', height: '7px', background: cm.color, borderRadius: '999px' } } },
                        { type: 'div', props: { style: { fontSize: '12px', fontWeight: 600, color: cm.color, fontFamily: 'PlusJakartaSans', letterSpacing: '0.03em' }, children: cm.label } },
                      ],
                    },
                  }],
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: `${fontSize}px`, fontWeight: 700, color: '#ffffff',
                    lineHeight: 1.15, maxWidth: '950px', letterSpacing: '-0.02em',
                  },
                  children: title,
                },
              },
              // Accent line
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '0px', maxWidth: '400px' },
                  children: [
                    { type: 'div', props: { style: { width: '60px', height: '3px', background: cm.color, borderRadius: '2px' } } },
                    { type: 'div', props: { style: { flex: 1, height: '1px', background: '#374151' } } },
                  ],
                },
              },
            ],
          },
        },

        // Bottom bar
        {
          type: 'div',
          props: {
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 50px', borderTop: '1px solid #1f2937',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: '14px', fontWeight: 600, color: '#6b7280', fontFamily: 'PlusJakartaSans' },
                  children: 'SEO education tailored to your role.',
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '16px' },
                  children: [
                    { type: 'div', props: { style: { fontSize: '12px', color: '#4b5563', fontFamily: 'Karla' }, children: 'seobyrole.com' } },
                    {
                      type: 'div',
                      props: {
                        style: {
                          background: B.lime, color: '#18181b', fontSize: '11px', fontWeight: 600,
                          padding: '6px 14px', borderRadius: '6px', fontFamily: 'PlusJakartaSans',
                        },
                        children: 'Find Your Role',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function generateImage(title, role, slug) {
  const tree = buildImageTree(title, role);
  const svg = await satori(tree, {
    width: 1200, height: 675,
    fonts: [
      { name: 'PlusJakartaSans', data: displayBold, weight: 700, style: 'normal' },
      { name: 'PlusJakartaSans', data: displaySemiBold, weight: 600, style: 'normal' },
      { name: 'Karla', data: bodyMedium, weight: 500, style: 'normal' },
      { name: 'Karla', data: bodyRegular, weight: 400, style: 'normal' },
    ],
  });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const outPath = path.join(IMAGES_DIR, `${slug}.png`);
  fs.writeFileSync(outPath, resvg.render().asPng());
  return outPath;
}

async function main() {
  if (!fs.existsSync(ARTICLES_DIR)) { console.log('No Articles directory found.'); return; }
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') && !SKIP_FILES.includes(f));
  console.log(`Generating ${files.length} article header images...`);
  let generated = 0, skipped = 0;
  for (const file of files) {
    const slug = slugify(file);
    const outPath = path.join(IMAGES_DIR, `${slug}.png`);
    if (fs.existsSync(outPath) && !process.argv.includes('--force')) { skipped++; continue; }
    const { meta } = parseFrontmatter(fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8'));
    try {
      // seobyrole uses `role` frontmatter field instead of `category`
      await generateImage(meta.title || slug.replace(/-/g, ' '), meta.role || meta.category || '', slug);
      generated++;
      if (generated % 25 === 0) console.log(`  ${generated} generated...`);
    } catch (err) { console.error(`  FAIL: ${slug} — ${err.message}`); }
  }
  console.log(`Done. ${generated} generated, ${skipped} skipped.`);
}

main().catch(console.error);
