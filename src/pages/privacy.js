import SEOHead from '../components/SEOHead'
import Link from 'next/link'

export default function Privacy() {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "Privacy Policy for SEO by Role. Learn how we collect, use, and protect your personal information.",
    "url": "https://seobyrole.com/privacy",
    "dateModified": new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "SEO by Role",
      "url": "https://seobyrole.com"
    }
  }
  
  return (
    <>
      <SEOHead
        title="Privacy Policy - SEO by Role"
        description="Privacy Policy for SEO by Role. We are committed to protecting your privacy and personal information. Learn about our data collection and usage practices."
        keywords="privacy policy, data protection, personal information, SEO by Role privacy"
        robots="index, follow, noarchive"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-sky dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
            </p>
            
            <p className="text-gray-600 dark:text-gray-300">
              SEO by Role ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website seobyrole.com.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Information You Provide
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300">
              We may collect personal information that you voluntarily provide when you:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>Fill out the SEO strategy questionnaire</li>
              <li>Contact us through our contact form</li>
              <li>Subscribe to our newsletter (if applicable)</li>
              <li>Participate in surveys or feedback forms</li>
            </ul>
            
            <p className="text-gray-600 dark:text-gray-300">
              This information may include:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>Name and email address</li>
              <li>Professional information (department, role, seniority level)</li>
              <li>Business goals and objectives</li>
              <li>Any other information you choose to provide</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Automatically Collected Information
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300">
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages visited and time spent</li>
              <li>Click patterns and interactions</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              How We Use Your Information
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              We use the information we collect to:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>Provide personalized SEO strategy recommendations</li>
              <li>Improve our website and user experience</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send you relevant information about SEO strategies (with your consent)</li>
              <li>Analyze website usage and optimize our content</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Cookies and Tracking Technologies
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              We use cookies and similar tracking technologies to:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>Remember your preferences (such as dark mode)</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve website functionality</li>
              <li>Provide personalized content</li>
            </ul>
            
            <p className="text-gray-600 dark:text-gray-300">
              You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our website.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Data Sharing and Disclosure
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              We do not sell, trade, or otherwise transfer your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>With service providers who assist in operating our website</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect our rights, property, or safety</li>
              <li>With your explicit consent</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Data Security
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Your Rights
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              You have the right to:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Children's Privacy
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Changes to This Policy
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Contact Us
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-6">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>SEO by Role</strong><br />
                Email: <a href="mailto:privacy@seobyrole.com" className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">privacy@seobyrole.com</a><br />
                Website: <Link href="/" className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">https://seobyrole.com</Link>
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 