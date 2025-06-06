import { getCoreContent } from '../lib/playbooks'
import SEOHead from '../components/SEOHead'
import { LightBulbIcon, ChatBubbleLeftRightIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const iconMap = {
  'audience-intent': LightBulbIcon,
  'answer-questions': ChatBubbleLeftRightIcon,
  'measure-impact': ChartBarIcon
}

export default function CorePrinciples() {
  const { principles, metaDescription } = getCoreContent()
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Core SEO Principles for Every Professional",
    "description": metaDescription,
    "author": {
      "@type": "Organization",
      "name": "SEO by Role"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SEO by Role",
      "logo": {
        "@type": "ImageObject",
        "url": "https://seobyrole.com/images/logo.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://seobyrole.com/core-principles"
    }
  }
  
  return (
    <>
      <SEOHead
        title="Core SEO Principles - Foundation for Success"
        description={metaDescription}
        keywords="SEO principles, SEO fundamentals, search intent, content strategy, SEO metrics, organic growth strategy"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Core SEO Principles
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three fundamental principles that drive organic growth across all departments and roles
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            {principles.map((principle) => {
              const Icon = iconMap[principle.id]
              return (
                <div
                  key={principle.id}
                  className="relative rounded-2xl bg-gray-50 dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mb-6">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {principle.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {principle.description}
                  </p>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {principle.fullContent}
                  </p>
                </div>
              )
            })}
          </div>
          
          <div className="bg-sky-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why These Principles Matter
            </h2>
            
            <div className="prose prose-sky dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                SEO success isn't just about technical optimization or keyword rankings. It's about understanding how your unique role and expertise can contribute to creating content that genuinely serves your audience while achieving business objectives.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                Cross-Functional SEO Excellence
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                When every department applies these principles, organizations create a powerful SEO ecosystem:
              </p>
              
              <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>• <strong>Sales teams</strong> provide real customer language and pain points</li>
                <li>• <strong>Marketing teams</strong> transform insights into compelling content</li>
                <li>• <strong>Product teams</strong> ensure features align with search demand</li>
                <li>• <strong>Development teams</strong> build technically optimized platforms</li>
                <li>• <strong>Creative teams</strong> enhance user experience and engagement</li>
                <li>• <strong>HR teams</strong> attract top talent through search</li>
                <li>• <strong>C-Suite</strong> aligns SEO with business strategy</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                The Compound Effect
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                When these principles are applied consistently across all roles and departments, the results compound exponentially. You'll see:
              </p>
              
              <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Higher quality organic traffic that converts better</li>
                <li>• Content that ranks for thousands of relevant keywords</li>
                <li>• Stronger brand authority and trust signals</li>
                <li>• Sustainable competitive advantages in search</li>
                <li>• Measurable impact on revenue and growth</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Apply These Principles?
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover how to implement these core principles in your specific role with our personalized SEO playbooks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/questionnaire"
                className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Find Your Strategy
              </a>
              
              <a
                href="/playbooks"
                className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-800 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Browse All Playbooks
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 