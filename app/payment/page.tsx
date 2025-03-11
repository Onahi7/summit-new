"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/supabase-auth-provider"
import { Loader2 } from "lucide-react"
import { getConfig } from "@/lib/config-service"
import { initializePayment } from "@/lib/paystack"

export default function PaymentPage() {
  const { profile, isLoading } = useAuth()
  const router = useRouter()
  const [registrationAmount, setRegistrationAmount] = useState<number | null>(null)
  const [loadingConfig, setLoadingConfig] = useState(true)
  const [initiatingPayment, setInitiatingPayment] = useState(false)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await getConfig("registrationAmount")
        setRegistrationAmount(config ? Number.parseFloat(config) : 10000)
      } catch (error) {
        console.error("Error fetching config:", error)
        setRegistrationAmount(10000) // Default fallback
      } finally {
        setLoadingConfig(false)
      }
    }

    fetchConfig()
  }, [])

  if (isLoading || loadingConfig) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!profile) {
    router.push("/login")
    return null
  }

  if (profile.payment_status === "paid") {
    router.push("/dashboard")
    return null
  }

  const handlePayment = async () => {
    if (!profile || !registrationAmount) return

    setInitiatingPayment(true)
    try {
      const paymentUrl = await initializePayment({
        email: profile.phone, // Using phone as email is not required
        amount: registrationAmount,
        metadata: {
          userId: profile.id,
          name: profile.full_name,
        },
      })

      if (paymentUrl) {
        window.location.href = paymentUrl
      }
    } catch (error) {
      console.error("Payment initialization failed:", error)
    } finally {
      setInitiatingPayment(false)
    }
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Payment</h1>

      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Registration Fee</CardTitle>
            <CardDescription>6th Annual NAPPS North Central Zonal Education Summit 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center justify-between">
                <span>Registration Fee:</span>
                <span className="text-xl font-bold">₦{registrationAmount?.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p>Payment for:</p>
              <p className="font-medium">{profile.full_name}</p>
              <p>
                {profile.state}, {profile.lga}
              </p>
              <p>{profile.chapter}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePayment} disabled={initiatingPayment}>
              {initiatingPayment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

