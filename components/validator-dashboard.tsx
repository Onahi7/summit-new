"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { QrCode, Calendar, Clock, CheckCircle, XCircle, User, ArrowRight, BarChart, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/supabase-auth-provider"

export default function ValidatorDashboard() {
  const { user } = useAuth()

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
      <DashboardSidebar role="validator" />
      <div className="flex flex-col">
        <DashboardHeader role="validator" title="Validator Dashboard" />
        <main className="flex-1 p-6">
          <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-napps-green/10 opacity-50 group-hover:bg-napps-green/20 transition-colors"></div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Welcome, Validator</h2>
                <p className="text-muted-foreground">You are assigned to validate Breakfast and Dinner</p>
              </div>
              <Button className="bg-napps-green hover:bg-napps-green/90 group" asChild>
                <Link href="/validator/scan">
                  <QrCode className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Scan QR Code
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-napps-green/20 dark:border-napps-green/30 hover:border-napps-green/50 transition-colors overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Validations</CardTitle>
                <div className="h-8 w-8 rounded-full bg-napps-green/10 flex items-center justify-center group-hover:bg-napps-green/20 transition-colors">
                  <QrCode className="h-4 w-4 text-napps-green" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={42} max={100} className="h-1.5" indicatorClassName="bg-napps-green" />
                  <span className="text-xs text-green-500">+8 from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30 hover:border-napps-green/50 transition-colors overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Breakfast Validations</CardTitle>
                <div className="h-8 w-8 rounded-full bg-napps-green/10 flex items-center justify-center group-hover:bg-napps-green/20 transition-colors">
                  <Calendar className="h-4 w-4 text-napps-green" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={67} className="h-1.5" indicatorClassName="bg-napps-green" />
                  <span className="text-xs text-muted-foreground">67% of attendees</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30 hover:border-napps-green/50 transition-colors overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dinner Validations</CardTitle>
                <div className="h-8 w-8 rounded-full bg-napps-green/10 flex items-center justify-center group-hover:bg-napps-green/20 transition-colors">
                  <Calendar className="h-4 w-4 text-napps-green" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={33} className="h-1.5" indicatorClassName="bg-napps-green" />
                  <span className="text-xs text-muted-foreground">33% of attendees</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30 hover:border-napps-green/50 transition-colors overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Validations</CardTitle>
                <div className="h-8 w-8 rounded-full bg-napps-green/10 flex items-center justify-center group-hover:bg-napps-green/20 transition-colors">
                  <CheckCircle className="h-4 w-4 text-napps-green" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={100} className="h-1.5" indicatorClassName="bg-napps-green" />
                  <span className="text-xs text-muted-foreground">Since conference start</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="border-napps-green/20 dark:border-napps-green/30 hover:border-napps-green/50 transition-colors overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-napps-green" />
                    Recent Validations
                  </CardTitle>
                  <CardDescription>Your recent QR code validations</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 border-napps-green/30">
                  <RefreshCw className="h-4 w-4 text-napps-green" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-md bg-napps-green/5 hover:bg-napps-green/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${i % 2 === 0 ? "bg-green-500/10" : "bg-blue-500/10"}`}
                        >
                          <div className={`h-2 w-2 rounded-full ${i % 2 === 0 ? "bg-green-500" : "bg-blue-500"}`} />
                        </div>
                        <div>
                          <div className="font-medium">John Doe {i + 1}</div>
                          <div className="text-sm text-muted-foreground">
                            {i % 2 === 0 ? "Breakfast" : "Dinner"} validation
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-napps-green/30 hover:bg-napps-green/10" asChild>
                  <Link href="/validator/history">
                    <ArrowRight className="mr-2 h-4 w-4 text-napps-green" />
                    View All History
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30 hover:border-napps-green/50 transition-colors overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-napps-green" />
                  Validation Status
                </CardTitle>
                <CardDescription>Today's validation progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Breakfast</span>
                    <span className="text-sm text-muted-foreground">28/42 (67%)</span>
                  </div>
                  <Progress value={67} className="h-2" indicatorClassName="bg-napps-green" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Dinner</span>
                    <span className="text-sm text-muted-foreground">14/42 (33%)</span>
                  </div>
                  <Progress value={33} className="h-2" indicatorClassName="bg-napps-green" />
                </div>

                <div className="rounded-lg border border-napps-green/20 p-4 bg-napps-green/5">
                  <h3 className="mb-2 font-medium">Validation Schedule</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-napps-green" />
                        <span>Breakfast</span>
                      </div>
                      <span>7:00 AM - 9:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-napps-green" />
                        <span>Dinner</span>
                      </div>
                      <span>6:00 PM - 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button className="w-full bg-napps-green hover:bg-napps-green/90 group" asChild>
                  <Link href="/validator/scan">
                    <QrCode className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    Start Scanning
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-6 border-napps-green/20 dark:border-napps-green/30 hover:border-napps-green/50 transition-colors overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Validation Issues
                </CardTitle>
                <CardDescription>Recent validation problems that need attention</CardDescription>
              </div>
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
                2 Issues
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-napps-green/20 overflow-hidden">
                <div className="grid grid-cols-4 border-b p-3 font-medium bg-napps-green/5">
                  <div>Participant</div>
                  <div>Issue Type</div>
                  <div>Time</div>
                  <div>Status</div>
                </div>
                <div className="grid grid-cols-4 border-b p-3 hover:bg-napps-green/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-napps-green/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-napps-green" />
                    </div>
                    <span>Jane Smith</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Double Validation Attempt</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                    {new Date().toLocaleTimeString()}
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                      Needs Review
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-b p-3 hover:bg-napps-green/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-napps-green/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-napps-green" />
                    </div>
                    <span>Mike Johnson</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Invalid QR Code</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                    {new Date().toLocaleTimeString()}
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
                      Rejected
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-napps-green/30 hover:bg-napps-green/10">
                Report Issue to Admin
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}

