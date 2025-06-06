import { getDepartments } from '../lib/playbooks'
import SEOHead from '../components/SEOHead'
import Link from 'next/link'
import { 
  BriefcaseIcon, 
  MegaphoneIcon, 
  BeakerIcon, 
  PaintBrushIcon, 
  CubeIcon, 
  UsersIcon, 
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline'

const departmentIcons = {
  'Sales': BriefcaseIcon,
  'Marketing': MegaphoneIcon,
  'Development': BeakerIcon,
  'Creative': PaintBrushIcon,
  'Product': CubeIcon,
  'HR': UsersIcon,
  'CSuite': BuildingOfficeIcon
}

export default function Departments() {
  const departments = getDepartments()
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SEO Strategies by Department",
    "description": "Explore SEO strategies tailored for each department. From Sales to C-Suite, find role-specific SEO tactics.",
    "url": "https://seobyrole.com/departments",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": departments.length,
      "itemListElement": departments.map((dept, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://seobyrole.com/department/${dept.slug}`,
        "name": dept.name + " SEO Strategies"
      }))
    }
  }
  
  return (
    <>
      <SEOHead
        title="SEO Strategies by Department"
        description="Explore department-specific SEO strategies. Find tailored playbooks for Sales, Marketing, Product, Development, Creative, HR, and C-Suite professionals."
        keywords="department SEO, SEO by department, sales SEO, marketing SEO, product SEO, developer SEO, HR SEO, executive SEO"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              SEO Strategies by Department
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every department has unique insights and opportunities to drive organic growth. Explore specialized SEO strategies for your team.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => {
              const Icon = departmentIcons[department.id]
              return (
                <Link
                  key={department.id}
                  href={`/department/${department.slug}`}
                  className="group relative rounded-2xl bg-gray-50 dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    {department.name}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {department.introduction}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                    Explore {department.name} SEO Strategies
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
          
          <div className="mt-16 bg-sky-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Department-Specific SEO Matters
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Unique Perspectives
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Each department has distinct insights into customer needs, pain points, and search behavior that can inform SEO strategy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Collaborative Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When departments work together on SEO, the combined knowledge creates more comprehensive and effective strategies.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Measurable Results
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Department-specific KPIs ensure SEO efforts align with team goals and contribute to overall business success.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Find Your Personalized Strategy
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Not sure where to start? Take our quick assessment to get a customized SEO playbook for your specific role and experience level.
            </p>
            
            <Link
              href="/questionnaire"
              className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 