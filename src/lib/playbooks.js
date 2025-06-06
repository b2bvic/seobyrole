// Use require for CommonJS compatibility in Node scripts
let appData;
try {
  // Try ES modules import first (for Next.js)
  appData = require('../../appData.json');
} catch (e) {
  // Fallback for ES modules
  import('../../appData.json', { assert: { type: 'json' } }).then(module => {
    appData = module.default;
  });
}

// Simple slugify function
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/--+/g, '-') // Replace multiple - with single -
    .trim()
}

// Get all playbooks from appData
export function getAllPlaybooks() {
  const playbooks = []
  const { content } = appData
  
  Object.entries(content).forEach(([department, departmentData]) => {
    Object.entries(departmentData).forEach(([seniority, seniorityData]) => {
      if (seniority !== 'introduction' && seniorityData.basePlaybook) {
        const playbook = {
          ...seniorityData.basePlaybook,
          department,
          seniority,
          slug: `${slugify(department)}-${seniority}`,
          departmentIntroduction: departmentData.introduction,
          metaDescription: generateMetaDescription(department, seniority, seniorityData.basePlaybook)
        }
        playbooks.push(playbook)
      }
    })
  })
  
  return playbooks
}

// Generate meta description for playbook
function generateMetaDescription(department, seniority, playbook) {
  const seniorityLabel = formatTitle(seniority)
  const deptLabel = department === 'CSuite' ? 'C-Suite' : department
  
  return `Comprehensive SEO playbook for ${seniorityLabel} ${deptLabel} professionals. ${playbook.focus.substring(0, 100)}... Learn actionable SEO strategies tailored to your role.`
}

// Get departments
export function getDepartments() {
  return Object.keys(appData.content).map(dept => ({
    id: dept,
    name: dept === 'CSuite' ? 'C-Suite' : dept,
    slug: slugify(dept),
    introduction: appData.content[dept].introduction,
    metaDescription: `SEO strategies and playbooks for ${dept === 'CSuite' ? 'C-Suite' : dept} professionals. ${appData.content[dept].introduction.substring(0, 120)}...`
  }))
}

// Get core content
export function getCoreContent() {
  return {
    principles: [
      {
        id: 'audience-intent',
        title: 'Understand Your Audience\'s Search Intent',
        description: 'Every role has unique insights into customer language and pain points.',
        fullContent: 'Understanding search intent is the foundation of effective SEO. Different departments have unique perspectives on customer needs - sales teams hear objections, support teams understand pain points, and product teams know feature requests. By combining these insights, you can create content that precisely matches what your audience is searching for.'
      },
      {
        id: 'answer-questions',
        title: 'Create Content That Answers Real Questions',
        description: 'Transform internal knowledge into external value.',
        fullContent: 'The best SEO content directly answers the questions your customers are asking. Use your team\'s expertise to create comprehensive, authoritative content that provides real value. This approach not only improves rankings but also builds trust and establishes your brand as an industry leader.'
      },
      {
        id: 'measure-impact',
        title: 'Measure Impact Beyond Rankings',
        description: 'Define metrics that matter to your department\'s goals.',
        fullContent: 'While rankings are important, true SEO success is measured by business impact. Sales teams should track qualified leads, product teams should monitor feature adoption, and HR teams should measure candidate quality. Align your SEO metrics with departmental KPIs for meaningful results.'
      }
    ],
    metaDescription: 'Learn the three core SEO principles that drive organic growth across all departments. Transform your team\'s unique insights into sustainable search visibility.'
  }
}

// Get goals from questionnaire
export function getGoals() {
  const goals = appData.questionnaire.questions.q_common_goal.options.map(option => ({
    id: option.value,
    name: option.text,
    slug: slugify(option.text),
    description: getGoalDescription(option.value),
    metaDescription: `Expert strategies for ${option.text.toLowerCase()} through SEO. Learn proven tactics to ${getGoalAction(option.value)} with organic search.`
  }))
  
  return goals
}

// Get goal descriptions
function getGoalDescription(goalId) {
  const descriptions = {
    'IncreaseTraffic': 'Drive more qualified visitors to your website through strategic keyword targeting and content optimization.',
    'ImproveRankings': 'Boost your search engine rankings with technical SEO, quality content, and authoritative backlinks.',
    'GenerateLeads': 'Convert organic traffic into qualified leads with optimized landing pages and compelling calls-to-action.',
    'BrandAwareness': 'Build brand visibility and recognition through strategic content marketing and search optimization.',
    'ContentPerformance': 'Maximize the impact of your content with data-driven optimization and audience-focused strategies.'
  }
  
  return descriptions[goalId] || 'Achieve your SEO goals with proven strategies and tactics.'
}

// Get goal action for meta description
function getGoalAction(goalId) {
  const actions = {
    'IncreaseTraffic': 'drive targeted organic traffic',
    'ImproveRankings': 'achieve top search engine rankings',
    'GenerateLeads': 'generate qualified leads at scale',
    'BrandAwareness': 'build brand visibility and authority',
    'ContentPerformance': 'create high-performing content'
  }
  
  return actions[goalId] || 'achieve your goals'
}

// Get industries/niches from questionnaire
export function getIndustries() {
  const industries = appData.questionnaire.questions.q_common_niche.options.map(option => ({
    id: option.value,
    name: option.text,
    slug: slugify(option.text),
    description: getIndustryDescription(option.value),
    metaDescription: `SEO strategies specifically for ${option.text} businesses. Industry-specific tactics to dominate search results in the ${option.text.toLowerCase()} sector.`
  }))
  
  return industries
}

