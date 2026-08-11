'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Sidebar configuration for Launchpad docs
interface DocItem {
  title: string;
  file: string;
  content: string;
}

interface DocCategory {
  title: string;
  items: DocItem[];
}

const sidebarConfig: DocCategory[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Launchpad Documentation',
        file: 'launchpad-documentation',
        content: `# 🚀 Launchpad Documentation

## Overview

**Launchpad** is an AI-assisted product development and project management platform that takes a product from idea to live.

### Core Value Proposition

- **Tell us your idea** — rough thought, brain dump, or vague concept
- **We help you develop the pitch** to customers and validate demand
- **Organise everything** into a clear, prioritised plan
- **Break it into small, human-doable tasks**
- **Review and test** code for reliability and scalability
- **Act on PRs** with real oversight
- **Govern the process** — see what's actually working
- **Evolve the product** based on what shipped

## The PAD Method

### P — Pitch
**Define what you're building.**

- Turn an idea into a clear product definition
- Explore user flows and requirements
- Validate product intent before building
- Stop guessing, start knowing

### A — Assemble
**Build it.**

- Turn definition into an executable roadmap
- Break down into achievable units
- Develop with controlled progress
- Technical testing and review

### D — Deploy
**Launch it.**

- User Acceptance Testing
- Production-readiness checks
- Routing and publishing
- Take it live safely
`,
      },
    ],
  },
  {
    title: 'Project Status',
    items: [
      {
        title: 'Current Phase',
        file: 'current-phase',
        content: `# Current Phase

## Phase 1: Landing Page ✅

**Status:** Complete

The landing page is live and includes:

- [x] Hero section with Launchpad branding
- [x] Problem section (pain points)
- [x] PAD Framework explanation
- [x] How Launchpad Works (detailed steps)
- [x] Footer with links
- [x] Metadata and favicon

## Upcoming Phases

### Phase 2: Authentication (Planned)
- User signup/login
- Team workspaces
- OAuth providers (Google, GitHub)

### Phase 3: Idea Input (Planned)
- Rough idea capture form
- Voice-to-text input
- File/document upload

### Phase 4: Validation Tools (Planned)
- Customer interview scripts
- Survey builder
- Feedback collection

### Phase 5: Planning & Organisation (Planned)
- Feature prioritisation matrix
- Dependency mapping
- Roadmap visualisation

### Phase 6: Linear Integration (Planned)
- Auto-create tickets from plans
- Sync status back to Launchpad

### Phase 7: Code Review & Testing (Planned)
- PR tracking dashboard
- Test coverage requirements

### Phase 8: Analytics & Governance (Planned)
- Success metrics dashboard
- Feature performance tracking

### Phase 9: Feedback & Evolution (Planned)
- Customer feedback collection
- A/B testing coordination
`,
      },
    ],
  },
  {
    title: 'Tech Stack',
    items: [
      {
        title: 'Technology Overview',
        file: 'tech-stack',
        content: `# Technology Stack

## Frontend

- **Framework**: Next.js 15+ (App Router, React Server Components)
- **Styling**: Tailwind CSS
- **Theme**: Zinc dark mode with amber/orange gradients

## Backend (Planned)

- **API**: Next.js API Routes / Server Actions
- **Database**: TBD (Supabase, Neon, or similar)
- **Task Management**: Linear API integration
- **Code Integration**: GitHub API integration

## External Integrations (Planned)

- **Linear API** — Ticket creation, status updates, project management
- **GitHub API** — PR tracking, code review, status syncing
- **Slack** — Notifications, updates, team coordination (optional)

## Why Next.js?

- **App Router** — Modern React with Server Components
- **API Routes** — Full-stack in one repo
- **Vercel deployment** — Zero-config hosting
- **Great DX** — Fast refresh, TypeScript support

## Why Linear Integration?

- **Best-in-class PM tool** — Clean, fast, developer-focused
- **Great API** — Easy ticket creation and syncing
- **Our target users** — Dev teams already using Linear

## Why GitHub Integration?

- **Where code lives** — PRs are the actual work
- **Status tracking** — Connect tasks to PRs
- **Code review workflow** — Built into GitHub
`,
      },
    ],
  },
];

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<string>('launchpad-documentation');
  const [docContent, setDocContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Getting Started']));

  // Load doc content
  useEffect(() => {
    const loadDoc = async () => {
      setIsLoading(true);

      // For full documentation, fetch from API
      if (selectedDoc === 'launchpad-documentation') {
        try {
          const response = await fetch(`/api/docs?doc=launchpad-documentation`);
          const data = await response.json();
          if (data.content) {
            setDocContent(data.content);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Failed to fetch doc:', error);
        }
      }

      // Fall back to hardcoded content for other docs
      const category = sidebarConfig.flatMap((cat) => cat.items).find((item) => item.file === selectedDoc);
      if (category) {
        setDocContent(category.content);
      }
      setIsLoading(false);
    };

    loadDoc();
  }, [selectedDoc]);

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryTitle)) {
        next.delete(categoryTitle);
      } else {
        next.add(categoryTitle);
      }
      return next;
    });
  };

  const currentDoc = sidebarConfig.flatMap((cat) => cat.items).find((d) => d.file === selectedDoc);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-zinc-900"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl">
                🚀
              </div>
              <span className="font-semibold text-zinc-100">Launchpad Docs</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/tom-curphey/launchPad"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-zinc-900"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 z-40
            h-[calc(100vh-4rem)]
            w-72
            bg-zinc-950
            border-r border-zinc-800
            overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4">
            {sidebarConfig.map((category) => {
              const isExpanded = expandedCategories.has(category.title);
              return (
                <div key={category.title} className="mb-4">
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:bg-zinc-900 rounded-md transition-colors duration-200"
                  >
                    <span>{category.title}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <ul className="space-y-1 mt-1 ml-2">
                      {category.items.map((item) => {
                        const isActive = selectedDoc === item.file;
                        return (
                          <li key={item.file}>
                            <button
                              onClick={() => setSelectedDoc(item.file)}
                              className={`
                                w-full text-left px-3 py-2 rounded-md text-sm
                                transition-colors duration-200
                                ${
                                  isActive
                                    ? 'bg-amber-900/30 text-amber-400 font-medium'
                                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300'
                                }
                              `}
                            >
                              {item.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-zinc-500">Loading documentation...</div>
              </div>
            ) : currentDoc ? (
              <article className="prose prose-invert prose-amber max-w-none">
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(docContent),
                  }}
                />
              </article>
            ) : null}
          </div>

          {/* Table of Contents (on desktop, right side) */}
          {currentDoc && (
            <div className="hidden xl:block fixed right-0 top-16 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-zinc-900 border-l border-zinc-800">
              <div className="p-6">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  On this page
                </h3>
                <TableOfContents content={docContent} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Table of contents component
function TableOfContents({ content }: { content: string }) {
  const headings = content.match(/^#{2,3} .+$/gm) || [];

  if (headings.length === 0) return null;

  return (
    <ul className="space-y-2">
      {headings.map((heading, index) => {
        const level = heading.match(/^#+/)?.[0].length || 0;
        const text = heading.replace(/^#{2,3} /, '');
        const id = text.toLowerCase().replace(/\s+/g, '-');
        const indent = level - 2;

        return (
          <li key={index} style={{ paddingLeft: `${indent * 0.75}rem` }}>
            <a
              href={`#${id}`}
              className="text-sm text-zinc-500 hover:text-amber-400 hover:underline transition-colors"
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// Enhanced markdown renderer
function renderMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Escape HTML tags first
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Code blocks (must be before inline code)
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre class="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm my-4 border border-zinc-800"><code class="language-${lang || 'text'}">${code}</code></pre>`
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 bg-zinc-900 rounded text-sm text-amber-400">$1</code>'
  );

  // Headers with IDs for anchor links
  html = html.replace(
    /^#### (.*)$/gm,
    '<h4 id="$1" class="scroll-mt-16 font-semibold text-lg mt-6 mb-2 text-zinc-100">$1</h4>'
  );
  html = html.replace(
    /^### (.*)$/gm,
    '<h3 id="$1" class="scroll-mt-16 font-semibold text-xl mt-8 mb-3 text-zinc-100">$1</h3>'
  );
  html = html.replace(
    /^## (.*)$/gm,
    '<h2 id="$1" class="scroll-mt-16 font-semibold text-2xl mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">$1</h2>'
  );
  html = html.replace(
    /^# (.*)$/gm,
    '<h1 id="$1" class="scroll-mt-16 font-bold text-3xl mt-12 mb-6 text-zinc-100">$1</h1>'
  );

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-amber-400 hover:text-amber-300 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Blockquotes
  html = html.replace(
    /^&gt; (.*)$/gm,
    '<blockquote class="border-l-4 border-amber-600 pl-4 italic my-4 text-zinc-400">$1</blockquote>'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-zinc-800" />');

  // Unordered lists
  html = html.replace(/^- (.*)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(
    /(<li[^>]*>.*<\/li>\n?)+/g,
    (match) => `<ul class="list-disc my-4 pl-6 space-y-1">${match}</ul>`
  );

  // Ordered lists
  html = html.replace(/^\d+\. (.*)$/gm, '<oli class="ml-4">$1</oli>');
  html = html.replace(
    /(<oli[^>]*>.*<\/oli>\n?)+/g,
    (match) => `<ol class="list-decimal my-4 pl-6 space-y-1">${match.replace(/<\/?oli>/g, '<li>')}</ol>`
  );

  // Checkboxes
  html = html.replace(/^- \[x\] (.*)$/gim, '<li class="ml-4"><input type="checkbox" checked disabled class="mr-2"> $1</li>');
  html = html.replace(/^- \[ \] (.*)$/gim, '<li class="ml-4"><input type="checkbox" disabled class="mr-2"> $1</li>');

  // Line breaks and paragraphs
  html = html.replace(/\n\n+/g, '</p><p class="my-4 leading-relaxed text-zinc-400">');
  html = '<p class="my-4 leading-relaxed text-zinc-400">' + html + '</p>';

  // Clean up empty paragraphs and fix nesting
  html = html
    .replace(/<p class="my-4 leading-relaxed text-zinc-400"><\/p>/g, '')
    .replace(
      /<p class="my-4 leading-relaxed text-zinc-400">(<(h[1-6]|ul|ol|li|blockquote|hr|pre))>/g,
      '<$1>'
    )
    .replace(/(<\/(h[1-6]|ul|ol|li|blockquote|hr|pre)>)<\/p>/g, '$1');

  return html;
}
