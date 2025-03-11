import { SupabaseAuthProvider } from "@/components/supabase-auth-provider"

export default function ValidatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SupabaseAuthProvider>
      {children}
    </SupabaseAuthProvider>
  )
}