// Get industry descriptions
function getIndustryDescription(industryId) {
  const descriptions = {
    'Ecommerce': 'Master e-commerce SEO with strategies for product pages, category optimization, and shopping intent keywords.',
    'B2B': 'B2B SEO strategies focused on long sales cycles, decision-maker targeting, and thought leadership content.',
    'Publisher': 'Publishing and media SEO tactics for content velocity, news optimization, and audience engagement.',
    'SaaS': 'SaaS SEO playbook covering product-led growth, feature pages, and comparison content strategies.',
    'Agency': 'Agency SEO strategies for client acquisition, case study optimization, and service page rankings.',
    'Other': 'Flexible SEO strategies adaptable to any industry or business model.'
  }
  
  return descriptions[industryId] || 'Industry-specific SEO strategies for maximum impact.'
}

// Get CMS platforms from questionnaire
export function getCMSPlatforms() {
  const platforms = appData.questionnaire.questions.q_common_cms.options
    .filter(option => option.value !== 'NotApplicable')
    .map(option => ({
      id: option.value,
      name: option.text,
      slug: slugify(option.text),
      description: getCMSDescription(option.value),
      metaDescription: `Complete ${option.text} SEO guide. Platform-specific optimization techniques to maximize your ${option.text} site\'s search visibility.`
    }))
  
  return platforms
}

// Get CMS descriptions
function getCMSDescription(cmsId) {
  const descriptions = {
    'WordPress': 'Comprehensive WordPress SEO including plugin recommendations, theme optimization, and performance tuning.',
    'Shopify': 'Shopify SEO mastery covering product optimization, collection pages, and e-commerce specific strategies.',
    'HubSpotCMS': 'HubSpot CMS SEO guide integrating content strategy with marketing automation and lead generation.',
    'Custom': 'Custom-built website SEO focusing on technical implementation, schema markup, and performance optimization.'
  }
  
  return descriptions[cmsId] || 'Platform-specific SEO optimization strategies.'
}

export function getPlaybookBySlug(slug) {
  const playbooks = getAllPlaybooks()
  return playbooks.find(playbook => playbook.slug === slug)
}

export function getPlaybooksByDepartment(department) {
  const playbooks = getAllPlaybooks()
  return playbooks.filter(playbook => 
    playbook.department.toLowerCase() === department.toLowerCase()
  )
}

// Helper functions
export function formatTitle(str) {
  const titleMap = {
    'CSuite': 'C-Suite',
    'entry': 'Entry Level',
    'manager': 'Manager Level', 
    'director': 'Director Level'
  }
  return titleMap[str] || str.charAt(0).toUpperCase() + str.slice(1)
}

export function generateKeywords(department, role, seniority) {
  const baseKeywords = [
    'SEO strategy',
    'search engine optimization',
    'digital marketing',
    'organic growth',
    'content marketing'
  ]
  
  const roleSpecific = [
    `${department.toLowerCase()} SEO`,
    `SEO for ${department.toLowerCase()}`,
    `${role} level SEO`,
    `${seniority} SEO strategy`,
    `${department.toLowerCase()} marketing`,
    `professional development ${department.toLowerCase()}`
  ]
  
  return [...baseKeywords, ...roleSpecific].join(', ')
}

export function getDepartmentDescription(department) {
  const descriptions = {
    'Sales': 'SEO strategies specifically designed for sales professionals to generate more qualified leads and drive revenue growth.',
    'Marketing': 'Comprehensive SEO playbooks for marketing teams to maximize organic visibility and campaign performance.',
    'Product': 'Product-focused SEO approaches to drive user acquisition, engagement, and feature adoption through search.',
    'Development': 'Technical SEO strategies for developers to build search-friendly applications and websites.',
    'Creative': 'Creative and design-focused SEO tactics to enhance user experience and visual content performance.',
    'HR': 'Human resources SEO strategies for talent acquisition, employer branding, and recruitment optimization.',
    'C-Suite': 'Executive-level SEO strategies for leadership teams to drive organizational growth and competitive advantage.'
  }
  
  return descriptions[department] || `Professional SEO strategies tailored for ${department} teams.`
}

// Generate navigation structure for the site
export function getNavigationStructure() {
  const departments = getDepartments()
  
  return {
    main: [
      { name: 'Home', href: '/', current: false },
      { name: 'All Playbooks', href: '/playbooks', current: false },
      { name: 'Find My Strategy', href: '/questionnaire', current: false },
      { name: 'Core Principles', href: '/core-principles', current: false },
      { name: 'By Department', href: '/departments', current: false },
      { name: 'By Goal', href: '/goals', current: false }
    ],
    departments: departments,
    footer: [
      { name: 'About', href: '/about' },
      { name: 'Resources', href: '/resources' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Sitemap', href: '/sitemap.xml' }
    ]
  }
}

// Get all possible pages for sitemap
export function getAllPages() {
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
  getAllPlaybooks().forEach(playbook => {
    pages.push({ 
      url: `/playbook/${playbook.slug}`, 
      priority: 0.8, 
      changefreq: 'monthly' 
    })
  })
  
  // Add department pages
  getDepartments().forEach(dept => {
    pages.push({ 
      url: `/department/${dept.slug}`, 
      priority: 0.7, 
      changefreq: 'monthly' 
    })
  })
  
  // Add goal pages
  getGoals().forEach(goal => {
    pages.push({ 
      url: `/goal/${goal.slug}`, 
      priority: 0.7, 
      changefreq: 'monthly' 
    })
  })
  
  // Add industry pages
  getIndustries().forEach(industry => {
    pages.push({ 
      url: `/industry/${industry.slug}`, 
      priority: 0.7, 
      changefreq: 'monthly' 
    })
  })
  
  // Add CMS pages
  getCMSPlatforms().forEach(cms => {
    pages.push({ 
      url: `/platform/${cms.slug}`, 
      priority: 0.7, 
      changefreq: 'monthly' 
    })
  })
  
  return pages
} 