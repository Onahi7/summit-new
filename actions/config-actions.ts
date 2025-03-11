"use server"

import { createClientServer } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { requireRole } from "@/lib/auth"

// Get a config value by key
export async function getConfigByKey(key: string) {
  const supabase = createClientServer()

  const { data, error } = await supabase.from("config").select("value").eq("key", key).single()

  if (error) {
    console.error(`Error fetching config for key ${key}:`, error)
    return null
  }

  return data.value
}

// Update a config value
export async function updateConfig(key: string, value: any) {
  try {
    // Only admins can update config
    await requireRole("admin")

    const supabase = createClientServer()

    // Check if config exists
    const { data: existingConfig } = await supabase.from("config").select("*").eq("key", key).single()

    if (existingConfig) {
      // Update existing config
      const { error } = await supabase
        .from("config")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key)

      if (error) {
        console.error(`Error updating config for key ${key}:`, error)
        return { success: false, error: error.message }
      }
    } else {
      // Insert new config
      const { error } = await supabase.from("config").insert({ key, value, created_at: new Date().toISOString() })

      if (error) {
        console.error(`Error creating config for key ${key}:`, error)
        return { success: false, error: error.message }
      }
    }

    // Revalidate paths that might use this config
    revalidatePath("/admin/settings")
    revalidatePath("/participant/dashboard")
    revalidatePath("/payment")

    return { success: true }
  } catch (error: any) {
    console.error(`Error in updateConfig for key ${key}:`, error)
    return { success: false, error: error.message || "Failed to update config" }
  }
}

// Initialize default config values
export async function initializeDefaultConfig() {
  const defaultConfig = {
    registrationAmount: 20000,
    registrationAmountFormatted: "₦20,000",
    conferenceDate: "May 15-17, 2025",
    conferenceLocation: "Abuja, Nigeria",
    conferenceVenue: "International Conference Center, Abuja",
  }

  const supabase = createClientServer()

  for (const [key, value] of Object.entries(defaultConfig)) {
    // Check if config exists
    const { data } = await supabase.from("config").select("*").eq("key", key).single()

    if (!data) {
      // Insert default config
      await supabase.from("config").insert({ key, value, created_at: new Date().toISOString() })
    }
  }

  return { success: true }
}

