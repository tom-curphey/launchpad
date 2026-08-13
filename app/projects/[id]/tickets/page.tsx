import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default async function ProjectTicketsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  const { id } = await params

  // Fetch project directly from Supabase
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single()

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
          <Link href="/dashboard" className="text-amber-400 hover:text-amber-300">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <Link href="/dashboard" className="text-amber-400 hover:text-amber-300">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { name: "Overview", href: `/projects/${id}`, current: false },
    { name: "Questions", href: `/projects/${id}/questions`, current: false },
    { name: "Tickets", href: `/projects/${id}/tickets`, current: true },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
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
              <h1 className="text-lg font-semibold">{project.name}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.status === 'completed' ? 'bg-green-900/50 text-green-300 border border-green-800' :
                project.status === 'active' ? 'bg-blue-900/50 text-blue-300 border border-blue-800' :
                'bg-zinc-800 text-zinc-300 border border-zinc-700'
              }`}>
                {project.status}
              </span>
            </div>
            <button className="px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-amber-500/50 hover:text-zinc-100 rounded-lg transition-colors font-medium">
              Sync to Linear
            </button>
          </div>

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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎫</div>
          <h2 className="text-2xl font-bold mb-2">Tickets Coming Soon</h2>
          <p className="text-zinc-400">
            Your AI-generated breakdown will appear here as actionable tickets.
          </p>
        </div>
      </main>
    </div>
  )
}
