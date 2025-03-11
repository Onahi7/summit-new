"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, CreditCard, FileText, Settings, CheckSquare } from "lucide-react"
import Link from "next/link"
import { getUsersByRole } from "@/actions/user-actions"
import { getRegistrationAmount } from "@/lib/config-service"

export function AdminDashboard() {
  const [participants, setParticipants] = useState<any[]>([])
  const [validators, setValidators] = useState<any[]>([])
  const [registrationAmount, setRegistrationAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [participantsData, validatorsData, amount] = await Promise.all([
          getUsersByRole("participant"),
          getUsersByRole("validator"),
          getRegistrationAmount(),
        ])

        setParticipants(participantsData)
        setValidators(validatorsData)
        setRegistrationAmount(amount)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate statistics
  const totalParticipants = participants.length
  const paidParticipants = participants.filter((p) => p.payment_status === "paid").length
  const pendingParticipants = totalParticipants - paidParticipants
  const totalRevenue = paidParticipants * registrationAmount
  const accreditedParticipants = participants.filter((p) => p.accreditation_status === "approved").length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conference Details</CardTitle>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6th Annual NAPPS Summit</div>
          <p className="text-xs text-muted-foreground">May 21-22, 2025 • Lafia City Hall, Lafia</p>
          <p className="text-xs text-muted-foreground mt-2">Registration Fee: ₦{registrationAmount.toLocaleString()}</p>
        </CardContent>
        <CardFooter>
          <Link href="/admin/settings" className="w-full">
            <Button variant="outline" className="w-full">
              Manage Settings
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Participants</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalParticipants}</div>
          <div className="flex justify-between mt-2">
            <p className="text-xs text-muted-foreground">Paid: {paidParticipants}</p>
            <p className="text-xs text-muted-foreground">Pending: {pendingParticipants}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/participants">
            <Button variant="outline">View All</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">From {paidParticipants} paid registrations</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accreditation</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{accreditedParticipants}</div>
          <p className="text-xs text-muted-foreground">Accredited participants</p>
        </CardContent>
        <CardFooter>
          <Link href="/admin/accreditation" className="w-full">
            <Button variant="outline" className="w-full">
              Manage Accreditation
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Validators</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{validators.length}</div>
          <p className="text-xs text-muted-foreground">Active validators</p>
        </CardContent>
        <CardFooter>
          <Link href="/admin/validators" className="w-full">
            <Button variant="outline" className="w-full">
              Manage Validators
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
          <p className="text-xs text-muted-foreground">Manage presentations, schedules, and other resources</p>
        </CardContent>
        <CardFooter>
          <Link href="/admin/resources" className="w-full">
            <Button variant="outline" className="w-full">
              Manage Resources
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

