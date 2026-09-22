> **Archived 2026-09-22.** Recorded NextAuth v5 as done. The plan is now Supabase Auth with GitHub, and NextAuth is noted as the current implementation.
>
> **Replaced by:** [architecture/authentication.md](../../architecture/authentication.md)

---

# Architecture — Authentication

> Describes the authentication approach — provider choice, configuration, and current status.

---

## GitHub OAuth Implementation

**Decision:** Use NextAuth v5 with GitHub OAuth provider

**Configuration:**

- Client ID & Secret from GitHub OAuth App (not GitHub App)
- Callback URL: `http://localhost:3000/api/auth/callback/github`
- Homepage URL: `http://localhost:3000`

**Status:** ✅ Complete and working

**Files:**

- `.env` — GitHub credentials
- `lib/auth.ts` — Auth configuration
- `app/api/auth/[...nextauth]/route.ts` — API handlers
- `middleware.ts` — Session protection
- `app/auth/signin/page.tsx` — Sign-in page
- `app/dashboard/page.tsx` — Protected dashboard
