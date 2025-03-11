"use client"

import { SupabaseAuthProvider } from "@/components/supabase-auth-provider"
import { ParticipantAuthProvider } from "@/components/participant-auth-provider"

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SupabaseAuthProvider>
      <ParticipantAuthProvider>{children}</ParticipantAuthProvider>
    </SupabaseAuthProvider>
  )
}