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
  // This would be populated from appData.json
  // For now, return empty array since we're using appData directly in components
  return []
}

// Get departments
export function getDepartments() {
  // This would be populated from appData.json
  // For now, return empty array since we're using appData directly in components
  return []
}

// Get core content
export function getCoreContent() {
  return {
    principles: [
      {
        id: 'audience-intent',
        title: 'Understand Your Audience\'s Search Intent',
        description: 'Every role has unique insights into customer language and pain points.'
      },
      {
        id: 'answer-questions',
        title: 'Create Content That Answers Real Questions',
        description: 'Transform internal knowledge into external value.'
      },
      {
        id: 'measure-impact',
        title: 'Measure Impact Beyond Rankings',
        description: 'Define metrics that matter to your department\'s goals.'
      }
    ]
  }
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
function formatTitle(str) {
  const titleMap = {
    'CSuite': 'C-Suite',
    'entry': 'Entry Level',
    'manager': 'Manager Level', 
    'director': 'Director Level'
  }
  return titleMap[str] || str.charAt(0).toUpperCase() + str.slice(1)
}

function generateKeywords(department, role, seniority) {
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

function getDepartmentDescription(department) {
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
  const coreContent = getCoreContent()
  
  return {
    main: [
      { name: 'Home', href: '/', current: false },
      { name: 'All Playbooks', href: '/playbooks', current: false },
      { name: 'Find My Strategy', href: '/questionnaire', current: false },
      { name: 'Core Principles', href: '/core-principles', current: false }
    ],
    departments: departments,
    footer: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' }
    ]
  }
} 