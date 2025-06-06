import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import { 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'

import SEOHead from '../seo/SEOHead'
import SearchModal from '../ui/SearchModal'
import { getNavigationStructure } from '../../lib/playbooks'

function Logo({ className = "h-8 w-auto" }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">S</span>
      </div>
      <span className="font-bold text-xl text-gray-900 dark:text-white">SEO by Role</span>
    </div>
  )
}

function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <MoonIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </div>
  )
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const router = useRouter()

  const navigation = getNavigationStructure()

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false)
    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router.events])

  // Handle keyboard shortcuts
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setSearchModalOpen(true)
      }
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        setSearchModalOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const isActiveLink = (href) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-4 shadow-md shadow-gray-900/5 transition duration-500 sm:px-6 lg:px-8',
          'dark:bg-gray-900 dark:shadow-none',
          isScrolled && 'dark:bg-gray-900/95 dark:backdrop-blur-sm'
        )}
      >
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="relative flex grow basis-0 items-center">
          <Link href="/" aria-label="Home page">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>

        {/* Search */}
        <div className="-my-2 mr-6 sm:mr-8 md:mr-0">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 lg:w-auto lg:px-3 lg:py-2"
            onClick={() => setSearchModalOpen(true)}
            aria-label="Search documentation"
          >
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <span className="ml-2 hidden text-sm text-gray-600 dark:text-gray-300 lg:block">
              Search...
              <kbd className="ml-2 font-mono text-xs text-gray-400">⌘K</kbd>
            </span>
          </button>
        </div>

        {/* Actions */}
        <div className="relative flex basis-0 justify-end gap-4 sm:gap-6 md:grow">
          <ThemeSelector />
          <Link
            href="/questionnaire"
            className="hidden rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 sm:block"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white p-6 dark:bg-gray-900">
            <nav className="space-y-4">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'block py-2 text-base font-medium transition-colors',
                    isActiveLink(item.href)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Departments</h3>
                <div className="mt-2 space-y-2">
                  {navigation.departments.map((dept) => (
                    <Link
                      key={dept.slug}
                      href={dept.path}
                      className="block py-1 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      {dept.name} ({dept.count})
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/questionnaire"
                  className="block w-full rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </>
  )
}

function Sidebar() {
  const navigation = getNavigationStructure()
  const router = useRouter()

  const isActiveLink = (href) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  return (
    <div className="hidden lg:relative lg:block lg:flex-none">
      <div className="absolute inset-y-0 right-0 w-[50vw] bg-gray-50 dark:hidden" />
      <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block" />
      <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-gray-800 dark:block" />
      <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
        <nav aria-labelledby="sidebar-navigation">
          <h2 id="sidebar-navigation" className="sr-only">
            Site navigation
          </h2>
          
          {/* Main Navigation */}
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Main
            </h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block rounded-md px-2 py-1 text-sm font-medium transition-colors',
                      isActiveLink(item.href)
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              By Department
            </h3>
            <ul className="space-y-2">
              {navigation.departments.map((dept) => (
                <li key={dept.slug}>
                  <Link
                    href={dept.path}
                    className={clsx(
                      'block rounded-md px-2 py-1 text-sm transition-colors',
                      isActiveLink(dept.path)
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                    )}
                  >
                    <span>{dept.name}</span>
                    <span className="ml-2 text-xs text-gray-400">({dept.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default function Layout({ 
  children, 
  seoProps = {},
  showSidebar = true,
  maxWidth = "max-w-8xl"
}) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <>
      <SEOHead {...seoProps} />
      <div className="flex w-full flex-col bg-white dark:bg-gray-900">
        <Header />

        <div className={`relative mx-auto flex w-full ${maxWidth} flex-auto justify-center sm:px-2 lg:px-8 xl:px-12`}>
          {showSidebar && <Sidebar />}
          <div className={clsx(
            'min-w-0 flex-auto',
            showSidebar ? 'max-w-2xl lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16' : 'px-4 sm:px-6 lg:px-8'
          )}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
} 