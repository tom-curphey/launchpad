import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnProfile = nextUrl.pathname.startsWith("/profile")
      const isProtectedRoute = isOnDashboard || isOnProfile

      // Protected routes require authentication
      if (isProtectedRoute) {
        if (isLoggedIn) return true
        // Redirect to sign-in with return URL
        const signInUrl = new URL("/auth/signin", nextUrl)
        signInUrl.searchParams.set("callbackUrl", nextUrl.href)
        return Response.redirect(signInUrl)
      }

      // Redirect authenticated users from root to dashboard
      if (isLoggedIn && nextUrl.pathname === "/") {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
    async signIn({ user, account, profile }) {
      // Sync user to Supabase on sign-in
      if (user?.email) {
        try {
          await fetch(`${process.env.NEXTAUTH_URL}/api/user/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ force: false }),
          })
        } catch (error) {
          console.error("Failed to sync user on sign-in:", error)
          // Don't block sign-in if sync fails
        }
      }
      return true
    },
  },
})
