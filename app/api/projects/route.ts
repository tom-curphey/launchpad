import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"

// Helper to ensure user exists in Supabase
async function ensureUser(email: string, name: string, image?: string | null) {
  console.log('🔍 ensureUser called for:', email)

  // Try to get existing user using anon key (respects RLS)
  const { data: user, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single()

  console.log('👤 User lookup result:', user ? `FOUND: ${user.id}` : `NOT FOUND (${error?.message})`)

  if (user) {
    return user
  }

  // User doesn't exist, create them
  console.log("🆕 User not found in Supabase, creating...")
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
    console.error("❌ Error creating user:", createError)
    throw new Error("Failed to create user")
  }

  console.log("✅ User created:", newUser.id)
  return newUser
}

// GET all projects for the current user
export async function GET(request: NextRequest) {
  try {
    console.log('📥 GET /api/projects - Start')
    const session = await auth()

    console.log('🔐 Session:', session?.user ? { email: session.user.email, name: session.user.name } : 'NO SESSION')

    if (!session?.user) {
      console.log('❌ No session - returning 401')
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Ensure user exists in Supabase
    console.log('👤 Ensuring user exists:', session.user.email)
    const user = await ensureUser(session.user.email, session.user.name, session.user.image)
    console.log('✅ User found/created:', user.id)

    console.log('📊 Fetching projects for user_id:', user.id)
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Error fetching projects:", error)
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }

    console.log('✅ Projects found:', projects?.length || 0, projects)
    return NextResponse.json(projects || [])
  } catch (error) {
    console.error("💥 Error in projects API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST create a new project
export async function POST(request: NextRequest) {
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
      .insert({
        user_id: user.id,
        name: body.name,
        description: body.description || null,
        status: body.status || "draft",
        vision: body.vision || null,
        target_audience: body.target_audience || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error in project creation API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
