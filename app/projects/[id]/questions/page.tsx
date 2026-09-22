import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { PitchQuestionsClient } from "./PitchQuestionsClient"

export default async function ProjectQuestionsPage({ params }: { params: Promise<{ id: string }> }) {
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
          <a href="/dashboard" className="text-amber-400 hover:text-amber-300">
            Back to Dashboard
          </a>
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
          <a href="/dashboard" className="text-amber-400 hover:text-amber-300">
            Back to Dashboard
          </a>
        </div>
      </div>
    )
  }

  // Get existing answers
  const initialAnswers = (project.pitch_answers as Record<string, string>) || {}

  return (
    <PitchQuestionsClient
      projectId={project.id}
      projectName={project.name}
      initialAnswers={initialAnswers}
    />
  )
}
