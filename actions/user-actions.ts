"use server"

import { createClientServer } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

// Register a new user
export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string
  const phone = formData.get("phone") as string
  const state = formData.get("state") as string
  const lga = formData.get("lga") as string
  const chapter = formData.get("chapter") as string
  const organization = (formData.get("organization") as string) || null
  const position = (formData.get("position") as string) || null

  const supabase = createClientServer()

  // Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (authError || !authData.user) {
    console.error("Error creating user:", authError)
    return { success: false, error: authError?.message || "Failed to create user" }
  }

  // Create the user profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    email,
    full_name: fullName,
    phone,
    role: "participant",
    state,
    lga,
    chapter,
    organization,
    position,
    payment_status: "pending",
    accreditation_status: "pending",
  })

  if (profileError) {
    console.error("Error creating profile:", profileError)
    return { success: false, error: profileError.message }
  }

  return { success: true, userId: authData.user.id }
}

// Update user profile
export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const fullName = formData.get("fullName") as string
  const phone = formData.get("phone") as string
  const state = formData.get("state") as string
  const lga = formData.get("lga") as string
  const chapter = formData.get("chapter") as string
  const organization = (formData.get("organization") as string) || null
  const position = (formData.get("position") as string) || null

  const supabase = createClientServer()

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone,
      state,
      lga,
      chapter,
      organization,
      position,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/participant/profile")
  return { success: true }
}

// Get users by role
export async function getUsersByRole(role: string) {
  const supabase = createClientServer()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", role)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// Other functions remain the same

