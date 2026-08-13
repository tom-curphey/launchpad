import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  // Get user and settings from Supabase
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email!)
    .single()

  const { data: settings } = user
    ? await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user.id)
        .single()
    : { data: null }

  if (!user || !settings) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-8">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-zinc-400">Loading settings...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a
            href="/profile"
            className="text-zinc-400 hover:text-zinc-300 text-sm flex items-center gap-2"
          >
            ← Back to Profile
          </a>
          <h1 className="text-3xl font-bold mt-4">Settings</h1>
          <p className="text-zinc-400 mt-2">Customize your Launchpad experience</p>
        </div>

        <form action="/api/user/settings" method="POST">
          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Theme
                </label>
                <select
                  name="theme"
                  defaultValue={settings.theme}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-zinc-300">Email Notifications</span>
                  <p className="text-sm text-zinc-500 mt-1">
                    Receive updates about your projects via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="email_notifications"
                  defaultChecked={settings.email_notifications}
                  className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-900"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <a
              href="/profile"
              className="px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded-full hover:border-zinc-600 hover:text-zinc-100 transition-all"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
