"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, CreditCard, Hotel, FileText, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/supabase-auth-provider"
import { getRegistrationAmount } from "@/lib/config-service"

export function ParticipantDashboard() {
  const { profile } = useAuth()
  const [registrationAmount, setRegistrationAmount] = useState<number>(0)

  useEffect(() => {
    const fetchRegistrationAmount = async () => {
      const amount = await getRegistrationAmount()
      setRegistrationAmount(amount)
    }

    fetchRegistrationAmount()
  }, [])

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conference Details</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6th Annual NAPPS Summit</div>
          <p className="text-xs text-muted-foreground">May 21-22, 2025</p>
          <div className="mt-3 flex items-center text-sm">
            <MapPin className="mr-1 h-4 w-4" />
            <span>Lafia City Hall, Lafia</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Registration Status</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{profile.payment_status === "paid" ? "Paid" : "Pending"}</div>
            <Badge variant={profile.payment_status === "paid" ? "success" : "outline"}>
              {profile.payment_status === "paid" ? "Paid" : "Pending"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">Registration Fee: ₦{registrationAmount.toLocaleString()}</p>
        </CardContent>
        <CardFooter>
          {profile.payment_status !== "paid" && (
            <Link href="/payment" className="w-full">
              <Button className="w-full">Pay Registration Fee</Button>
            </Link>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accreditation</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {profile.accreditation_status === "approved" ? "Approved" : "Pending"}
            </div>
            <Badge variant={profile.accreditation_status === "approved" ? "success" : "outline"}>
              {profile.accreditation_status === "approved" ? "Approved" : "Pending"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {profile.accreditation_status === "approved"
              ? "You are fully accredited for the conference"
              : "Accreditation pending payment and approval"}
          </p>
        </CardContent>
        <CardFooter>
          {profile.accreditation_status === "approved" && (
            <Link href="/participant/qrcode" className="w-full">
              <Button className="w-full">View QR Code</Button>
            </Link>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accommodation</CardTitle>
          <Hotel className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Book Your Stay</div>
          <p className="text-xs text-muted-foreground">Find and book accommodation for the conference</p>
        </CardContent>
        <CardFooter>
          <Link href="/participant/accommodation" className="w-full">
            <Button variant="outline" className="w-full">
              View Hotels
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resources</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Conference Materials</div>
          <p className="text-xs text-muted-foreground">Access presentations, schedules, and other resources</p>
        </CardContent>
        <CardFooter>
          <Link href="/participant/resources" className="w-full">
            <Button variant="outline" className="w-full">
              View Resources
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

