import { getAllPlaybooks, formatTitle } from '../lib/playbooks'
import SEOHead from '../components/SEOHead'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function AllPlaybooks() {
  const playbooks = getAllPlaybooks()
  
  // Group playbooks by department
  const playbooksByDepartment = playbooks.reduce((acc, playbook) => {
    if (!acc[playbook.department]) {
      acc[playbook.department] = []
    }
    acc[playbook.department].push(playbook)
    return acc
  }, {})
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All SEO Playbooks",
    "description": "Complete collection of SEO playbooks for every professional role and seniority level. Find your personalized SEO strategy.",
    "url": "https://seobyrole.com/playbooks",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": playbooks.length,
      "itemListElement": playbooks.map((playbook, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://seobyrole.com/playbook/${playbook.slug}`,
        "name": playbook.title
      }))
    }
  }
  
  return (
    <>
      <SEOHead
        title="All SEO Playbooks - Complete Collection"
        description="Browse our complete collection of 21 SEO playbooks tailored for every professional role. From entry-level to executive, find your personalized SEO strategy guide."
        keywords="SEO playbooks, SEO strategies by role, professional SEO guides, department SEO tactics, role-based SEO"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              All SEO Playbooks
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              21 comprehensive playbooks tailored to your role and experience level
            </p>
          </div>
          
          <div className="space-y-12">
            {Object.entries(playbooksByDepartment).map(([department, deptPlaybooks]) => (
              <div key={department}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {department === 'CSuite' ? 'C-Suite' : department} Department
                </h2>
                
                <div className="grid gap-6 lg:grid-cols-3">
                  {deptPlaybooks.map((playbook) => (
                    <Link
                      key={playbook.slug}
                      href={`/playbook/${playbook.slug}`}
                      className="group relative rounded-lg p-6 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div>
                        <span className="inline-flex items-center rounded-md bg-sky-50 dark:bg-sky-900 px-2 py-1 text-xs font-medium text-sky-700 dark:text-sky-300 ring-1 ring-inset ring-sky-700/10 dark:ring-sky-300/10 mb-2">
                          {formatTitle(playbook.seniority)}
                        </span>
                        
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                          {playbook.title}
                        </h3>
                        
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {playbook.focus}
                        </p>
                        
                        <div className="mt-4 flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                          View Playbook
                          <ChevronRightIcon className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/questionnaire"
              className="inline-flex items-center rounded-md bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Find Your Personalized Strategy
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 