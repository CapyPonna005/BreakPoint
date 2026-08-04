import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshes the session if expired — required for Server Components,
  // which can't set cookies themselves. Do not remove this call.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route protection: anything under /dashboard requires a logged-in user.
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Username is required. If a logged-in user hasn't set one yet, force them
  // to /dashboard/settings until they do — except on Settings itself (would
  // loop) and paths not under /dashboard at all (e.g. logging out via a
  // Sidebar call that navigates to /login isn't blocked by this).
  if (isProtectedRoute && user) {
    const isSettingsRoute = request.nextUrl.pathname.startsWith("/dashboard/settings");

    if (!isSettingsRoute) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (!profile?.username) {
        const settingsUrl = new URL("/dashboard/settings", request.url);
        return NextResponse.redirect(settingsUrl);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Run on everything except static assets and images, so sessions stay
    // fresh across normal page navigation without wasting cycles on assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};