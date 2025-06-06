import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SEOHead({ 
  title, 
  description, 
  keywords,
  canonical,
  robots = 'index, follow',
  ogImage = '/images/og-default.png',
  ogType = 'website',
  additionalMetaTags = [],
  structuredData
}) {
  const router = useRouter()
  const siteUrl = 'https://seobyrole.com'
  
  // Generate canonical URL if not provided
  const canonicalUrl = canonical || `${siteUrl}${router.asPath}`
  
  // Default meta description if not provided
  const metaDescription = description || 'The Strategic SEO Playbook - Empowering every role for organic growth. Discover personalized SEO strategies tailored to your position and drive sustainable business growth.'
  
  // Default title format
  const fullTitle = title ? `${title} | SEO by Role` : 'SEO by Role - The Strategic SEO Playbook for Every Professional'
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="SEO by Role" />
      
      {/* Robots Meta Tag */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Viewport and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0ea5e9" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:alt" content={title || 'SEO by Role'} />
      <meta property="og:site_name" content="SEO by Role" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:image:alt" content={title || 'SEO by Role'} />
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data / JSON-LD */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Default Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SEO by Role",
            "description": "The Strategic SEO Playbook - Empowering every role for organic growth",
            "url": siteUrl,
            "logo": `${siteUrl}/images/logo.png`,
            "sameAs": [
              "https://twitter.com/seobyrole",
              "https://linkedin.com/company/seobyrole",
              "https://github.com/seobyrole"
            ]
          })
        }}
      />
      
      {/* Preconnect to External Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Language Alternatives */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Head>
  )
} 