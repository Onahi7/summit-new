"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClientBrowser } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

type AuthContextType = {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  signInWithPhone: (phone: string) => Promise<{ error: any; data: any }>
  verifyOTP: (phone: string, otp: string) => Promise<{ error: any; data: any }>
  signUp: (userData: Partial<Profile>) => Promise<{ error: any; data: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  signInWithPhone: async () => ({ error: null, data: null }),
  verifyOTP: async () => ({ error: null, data: null }),
  signUp: async () => ({ error: null, data: null }),
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientBrowser()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        setProfile(data || null)
      }

      setIsLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        setProfile(data || null)
      } else {
        setProfile(null)
      }

      setIsLoading(false)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  // Sign in with phone number (sends OTP)
  const signInWithPhone = async (phone: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    })

    return { data, error }
  }

  // Verify OTP
  const verifyOTP = async (phone: string, otp: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    })

    if (!error) {
      router.refresh()
    }

    return { data, error }
  }

  // Sign up (create profile after OTP verification)
  const signUp = async (userData: Partial<Profile>) => {
    if (!user) {
      return { data: null, error: new Error("Not authenticated") }
    }

    // Create the profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      phone: userData.phone,
      full_name: userData.full_name,
      state: userData.state,
      lga: userData.lga,
      chapter: userData.chapter,
      organization: userData.organization,
      position: userData.position,
      role: "participant",
    })

    if (profileError) {
      return { data: null, error: profileError }
    }

    // Fetch the created profile
    const { data: newProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    setProfile(newProfile)
    router.refresh()

    return { data: user, error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const value = {
    user,
    profile,
    session,
    isLoading,
    signInWithPhone,
    verifyOTP,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

