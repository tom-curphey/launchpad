import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"

// Helper to ensure user exists in Supabase
async function ensureUser(email: string, name: string, image?: string | null) {
  // Try to get existing user using anon key (respects RLS)
  const { data: user, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single()

  if (user) {
    return user
  }

  // User doesn't exist, create them
  console.log("User not found in Supabase, creating...")
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
    console.error("Error creating user:", createError)
    throw new Error("Failed to create user")
  }

  return newUser
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('📥 GET /api/projects/[id] - ID:', params.id)
    const session = await auth()

    console.log('🔐 Session:', session?.user ? { email: session.user.email } : 'NO SESSION')

    if (!session?.user) {
      console.log('❌ No session - returning 401')
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Ensure user exists in Supabase
    console.log('👤 Ensuring user exists')
    const user = await ensureUser(session.user.email, session.user.name, session.user.image)
    console.log('✅ User ID:', user.id)

    console.log('📊 Fetching project:', params.id, 'for user:', user.id)
    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (error) {
      console.error("❌ Error fetching project:", error)
      return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
    }

    if (!project) {
      console.log('❌ Project not found')
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    console.log('✅ Project found:', project.name)
    return NextResponse.json(project)
  } catch (error) {
    console.error("💥 Error in project API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Ensure user exists in Supabase
    const user = await ensureUser(session.user.email, session.user.name, session.user.image)

    const body = await request.json()

    const { data: project, error } = await supabase
      .from("projects")
      .update({
        name: body.name,
        description: body.description || null,
        status: body.status,
        vision: body.vision || null,
        target_audience: body.target_audience || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating project:", error)
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
    }

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error in project update API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
