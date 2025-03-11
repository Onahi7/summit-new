"use server"

import { getConfigByKey } from "@/actions/config-actions"
import { parseConfigValue } from "@/lib/config-service"

// Default configuration values
const DEFAULT_CONFIG = {
  registrationAmount: 20000,
  registrationAmountFormatted: "₦20,000",
  conferenceDate: "May 15-17, 2025",
  conferenceLocation: "Abuja, Nigeria",
  conferenceVenue: "International Conference Center, Abuja",
}

// Get a specific config value with a default fallback
export async function getServerConfig<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const value = await getConfigByKey(key)

    // If value is null or undefined, return the default
    if (value === null || value === undefined) {
      return defaultValue
    }

    // Parse the value if it's a string that looks like JSON
    return parseConfigValue(value) as T
  } catch (error) {
    console.error(`Error getting config for ${key}:`, error)
    return defaultValue
  }
}

// Initialize all default config if needed
export async function initializeDefaultConfig() {
  return DEFAULT_CONFIG
}

