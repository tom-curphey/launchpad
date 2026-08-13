import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

/**
 * POST /api/user/settings
 *
 * Updates the authenticated user's settings.
 *
 * Request body:
 * ```json
 * {
 *   "theme": "dark" | "light" | "system",
 *   "email_notifications": boolean
 * }
 * ```
 */
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user ID from Supabase
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("email", session.user.email!)
      .single()

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()
    const { theme, email_notifications } = body

    // Validate theme value
    if (theme && !["light", "dark", "system"].includes(theme)) {
      return NextResponse.json(
        { error: "Invalid theme value" },
        { status: 400 }
      )
    }

    // Update settings
    const { data: settings, error } = await supabase
      .from("user_settings")
      .update({
        ...(theme !== undefined && { theme }),
        ...(email_notifications !== undefined && { email_notifications: email_notifications }),
      })
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating settings:", error)
      return NextResponse.json(
        { error: "Failed to update settings", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings,
    })
  } catch (error) {
    console.error("Unexpected error in settings update:", error)
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    )
  }
}
