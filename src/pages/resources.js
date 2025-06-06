import SEOHead from '../components/SEOHead'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  WrenchScrewdriverIcon, 
  AcademicCapIcon,
  BookOpenIcon,
  VideoCameraIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline'

const resources = {
  tools: [
    {
      name: 'Google Search Console',
      description: 'Essential free tool for monitoring search performance and technical issues',
      url: 'https://search.google.com/search-console',
      category: 'Analytics'
    },
    {
      name: 'Google Analytics',
      description: 'Track organic traffic, user behavior, and conversion metrics',
      url: 'https://analytics.google.com',
      category: 'Analytics'
    },
    {
      name: 'Screaming Frog',
      description: 'Technical SEO crawler for auditing websites',
      url: 'https://www.screamingfrog.co.uk/seo-spider/',
      category: 'Technical'
    },
    {
      name: 'PageSpeed Insights',
      description: 'Analyze and optimize page loading performance',
      url: 'https://pagespeed.web.dev/',
      category: 'Performance'
    },
    {
      name: 'Schema Markup Validator',
      description: 'Test and validate structured data implementation',
      url: 'https://validator.schema.org/',
      category: 'Technical'
    },
    {
      name: 'Mobile-Friendly Test',
      description: 'Check mobile usability of your pages',
      url: 'https://search.google.com/test/mobile-friendly',
      category: 'Mobile'
    }
  ],
  guides: [
    {
      title: 'Google SEO Starter Guide',
      description: 'Official guide from Google covering SEO fundamentals',
      type: 'Documentation',
      icon: DocumentTextIcon
    },
    {
      title: 'Technical SEO Checklist',
      description: 'Comprehensive checklist for technical optimization',
      type: 'Checklist',
      icon: WrenchScrewdriverIcon
    },
    {
      title: 'Content Optimization Framework',
      description: 'Step-by-step process for optimizing content',
      type: 'Framework',
      icon: BookOpenIcon
    },
    {
      title: 'Link Building Strategies',
      description: 'White-hat techniques for earning quality backlinks',
      type: 'Strategy Guide',
      icon: AcademicCapIcon
    },
    {
      title: 'Local SEO Playbook',
      description: 'Optimize for local search and Google My Business',
      type: 'Playbook',
      icon: NewspaperIcon
    },
    {
      title: 'SEO Reporting Templates',
      description: 'Templates for tracking and reporting SEO metrics',
      type: 'Templates',
      icon: VideoCameraIcon
    }
  ],
  learning: [
    {
      category: 'Fundamentals',
      resources: [
        'How Search Engines Work',
        'Understanding Search Intent',
        'Keyword Research Basics',
        'On-Page SEO Essentials',
        'Introduction to Technical SEO'
      ]
    },
    {
      category: 'Advanced Topics',
      resources: [
        'Entity SEO and Knowledge Graphs',
        'JavaScript SEO Best Practices',
        'International SEO Strategy',
        'Voice Search Optimization',
        'SEO for AI and ChatGPT'
      ]
    },
    {
      category: 'Industry-Specific',
      resources: [
        'E-commerce SEO Guide',
        'B2B SEO Strategies',
        'SaaS SEO Playbook',
        'Publisher SEO Tactics',
        'Local Business SEO'
      ]
    }
  ]
}

export default function Resources() {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SEO Resources and Tools",
    "description": "Comprehensive collection of SEO tools, guides, and learning resources for every professional.",
    "url": "https://seobyrole.com/resources"
  }
  
  return (
    <>
      <SEOHead
        title="SEO Resources - Tools, Guides & Learning Materials"
        description="Discover essential SEO tools, comprehensive guides, and learning resources to enhance your search optimization skills. Curated for professionals at every level."
        keywords="SEO tools, SEO resources, SEO guides, SEO learning, SEO templates, SEO checklists"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              SEO Resources
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential tools, guides, and learning materials to support your SEO journey
            </p>
          </div>
          
          {/* SEO Tools Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Essential SEO Tools
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.tools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                      {tool.name}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-sky-100 dark:bg-sky-900 px-2.5 py-0.5 text-xs font-medium text-sky-800 dark:text-sky-200">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {tool.description}
                  </p>
                  <div className="mt-3 flex items-center text-sm font-medium text-sky-600 dark:text-sky-400">
                    Visit Tool
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Guides and Templates */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Guides & Templates
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.guides.map((guide, index) => {
                const Icon = guide.icon
                return (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mb-4">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                      {guide.type}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Learning Paths */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Learning Paths
            </h2>
            
            <div className="grid gap-8 lg:grid-cols-3">
              {resources.learning.map((path, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {path.category}
                  </h3>
                  <ul className="space-y-2">
                    {path.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex} className="flex items-start">
                        <span className="text-sky-600 dark:text-sky-400 mr-2">•</span>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {resource}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Additional Resources */}
          <div className="bg-sky-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Stay Updated
            </h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mx-auto mb-3">
                  <NewspaperIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Industry News
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Follow Search Engine Journal, Search Engine Land, and Google's Webmaster Blog
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mx-auto mb-3">
                  <VideoCameraIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Video Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Watch Google Search Central YouTube channel for official updates and tips
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mx-auto mb-3">
                  <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Communities
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Join r/SEO, Twitter SEO community, and LinkedIn SEO groups
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Apply Your Knowledge?
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a personalized SEO strategy tailored to your specific role and experience level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/questionnaire"
                className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Find Your Strategy
              </Link>
              
              <Link
                href="/playbooks"
                className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-800 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Browse Playbooks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 