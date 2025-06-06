import { getDepartments, getPlaybooksByDepartment, formatTitle } from '../../lib/playbooks'
import SEOHead from '../../components/SEOHead'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export async function getStaticPaths() {
  const departments = getDepartments()
  const paths = departments.map(dept => ({
    params: { slug: dept.slug }
  }))
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const departments = getDepartments()
  const department = departments.find(d => d.slug === params.slug)
  const playbooks = getPlaybooksByDepartment(department.id)
  
  return {
    props: {
      department,
      playbooks
    }
  }
}

export default function DepartmentPage({ department, playbooks }) {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${department.name} SEO Strategies`,
    "description": department.metaDescription,
    "url": `https://seobyrole.com/department/${department.slug}`,
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
        title={`${department.name} SEO Strategies - Role-Based Playbooks`}
        description={department.metaDescription}
        keywords={`${department.name.toLowerCase()} SEO, ${department.name.toLowerCase()} search optimization, ${department.name.toLowerCase()} organic growth, ${department.name.toLowerCase()} SEO strategies`}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <Link href="/departments" className="ml-1 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400">
                    Departments
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-1 text-gray-500 dark:text-gray-400">{department.name}</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
              {department.name} SEO Strategies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              {department.introduction}
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your Experience Level
            </h2>
            
            <div className="grid gap-6 lg:grid-cols-3">
              {playbooks.map((playbook) => (
                <Link
                  key={playbook.slug}
                  href={`/playbook/${playbook.slug}`}
                  className="group relative rounded-lg p-6 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:shadow-lg"
                >
                  <div>
                    <span className="inline-flex items-center rounded-md bg-sky-50 dark:bg-sky-900 px-3 py-1 text-sm font-medium text-sky-700 dark:text-sky-300 ring-1 ring-inset ring-sky-700/10 dark:ring-sky-300/10 mb-3">
                      {formatTitle(playbook.seniority)}
                    </span>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 mb-3">
                      {playbook.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {playbook.focus}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Key Focus Areas:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {playbook.actionableTasks.slice(0, 3).map((task, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-sky-600 dark:text-sky-400 mr-2">•</span>
                            <span className="line-clamp-1">{task.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                      View Full Playbook
                      <ChevronRightIcon className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-sky-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why {department.name} Teams Need SEO
            </h2>
            
            <div className="prose prose-sky dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                {department.introduction}
              </p>
              
              {department.id === 'Sales' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">The Sales-SEO Connection</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Direct access to customer language and pain points through daily interactions</li>
                    <li>• Understanding of objections that need to be addressed in content</li>
                    <li>• Insights into competitor positioning and differentiation opportunities</li>
                    <li>• Ability to identify high-value keywords based on deal conversations</li>
                  </ul>
                </>
              )}
              
              {department.id === 'Marketing' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Marketing's SEO Advantage</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Direct ownership of content creation and optimization</li>
                    <li>• Access to analytics and performance data</li>
                    <li>• Ability to align SEO with broader marketing campaigns</li>
                    <li>• Control over brand messaging and positioning</li>
                  </ul>
                </>
              )}
              
              {department.id === 'Product' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Product's SEO Impact</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Feature development aligned with search demand</li>
                    <li>• User experience optimization for better engagement metrics</li>
                    <li>• Product-led content opportunities</li>
                    <li>• Competitive intelligence through search analysis</li>
                  </ul>
                </>
              )}
              
              {department.id === 'Development' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Development's Technical Edge</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Implementation of technical SEO best practices</li>
                    <li>• Site speed and performance optimization</li>
                    <li>• Structured data and schema markup</li>
                    <li>• Mobile-first development approach</li>
                  </ul>
                </>
              )}
              
              {department.id === 'Creative' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Creative's Visual SEO</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Visual content optimization for search</li>
                    <li>• User experience design that reduces bounce rates</li>
                    <li>• Brand consistency across all touchpoints</li>
                    <li>• Engaging multimedia content for better rankings</li>
                  </ul>
                </>
              )}
              
              {department.id === 'HR' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">HR's Talent SEO</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Employer branding through search visibility</li>
                    <li>• Job posting optimization for candidate discovery</li>
                    <li>• Career page SEO for talent attraction</li>
                    <li>• Company culture content that ranks</li>
                  </ul>
                </>
              )}
              
              {department.id === 'CSuite' && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Executive SEO Leadership</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Strategic alignment of SEO with business objectives</li>
                    <li>• Resource allocation for sustainable growth</li>
                    <li>• Cross-functional SEO collaboration</li>
                    <li>• Competitive advantage through organic visibility</li>
                  </ul>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/questionnaire"
                className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Get Your Personalized Playbook
              </Link>
              
              <Link
                href="/departments"
                className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-800 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Browse Other Departments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 