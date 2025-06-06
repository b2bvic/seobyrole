import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronRightIcon, CheckCircleIcon, PlayIcon, LightBulbIcon } from '@heroicons/react/24/outline'
import SEOHead from '../../components/seo/SEOHead'
import Layout from '../../components/layout/Layout'
import appData from '../../../appData.json'

// Use server-side rendering to avoid build errors
export async function getServerSideProps({ params }) {
  const { slug } = params
  const [department, level] = slug.split('-')
  
  // Find the correct department (case-insensitive)
  const deptKey = Object.keys(appData.content).find(
    key => key.toLowerCase() === department
  )
  
  if (!deptKey || !appData.content[deptKey][level]?.basePlaybook) {
    return { notFound: true }
  }
  
  const deptData = appData.content[deptKey]
  const playbook = deptData[level].basePlaybook
  
  return {
    props: {
      playbook: {
        ...playbook,
        department: deptKey,
        level,
        slug,
        introduction: deptData.introduction
      }
    }
  }
}

export default function PlaybookPage({ playbook }) {
  const router = useRouter()
  
  const levelLabels = {
    entry: 'Entry-Level',
    manager: 'Manager',
    director: 'Director/VP/C-Level'
  }
  
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: playbook.department, href: `/#playbooks` },
    { name: levelLabels[playbook.level], href: null }
  ]
  
  // Create structured data for the playbook
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": playbook.title,
    "description": playbook.focus,
    "step": playbook.executionSteps?.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.step,
      "text": step.details
    })) || []
  }
  
  return (
    <>
      <SEOHead 
        title={`${playbook.title} - SEO by Role`}
        description={playbook.focus.substring(0, 155)}
        path={`/playbook/${playbook.slug}`}
        structuredData={structuredData}
      />
      
      <Layout>
        {/* Breadcrumbs */}
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, idx) => (
              <li key={crumb.name} className="flex items-center">
                {idx > 0 && <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        
        {/* Main Content */}
        <article className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/50 px-4 py-1 text-sm font-medium text-primary-700 dark:text-primary-300">
                  {playbook.department}
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {levelLabels[playbook.level]}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {playbook.title}
              </h1>
              
              <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
                {playbook.focus}
              </p>
            </header>
            
            {/* Department Context */}
            <section className="mb-12 rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Why {playbook.department} Teams Need SEO
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {playbook.introduction}
              </p>
            </section>
            
            {/* Actionable Tasks */}
            {playbook.actionableTasks && playbook.actionableTasks.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {playbook.actionableTasks.length} Key SEO Strategies
                </h2>
                
                <div className="space-y-6">
                  {playbook.actionableTasks.map((task, index) => (
                    <div key={index} className="relative">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-semibold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {task.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {task.description}
                          </p>
                        </div>
                      </div>
                      {index < playbook.actionableTasks.length - 1 && (
                        <div className="absolute left-5 top-10 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Execution Steps */}
            {playbook.executionSteps && playbook.executionSteps.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Implementation Roadmap
                </h2>
                
                <div className="space-y-4">
                  {playbook.executionSteps.map((step, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <PlayIcon className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Step {index + 1}: {step.step}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {step.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Key Takeaway */}
            <section className="mb-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 p-8">
              <div className="flex gap-4">
                <LightBulbIcon className="h-8 w-8 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Key Takeaway
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {playbook.keyTakeaway}
                  </p>
                </div>
              </div>
            </section>
            
            {/* Related Playbooks */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Explore Related Strategies
              </h2>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {['entry', 'manager', 'director'].filter(l => l !== playbook.level).map(level => {
                  const relatedPlaybook = appData.content[playbook.department]?.[level]?.basePlaybook
                  if (!relatedPlaybook) return null
                  
                  return (
                    <Link
                      key={level}
                      href={`/playbook/${playbook.department.toLowerCase()}-${level}`}
                      className="block rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
                    >
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {levelLabels[level]}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {relatedPlaybook.title}
                      </h3>
                    </Link>
                  )
                })}
              </div>
            </section>
            
            {/* CTA */}
            <div className="mt-16 text-center">
              <Link
                href="/questionnaire"
                className="inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get Your Personalized SEO Strategy
              </Link>
            </div>
          </div>
        </article>
      </Layout>
    </>
  )
} 