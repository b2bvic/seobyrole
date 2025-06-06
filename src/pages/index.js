import { useState } from 'react'
import Link from 'next/link'
import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  UserGroupIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

import Layout from '../components/layout/Layout'
import { getAllPlaybooks, getDepartments } from '../lib/playbooks'

export default function HomePage({ playbooks, departments }) {
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  
  const filteredPlaybooks = selectedDepartment 
    ? playbooks.filter(p => p.department === selectedDepartment.name)
    : playbooks.slice(0, 8) // Show first 8 by default

  const seoProps = {
    title: "SEO by Role - Strategic SEO Playbooks for Every Professional",
    description: "Discover personalized SEO strategies tailored to your professional role and seniority level. From sales to marketing, product to C-suite - get actionable SEO guidance that drives results.",
    keywords: "SEO strategy, digital marketing, search optimization, professional development, content marketing, organic growth, role-based SEO",
    canonicalUrl: "/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SEO by Role",
      "description": "Strategic SEO playbooks for every professional role and seniority level",
      "url": "https://seobyrole.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://seobyrole.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  }

  return (
    <Layout seoProps={seoProps} showSidebar={false}>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              SEO Strategy by{' '}
              <span className="text-primary-600 dark:text-primary-400">
                Professional Role
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Get personalized, actionable SEO strategies tailored to your specific role, seniority level, and industry. 
              From entry-level to C-suite, discover exactly what you need to drive organic growth.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/questionnaire"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Find My SEO Strategy
              </Link>
              <Link
                href="/playbooks"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Browse All Playbooks <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600 dark:text-gray-300">
              Professional Roles Covered
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {departments.length}
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600 dark:text-gray-300">
              SEO Playbooks Available
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {playbooks.length}
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600 dark:text-gray-300">
              Seniority Levels
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              3
            </dd>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">
              How It Works
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Your Path to SEO Success
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Follow our simple process to get personalized SEO strategies that actually work for your role and goals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <UserGroupIcon className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  1. Choose Your Role
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Select your department and seniority level, or take our quick questionnaire for personalized recommendations.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <ChartBarIcon className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  2. Get Your Playbook
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Receive a comprehensive SEO strategy with actionable tasks and execution steps tailored to your role.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <RocketLaunchIcon className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  3. Drive Results
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Implement the strategies and watch your organic growth accelerate with proven, role-specific tactics.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Department Filter */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Browse by Department
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Explore SEO strategies designed specifically for your professional area
          </p>
        </div>

        {/* Department Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedDepartment(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedDepartment === null
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            All Departments
          </button>
          {departments.map((dept) => (
            <button
              key={dept.slug}
              onClick={() => setSelectedDepartment(dept)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedDepartment?.slug === dept.slug
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {dept.name} ({dept.count})
            </button>
          ))}
        </div>

        {/* Playbooks Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlaybooks.map((playbook) => (
            <Link
              key={playbook.slug}
              href={playbook.path}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                    {playbook.department}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {playbook.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {playbook.description}
                </p>
                <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{playbook.seniority}</span>
                  <span className="mx-1">•</span>
                  <span>{playbook.role}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        {!selectedDepartment && playbooks.length > 8 && (
          <div className="mt-12 text-center">
            <Link
              href="/playbooks"
              className="inline-flex items-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              View All {playbooks.length} Playbooks
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 dark:bg-primary-900/20">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Ready to accelerate your SEO success?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Take our quick questionnaire to get a personalized SEO strategy that's tailored to your exact role, 
              goals, and industry.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/questionnaire"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get My Personalized Strategy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const playbooks = getAllPlaybooks()
  const departments = getDepartments()

  return {
    props: {
      playbooks,
      departments,
    },
  }
} 