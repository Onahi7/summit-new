import { createClient } from "@supabase/supabase-js"
import { env } from "./env"

// Create a single supabase client for browser-side usage
export const createClientBrowser = () => createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Create a supabase client with the service role key for server-side usage
export const createClientServer = () =>
  createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

