"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClientBrowser } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, userData: Partial<Profile>) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const supabase = createClientBrowser()

  // Fetch user on mount
  useEffect(() => {
    async function getUser() {
      setLoading(true)

      // Check active session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        setUser(session.user)

        // Get profile
        const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (data) {
          setProfile(data)
        }
      }

      setLoading(false)
    }

    getUser()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user)

        // Get profile
        const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (data) {
          setProfile(data)
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setProfile(null)
      }
    })

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Protect routes
  useEffect(() => {
    if (!loading) {
      const isAuthRoute = pathname === "/login" || pathname === "/register"

      if (!user && !isAuthRoute && pathname !== "/") {
        router.push("/login")
      } else if (user && isAuthRoute) {
        if (profile?.role === "admin") {
          router.push("/admin/dashboard")
        } else if (profile?.role === "validator") {
          router.push("/validator/dashboard")
        } else {
          router.push("/participant/dashboard")
        }
      }
    }
  }, [user, profile, pathname, router, loading])

  // Sign in
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  }

  // Sign up
  const signUp = async (email: string, password: string, userData: Partial<Profile>) => {
    // Create user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    if (data.user) {
      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        full_name: userData.full_name,
        phone: userData.phone,
        state: userData.state,
        lga: userData.lga,
        organization: userData.organization,
        position: userData.position,
        role: "participant",
      })

      if (profileError) {
        return { error: profileError.message }
      }
    }

    return { error: null }
  }

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

