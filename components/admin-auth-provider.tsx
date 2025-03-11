"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"
import { useAuth } from "@/components/supabase-auth-provider"

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, profile, isLoading } = useAuth()

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!isLoading && (!user || profile?.role !== "admin")) {
      redirect("/login")
    }
  }, [user, profile, isLoading])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-napps-green"></div>
      </div>
    )
  }

  if (!user || profile?.role !== "admin") {
    return null
  }

  return <>{children}</>
}