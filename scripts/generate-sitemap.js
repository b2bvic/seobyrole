const fs = require('fs')
const path = require('path')

// Read appData.json using fs instead of import
const appDataPath = path.join(process.cwd(), 'appData.json')
const appData = JSON.parse(fs.readFileSync(appDataPath, 'utf-8'))

function generateSitemap() {
  const baseUrl = 'https://seobyrole.com' // Replace with your actual domain
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      changefreq: 'weekly',
      priority: '1.0'
    }
  ]

  // Generate pages from appData - using the correct structure
  const dynamicPages = []
  
  // appData.content contains the departments
  Object.entries(appData.content).forEach(([deptKey, department]) => {
    // Each department has entry, manager, director levels
    ['entry', 'manager', 'director'].forEach(seniorityKey => {
      if (department[seniorityKey] && department[seniorityKey].basePlaybook) {
        const slug = `${deptKey.toLowerCase()}-${seniorityKey}`
        dynamicPages.push({
          url: `${baseUrl}/playbook/${slug}`,
          changefreq: 'monthly',
          priority: '0.8'
        })
      }
    })
  })

  // Combine all pages
  const allPages = [...staticPages, ...dynamicPages]

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Write sitemap to public directory
  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  console.log(`✅ Sitemap generated with ${allPages.length} URLs`)
  console.log('📍 Location: public/sitemap.xml')
}

generateSitemap() 