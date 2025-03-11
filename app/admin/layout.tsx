"use client"

import { SupabaseAuthProvider } from "@/components/supabase-auth-provider"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>
}
