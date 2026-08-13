import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { ProjectDetailClient } from "./ProjectDetailClient"

async function getProject(id: string) {
  console.log('🔍 getProject called with ID:', id)

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  console.log('📡 Fetching from:', `${baseUrl}/api/projects/${id}`)

  const response = await fetch(`${baseUrl}/api/projects/${id}`, {
    cache: 'no-store'
  })

  console.log('📊 Response status:', response.status)

  if (!response.ok) {
    console.error('❌ Failed to fetch project')
    return null
  }

  const data = await response.json()
  console.log('✅ Project data received:', data)
  return data
}

function ProjectDetailContent({ project }: { project: any }) {
  const tabs = [
    { name: "Overview", href: `/projects/${project.id}`, current: true },
    { name: "Questions", href: `/projects/${project.id}/questions`, current: false },
    { name: "Tickets", href: `/projects/${project.id}/tickets`, current: false },
  ]

  // Format dates nicely
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const createdDate = formatDate(project.created_at)
  const updatedDate = formatDate(project.updated_at)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50">
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
              <h1 className="text-lg font-semibold truncate">{project.name}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.status === 'completed' ? 'bg-green-900/50 text-green-300 border border-green-800' :
                project.status === 'active' ? 'bg-blue-900/50 text-blue-300 border border-blue-800' :
                'bg-zinc-800 text-zinc-300 border border-zinc-700'
              }`}>
                {project.status}
              </span>
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

      {/* Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Project Description */}
          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-semibold">About This Project</h2>
              <div className="text-right text-sm text-zinc-500">
                {createdDate && (
                  <p>Created {createdDate}</p>
                )}
                {updatedDate && (
                  <p>Updated {updatedDate}</p>
                )}
              </div>
            </div>
            {project.description ? (
              <p className="text-zinc-400">{project.description}</p>
            ) : (
              <p className="text-zinc-500 italic">No description yet</p>
            )}
          </div>

          {/* Vision & Target Audience */}
          {(project.vision || project.target_audience) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.vision && (
                <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6">
                  <h3 className="text-sm font-medium text-zinc-300 mb-2">Vision</h3>
                  <p className="text-zinc-400 text-sm">{project.vision}</p>
                </div>
              )}
              {project.target_audience && (
                <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6">
                  <h3 className="text-sm font-medium text-zinc-300 mb-2">Target Audience</h3>
                  <p className="text-zinc-400 text-sm">{project.target_audience}</p>
                </div>
              )}
            </div>
          )}

          {/* Project Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
              <p className="text-zinc-400 text-sm">Userflows</p>
              <p className="text-2xl font-semibold mt-1">0</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
              <p className="text-zinc-400 text-sm">Features</p>
              <p className="text-2xl font-semibold mt-1">0</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
              <p className="text-zinc-400 text-sm">Tickets</p>
              <p className="text-2xl font-semibold mt-1">0</p>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-lg border border-amber-800/50 p-6">
            <h3 className="text-lg font-semibold mb-2">🚀 Get Started</h3>
            <p className="text-zinc-400 mb-4">
              Start by answering some guided questions to help shape your project.
            </p>
            <Link
              href={`/projects/${project.id}/questions`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all"
            >
              Answer Questions
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  console.log('📄 ProjectDetailPage rendering')
  const session = await auth()
  console.log('🔐 Session:', session?.user ? { email: session.user.email, name: session.user.name } : 'NO SESSION')

  if (!session?.user) {
    return null
  }

  const { id } = await params
  console.log('🎯 Project ID from params:', id)

  // Fetch project directly from Supabase (server-side)
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single()

  if (!user) {
    console.log('❌ No user found')
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
          <p className="text-zinc-400 mb-4">Setting up your account...</p>
        </div>
      </div>
    )
  }

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  console.log('📊 Project query result:', project ? `FOUND: ${project.name}` : `NOT FOUND (${error?.message})`)

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-zinc-400 mb-4">The project you're looking for doesn't exist or you don't have access to it.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ProjectDetailClient project={project}>
      <ProjectDetailContent project={project} />
    </ProjectDetailClient>
  )
}
