import { getCMSPlatforms, getAllPlaybooks } from '../../lib/playbooks'
import SEOHead from '../../components/SEOHead'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export async function getStaticPaths() {
  const platforms = getCMSPlatforms()
  const paths = platforms.map(platform => ({
    params: { slug: platform.slug }
  }))
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const platforms = getCMSPlatforms()
  const platform = platforms.find(p => p.slug === params.slug)
  const allPlaybooks = getAllPlaybooks()
  
  // Get sample playbooks
  const relevantPlaybooks = allPlaybooks.slice(0, 6)
  
  return {
    props: {
      platform,
      relevantPlaybooks
    }
  }
}

export default function PlatformPage({ platform, relevantPlaybooks }) {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${platform.name} SEO Guide`,
    "description": platform.metaDescription,
    "url": `https://seobyrole.com/platform/${platform.slug}`,
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
    "proficiencyLevel": "Beginner to Advanced"
  }
  
  const features = getFeaturesForPlatform(platform.id)
  const optimizations = getOptimizationsForPlatform(platform.id)
  const plugins = getPluginsForPlatform(platform.id)
  
  return (
    <>
      <SEOHead
        title={`${platform.name} SEO Guide - Complete Optimization`}
        description={platform.metaDescription}
        keywords={`${platform.name} SEO, ${platform.name} optimization, ${platform.name} search engine optimization, ${platform.name} SEO guide`}
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
                  <span className="ml-1 text-gray-500 dark:text-gray-400">{platform.name} SEO</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
              {platform.name} SEO Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              {platform.description}
            </p>
          </div>
          
          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              SEO Features in {platform.name}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      feature.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      feature.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {feature.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Optimization Checklist */}
          <div className="mb-12 bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {platform.name} SEO Optimization Checklist
            </h2>
            
            <div className="space-y-6">
              {optimizations.map((category, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <label key={itemIndex} className="flex items-start">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded mt-0.5"
                        />
                        <span className="ml-3 text-gray-600 dark:text-gray-300">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommended Plugins/Tools */}
          {plugins && plugins.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Recommended {platform.name} SEO {platform.id === 'WordPress' ? 'Plugins' : 'Tools'}
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {plugins.map((plugin, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {plugin.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {plugin.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {plugin.price}
                      </span>
                      {plugin.recommended && (
                        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
                          Recommended
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Common Issues and Solutions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Common {platform.name} SEO Issues & Solutions
            </h2>
            
            <div className="space-y-4">
              {getCommonIssuesForPlatform(platform.id).map((issue, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                    Issue: {issue.problem}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {issue.description}
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">
                      Solution:
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-200">
                      {issue.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Related Playbooks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              SEO Playbooks for {platform.name} Users
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
              Master {platform.name} SEO
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a personalized SEO strategy that leverages the full potential of {platform.name} for your specific role and business goals.
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

// Helper functions for platform-specific content
function getFeaturesForPlatform(platformId) {
  const features = {
    'WordPress': [
      {
        title: 'SEO-Friendly URLs',
        description: 'Customizable permalink structure for clean, keyword-rich URLs',
        difficulty: 'Easy'
      },
      {
        title: 'XML Sitemaps',
        description: 'Automatic sitemap generation with plugins like Yoast or RankMath',
        difficulty: 'Easy'
      },
      {
        title: 'Schema Markup',
        description: 'Built-in support for structured data through plugins',
        difficulty: 'Medium'
      },
      {
        title: 'Page Speed Optimization',
        description: 'Caching plugins and optimization tools for faster loading',
        difficulty: 'Medium'
      },
      {
        title: 'Mobile Responsiveness',
        description: 'Most themes are mobile-first and responsive by default',
        difficulty: 'Easy'
      },
      {
        title: 'Content Management',
        description: 'Easy content updates and category/tag organization',
        difficulty: 'Easy'
      }
    ],
    'Shopify': [
      {
        title: 'Product Schema',
        description: 'Automatic product structured data for rich snippets',
        difficulty: 'Easy'
      },
      {
        title: 'Mobile-First Design',
        description: 'All themes are mobile-optimized out of the box',
        difficulty: 'Easy'
      },
      {
        title: 'SSL Certificate',
        description: 'Free SSL included for all stores',
        difficulty: 'Easy'
      },
      {
        title: 'URL Redirects',
        description: 'Built-in redirect manager for maintaining SEO equity',
        difficulty: 'Medium'
      },
      {
        title: 'Image Optimization',
        description: 'Automatic image compression and responsive images',
        difficulty: 'Easy'
      },
      {
        title: 'Blog Platform',
        description: 'Built-in blogging for content marketing',
        difficulty: 'Easy'
      }
    ],
    'HubSpotCMS': [
      {
        title: 'Integrated Analytics',
        description: 'Built-in SEO recommendations and performance tracking',
        difficulty: 'Easy'
      },
      {
        title: 'Content Strategy Tools',
        description: 'Topic clusters and pillar page organization',
        difficulty: 'Medium'
      },
      {
        title: 'A/B Testing',
        description: 'Built-in testing for optimizing conversions',
        difficulty: 'Medium'
      },
      {
        title: 'CDN Hosting',
        description: 'Global CDN for fast page loading worldwide',
        difficulty: 'Easy'
      },
      {
        title: 'Smart Content',
        description: 'Dynamic content based on visitor characteristics',
        difficulty: 'Advanced'
      },
      {
        title: 'Form Optimization',
        description: 'SEO-friendly forms with conversion tracking',
        difficulty: 'Easy'
      }
    ],
    'Custom': [
      {
        title: 'Full Control',
        description: 'Complete flexibility over technical implementation',
        difficulty: 'Advanced'
      },
      {
        title: 'Custom Schema',
        description: 'Implement any structured data type needed',
        difficulty: 'Advanced'
      },
      {
        title: 'Performance Optimization',
        description: 'Fine-tune every aspect of site performance',
        difficulty: 'Advanced'
      },
      {
        title: 'Custom URL Structure',
        description: 'Design URL patterns for optimal SEO',
        difficulty: 'Medium'
      },
      {
        title: 'API Integration',
        description: 'Connect with any SEO tool or service',
        difficulty: 'Advanced'
      },
      {
        title: 'Scalability',
        description: 'Build for growth without platform limitations',
        difficulty: 'Advanced'
      }
    ]
  }
  
  return features[platformId] || features['Custom']
}

function getOptimizationsForPlatform(platformId) {
  const optimizations = {
    'WordPress': [
      {
        category: 'Basic Setup',
        items: [
          'Install an SEO plugin (Yoast SEO or RankMath)',
          'Configure XML sitemaps',
          'Set up proper permalink structure',
          'Install Google Analytics and Search Console',
          'Enable breadcrumbs navigation'
        ]
      },
      {
        category: 'Content Optimization',
        items: [
          'Optimize title tags and meta descriptions',
          'Use proper heading hierarchy (H1, H2, H3)',
          'Add alt text to all images',
          'Internal linking between related posts',
          'Create cornerstone content'
        ]
      },
      {
        category: 'Technical SEO',
        items: [
          'Install caching plugin (WP Rocket or W3 Total Cache)',
          'Optimize images with compression plugin',
          'Enable lazy loading for images',
          'Minimize CSS and JavaScript',
          'Set up 301 redirects for changed URLs'
        ]
      }
    ],
    'Shopify': [
      {
        category: 'Store Setup',
        items: [
          'Customize robots.txt file',
          'Submit sitemap to Google Search Console',
          'Set up Google Analytics and enhanced ecommerce',
          'Configure URL redirects for old products',
          'Enable product reviews'
        ]
      },
      {
        category: 'Product Optimization',
        items: [
          'Write unique product descriptions',
          'Optimize product titles with keywords',
          'Add detailed product specifications',
          'Use high-quality product images with alt text',
          'Implement product schema markup'
        ]
      },
      {
        category: 'Content Marketing',
        items: [
          'Create buying guides for product categories',
          'Start a blog for organic traffic',
          'Build resource pages for link building',
          'Create FAQ pages for common questions',
          'Develop size guides and how-to content'
        ]
      }
    ],
    'HubSpotCMS': [
      {
        category: 'Initial Configuration',
        items: [
          'Set up SEO recommendations tool',
          'Configure canonical URLs',
          'Enable SSL across all pages',
          'Set up 301 redirect mapping',
          'Configure language settings for international SEO'
        ]
      },
      {
        category: 'Content Strategy',
        items: [
          'Create topic clusters and pillar pages',
          'Optimize landing pages for conversions',
          'Set up blog with categories and tags',
          'Implement content personalization',
          'Create SEO-friendly CTAs'
        ]
      },
      {
        category: 'Performance',
        items: [
          'Enable browser caching',
          'Optimize image sizes and formats',
          'Minimize HTTP requests',
          'Use HubSpot CDN effectively',
          'Monitor Core Web Vitals'
        ]
      }
    ],
    'Custom': [
      {
        category: 'Foundation',
        items: [
          'Implement proper HTML5 semantic markup',
          'Set up XML sitemap generation',
          'Configure robots.txt properly',
          'Implement canonical tags',
          'Set up 301 redirect system'
        ]
      },
      {
        category: 'Advanced Technical',
        items: [
          'Implement server-side rendering (SSR) if needed',
          'Set up proper hreflang for international sites',
          'Configure structured data for all content types',
          'Implement pagination correctly',
          'Set up log file analysis'
        ]
      },
      {
        category: 'Performance',
        items: [
          'Implement CDN for global performance',
          'Configure server-level caching',
          'Optimize database queries',
          'Implement image optimization pipeline',
          'Monitor and optimize Core Web Vitals'
        ]
      }
    ]
  }
  
  return optimizations[platformId] || optimizations['Custom']
}

function getPluginsForPlatform(platformId) {
  const plugins = {
    'WordPress': [
      {
        name: 'Yoast SEO',
        description: 'Comprehensive SEO plugin with content analysis and XML sitemaps',
        price: 'Free / Premium $99/year',
        recommended: true
      },
      {
        name: 'RankMath',
        description: 'Feature-rich SEO plugin with built-in schema markup',
        price: 'Free / Pro $59/year',
        recommended: true
      },
      {
        name: 'WP Rocket',
        description: 'Premium caching plugin for speed optimization',
        price: '$49/year',
        recommended: true
      },
      {
        name: 'Imagify',
        description: 'Image optimization and compression',
        price: 'Free up to 25MB/month',
        recommended: false
      }
    ],
    'Shopify': [
      {
        name: 'SEO Manager',
        description: 'Comprehensive SEO app with meta tag templates',
        price: '$20/month',
        recommended: true
      },
      {
        name: 'Smart SEO',
        description: 'Automated meta tags and structured data',
        price: '$4.99/month',
        recommended: true
      },
      {
        name: 'Page Speed Booster',
        description: 'Preload pages for faster browsing',
        price: 'Free',
        recommended: false
      },
      {
        name: 'JSON-LD for SEO',
        description: 'Advanced structured data implementation',
        price: '$14.99/month',
        recommended: false
      }
    ],
    'HubSpotCMS': [
      {
        name: 'HubSpot SEO Tools',
        description: 'Built-in SEO recommendations and monitoring',
        price: 'Included with HubSpot',
        recommended: true
      },
      {
        name: 'Google Search Console Integration',
        description: 'Direct integration for search performance data',
        price: 'Free',
        recommended: true
      }
    ],
    'Custom': [
      {
        name: 'Screaming Frog SEO Spider',
        description: 'Desktop crawler for technical SEO audits',
        price: 'Free up to 500 URLs / £149/year',
        recommended: true
      },
      {
        name: 'Google PageSpeed Insights API',
        description: 'Automated performance monitoring',
        price: 'Free',
        recommended: true
      }
    ]
  }
  
  return plugins[platformId] || []
}

function getCommonIssuesForPlatform(platformId) {
  const issues = {
    'WordPress': [
      {
        problem: 'Slow Page Loading',
        description: 'WordPress sites can become slow with many plugins and unoptimized themes',
        solution: 'Use a caching plugin, optimize images, choose a quality hosting provider, and limit plugin usage'
      },
      {
        problem: 'Duplicate Content',
        description: 'Category, tag, and author archives can create duplicate content issues',
        solution: 'Use canonical tags, noindex unnecessary archives, or use an SEO plugin to manage this automatically'
      },
      {
        problem: 'Poor URL Structure',
        description: 'Default permalinks use parameters instead of descriptive URLs',
        solution: 'Change permalink settings to "Post name" and set up proper redirects for any existing URLs'
      }
    ],
    'Shopify': [
      {
        problem: 'Limited URL Customization',
        description: 'Shopify forces /products/, /collections/, and /pages/ in URLs',
        solution: 'Work within the constraints by optimizing the customizable portion of URLs and using descriptive handles'
      },
      {
        problem: 'Duplicate Product Pages',
        description: 'Products in multiple collections can create duplicate content',
        solution: 'Use canonical tags (Shopify does this automatically) and ensure unique product descriptions'
      },
      {
        problem: 'Limited Blog Functionality',
        description: 'Basic blogging features compared to dedicated platforms',
        solution: 'Use apps to enhance blog functionality or consider a subdomain blog on another platform'
      }
    ],
    'HubSpotCMS': [
      {
        problem: 'Limited Technical Control',
        description: 'Less flexibility for advanced technical SEO implementations',
        solution: 'Work with HubSpot support for custom requirements and use HubL for advanced customizations'
      },
      {
        problem: 'URL Structure Changes',
        description: 'Changing URL structure can be complex',
        solution: 'Plan URL structure carefully from the start and use HubSpot\'s redirect tool for any necessary changes'
      }
    ],
    'Custom': [
      {
        problem: 'Lack of Built-in SEO Features',
        description: 'Everything must be built from scratch',
        solution: 'Create a comprehensive SEO checklist and implement features systematically, considering using existing libraries'
      },
      {
        problem: 'Maintenance Overhead',
        description: 'Ongoing updates and maintenance required',
        solution: 'Implement automated testing for SEO elements and create documentation for maintenance procedures'
      }
    ]
  }
  
  return issues[platformId] || issues['Custom']
} 