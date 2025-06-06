import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'

// Analytics tracking (replace with your preferred analytics)
function trackPageView(url) {
  // Add your analytics tracking here
  // gtag('config', 'GA_MEASUREMENT_ID', { page_path: url })
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageView(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
} 