import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  // Get user data from Supabase
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("email", session.user.email!)
    .single()

  if (userError || !user) {
    // User not synced yet, trigger sync
    await fetch(`${process.env.NEXTAUTH_URL}/api/user/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    // Try fetching again
    const { data: syncedUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", session.user.email!)
      .single()

    if (!syncedUser) {
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-8">
              <h1 className="text-2xl font-bold mb-4">Profile Setup</h1>
              <p className="text-zinc-400 mb-4">
                Setting up your profile...
              </p>
            </div>
          </div>
        </div>
      )
    }
  }

  const userData = user || { name: session.user.name, email: session.user.email, avatar_url: session.user.image }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-zinc-400 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6 mb-6">
          <div className="flex items-start gap-6">
            {userData.avatar_url && (
              <img
                src={userData.avatar_url}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-zinc-700"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-zinc-400">{userData.email}</p>
              {(userData as any).username && (
                <p className="text-zinc-500 text-sm mt-1">@{(userData as any).username}</p>
              )}
            </div>
          </div>

          {(userData as any).bio && (
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-400 mb-2">Bio</h3>
              <p className="text-zinc-300">{(userData as any).bio}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-end">
            <button className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-amber-500/50 hover:text-zinc-100 transition-colors rounded-lg font-semibold">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Settings Quick Link */}
        <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          <a
            href="/profile/settings"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            <span className="text-zinc-300">App Settings</span>
            <span className="text-zinc-500">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
