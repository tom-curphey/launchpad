import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"

// Helper to ensure user exists in Supabase
async function ensureUser(email: string, name: string, image?: string | null) {
  const { data: user, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single()

  if (user) {
    return user
  }

  const { data: newUser, error: createError } = await supabase
    .from("users")
    .insert({
      email,
      name,
      avatar_url: image,
      username: email.split("@")[0],
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (createError) {
    throw new Error("Failed to create user")
  }

  return newUser
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await ensureUser(session.user.email, session.user.name, session.user.image)

    const body = await request.json()
    const { questionId, answer } = body

    if (!questionId || answer === undefined) {
      return NextResponse.json(
        { error: 'questionId and answer are required' },
        { status: 400 }
      )
    }

    // Get current project
    const { data: project } = await supabase
      .from('projects')
      .select('id, pitch_answers')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update the pitch_answers JSONB
    const currentAnswers = (project.pitch_answers as Record<string, string>) || {}
    const updatedAnswers = {
      ...currentAnswers,
      [questionId]: answer,
    }

    const { error: updateError } = await supabase
      .from('projects')
      .update({ pitch_answers: updatedAnswers })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating pitch_answers:', updateError)
      return NextResponse.json(
        { error: 'Failed to save answer' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, answers: updatedAnswers })
  } catch (error) {
    console.error('Error in pitch-answers API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await ensureUser(session.user.email, session.user.name, session.user.image)

    const { data: project } = await supabase
      .from('projects')
      .select('id, pitch_answers')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      answers: (project.pitch_answers as Record<string, string>) || {},
    })
  } catch (error) {
    console.error('Error in pitch-answers GET API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
