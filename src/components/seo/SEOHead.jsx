import Head from 'next/head'

const SEOHead = ({
  title = "SEO by Role - Strategic SEO Playbooks for Every Professional",
  description = "Discover personalized SEO strategies tailored to your professional role and seniority level. From sales to marketing, product to C-suite - get actionable SEO guidance that drives results.",
  keywords = "SEO strategy, digital marketing, search optimization, professional development, content marketing, organic growth",
  canonicalUrl,
  ogImage = "/images/og-image.jpg",
  structuredData,
  noIndex = false,
  articleData,
  breadcrumbData,
}) => {
  const siteUrl = "https://seobyrole.com" // Update with your actual domain
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl
  
  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SEO by Role",
    "description": description,
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "sameAs": [
      // Add your social media profiles here
    ]
  }

  // Article structured data
  const articleStructuredData = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "SEO by Role"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SEO by Role",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo.png`
      }
    },
    "datePublished": articleData.datePublished,
    "dateModified": articleData.dateModified || articleData.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullCanonicalUrl
    },
    "image": `${siteUrl}${ogImage}`
  } : null

  // Breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbData ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbData.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`
    }))
  } : null

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="SEO by Role" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={articleData ? "article" : "website"} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="SEO by Role" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional Meta Tags for SEO */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://rsms.me" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
      />
      
      {/* Article structured data if provided */}
      {articleStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
      )}
      
      {/* Breadcrumb structured data if provided */}
      {breadcrumbStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
      )}
    </Head>
  )
}

export default SEOHead 