import SEOHead from '../components/SEOHead'
import Link from 'next/link'

export default function About() {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About SEO by Role",
    "description": "Learn about SEO by Role - the strategic SEO playbook empowering every professional role for organic growth.",
    "url": "https://seobyrole.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "SEO by Role",
      "description": "The Strategic SEO Playbook - Empowering every role for organic growth",
      "url": "https://seobyrole.com",
      "foundingDate": "2024",
      "mission": "To democratize SEO knowledge and empower every professional to contribute to organic growth"
    }
  }
  
  return (
    <>
      <SEOHead
        title="About SEO by Role - Our Mission"
        description="SEO by Role transforms how organizations approach search engine optimization by empowering every department and role with tailored SEO strategies for sustainable growth."
        keywords="about SEO by Role, SEO mission, role-based SEO, SEO philosophy, SEO approach"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-8">
              About SEO by Role
            </h1>
            
            <div className="prose prose-sky dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                SEO by Role is built on a simple but powerful premise: <strong>every professional, regardless of their department or seniority, has unique insights and capabilities that can drive organic growth</strong>.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                Our Mission
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300">
                We're on a mission to democratize SEO knowledge and break down the silos that limit organic growth potential. By providing role-specific SEO playbooks, we empower every professional to contribute meaningfully to their organization's search visibility and success.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                Why Role-Based SEO?
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300">
                Traditional SEO education often focuses exclusively on marketing teams or SEO specialists. But we've discovered that:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-6">
                <li><strong>Sales teams</strong> have direct access to customer language and pain points</li>
                <li><strong>Product teams</strong> understand user needs and feature demand</li>
                <li><strong>Development teams</strong> control technical implementation</li>
                <li><strong>HR teams</strong> can optimize for talent acquisition</li>
                <li><strong>C-Suite</strong> aligns SEO with business strategy</li>
              </ul>
              
              <p className="text-gray-600 dark:text-gray-300">
                When every department understands and applies SEO principles relevant to their work, the entire organization benefits from compounded growth.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                Our Approach
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    1. Personalized Strategies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We don't believe in one-size-fits-all SEO. Our playbooks are tailored to specific roles, experience levels, and business objectives.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    2. Actionable Tactics
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Every playbook includes specific, implementable tasks that professionals can start using immediately, regardless of their SEO experience.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    3. Cross-Functional Collaboration
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We emphasize how different departments can work together, sharing insights and amplifying each other's SEO efforts.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    4. Measurable Impact
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Each strategy includes relevant KPIs and metrics, ensuring teams can track their contribution to organic growth.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                The Power of Collective SEO
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300">
                When organizations embrace role-based SEO, they unlock exponential growth opportunities:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-6">
                <li>More comprehensive keyword coverage from diverse perspectives</li>
                <li>Faster identification of content gaps and opportunities</li>
                <li>Better alignment between search demand and product development</li>
                <li>Improved technical implementation with developer involvement</li>
                <li>Stronger brand presence through coordinated efforts</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                Join the Movement
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300">
                Whether you're a sales rep capturing customer insights, a developer optimizing site performance, or an executive setting strategy, you have a role to play in SEO success.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300">
                Explore our playbooks, find your personalized strategy, and start contributing to your organization's organic growth today.
              </p>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
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