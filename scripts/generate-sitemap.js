const fs = require('fs')
const path = require('path')

// Read appData.json
const appDataPath = path.join(process.cwd(), 'appData.json')
const appData = JSON.parse(fs.readFileSync(appDataPath, 'utf-8'))

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

function getAllPages() {
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/playbooks', priority: 0.9, changefreq: 'weekly' },
    { url: '/questionnaire', priority: 0.8, changefreq: 'monthly' },
    { url: '/core-principles', priority: 0.8, changefreq: 'monthly' },
    { url: '/departments', priority: 0.8, changefreq: 'monthly' },
    { url: '/goals', priority: 0.8, changefreq: 'monthly' },
    { url: '/about', priority: 0.6, changefreq: 'monthly' },
    { url: '/resources', priority: 0.7, changefreq: 'weekly' },
    { url: '/contact', priority: 0.5, changefreq: 'yearly' },
    { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
    { url: '/terms', priority: 0.3, changefreq: 'yearly' }
  ]
  
  // Add all playbook pages
  Object.entries(appData.content).forEach(([department, departmentData]) => {
    Object.entries(departmentData).forEach(([seniority, seniorityData]) => {
      if (seniority !== 'introduction' && seniorityData.basePlaybook) {
        const slug = `${slugify(department)}-${seniority}`
        pages.push({ 
          url: `/playbook/${slug}`, 
          priority: 0.8, 
          changefreq: 'monthly' 
        })
      }
    })
  })
  
  // Add department pages
  Object.keys(appData.content).forEach(dept => {
    pages.push({ 
      url: `/department/${slugify(dept)}`, 
      priority: 0.7, 
      changefreq: 'monthly' 
    })
  })
  
  // Add goal pages
  appData.questionnaire.questions.q_common_goal.options.forEach(option => {
    pages.push({ 
      url: `/goal/${slugify(option.text)}`, 
      priority: 0.7, 
      changefreq: 'monthly' 
    })
  })
  
  // Add industry pages
  appData.questionnaire.questions.q_common_niche.options.forEach(option => {
    pages.push({ 
      url: `/industry/${slugify(option.text)}`, 
      priority: 0.7, 
      changefreq: 'monthly' 
    })
  })
  
  // Add CMS platform pages
  appData.questionnaire.questions.q_common_cms.options
    .filter(option => option.value !== 'NotApplicable')
    .forEach(option => {
      pages.push({ 
        url: `/platform/${slugify(option.text)}`, 
        priority: 0.7, 
        changefreq: 'monthly' 
      })
    })
  
  return pages
}

function generateSitemap() {
  const siteUrl = 'https://seobyrole.com'
  const pages = getAllPages()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Write sitemap to public directory
  const publicDir = path.join(process.cwd(), 'public')
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  
  // Also write to dist directory for static export
  const distDir = path.join(process.cwd(), 'dist')
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
  }
  
  console.log(`✅ Sitemap generated with ${pages.length} URLs`)
  console.log(`📍 Location: public/sitemap.xml`)
}

generateSitemap() 