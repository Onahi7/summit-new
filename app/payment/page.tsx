"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/supabase-auth-provider"
import { initiatePayment } from "@/lib/paystack"
import { getRegistrationAmount } from "@/lib/config-service"

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { user, profile } = useAuth()
  const router = useRouter()
  
  const handlePayment = async () => {
    if (!user?.email || !profile) return
    
    setIsLoading(true)
    try {
      const registrationAmount = await getRegistrationAmount()
      const paymentUrl = await initiatePayment({
        email: user.email,
        amount: registrationAmount * 100, // Convert to kobo
        metadata: {
          userId: user.id,
          name: profile.full_name,
        },
      })
      window.location.href = paymentUrl.authorization_url
    } catch (error) {
      console.error("Payment initialization failed:", error)
      setIsLoading(false)
    }
  }

  // Redirect if already paid
  useEffect(() => {
    if (profile?.payment_status === "paid") {
      router.push("/participant/dashboard")
    }
  }, [profile, router])

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
      <DashboardSidebar role="participant" />
      <div className="flex flex-col">
        <DashboardHeader role="participant" title="Payment" />
        <main className="flex-1 p-6">
          {/* Rest of your JSX */}
        </main>
      </div>
    </div>
  )
}

