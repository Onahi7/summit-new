"use server"

import { createClientServer } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { getCurrentUser, getCurrentProfile } from "@/lib/auth"
import type { Database } from "@/lib/database.types"

type ScanLog = Database["public"]["Tables"]["scan_logs"]["Row"]

// Record a scan
export async function recordScan(
  participantId: string,
  scanType: "entry" | "exit" | "meal" | "session",
  scanLocation: string,
  notes?: string,
) {
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const profile = await getCurrentProfile()

  if (!profile || profile.role !== "validator") {
    return { success: false, error: "Not authorized as validator" }
  }

  const supabase = createClientServer()

  // Verify the participant exists and is accredited
  const { data: participant, error: participantError } = await supabase
    .from("profiles")
    .select("id, accreditation_status, payment_status")
    .eq("id", participantId)
    .single()

  if (participantError || !participant) {
    console.error("Error fetching participant:", participantError)
    return {
      success: false,
      error: participantError?.message || "Participant not found",
      scanStatus: "failed",
    }
  }

  // Check if participant is accredited and has paid
  if (participant.accreditation_status !== "approved") {
    return {
      success: false,
      error: "Participant not accredited",
      scanStatus: "failed",
    }
  }

  if (participant.payment_status !== "paid") {
    return {
      success: false,
      error: "Participant has not paid",
      scanStatus: "failed",
    }
  }

  // Record the scan
  const { error } = await supabase.from("scan_logs").insert({
    validator_id: user.id,
    participant_id: participantId,
    scan_type: scanType,
    scan_location: scanLocation,
    scan_status: "success",
    notes: notes || null,
  })

  if (error) {
    console.error("Error recording scan:", error)
    return { success: false, error: error.message, scanStatus: "failed" }
  }

  revalidatePath("/validator/scan")
  revalidatePath("/validator/history")
  return { success: true, scanStatus: "success" }
}

// Get validator's scan history
export async function getValidatorScanHistory(): Promise<ScanLog[]> {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  const supabase = createClientServer()

  const { data, error } = await supabase
    .from("scan_logs")
    .select("*, participant:profiles!participant_id(full_name, email, organization)")
    .eq("validator_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching scan history:", error)
    return []
  }

  return data
}

// Get participant's scan history
export async function getParticipantScanHistory(): Promise<ScanLog[]> {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  const supabase = createClientServer()

  const { data, error } = await supabase
    .from("scan_logs")
    .select("*, validator:profiles!validator_id(full_name)")
    .eq("participant_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching scan history:", error)
    return []
  }

  return data
}

