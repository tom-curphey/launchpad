"use client"

import { Session } from "next-auth"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface SessionContextProps {
  children: ReactNode
  session: Session | null
}

/**
 * Session Context Provider
 *
 * Wraps the app to provide session data to client components.
 * Use this in client components that need access to user session.
 *
 * Usage in layout.tsx:
 * ```tsx
 * import { SessionProvider } from '@/lib/contexts/session-context'
 *
 * export default function RootLayout({ children }) {
 *   const session = await auth()
 *   return (
 *     <html>
 *       <body>
 *         <SessionProvider session={session}>
 *           {children}
 *         </SessionProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * Usage in client components:
 * ```tsx
 * "use client"
 * import { useSession } from "next-auth/react"
 *
 * export function UserProfile() {
 *   const { data: session, status } = useSession()
 *   if (status === "loading") return <div>Loading...</div>
 *   if (!session) return <div>Not signed in</div>
 *   return <div>Welcome, {session.user?.name}</div>
 * }
 * ```
 */
export function SessionProvider({ children, session }: SessionContextProps) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
}
