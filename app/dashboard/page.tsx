import { auth, signOut } from "@/lib/auth"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
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

        <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-3">
            <p className="text-zinc-400"><span className="text-zinc-200 font-semibold">Name:</span> {session.user.name}</p>
            <p className="text-zinc-400"><span className="text-zinc-200 font-semibold">Email:</span> {session.user.email}</p>
            {session.user.image && (
              <div>
                <span className="text-zinc-200 font-semibold">Avatar:</span>
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="mt-3 rounded-full w-16 h-16"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-zinc-900/50 rounded-lg border border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Get Started</h2>
          <p className="text-zinc-400 mb-4">
            You're in! Now let's build something awesome.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all">
              Create New Project
            </button>
            <button className="px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded-full hover:border-amber-500/50 hover:text-zinc-100 transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
