import { SupabaseAuthProvider } from "@/components/supabase-auth-provider"

export default function PaymentLayout({
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