import { getGoals, getAllPlaybooks } from '../../lib/playbooks'
import SEOHead from '../../components/SEOHead'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export async function getStaticPaths() {
  const goals = getGoals()
  const paths = goals.map(goal => ({
    params: { slug: goal.slug }
  }))
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const goals = getGoals()
  const goal = goals.find(g => g.slug === params.slug)
  const allPlaybooks = getAllPlaybooks()
  
  // Get relevant playbooks for this goal
  const relevantPlaybooks = allPlaybooks.slice(0, 6) // Show sample playbooks
  
  return {
    props: {
      goal,
      relevantPlaybooks
    }
  }
}

export default function GoalPage({ goal, relevantPlaybooks }) {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to ${goal.name} with SEO`,
    "description": goal.metaDescription,
    "url": `https://seobyrole.com/goal/${goal.slug}`,
    "step": getStepsForGoal(goal.id).map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description
    }))
  }
  
  const steps = getStepsForGoal(goal.id)
  const tactics = getTacticsForGoal(goal.id)
  const metrics = getMetricsForGoal(goal.id)
  
  return (
    <>
      <SEOHead
        title={`${goal.name} with SEO - Proven Strategies`}
        description={goal.metaDescription}
        keywords={`${goal.name.toLowerCase()}, SEO ${goal.name.toLowerCase()}, ${goal.name.toLowerCase()} strategies, ${goal.name.toLowerCase()} tactics`}
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
                  <Link href="/goals" className="ml-1 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400">
                    Goals
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-1 text-gray-500 dark:text-gray-400">{goal.name}</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
              How to {goal.name} with SEO
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              {goal.description}
            </p>
          </div>
          
          {/* Step-by-Step Guide */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Step-by-Step Guide
            </h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Key Tactics */}
          <div className="mb-12 bg-sky-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Key Tactics for {goal.name}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {tactics.map((tactic, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {tactic.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tactic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Metrics to Track */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Metrics to Track
            </h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {metric.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {metric.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Target:</span> {metric.target}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Related Playbooks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Playbooks to Help You {goal.name}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relevantPlaybooks.map((playbook) => (
                <Link
                  key={playbook.slug}
                  href={`/playbook/${playbook.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 mb-2">
                    {playbook.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {playbook.focus}
                  </p>
                  <div className="mt-3 flex items-center text-sm font-medium text-sky-600 dark:text-sky-400">
                    View Playbook
                    <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Find your personalized SEO strategy based on your role and experience level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/questionnaire"
                className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Get Your Custom Strategy
              </Link>
              
              <Link
                href="/goals"
                className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-800 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Explore Other Goals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Helper functions for goal-specific content
function getStepsForGoal(goalId) {
  const steps = {
    'IncreaseTraffic': [
      { title: 'Conduct Comprehensive Keyword Research', description: 'Identify high-volume, relevant keywords with achievable difficulty scores. Focus on long-tail keywords that match user intent.' },
      { title: 'Optimize Existing Content', description: 'Update and enhance your top-performing pages with additional keywords, better structure, and more comprehensive information.' },
      { title: 'Create Topic Clusters', description: 'Build content hubs around main topics with supporting articles that interlink to establish topical authority.' },
      { title: 'Improve Site Speed and Technical SEO', description: 'Ensure fast loading times, mobile responsiveness, and proper indexation to maximize traffic potential.' },
      { title: 'Build Quality Backlinks', description: 'Earn authoritative links through guest posting, digital PR, and creating link-worthy resources.' }
    ],
    'ImproveRankings': [
      { title: 'Perform a Technical SEO Audit', description: 'Fix crawl errors, improve site structure, and ensure proper indexation of all important pages.' },
      { title: 'Optimize On-Page Elements', description: 'Perfect your title tags, meta descriptions, headers, and content structure for target keywords.' },
      { title: 'Enhance Content Quality', description: 'Create comprehensive, authoritative content that fully satisfies search intent and outperforms competitors.' },
      { title: 'Build E-A-T Signals', description: 'Establish expertise, authoritativeness, and trustworthiness through author bios, citations, and quality content.' },
      { title: 'Monitor and Iterate', description: 'Track ranking changes, analyze competitor strategies, and continuously improve underperforming pages.' }
    ],
    'GenerateLeads': [
      { title: 'Identify High-Intent Keywords', description: 'Target commercial and transactional keywords that indicate buying intent or problem-solving needs.' },
      { title: 'Create Conversion-Focused Landing Pages', description: 'Build dedicated pages for each service or product with clear value propositions and CTAs.' },
      { title: 'Implement Lead Magnets', description: 'Offer valuable resources like guides, templates, or tools in exchange for contact information.' },
      { title: 'Optimize Forms and CTAs', description: 'Reduce friction in the conversion process with simple forms and compelling calls-to-action.' },
      { title: 'Set Up Tracking and Attribution', description: 'Monitor which keywords and pages generate the most qualified leads to optimize further.' }
    ],
    'BrandAwareness': [
      { title: 'Target Branded and Non-Branded Keywords', description: 'Balance between ranking for your brand terms and broader industry keywords.' },
      { title: 'Create Shareable Content', description: 'Develop resources, infographics, and studies that others want to reference and share.' },
      { title: 'Optimize for Featured Snippets', description: 'Structure content to capture position zero and increase visibility in search results.' },
      { title: 'Build a Strong Link Profile', description: 'Earn mentions and links from authoritative sites in your industry.' },
      { title: 'Leverage Schema Markup', description: 'Implement structured data to enhance your appearance in search results with rich snippets.' }
    ],
    'ContentPerformance': [
      { title: 'Conduct a Content Audit', description: 'Analyze all existing content for traffic, engagement, and conversion metrics.' },
      { title: 'Identify Content Gaps', description: 'Find topics your competitors cover that you don\'t, and opportunities for new content.' },
      { title: 'Optimize Content Structure', description: 'Improve readability, add visuals, and organize content for better user experience.' },
      { title: 'Update and Refresh Old Content', description: 'Keep high-performing content current with new information and optimized for current search intent.' },
      { title: 'Implement Content Distribution', description: 'Promote content through multiple channels to maximize reach and engagement.' }
    ]
  }
  
  return steps[goalId] || []
}

function getTacticsForGoal(goalId) {
  const tactics = {
    'IncreaseTraffic': [
      { title: 'Long-Tail Keyword Strategy', description: 'Target specific, less competitive keywords that collectively drive significant traffic.' },
      { title: 'Content Velocity', description: 'Publish high-quality content consistently to capture more search queries.' },
      { title: 'Internal Linking', description: 'Distribute page authority and help users discover more content.' },
      { title: 'Local SEO', description: 'Capture location-based searches if applicable to your business.' }
    ],
    'ImproveRankings': [
      { title: 'Competitor Analysis', description: 'Study top-ranking pages to understand what Google values for your keywords.' },
      { title: 'Link Gap Analysis', description: 'Identify link opportunities your competitors have that you don\'t.' },
      { title: 'Core Web Vitals', description: 'Optimize for Google\'s page experience signals.' },
      { title: 'Semantic SEO', description: 'Use related keywords and entities to demonstrate topical expertise.' }
    ],
    'GenerateLeads': [
      { title: 'Bottom-of-Funnel Content', description: 'Create comparison pages, case studies, and product-focused content.' },
      { title: 'Local Service Pages', description: 'Target "[service] + [location]" keywords for local leads.' },
      { title: 'Retargeting Integration', description: 'Capture organic visitors for retargeting campaigns.' },
      { title: 'Chat Integration', description: 'Use live chat or chatbots to capture leads from organic traffic.' }
    ],
    'BrandAwareness': [
      { title: 'Thought Leadership Content', description: 'Publish expert insights and original research.' },
      { title: 'Brand + Category Keywords', description: 'Rank for "best [category]" and similar terms.' },
      { title: 'PR and Link Building', description: 'Get featured in industry publications and podcasts.' },
      { title: 'Social Proof Content', description: 'Showcase reviews, testimonials, and case studies.' }
    ],
    'ContentPerformance': [
      { title: 'Content Consolidation', description: 'Merge similar pages to concentrate authority.' },
      { title: 'User Intent Optimization', description: 'Align content format with what users expect.' },
      { title: 'Multimedia Enhancement', description: 'Add videos, infographics, and interactive elements.' },
      { title: 'A/B Testing', description: 'Test different headlines, CTAs, and content structures.' }
    ]
  }
  
  return tactics[goalId] || []
}

function getMetricsForGoal(goalId) {
  const metrics = {
    'IncreaseTraffic': [
      { name: 'Organic Sessions', description: 'Total visits from organic search', target: '+20% QoQ' },
      { name: 'Organic CTR', description: 'Click-through rate from search results', target: '>3%' },
      { name: 'Keywords Ranking', description: 'Number of keywords in top 100', target: '+50% YoY' }
    ],
    'ImproveRankings': [
      { name: 'Average Position', description: 'Mean ranking position for target keywords', target: 'Top 10' },
      { name: 'Page 1 Rankings', description: 'Keywords ranking on first page', target: '+30%' },
      { name: 'Featured Snippets', description: 'Number of position zero rankings', target: '10+' }
    ],
    'GenerateLeads': [
      { name: 'Organic Conversions', description: 'Leads from organic traffic', target: '+25% MoM' },
      { name: 'Conversion Rate', description: 'Percentage of visitors who convert', target: '>2.5%' },
      { name: 'Cost Per Lead', description: 'Compared to paid channels', target: '-50%' }
    ],
    'BrandAwareness': [
      { name: 'Brand Searches', description: 'Volume of branded keyword searches', target: '+100% YoY' },
      { name: 'Share of Voice', description: 'Visibility vs competitors', target: 'Top 3' },
      { name: 'Domain Authority', description: 'Overall site authority score', target: '+10 points' }
    ],
    'ContentPerformance': [
      { name: 'Engagement Rate', description: 'Time on page and scroll depth', target: '>60%' },
      { name: 'Pages per Session', description: 'Content discovery metric', target: '>2.5' },
      { name: 'Content ROI', description: 'Revenue attributed to content', target: '3x investment' }
    ]
  }
  
  return metrics[goalId] || []
} 