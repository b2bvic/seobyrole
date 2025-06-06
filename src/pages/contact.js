import SEOHead from '../components/SEOHead'
import { EnvelopeIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact SEO by Role",
    "description": "Get in touch with SEO by Role for questions, feedback, or custom SEO strategy consultation.",
    "url": "https://seobyrole.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "SEO by Role",
      "email": "hello@seobyrole.com",
      "url": "https://seobyrole.com"
    }
  }
  
  return (
    <>
      <SEOHead
        title="Contact Us - SEO by Role"
        description="Contact SEO by Role for questions about our SEO playbooks, custom strategy consultation, or partnership opportunities. We're here to help you succeed."
        keywords="contact SEO by Role, SEO consultation, SEO help, SEO questions, SEO support"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-8 text-center">
              Contact Us
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center">
              Have questions about our SEO playbooks? Need help finding the right strategy? We're here to help.
            </p>
            
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mx-auto mb-4">
                  <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Send us a message at<br />
                  <a href="mailto:hello@seobyrole.com" className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">
                    hello@seobyrole.com
                  </a>
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mx-auto mb-4">
                  <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Feedback
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Share your thoughts on how we can improve our playbooks
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 mx-auto mb-4">
                  <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get help with implementing your SEO strategy
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Get in Touch
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Select your department</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="product">Product</option>
                    <option value="development">Development</option>
                    <option value="creative">Creative</option>
                    <option value="hr">HR</option>
                    <option value="csuite">C-Suite</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h3>
              
              <div className="text-left space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How do I find the right SEO playbook for me?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Take our quick questionnaire to get a personalized recommendation based on your role, experience level, and goals.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I get custom SEO consulting?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Yes! Contact us to discuss custom SEO strategy development tailored to your organization's specific needs.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How often are the playbooks updated?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We continuously update our playbooks to reflect the latest SEO best practices and algorithm changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 