import SEOHead from '../components/SEOHead'
import Link from 'next/link'

export default function Terms() {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "description": "Terms of Service for SEO by Role. Read our terms and conditions for using our website and SEO playbooks.",
    "url": "https://seobyrole.com/terms",
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
        title="Terms of Service - SEO by Role"
        description="Terms of Service for SEO by Role. By using our website and SEO playbooks, you agree to these terms and conditions. Read our complete terms of service."
        keywords="terms of service, terms and conditions, legal terms, SEO by Role terms"
        robots="index, follow, noarchive"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-sky dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Effective Date: {new Date().toLocaleDateString()}</strong>
            </p>
            
            <p className="text-gray-600 dark:text-gray-300">
              Welcome to SEO by Role. These Terms of Service ("Terms") govern your use of our website seobyrole.com and our SEO playbooks and resources (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              By accessing and using this Service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms, please do not use our Service.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              2. Use of Service
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Permitted Use
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300">
              You may use our Service for lawful purposes and in accordance with these Terms. You agree to use our SEO playbooks and resources solely for:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>Your personal professional development</li>
              <li>Implementing SEO strategies within your organization</li>
              <li>Educational purposes</li>
              <li>Any other lawful purpose consistent with these Terms</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Prohibited Use
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300">
              You agree NOT to:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 my-4">
              <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission</li>
              <li>Use the Service for any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>Violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Upload or transmit viruses or any other type of malicious code</li>
              <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>Use the Service in any way that could damage, disable, overburden, or impair the Service</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              3. Intellectual Property Rights
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              The Service and its original content, features, and functionality are and will remain the exclusive property of SEO by Role. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              4. User Content
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              Our Service may allow you to submit feedback, questions, or other content. You retain all rights to your content, but by submitting content to us, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content in connection with the Service.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              5. Privacy
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              Your use of our Service is also governed by our Privacy Policy. Please review our <Link href="/privacy" className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">Privacy Policy</Link>, which also governs the Site and informs users of our data collection practices.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              6. Disclaimers
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              No Professional Advice
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300">
              The information on this website is provided for general informational and educational purposes only. It is not intended as, and should not be understood or construed as, professional advice.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              No Guarantees
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300">
              We do not guarantee specific results from using our SEO playbooks or strategies. SEO results depend on many factors outside our control, including but not limited to search engine algorithm changes, competition, and implementation quality.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              7. Limitation of Liability
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              TO THE FULLEST EXTENT PERMITTED BY LAW, SEO BY ROLE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              8. Indemnification
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              You agree to defend, indemnify, and hold harmless SEO by Role and its affiliates, and their respective officers, directors, employees, and agents, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the Service.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              9. Termination
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              10. Changes to Terms
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              11. Governing Law
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              12. Contact Information
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300">
              If you have any questions about these Terms, please contact us at:
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-6">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>SEO by Role</strong><br />
                Email: <a href="mailto:legal@seobyrole.com" className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">legal@seobyrole.com</a><br />
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