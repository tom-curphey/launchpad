import { auth, signOut } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { ProjectListClient } from "./ProjectListClient"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  // Fetch projects directly using Supabase (server-side, has access to session)
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single()

  if (!user) {
    console.log('❌ No user found for:', session.user.email)
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-zinc-400">Setting up your account...</p>
        </div>
      </div>
    )
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  console.log('✅ Projects fetched for dashboard:', projects?.length || 0)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-2xl">
              🚀
            </div>
            <h1 className="text-3xl font-bold">Welcome to Launchpad</h1>
          </div>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button
              type="submit"
              className="rounded-lg px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-amber-500/50 hover:text-zinc-100 transition-colors font-semibold"
            >
              Sign out
            </button>
          </form>
        </div>

        <ProjectListClient initialProjects={projects || []} />
      </div>
    </div>
  )
}
