import { updateConfig } from "@/actions/config-actions"

// Type for the configuration
export type AppConfig = {
  registrationAmount: number
  registrationAmountFormatted: string
  conferenceDate: string
  conferenceLocation: string
  conferenceVenue: string
  [key: string]: any
}

// Format currency amount
export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString()}`
}

// Helper to parse JSON values from the database
export function parseConfigValue(value: any): any {
  if (typeof value === "string") {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
  return value
}

// Update registration amount (handles both the numeric and formatted values)
export async function updateRegistrationAmount(amount: number): Promise<{ success: boolean; error?: string }> {
  const formatted = formatCurrency(amount)

  try {
    // Update the numeric value
    const numericResult = await updateConfig("registrationAmount", amount)

    if (!numericResult.success) {
      return numericResult
    }

    // Update the formatted value
    const formattedResult = await updateConfig("registrationAmountFormatted", formatted)

    return formattedResult
  } catch (error) {
    console.error("Error updating registration amount:", error)
    return { success: false, error: "Failed to update registration amount" }
  }
}

