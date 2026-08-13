import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

/**
 * POST /api/user/sync
 *
 * Syncs the authenticated user's GitHub profile data to Supabase.
 * Creates or updates the user record and their default settings.
 *
 * Called automatically after successful OAuth sign-in.
 *
 * Request body (optional):
 * ```json
 * {
 *   "force": true  // Force re-sync even if user exists
 * }
 * ```
 */
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = session.user
    const { force = false } = await request.json().catch(() => ({}))

    // Check if user already exists (unless forcing re-sync)
    if (!force) {
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email!)
        .single()

      if (existingUser) {
        return NextResponse.json({
          success: true,
          message: "User already synced",
          user: existingUser
        })
      }
    }

    // Extract GitHub ID from the user object if available
    // Note: NextAuth GitHub provider may include this in the sub field or elsewhere
    const githubId = user.id || null

    // Prepare user data
    const userData = {
      github_id: githubId,
      email: user.email!,
      name: user.name!,
      avatar_url: user.image,
      username: user.email?.split("@")[0], // Default username from email
      updated_at: new Date().toISOString(),
    }

    // Upsert user data (insert or update)
    const { data: syncedUser, error: userError } = await supabase
      .from("users")
      .upsert(userData, {
        onConflict: "email",
        ignoreDuplicates: false,
      })
      .select()
      .single()

    if (userError) {
      console.error("Error syncing user:", userError)
      return NextResponse.json(
        { error: "Failed to sync user", details: userError.message },
        { status: 500 }
      )
    }

    // Ensure user has settings record
    const { error: settingsError } = await supabase
      .from("user_settings")
      .upsert(
        {
          user_id: syncedUser.id,
          theme: "dark",
          email_notifications: true,
        },
        {
          onConflict: "user_id",
          ignoreDuplicates: false,
        }
      )

    if (settingsError) {
      console.error("Error creating user settings:", settingsError)
      // Don't fail the request if settings sync fails, user is still created
    }

    return NextResponse.json({
      success: true,
      message: "User synced successfully",
      user: syncedUser,
    })
  } catch (error) {
    console.error("Unexpected error in user sync:", error)
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    )
  }
}

/**
 * GET /api/user/sync
 *
 * Gets the current sync status of the authenticated user.
 * Returns whether the user exists in Supabase and their profile data.
 */
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", session.user.email!)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned - user not synced yet
        return NextResponse.json({
          synced: false,
          message: "User not synced yet",
        })
      }
      throw error
    }

    // Get user settings
    const { data: settings } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", user.id)
      .single()

    return NextResponse.json({
      synced: true,
      user,
      settings,
    })
  } catch (error) {
    console.error("Error getting sync status:", error)
    return NextResponse.json(
      { error: "Failed to get sync status", details: String(error) },
      { status: 500 }
    )
  }
}
