"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, Users, Search, Download, Clock, User, CheckCircle, XCircle, BarChart } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/components/supabase-auth-provider"

export default function AdminAccreditation() {
  const auth = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample accreditation data
  const accreditationData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "08012345678",
      ticketType: "Executive",
      status: "Accredited",
      time: "08:15 AM",
      date: "May 15, 2025",
      validator: "Michael Brown",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "08023456789",
      ticketType: "Regular",
      status: "Accredited",
      time: "08:22 AM",
      date: "May 15, 2025",
      validator: "Michael Brown",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      phone: "08034567890",
      ticketType: "Executive",
      status: "Accredited",
      time: "08:30 AM",
      date: "May 15, 2025",
      validator: "Sarah Johnson",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "08045678901",
      ticketType: "Regular",
      status: "Not Accredited",
      time: "",
      date: "",
      validator: "",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      phone: "08056789012",
      ticketType: "Executive",
      status: "Accredited",
      time: "08:45 AM",
      date: "May 15, 2025",
      validator: "Sarah Johnson",
    },
    {
      id: 6,
      name: "Sarah Martinez",
      email: "sarah@example.com",
      phone: "08067890123",
      ticketType: "Regular",
      status: "Not Accredited",
      time: "",
      date: "",
      validator: "",
    },
    {
      id: 7,
      name: "Robert Brown",
      email: "robert@example.com",
      phone: "08078901234",
      ticketType: "Regular",
      status: "Accredited",
      time: "09:05 AM",
      date: "May 15, 2025",
      validator: "Michael Brown",
    },
    {
      id: 8,
      name: "Jennifer Garcia",
      email: "jennifer@example.com",
      phone: "08089012345",
      ticketType: "Executive",
      status: "Accredited",
      time: "09:15 AM",
      date: "May 15, 2025",
      validator: "Sarah Johnson",
    },
  ]

  // Filter accreditation data based on search term and filter
  const filteredData = accreditationData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm)

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "accredited" && item.status === "Accredited") ||
      (filterStatus === "not-accredited" && item.status === "Not Accredited")

    return matchesSearch && matchesFilter
  })

  // Calculate statistics
  const totalParticipants = accreditationData.length
  const accreditedParticipants = accreditationData.filter((item) => item.status === "Accredited").length
  const notAccreditedParticipants = accreditationData.filter((item) => item.status === "Not Accredited").length
  const accreditationPercentage = Math.round((accreditedParticipants / totalParticipants) * 100)

  // Calculate ticket type statistics
  const executiveTickets = accreditationData.filter((item) => item.ticketType === "Executive").length
  const regularTickets = accreditationData.filter((item) => item.ticketType === "Regular").length
  const executiveAccredited = accreditationData.filter(
    (item) => item.ticketType === "Executive" && item.status === "Accredited",
  ).length
  const regularAccredited = accreditationData.filter(
    (item) => item.ticketType === "Regular" && item.status === "Accredited",
  ).length

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] bg-background">
      <DashboardSidebar role="admin" />
      <div className="flex flex-col">
        <DashboardHeader role="admin" title="Accreditation Management" />
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="border-napps-green/20 dark:border-napps-green/30 card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalParticipants}</div>
                <p className="text-xs text-muted-foreground">Registered for the conference</p>
              </CardContent>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30 card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accredited</CardTitle>
                <CheckCircle className="h-4 w-4 text-napps-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accreditedParticipants}</div>
                <div className="flex items-center gap-2">
                  <Progress value={accreditationPercentage} className="h-2" indicatorClassName="bg-napps-green" />
                  <span className="text-xs text-muted-foreground">{accreditationPercentage}%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30 card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Executive Tickets</CardTitle>
                <CheckSquare className="h-4 w-4 text-napps-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {executiveAccredited}/{executiveTickets}
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={(executiveAccredited / executiveTickets) * 100}
                    className="h-2"
                    indicatorClassName="bg-napps-gold"
                  />
                  <span className="text-xs text-muted-foreground">
                    {Math.round((executiveAccredited / executiveTickets) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30 card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Regular Tickets</CardTitle>
                <CheckSquare className="h-4 w-4 text-napps-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {regularAccredited}/{regularTickets}
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={(regularAccredited / regularTickets) * 100}
                    className="h-2"
                    indicatorClassName="bg-napps-green"
                  />
                  <span className="text-xs text-muted-foreground">
                    {Math.round((regularAccredited / regularTickets) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-napps-green/20 dark:border-napps-green/30 mb-6">
            <CardHeader>
              <CardTitle>Search and Filter</CardTitle>
              <CardDescription>Find specific participants and their accreditation status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    className="pl-8 border-napps-green/30 focus-visible:ring-napps-green"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="w-[200px]">
                  <Tabs defaultValue="all" onValueChange={setFilterStatus}>
                    <TabsList className="bg-napps-green/10 dark:bg-napps-green/20 w-full">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-napps-green data-[state=active]:text-white"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="accredited"
                        className="data-[state=active]:bg-napps-green data-[state=active]:text-white"
                      >
                        Accredited
                      </TabsTrigger>
                      <TabsTrigger
                        value="not-accredited"
                        className="data-[state=active]:bg-napps-green data-[state=active]:text-white"
                      >
                        Pending
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Button variant="outline" className="border-napps-green/30 text-napps-green hover:bg-napps-green/10">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-napps-green/20 dark:border-napps-green/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Accreditation Status</CardTitle>
                <CardDescription>Complete list of participants and their accreditation status</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-napps-green/20">
                <div className="grid grid-cols-7 border-b p-3 font-medium">
                  <div>Name</div>
                  <div>Email</div>
                  <div>Phone</div>
                  <div>Ticket Type</div>
                  <div>Status</div>
                  <div>Time</div>
                  <div>Validator</div>
                </div>

                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div key={item.id} className="grid grid-cols-7 border-b p-3 last:border-0">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-napps-green" />
                        <span>{item.name}</span>
                      </div>
                      <div>{item.email}</div>
                      <div>{item.phone}</div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.ticketType === "Executive"
                              ? "bg-napps-gold/20 text-napps-gold"
                              : "bg-napps-green/20 text-napps-green"
                          }`}
                        >
                          {item.ticketType}
                        </span>
                      </div>
                      <div>
                        {item.status === "Accredited" ? (
                          <span className="inline-flex items-center rounded-full bg-napps-green/20 px-2.5 py-0.5 text-xs font-medium text-napps-green">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Accredited
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-500">
                            <XCircle className="mr-1 h-3 w-3" />
                            Pending
                          </span>
                        )}
                      </div>
                      <div>{item.time || "N/A"}</div>
                      <div>{item.validator || "N/A"}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No participants found matching your search criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="border-napps-green/20 dark:border-napps-green/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-napps-green" />
                  Accreditation Timeline
                </CardTitle>
                <CardDescription>Hourly breakdown of accreditations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-napps-green/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">7:00 AM - 8:00 AM</span>
                      <span className="font-medium">15</span>
                    </div>
                    <Progress value={15} className="h-2" indicatorClassName="bg-napps-green" />
                  </div>

                  <div className="rounded-lg bg-napps-green/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">8:00 AM - 9:00 AM</span>
                      <span className="font-medium">78</span>
                    </div>
                    <Progress value={78} className="h-2" indicatorClassName="bg-napps-green" />
                  </div>

                  <div className="rounded-lg bg-napps-green/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">9:00 AM - 10:00 AM</span>
                      <span className="font-medium">42</span>
                    </div>
                    <Progress value={42} className="h-2" indicatorClassName="bg-napps-green" />
                  </div>

                  <div className="rounded-lg bg-napps-green/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">10:00 AM - 11:00 AM</span>
                      <span className="font-medium">12</span>
                    </div>
                    <Progress value={12} className="h-2" indicatorClassName="bg-napps-green" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-napps-green" />
                  Recent Accreditations
                </CardTitle>
                <CardDescription>Latest participant accreditations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accreditationData
                    .filter((item) => item.status === "Accredited")
                    .sort((a, b) => {
                      // Sort by time (most recent first)
                      const timeA = a.time.split(":").map(Number)
                      const timeB = b.time.split(":").map(Number)

                      if (timeA[0] !== timeB[0]) {
                        return timeB[0] - timeA[0] // Compare hours
                      }
                      return timeB[1] - timeA[1] // Compare minutes
                    })
                    .slice(0, 5)
                    .map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-napps-green flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.ticketType} ticket • {item.time}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">Validated by {item.validator}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

