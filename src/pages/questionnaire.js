import { useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import SEOHead from '../components/seo/SEOHead'
import Layout from '../components/layout/Layout'
import appData from '../../appData.json'

export default function Questionnaire() {
  const router = useRouter()
  const [answers, setAnswers] = useState({})
  const [currentQuestionId, setCurrentQuestionId] = useState(appData.questionnaire.initialQuestionId)
  const [history, setHistory] = useState([])
  
  const currentQuestion = appData.questionnaire.questions[currentQuestionId]
  
  const handleAnswer = (option) => {
    // Save answer
    const newAnswers = {
      ...answers,
      [option.dimension]: option.value
    }
    setAnswers(newAnswers)
    
    // Add to history
    setHistory([...history, currentQuestionId])
    
    // Check if final question
    if (option.isFinal) {
      // Generate recommendation
      const recommendation = generateRecommendation(newAnswers)
      router.push(`/playbook/${recommendation}`)
    } else {
      // Move to next question
      setCurrentQuestionId(option.nextQuestionId)
    }
  }
  
  const handleBack = () => {
    if (history.length > 0) {
      const previousId = history[history.length - 1]
      setHistory(history.slice(0, -1))
      setCurrentQuestionId(previousId)
    }
  }
  
  const generateRecommendation = (userAnswers) => {
    // Map questionnaire answers to playbook slug
    const departmentMap = {
      'Sales': 'sales',
      'Marketing': 'marketing',
      'Development': 'development',
      'Creative': 'creative',
      'Product': 'product',
      'HR': 'hr',
      'CSuite': 'csuite'
    }
    
    const seniorityMap = {
      'entry': 'entry',
      'manager': 'manager',
      'director': 'director'
    }
    
    const dept = departmentMap[userAnswers.department] || 'marketing'
    const level = seniorityMap[userAnswers.seniority] || 'entry'
    
    return `${dept}-${level}`
  }
  
  const progress = ((Object.keys(answers).length / Object.keys(appData.questionnaire.questions).length) * 100).toFixed(0)
  
  return (
    <>
      <SEOHead 
        title="Find Your SEO Strategy - Personalized Assessment | SEO by Role"
        description="Take our 2-minute assessment to get personalized SEO strategies tailored to your role, seniority level, and business objectives. Get actionable recommendations instantly."
        path="/questionnaire"
      />
      
      <Layout>
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Find Your SEO Strategy
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Answer {Object.keys(appData.questionnaire.questions).length} quick questions to get personalized SEO recommendations
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Question Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            {currentQuestion && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                  {currentQuestion.text}
                </h2>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {option.text}
                        </span>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Back Button */}
                {history.length > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Back to previous question
                  </button>
                )}
              </>
            )}
          </div>
          
          {/* Current Answers Summary */}
          {Object.keys(answers).length > 0 && (
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Profile So Far:
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(answers).map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/50 px-3 py-1 text-sm font-medium text-primary-700 dark:text-primary-300"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Benefits */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400">
                <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                2 Minutes
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Quick assessment tailored to your needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400">
                <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                Personalized Strategy
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Get recommendations specific to your role
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400">
                <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                Instant Results
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Access your playbook immediately
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

// Disable SSR to avoid build errors
export const getServerSideProps = async () => {
  return { props: {} }
} 