"use client"

import { SupabaseAuthProvider } from "@/components/supabase-auth-provider"
import { AdminAuthProvider } from "@/components/admin-auth-provider"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseAuthProvider>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </SupabaseAuthProvider>
  )
}
