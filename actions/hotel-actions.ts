"use server"

import { createClientServer } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth"
import type { Database } from "@/lib/database.types"

type Hotel = Database["public"]["Tables"]["hotels"]["Row"]
type Booking = Database["public"]["Tables"]["bookings"]["Row"]

// Get all hotels
export async function getHotels(): Promise<Hotel[]> {
  const supabase = createClientServer()

  const { data, error } = await supabase.from("hotels").select("*").order("price_per_night", { ascending: true })

  if (error) {
    console.error("Error fetching hotels:", error)
    return []
  }

  return data
}

// Get hotel by ID
export async function getHotelById(id: string): Promise<Hotel | null> {
  const supabase = createClientServer()

  const { data, error } = await supabase.from("hotels").select("*").eq("id", id).single()

  if (error || !data) {
    console.error("Error fetching hotel:", error)
    return null
  }

  return data
}

// Add a new hotel (admin only)
export async function addHotel(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const address = formData.get("address") as string
  const pricePerNight = Number(formData.get("pricePerNight"))
  const imageFile = formData.get("image") as File
  const availableRooms = Number(formData.get("availableRooms"))
  const amenitiesString = formData.get("amenities") as string
  const rating = Number(formData.get("rating"))

  const amenities = amenitiesString.split(",").map((item) => item.trim())

  const supabase = createClientServer()

  // Upload the image to Supabase Storage
  const { data: fileData, error: fileError } = await supabase.storage
    .from("hotels")
    .upload(`${Date.now()}-${imageFile.name}`, imageFile, {
      cacheControl: "3600",
      upsert: true,
    })

  if (fileError) {
    console.error("Error uploading hotel image:", fileError)
    return { success: false, error: fileError.message }
  }

  // Get the public URL
  const { data: urlData } = supabase.storage.from("hotels").getPublicUrl(fileData.path)

  // Create the hotel record
  const { error } = await supabase.from("hotels").insert({
    name,
    description,
    address,
    price_per_night: pricePerNight,
    image_url: urlData.publicUrl,
    available_rooms: availableRooms,
    amenities,
    rating,
  })

  if (error) {
    console.error("Error creating hotel:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/hotels")
  return { success: true }
}

// Update a hotel (admin only)
export async function updateHotel(id: string, formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const address = formData.get("address") as string
  const pricePerNight = Number(formData.get("pricePerNight"))
  const imageFile = formData.get("image") as File | null
  const availableRooms = Number(formData.get("availableRooms"))
  const amenitiesString = formData.get("amenities") as string
  const rating = Number(formData.get("rating"))

  const amenities = amenitiesString.split(",").map((item) => item.trim())

  const supabase = createClientServer()

  let imageUrl = formData.get("currentImageUrl") as string

  // If a new image is provided, upload it
  if (imageFile && imageFile.size > 0) {
    const { data: fileData, error: fileError } = await supabase.storage
      .from("hotels")
      .upload(`${Date.now()}-${imageFile.name}`, imageFile, {
        cacheControl: "3600",
        upsert: true,
      })

    if (fileError) {
      console.error("Error uploading hotel image:", fileError)
      return { success: false, error: fileError.message }
    }

    // Get the public URL
    const { data: urlData } = supabase.storage.from("hotels").getPublicUrl(fileData.path)

    imageUrl = urlData.publicUrl
  }

  // Update the hotel record
  const { error } = await supabase
    .from("hotels")
    .update({
      name,
      description,
      address,
      price_per_night: pricePerNight,
      image_url: imageUrl,
      available_rooms: availableRooms,
      amenities,
      rating,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating hotel:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/hotels")
  return { success: true }
}

// Delete a hotel (admin only)
export async function deleteHotel(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const supabase = createClientServer()

  // Delete the hotel record
  const { error } = await supabase.from("hotels").delete().eq("id", id)

  if (error) {
    console.error("Error deleting hotel:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/hotels")
  return { success: true }
}

// Get user's bookings
export async function getUserBookings(): Promise<(Booking & { hotel: Hotel })[]> {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  const supabase = createClientServer()

  const { data, error } = await supabase
    .from("bookings")
    .select("*, hotel:hotels(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
    return []
  }

  return data as (Booking & { hotel: Hotel })[]
}

