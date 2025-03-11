// Environment variable validation
export const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}

// Validate environment variables
export function validateEnv() {
  const missingVars = Object.entries(env).filter(([_, value]) => !value)

  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.map(([key]) => key).join(", ")}`)
  }
}

