"use client"

import { useState, useEffect, useCallback } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { getHotels, getUserBookings } from "@/actions/hotel-actions"
import { initializeHotelBookingPayment } from "@/actions/payment-actions"
import { useAuth } from "@/components/supabase-auth-provider"
import type { Database } from "@/lib/database.types"

type Hotel = Database["public"]["Tables"]["hotels"]["Row"]
type Booking = Database["public"]["Tables"]["bookings"]["Row"] & { hotel: Hotel }

function ParticipantAccommodation() {
  // State
  const [isLoading, setIsLoading] = useState(true)
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  // Fetch hotels and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelsData, bookingsData] = await Promise.all([
          getHotels(),
          getUserBookings()
        ])
        setHotels(hotelsData)
        setBookings(bookingsData)
      } catch (err) {
        setError("Failed to load accommodation data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle booking
  const handleBooking = async (hotel: Hotel, checkIn: string, checkOut: string, totalAmount: number) => {
    if (!user?.email) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book accommodation",
        variant: "destructive"
      })
      return
    }

    try {
      const result = await initializeHotelBookingPayment(
        hotel.id,
        checkIn,
        checkOut,
        totalAmount
      )

      if (result.success && result.authorizationUrl) {
        window.location.href = result.authorizationUrl
      } else {
        throw new Error(result.error || "Failed to initialize payment")
      }
    } catch (err) {
      toast({
        title: "Booking Failed",
        description: "There was a problem processing your booking. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
      <DashboardSidebar role="participant" />
      <div className="flex flex-col">
        <DashboardHeader role="participant" title="Accommodation" />
        <main className="flex-1 p-6">
          {/* Add your UI components here using the hotels and bookings data */}
          {/* Use isLoading and error states to show loading and error states */}
        </main>
      </div>
    </div>
  )
}

export default ParticipantAccommodation