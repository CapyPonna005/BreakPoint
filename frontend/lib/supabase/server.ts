import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Call this inside Server Components, Route Handlers, or Server Actions —
// NOT at module scope — since it needs the current request's cookies.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component (not a Route Handler or
            // Server Action) — this is fine as long as middleware.ts is
            // refreshing sessions, which it is (see middleware.ts).
          }
        },
      },
    }
  );
}