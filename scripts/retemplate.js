#!/usr/bin/env node
/**
 * SEO by Role — Retemplate
 * Re-applies nav/footer/head to all HTML files in dist/
 * Useful after updating shared components without full rebuild.
 */

const fs = require('fs');
const path = require('path');
const shared = require('./shared');

const DIST = path.resolve(__dirname, '..', 'dist');

function retemplateFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf-8');

  // Replace nav
  html = html.replace(
    /<nav class="mega-nav">[\s\S]*?<\/nav>/,
    shared.buildNav()
  );

  // Replace footer
  html = html.replace(
    /<footer class="site-footer">[\s\S]*?<\/footer>/,
    shared.buildFooter()
  );

  // Replace nav script
  html = html.replace(
    /<script>\n\(function\(\) \{[\s\S]*?<\/script>/,
    shared.buildNavScript()
  );

  fs.writeFileSync(filePath, html);
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.html')) {
      retemplateFile(fullPath);
      console.log(`  Retemplated: ${path.relative(DIST, fullPath)}`);
    }
  }
}

console.log('Retemplating all HTML in dist/...');
walkDir(DIST);
console.log('Retemplate complete.');
