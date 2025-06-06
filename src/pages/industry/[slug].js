import { getIndustries, getAllPlaybooks } from '../../lib/playbooks'
import SEOHead from '../../components/SEOHead'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export async function getStaticPaths() {
  const industries = getIndustries()
  const paths = industries.map(industry => ({
    params: { slug: industry.slug }
  }))
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const industries = getIndustries()
  const industry = industries.find(i => i.slug === params.slug)
  const allPlaybooks = getAllPlaybooks()
  
  // Get sample playbooks relevant to this industry
  const relevantPlaybooks = allPlaybooks.slice(0, 6)
  
  return {
    props: {
      industry,
      relevantPlaybooks
    }
  }
}

export default function IndustryPage({ industry, relevantPlaybooks }) {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `SEO Strategies for ${industry.name}`,
    "description": industry.metaDescription,
    "url": `https://seobyrole.com/industry/${industry.slug}`,
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
    "dateModified": new Date().toISOString()
  }
  
  const strategies = getStrategiesForIndustry(industry.id)
  const challenges = getChallengesForIndustry(industry.id)
  const opportunities = getOpportunitiesForIndustry(industry.id)
  
  return (
    <>
      <SEOHead
        title={`${industry.name} SEO - Industry-Specific Strategies`}
        description={industry.metaDescription}
        keywords={`${industry.name.toLowerCase()} SEO, SEO for ${industry.name.toLowerCase()}, ${industry.name.toLowerCase()} search optimization, ${industry.name.toLowerCase()} digital marketing`}
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
                  <Link href="/resources" className="ml-1 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400">
                    Resources
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-1 text-gray-500 dark:text-gray-400">{industry.name}</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
              SEO for {industry.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              {industry.description}
            </p>
          </div>
          
          {/* Key Strategies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Key SEO Strategies for {industry.name}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {strategies.map((strategy, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {strategy.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {strategy.description}
                  </p>
                  <ul className="space-y-2">
                    {strategy.tactics.map((tactic, tacticIndex) => (
                      <li key={tacticIndex} className="flex items-start">
                        <span className="text-sky-600 dark:text-sky-400 mr-2">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Common Challenges */}
          <div className="mb-12 bg-red-50 dark:bg-red-900/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Common SEO Challenges in {industry.name}
            </h2>
            
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {challenge.description}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <span className="font-semibold">Solution:</span> {challenge.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Opportunities */}
          <div className="mb-12 bg-green-50 dark:bg-green-900/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              SEO Opportunities in {industry.name}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              {opportunities.map((opportunity, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {opportunity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Related Playbooks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recommended Playbooks for {industry.name} Professionals
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relevantPlaybooks.map((playbook) => (
                <Link
                  key={playbook.slug}
                  href={`/playbook/${playbook.slug}`}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
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
              Ready to Dominate {industry.name} Search?
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a personalized SEO strategy tailored to your specific role and the unique challenges of the {industry.name.toLowerCase()} industry.
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

// Helper functions for industry-specific content
function getStrategiesForIndustry(industryId) {
  const strategies = {
    'Ecommerce': [
      {
        title: 'Product Page Optimization',
        description: 'Maximize visibility for individual products in search results',
        tactics: [
          'Unique product descriptions with target keywords',
          'High-quality images with descriptive alt text',
          'User reviews and ratings for fresh content',
          'Structured data for rich snippets'
        ]
      },
      {
        title: 'Category Page SEO',
        description: 'Build authority through well-optimized category pages',
        tactics: [
          'Comprehensive category descriptions',
          'Faceted navigation optimization',
          'Internal linking between related products',
          'Breadcrumb navigation for better UX'
        ]
      }
    ],
    'B2B': [
      {
        title: 'Thought Leadership Content',
        description: 'Establish authority in your industry through expert content',
        tactics: [
          'Industry reports and whitepapers',
          'Case studies with client results',
          'Expert interviews and insights',
          'Data-driven research content'
        ]
      },
      {
        title: 'Long-Form Content Strategy',
        description: 'Target complex B2B search queries with comprehensive guides',
        tactics: [
          'Ultimate guides for industry topics',
          'Comparison content for solutions',
          'ROI calculators and tools',
          'Industry glossaries and resources'
        ]
      }
    ],
    'Publisher': [
      {
        title: 'Content Velocity Optimization',
        description: 'Balance quality with publishing frequency for maximum impact',
        tactics: [
          'Editorial calendar optimization',
          'Trending topic identification',
          'Content refresh strategies',
          'Author expertise signals'
        ]
      },
      {
        title: 'News SEO',
        description: 'Optimize for Google News and Discover visibility',
        tactics: [
          'News sitemap implementation',
          'AMP or Core Web Vitals optimization',
          'Real-time content optimization',
          'Breaking news coverage strategies'
        ]
      }
    ],
    'SaaS': [
      {
        title: 'Feature Page SEO',
        description: 'Create dedicated pages for each product feature',
        tactics: [
          'Feature-specific landing pages',
          'Use case content for each feature',
          'Integration pages for popular tools',
          'Comparison pages vs competitors'
        ]
      },
      {
        title: 'Free Tool Strategy',
        description: 'Attract users with free tools that showcase your product',
        tactics: [
          'SEO-optimized free tool pages',
          'Calculator and generator tools',
          'Templates and resources',
          'Tool-specific content marketing'
        ]
      }
    ],
    'Agency': [
      {
        title: 'Service Page Optimization',
        description: 'Rank for specific services in your target locations',
        tactics: [
          'Dedicated pages for each service',
          'Location + service combinations',
          'Client success stories',
          'Service-specific FAQ content'
        ]
      },
      {
        title: 'Portfolio SEO',
        description: 'Leverage your work to attract similar clients',
        tactics: [
          'Case study optimization',
          'Industry-specific portfolios',
          'Before/after showcases',
          'Results-driven content'
        ]
      }
    ],
    'Other': [
      {
        title: 'Foundation SEO',
        description: 'Build a strong SEO foundation regardless of industry',
        tactics: [
          'Technical SEO audit and fixes',
          'Content gap analysis',
          'Competitor research',
          'Local SEO if applicable'
        ]
      },
      {
        title: 'Content Marketing',
        description: 'Create valuable content for your target audience',
        tactics: [
          'Keyword research and mapping',
          'Content calendar development',
          'Link-worthy resource creation',
          'User intent optimization'
        ]
      }
    ]
  }
  
  return strategies[industryId] || strategies['Other']
}

function getChallengesForIndustry(industryId) {
  const challenges = {
    'Ecommerce': [
      {
        title: 'Duplicate Content Issues',
        description: 'Similar products can create duplicate content problems',
        solution: 'Use canonical tags, unique descriptions, and user-generated content to differentiate pages'
      },
      {
        title: 'Thin Content on Product Pages',
        description: 'Limited product information can hurt rankings',
        solution: 'Add detailed specifications, use guides, customer reviews, and FAQs to enrich content'
      }
    ],
    'B2B': [
      {
        title: 'Long Sales Cycles',
        description: 'B2B buyers take time to make decisions',
        solution: 'Create content for each stage of the buyer journey and implement lead nurturing'
      },
      {
        title: 'Technical Jargon',
        description: 'Industry-specific language can limit search visibility',
        solution: 'Balance technical accuracy with accessible language and target various expertise levels'
      }
    ],
    'Publisher': [
      {
        title: 'Content Cannibalization',
        description: 'Multiple articles on similar topics compete with each other',
        solution: 'Implement topic clusters, use canonical tags, and consolidate similar content'
      },
      {
        title: 'Declining Organic Reach',
        description: 'Algorithm changes impact traffic unpredictably',
        solution: 'Diversify traffic sources and focus on building direct audience relationships'
      }
    ],
    'SaaS': [
      {
        title: 'Competitive Keywords',
        description: 'Major players dominate primary keywords',
        solution: 'Target long-tail keywords, focus on specific use cases, and build topical authority'
      },
      {
        title: 'Feature Parity',
        description: 'Similar features across competitors make differentiation difficult',
        solution: 'Focus on unique value propositions, customer success stories, and integration content'
      }
    ],
    'Agency': [
      {
        title: 'Local Competition',
        description: 'Many agencies compete for the same local keywords',
        solution: 'Specialize in specific industries or services and build strong local citations'
      },
      {
        title: 'Proving Expertise',
        description: 'Establishing credibility in a crowded market',
        solution: 'Showcase detailed case studies, client testimonials, and thought leadership content'
      }
    ],
    'Other': [
      {
        title: 'Limited Resources',
        description: 'Small teams struggle to maintain SEO efforts',
        solution: 'Focus on high-impact activities and automate where possible'
      },
      {
        title: 'Measuring ROI',
        description: 'Difficulty connecting SEO efforts to business results',
        solution: 'Set up proper tracking and focus on metrics that matter to your business'
      }
    ]
  }
  
  return challenges[industryId] || challenges['Other']
}

function getOpportunitiesForIndustry(industryId) {
  const opportunities = {
    'Ecommerce': [
      {
        title: 'Voice Commerce',
        description: 'Optimize for voice search as shopping habits evolve'
      },
      {
        title: 'Visual Search',
        description: 'Leverage image optimization for visual search platforms'
      },
      {
        title: 'International SEO',
        description: 'Expand to new markets with localized SEO strategies'
      }
    ],
    'B2B': [
      {
        title: 'LinkedIn SEO',
        description: 'Optimize content for B2B social platforms'
      },
      {
        title: 'Podcast SEO',
        description: 'Create and optimize podcast content for your industry'
      },
      {
        title: 'Webinar Content',
        description: 'Repurpose webinars into SEO-friendly content'
      }
    ],
    'Publisher': [
      {
        title: 'Google Discover',
        description: 'Optimize for Google Discover feed placement'
      },
      {
        title: 'Web Stories',
        description: 'Create engaging visual content with Web Stories'
      },
      {
        title: 'Newsletter SEO',
        description: 'Optimize newsletter archives for search'
      }
    ],
    'SaaS': [
      {
        title: 'App Store SEO',
        description: 'Optimize for app marketplace searches'
      },
      {
        title: 'API Documentation',
        description: 'Create SEO-friendly developer documentation'
      },
      {
        title: 'Community Content',
        description: 'Build SEO value through user forums and communities'
      }
    ],
    'Agency': [
      {
        title: 'Video SEO',
        description: 'Create video content showcasing your work'
      },
      {
        title: 'Local Service Ads',
        description: 'Combine organic SEO with Google LSAs'
      },
      {
        title: 'Partnership Content',
        description: 'Co-create content with technology partners'
      }
    ],
    'Other': [
      {
        title: 'Featured Snippets',
        description: 'Target position zero opportunities'
      },
      {
        title: 'Local SEO',
        description: 'Dominate local search results'
      },
      {
        title: 'Mobile-First',
        description: 'Optimize for mobile search behavior'
      }
    ]
  }
  
  return opportunities[industryId] || opportunities['Other']
} 