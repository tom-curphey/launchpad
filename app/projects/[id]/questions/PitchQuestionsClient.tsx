'use client'

import { useState, useEffect, useRef } from 'react'
import { PITCH_SECTIONS } from '@/lib/pitch-questions'
import Link from 'next/link'

// Auto-resize textarea component
function AutoResizeTextarea({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
}: {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  placeholder?: string
  className?: string
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto'

    // Calculate new height
    const newHeight = textarea.scrollHeight
    const maxHeight = 200 // Max height in pixels before scroll

    if (newHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.height = `${newHeight}px`
      textarea.style.overflowY = 'hidden'
    }
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      className={className}
    />
  )
}

interface PitchAnswers {
  [questionId: string]: string
}

interface PitchQuestionsClientProps {
  projectId: string
  projectName: string
  initialAnswers: PitchAnswers
}

export function PitchQuestionsClient({
  projectId,
  projectName,
  initialAnswers,
}: PitchQuestionsClientProps) {
  const [answers, setAnswers] = useState<PitchAnswers>(initialAnswers)
  const [activeSection, setActiveSection] = useState<string>('mvp-questions')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['mvp-questions'])
  )
  const [saving, setSaving] = useState(false)
  const [currentScrollSection, setCurrentScrollSection] = useState<string>('mvp-questions')

  // Track scroll position for sidebar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = PITCH_SECTIONS.map(s => s.id)
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(`section-${sectionId}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setCurrentScrollSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleAnswerBlur = async (questionId: string, answer: string) => {
    try {
      setSaving(true)
      const response = await fetch(`/api/projects/${projectId}/pitch-answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, answer }),
      })

      if (!response.ok) {
        console.error('Failed to save answer')
      }
    } catch (error) {
      console.error('Error saving answer:', error)
    } finally {
      setSaving(false)
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const jumpToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setExpandedSections(prev => new Set(prev).add(sectionId))

    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      // Scroll the section to the top of the viewport
      const yOffset = -180 // Offset for header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Count answered questions per section
  const getSectionProgress = (sectionId: string) => {
    const section = PITCH_SECTIONS.find(s => s.id === sectionId)
    if (!section) return { answered: 0, total: 0 }

    const total = section.questions.length
    const answered = section.questions.filter(q => answers[q.id]?.trim()).length

    return { answered, total }
  }

  const totalAnswered = PITCH_SECTIONS.reduce(
    (sum, section) => sum + getSectionProgress(section.id).answered,
    0
  )
  const totalQuestions = PITCH_SECTIONS.reduce(
    (sum, section) => sum + section.questions.length,
    0
  )
  const progressPercent = Math.round((totalAnswered / totalQuestions) * 100)

  const tabs = [
    { name: 'Overview', href: `/projects/${projectId}`, current: false },
    { name: 'Questions', href: `/projects/${projectId}/questions`, current: true },
    { name: 'Tickets', href: `/projects/${projectId}/tickets`, current: false },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div className="h-8 w-px bg-zinc-800" />
              <div>
                <h1 className="text-lg font-semibold">{projectName}</h1>
                <p className="text-xs text-zinc-500">Pitch Questions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <p className="text-zinc-400">
                  {totalAnswered} of {totalQuestions} answered
                </p>
                <div className="w-32 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {saving && (
                  <p className="text-xs text-amber-500 mt-1">Saving...</p>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-zinc-800">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  tab.current
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              {PITCH_SECTIONS.map((section) => {
                const progress = getSectionProgress(section.id)
                const isActive = currentScrollSection === section.id

                return (
                  <button
                    key={section.id}
                    onClick={() => jumpToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{section.title}</span>
                      <span className={`text-xs ${
                        isActive ? 'text-amber-400' : 'text-zinc-500'
                      }`}>
                        {progress.answered}/{progress.total}
                      </span>
                    </div>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-6" style={{ marginBottom: '1000px' }}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Pitch Questions</h2>
              <p className="text-zinc-400">
                Answer these questions to clarify your product vision. Your answers will help us build your landing page and scope your MVP.
              </p>
            </div>

            {PITCH_SECTIONS.map((section) => {
              const isExpanded = expandedSections.has(section.id)
              const progress = getSectionProgress(section.id)

              return (
                <div
                  key={section.id}
                  id={`section-${section.id}`}
                  className="scroll-mt-24"
                >
                  {/* Section Header / Accordion Toggle */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all group"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {section.title}
                      </h3>
                      {section.description && (
                        <p className="text-sm text-zinc-500 mt-1">{section.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-zinc-500">
                        {progress.answered}/{progress.total}
                      </span>
                      <svg
                        className={`h-5 w-5 text-zinc-500 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Section Content */}
                  {isExpanded && (
                    <div className="p-4 space-y-6">
                      {section.questions.map((question) => {
                        const answer = answers[question.id] || ''

                        return (
                          <div key={question.id}>
                            <label className="block mb-2">
                              <span className="text-sm font-medium text-zinc-300">
                                {question.question}
                              </span>
                            </label>
                            <AutoResizeTextarea
                              value={answer}
                              onChange={(value) => handleAnswerChange(question.id, value)}
                              onBlur={() => handleAnswerBlur(question.id, answer)}
                              placeholder={question.placeholder || 'Enter your answer...'}
                              className="w-full bg-zinc-950/50 border-l-2 border-zinc-700 border-t-0 border-r-0 border-b-0 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-0 focus:border-l-amber-500 resize-none rounded-none overflow-hidden min-h-[80px]"
                            />
                            {question.hint && (
                              <p className="mt-2 text-xs text-zinc-500">{question.hint}</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </main>
        </div>
      </div>
    </div>
  )
}
