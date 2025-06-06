import { getGoals } from '../lib/playbooks'
import SEOHead from '../components/SEOHead'
import Link from 'next/link'
import { 
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  MegaphoneIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const goalIcons = {
  'IncreaseTraffic': ArrowTrendingUpIcon,
  'ImproveRankings': MagnifyingGlassIcon,
  'GenerateLeads': UserGroupIcon,
  'BrandAwareness': MegaphoneIcon,
  'ContentPerformance': DocumentTextIcon
}

export default function Goals() {
  const goals = getGoals()
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SEO Goals and Strategies",
    "description": "Explore SEO strategies organized by your primary business goal. From traffic growth to lead generation, find targeted tactics.",
    "url": "https://seobyrole.com/goals",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": goals.length,
      "itemListElement": goals.map((goal, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://seobyrole.com/goal/${goal.slug}`,
        "name": goal.name
      }))
    }
  }
  
  return (
    <>
      <SEOHead
        title="SEO Goals - Strategies by Business Objective"
        description="Find SEO strategies aligned with your business goals. Whether you need more traffic, better rankings, or qualified leads, discover targeted tactics for success."
        keywords="SEO goals, increase traffic SEO, improve rankings, lead generation SEO, brand awareness SEO, content performance"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              SEO Strategies by Goal
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every SEO initiative should align with clear business objectives. Choose your primary goal to discover targeted strategies and tactics.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const Icon = goalIcons[goal.id]
              return (
                <Link
                  key={goal.id}
                  href={`/goal/${goal.slug}`}
                  className="group relative rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    {goal.name}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {goal.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                    Explore Strategies
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
              Aligning SEO with Business Objectives
            </h2>
            
            <div className="prose prose-sky dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                Successful SEO isn't just about rankings—it's about achieving measurable business outcomes. By aligning your SEO strategy with specific goals, you can:
              </p>
              
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Focus Your Efforts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Prioritize tactics that directly support your primary objective, avoiding wasted time on activities that don't move the needle.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Measure What Matters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Track KPIs that align with your goals, whether that's organic traffic, conversion rates, or brand search volume.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Demonstrate ROI
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Show clear connections between SEO investments and business results, making it easier to secure budget and resources.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Scale Success
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Build on what works by identifying the tactics that drive the most impact toward your specific objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Common Goal Combinations
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Growth Stage: Traffic → Leads → Revenue
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start by increasing qualified traffic, then optimize for lead generation, finally focusing on conversion and revenue optimization.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Brand Building: Awareness → Rankings → Authority
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Build brand visibility first, improve rankings for branded and non-branded terms, then establish thought leadership.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Content Excellence: Performance → Rankings → Traffic
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimize existing content performance, improve rankings through updates, then scale traffic with new content.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Achieve Your SEO Goals?
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a personalized SEO strategy based on your specific role, experience level, and business objectives.
            </p>
            
            <Link
              href="/questionnaire"
              className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Get Your Custom Strategy
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 