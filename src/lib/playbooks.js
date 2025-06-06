import slugify from '@sindresorhus/slugify'
import appData from '../../appData.json'

// Transform the nested content structure into flat, SEO-friendly pages
export function getAllPlaybooks() {
  const playbooks = []
  
  Object.entries(appData.content).forEach(([department, departmentData]) => {
    // Skip non-department entries
    if (department === 'corePrinciples' || department === 'vision') return
    
    Object.entries(departmentData).forEach(([role, roleData]) => {
      // Skip introduction entries
      if (role === 'introduction') return
      
      Object.entries(roleData).forEach(([seniority, seniorityData]) => {
        if (seniorityData && typeof seniorityData === 'object' && seniorityData.title) {
          const slug = slugify(`${department}-${role}-${seniority}`)
          
          playbooks.push({
            slug,
            title: seniorityData.title,
            department: formatTitle(department),
            role: formatTitle(role),
            seniority: formatTitle(seniority),
            focus: seniorityData.focus,
            actionableTasks: seniorityData.actionableTasks || [],
            executionSteps: seniorityData.executionSteps || [],
            keyTakeaway: seniorityData.keyTakeaway,
            path: `/playbooks/${slug}`,
            // SEO metadata
            description: seniorityData.focus ? seniorityData.focus.substring(0, 160) : '',
            keywords: generateKeywords(department, role, seniority),
            breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Playbooks', url: '/playbooks' },
              { name: formatTitle(department), url: `/playbooks/${slugify(department)}` },
              { name: seniorityData.title, url: `/playbooks/${slug}` }
            ],
            // Content for search indexing
            searchableContent: [
              seniorityData.title,
              seniorityData.focus,
              seniorityData.keyTakeaway,
              ...(seniorityData.actionableTasks || []).map(task => `${task.title} ${task.description}`),
              ...(seniorityData.executionSteps || []).map(step => `${step.step} ${step.details}`)
            ].filter(Boolean).join(' ')
          })
        }
      })
    })
  })
  
  return playbooks
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

export function getDepartments() {
  const playbooks = getAllPlaybooks()
  const departments = [...new Set(playbooks.map(p => p.department))]
  
  return departments.map(dept => ({
    name: dept,
    slug: slugify(dept),
    count: playbooks.filter(p => p.department === dept).length,
    description: getDepartmentDescription(dept),
    path: `/playbooks/${slugify(dept)}`
  }))
}

export function getCoreContent() {
  return {
    corePrinciples: appData.content.corePrinciples,
    vision: appData.content.vision,
    questionnaire: appData.questionnaire
  }
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