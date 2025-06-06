import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { MagnifyingGlassIcon, DocumentTextIcon, UserGroupIcon, ChartBarIcon, SparklesIcon, BriefcaseIcon, PencilIcon, CodeBracketIcon, ChartPieIcon, UsersIcon } from '@heroicons/react/24/outline'
import SEOHead from '../components/seo/SEOHead'
import Layout from '../components/layout/Layout'
import appData from '../../appData.json'

// Department icons mapping
const departmentIcons = {
  Sales: BriefcaseIcon,
  Marketing: ChartBarIcon,
  Product: SparklesIcon,
  Development: CodeBracketIcon,
  Creative: PencilIcon,
  HR: UserGroupIcon,
  CSuite: ChartPieIcon
}

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [playbooks, setPlaybooks] = useState([])

  // Process departments and create playbooks
  useEffect(() => {
    const allPlaybooks = []
    
    Object.entries(appData.content).forEach(([dept, deptData]) => {
      if (deptData.introduction) {
        ['entry', 'manager', 'director'].forEach(level => {
          if (deptData[level]?.basePlaybook) {
            const playbook = deptData[level].basePlaybook
            allPlaybooks.push({
              slug: `${dept.toLowerCase()}-${level}`,
              department: dept,
              level: level,
              title: playbook.title,
              focus: playbook.focus.substring(0, 150) + '...',
              keyTakeaway: playbook.keyTakeaway,
              actionableTasks: playbook.actionableTasks || [],
              executionSteps: playbook.executionSteps || []
            })
          }
        })
      }
    })
    
    setPlaybooks(allPlaybooks)
  }, [])

  const filteredPlaybooks = selectedDepartment === 'all' 
    ? playbooks 
    : playbooks.filter(p => p.department === selectedDepartment)

  const stats = {
    totalPlaybooks: playbooks.length,
    departments: Object.keys(appData.content).length,
    seniorityLevels: 3,
    actionableStrategies: playbooks.reduce((acc, p) => acc + (p.actionableTasks?.length || 0), 0)
  }

  return (
    <>
      <SEOHead 
        title="SEO by Role - Strategic SEO Playbooks for Every Professional"
        description="Discover 21+ role-specific SEO strategies tailored for Sales, Marketing, Product, Development, Creative, HR, and C-Suite professionals. Transform your department into an organic growth engine."
        path="/"
      />
      
      <Layout>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Strategic SEO Playbooks for <span className="text-primary-600 dark:text-primary-400">Every Professional</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Transform your department into an organic growth engine with {stats.totalPlaybooks} role-specific SEO strategies across {stats.departments} departments and {stats.seniorityLevels} seniority levels.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="#playbooks"
                  className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Find Your SEO Strategy
                </Link>
                <Link href="/questionnaire" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Take the Assessment <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white dark:bg-gray-900 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">Total SEO Playbooks</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stats.totalPlaybooks}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">Departments Covered</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stats.departments}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">Seniority Levels</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stats.seniorityLevels}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">Actionable Strategies</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stats.actionableStrategies}+
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Department Filter */}
        <section id="playbooks" className="bg-gray-50 dark:bg-gray-800 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Select Your Department
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Filter playbooks by department to find strategies specific to your role
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedDepartment('all')}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  selectedDepartment === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                All Departments
              </button>
              {Object.keys(appData.content).map(dept => {
                const Icon = departmentIcons[dept] || DocumentTextIcon
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                      selectedDepartment === dept
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {dept}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Playbooks Grid */}
        <section className="bg-white dark:bg-gray-900 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlaybooks.map((playbook) => {
                const Icon = departmentIcons[playbook.department] || DocumentTextIcon
                const levelLabels = {
                  entry: 'Entry Level',
                  manager: 'Manager',
                  director: 'Director/VP'
                }
                
                return (
                  <Link
                    key={playbook.slug}
                    href={`/playbook/${playbook.slug}`}
                    className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {levelLabels[playbook.level]}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {playbook.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {playbook.focus}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        {playbook.actionableTasks.length} strategies
                      </span>
                      <span className="text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-1 transition-transform">
                        Learn more →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Core SEO Principles */}
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Core SEO Principles for Every Role
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Master these 5 fundamental principles to maximize your organic growth impact
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                      <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    1. Understand Your Audience's Search Intent
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      Every role has unique insights into customer language and pain points. Sales knows objections, marketing understands messaging, product grasps features users seek.
                    </p>
                    <p className="mt-6">
                      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        Action: Document exact customer phrases and questions weekly
                      </span>
                    </p>
                  </dd>
                </div>
                
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                      <DocumentTextIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    2. Create Content That Answers Real Questions
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      Transform internal knowledge into external value. Technical teams can demystify complex topics, HR can address career concerns, executives can share strategic insights.
                    </p>
                    <p className="mt-6">
                      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        Action: Turn FAQs into comprehensive content pieces
                      </span>
                    </p>
                  </dd>
                </div>
                
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                      <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    3. Measure Impact Beyond Rankings
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      Success means qualified leads for sales, brand awareness for marketing, talent attraction for HR. Define metrics that matter to your department's goals.
                    </p>
                    <p className="mt-6">
                      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        Action: Track conversions, not just traffic
                      </span>
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 dark:bg-primary-800">
          <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Transform Your Department's Organic Growth?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
                Get personalized SEO recommendations based on your specific role, seniority, and business objectives.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/questionnaire"
                  className="rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Take the Assessment
                </Link>
                <Link href="/core-principles" className="text-base font-semibold leading-7 text-white">
                  Learn Core Principles <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
} 