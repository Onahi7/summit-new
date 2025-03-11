import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClientServer } from "@/lib/supabase"

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const supabase = createClientServer()

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If there's no session and the user is trying to access a protected route
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname === "/"

  if (!session && !isAuthRoute) {
    // Redirect to login if accessing protected route without session
    const redirectUrl = new URL("/login", request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If there's a session but the user is trying to access auth routes
  if (session && isAuthRoute && request.nextUrl.pathname !== "/") {
    // Redirect to dashboard based on user role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    let redirectPath = "/participant/dashboard"

    if (profile?.role === "admin") {
      redirectPath = "/admin/dashboard"
    } else if (profile?.role === "validator") {
      redirectPath = "/validator/dashboard"
    }

    const redirectUrl = new URL(redirectPath, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}

