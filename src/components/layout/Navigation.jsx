import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false)
    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router.events])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const navItems = [
    { href: '/', label: 'Home', ariaLabel: 'Navigate to homepage' },
    { href: '/playbooks', label: 'All Playbooks', ariaLabel: 'Browse all SEO playbooks by role' },
    { href: '/questionnaire', label: 'Find My Strategy', ariaLabel: 'Take questionnaire to find personalized SEO strategy' },
    { href: '/core-principles', label: 'Core Principles', ariaLabel: 'Learn core SEO principles' },
    { href: '/about', label: 'About', ariaLabel: 'Learn about SEO by Role' },
  ]

  const isActiveLink = (href) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md transition-colors"
              aria-label="SEO by Role homepage"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span>SEO by Role</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    isActiveLink(item.href)
                      ? 'text-primary-700 bg-primary-50 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  )}
                  aria-label={item.ariaLabel}
                  aria-current={isActiveLink(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/questionnaire"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              aria-label="Start personalized SEO questionnaire"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden border-t border-gray-200 bg-white"
          id="mobile-menu"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mobile-menu-button"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  isActiveLink(item.href)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                )}
                role="menuitem"
                aria-label={item.ariaLabel}
                aria-current={isActiveLink(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Link
                href="/questionnaire"
                className="block w-full text-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                role="menuitem"
                aria-label="Start personalized SEO questionnaire"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navigation 