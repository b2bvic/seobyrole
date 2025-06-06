import { Fragment, useState, useEffect, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getAllPlaybooks, getCoreContent } from '../../lib/playbooks'
import FlexSearch from 'flexsearch'
import Highlighter from 'react-highlight-words'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Create search index
  const searchIndex = useMemo(() => {
    const index = new FlexSearch.Index({
      tokenize: 'forward',
      resolution: 9,
      depth: 3,
      bidirectional: true
    })

    // Index all playbooks
    const playbooks = getAllPlaybooks()
    const coreContent = getCoreContent()

    const allContent = [
      ...playbooks.map(playbook => ({
        id: playbook.slug,
        title: playbook.title,
        content: playbook.searchableContent,
        type: 'playbook',
        path: playbook.path,
        department: playbook.department,
        description: playbook.description
      })),
      // Add core content
      {
        id: 'core-principles',
        title: 'Core SEO Principles',
        content: 'SEO fundamentals, best practices, search engine optimization principles',
        type: 'guide',
        path: '/core-principles',
        department: 'Foundation',
        description: 'Essential SEO principles every professional should know'
      },
      {
        id: 'questionnaire',
        title: 'Find My SEO Strategy',
        content: 'personalized SEO strategy, questionnaire, role-based recommendations',
        type: 'tool',
        path: '/questionnaire',
        department: 'Tools',
        description: 'Take our questionnaire to get personalized SEO recommendations'
      }
    ]

    // Add content to index
    allContent.forEach((item, idx) => {
      index.add(idx, `${item.title} ${item.content} ${item.department}`)
    })

    return { index, content: allContent }
  }, [])

  // Search function
  const search = (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const searchResults = searchIndex.index.search(searchQuery, {
      limit: 10,
      suggest: true
    })

    const items = searchResults.map(id => searchIndex.content[id]).filter(Boolean)
    setResults(items)
    setSelectedIndex(0)
  }

  // Handle search input
  useEffect(() => {
    const timer = setTimeout(() => {
      search(query)
    }, 150)

    return () => clearTimeout(timer)
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].path)
            onClose()
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, router, onClose])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  const getIcon = (type) => {
    switch (type) {
      case 'playbook':
        return DocumentTextIcon
      case 'guide':
        return DocumentTextIcon
      case 'tool':
        return MagnifyingGlassIcon
      default:
        return DocumentTextIcon
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'playbook':
        return 'Playbook'
      case 'guide':
        return 'Guide'
      case 'tool':
        return 'Tool'
      default:
        return 'Content'
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all dark:bg-gray-800">
              <div className="relative">
                {/* Search Input */}
                <div className="flex items-center px-4 py-4">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    className="ml-3 h-6 w-full border-0 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-300"
                    placeholder="Search SEO playbooks, guides, and strategies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                </div>

                {/* Results */}
                {query && (
                  <div className="max-h-96 overflow-y-auto border-t border-gray-200 dark:border-gray-700">
                    {results.length > 0 ? (
                      <ul className="p-2">
                        {results.map((result, index) => {
                          const Icon = getIcon(result.type)
                          const isSelected = index === selectedIndex

                          return (
                            <li key={result.id}>
                              <Link
                                href={result.path}
                                onClick={onClose}
                                className={`flex items-start rounded-lg p-3 transition-colors ${
                                  isSelected
                                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                              >
                                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                <div className="ml-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">
                                      <Highlighter
                                        searchWords={query.split(' ')}
                                        textToHighlight={result.title}
                                        highlightClassName="bg-yellow-200 dark:bg-yellow-800"
                                      />
                                    </p>
                                    <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                      {getTypeLabel(result.type)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {result.department}
                                  </p>
                                  {result.description && (
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                      <Highlighter
                                        searchWords={query.split(' ')}
                                        textToHighlight={result.description}
                                        highlightClassName="bg-yellow-200 dark:bg-yellow-800"
                                      />
                                    </p>
                                  )}
                                </div>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    ) : (
                      <div className="px-6 py-14 text-center">
                        <MagnifyingGlassIcon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 text-sm text-gray-900 dark:text-white">
                          No results found for "{query}"
                        </p>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Try searching for terms like "sales SEO", "marketing strategy", or "technical SEO"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                {!query && (
                  <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Type to search through all SEO playbooks and guides
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                      <span>Navigate with ↑↓</span>
                      <span>Select with ↵</span>
                      <span>Close with esc</span>
                    </div>
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 