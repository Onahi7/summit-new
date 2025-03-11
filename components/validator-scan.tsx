"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, QrCode, Camera, Phone, User, Search } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/supabase-auth-provider"

export default function ValidatorScan() {
  const { user } = useAuth()
  const [scanActive, setScanActive] = useState(false)
  const [validationType, setValidationType] = useState("breakfast")
  const [scanMethod, setScanMethod] = useState("qrcode")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [scanResult, setScanResult] = useState<null | {
    success: boolean
    name: string
    id: string
    message: string
  }>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  // Simulate QR code scanning
  const startScanning = () => {
    setScanActive(true)
    setScanResult(null)

    // In a real app, this would access the camera and scan QR codes
    // For demo purposes, we'll just show a video element and simulate scanning

    if (videoRef.current) {
      // Request camera access in a real app
      // For demo, we'll just show a placeholder
      videoRef.current.play().catch((e) => {
        console.error("Could not play video", e)
      })

      // Simulate a scan after 3 seconds
      setTimeout(() => {
        // 80% chance of success
        const success = Math.random() > 0.2

        if (success) {
          setScanResult({
            success: true,
            name: "John Doe",
            id: "NAPPS-2025-1234",
            message: `${validationType === "breakfast" ? "Breakfast" : validationType === "dinner" ? "Dinner" : "Accreditation"} validated successfully`,
          })

          toast({
            title: "Validation Successful",
            description: `${validationType === "breakfast" ? "Breakfast" : validationType === "dinner" ? "Dinner" : "Accreditation"} validated for John Doe`,
          })
        } else {
          setScanResult({
            success: false,
            name: "Unknown",
            id: "N/A",
            message: "Invalid QR code or already validated",
          })

          toast({
            variant: "destructive",
            title: "Validation Failed",
            description: "Invalid QR code or already validated",
          })
        }

        setScanActive(false)
      }, 3000)
    }
  }

  const validateByPhone = () => {
    setScanResult(null)

    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
      })
      return
    }

    // Simulate phone number validation
    setTimeout(() => {
      // 80% chance of success
      const success = Math.random() > 0.2

      if (success) {
        setScanResult({
          success: true,
          name: "John Doe",
          id: "NAPPS-2025-1234",
          message: `${validationType === "breakfast" ? "Breakfast" : validationType === "dinner" ? "Dinner" : "Accreditation"} validated successfully`,
        })

        toast({
          title: "Validation Successful",
          description: `${validationType === "breakfast" ? "Breakfast" : validationType === "dinner" ? "Dinner" : "Accreditation"} validated for John Doe`,
        })
      } else {
        setScanResult({
          success: false,
          name: "Unknown",
          id: "N/A",
          message: "Phone number not found or already validated",
        })

        toast({
          variant: "destructive",
          title: "Validation Failed",
          description: "Phone number not found or already validated",
        })
      }
    }, 1500)
  }

  const stopScanning = () => {
    setScanActive(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] bg-background">
      <DashboardSidebar role="validator" />
      <div className="flex flex-col">
        <DashboardHeader role="validator" title="Scan QR Code" />
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-napps-green/20 dark:border-napps-green/30 card-glow">
              <CardHeader>
                <CardTitle>Validation Scanner</CardTitle>
                <CardDescription>Scan QR codes or validate by phone number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="qrcode" onValueChange={setScanMethod} className="w-full">
                  <TabsList className="bg-napps-green/10 dark:bg-napps-green/20 w-full">
                    <TabsTrigger
                      value="qrcode"
                      className="data-[state=active]:bg-napps-green data-[state=active]:text-white"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      QR Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="phone"
                      className="data-[state=active]:bg-napps-green data-[state=active]:text-white"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Phone Number
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="qrcode">
                    <div className="rounded-lg border bg-muted/20 aspect-square max-w-md mx-auto relative overflow-hidden qr-scanner-overlay">
                      {scanActive ? (
                        <video
                          ref={videoRef}
                          className="absolute inset-0 w-full h-full object-cover"
                          poster="/placeholder.svg?height=400&width=400"
                          muted
                          loop
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          {scanResult ? (
                            <div className="text-center p-4">
                              {scanResult.success ? (
                                <CheckCircle className="h-16 w-16 text-napps-green mx-auto mb-4" />
                              ) : (
                                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                              )}
                              <h3 className="text-xl font-bold mb-2">
                                {scanResult.success ? "Validation Successful" : "Validation Failed"}
                              </h3>
                              <p className="text-muted-foreground">{scanResult.message}</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground">Ready to scan</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="phone">
                    <div className="space-y-4">
                      <div className="rounded-lg border p-6 bg-muted/20">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Participant Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="phoneNumber"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="pl-10 border-napps-green/30 focus-visible:ring-napps-green"
                              />
                            </div>
                          </div>

                          <Button onClick={validateByPhone} className="w-full bg-napps-green hover:bg-napps-green/90">
                            <Search className="mr-2 h-4 w-4" />
                            Validate
                          </Button>
                        </div>

                        {scanResult && (
                          <div className="mt-4 p-4 rounded-md text-center">
                            {scanResult.success ? (
                              <div className="text-napps-green">
                                <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                                <p className="font-medium">{scanResult.message}</p>
                              </div>
                            ) : (
                              <div className="text-red-500">
                                <XCircle className="h-12 w-12 mx-auto mb-2" />
                                <p className="font-medium">{scanResult.message}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <div className="font-medium">Validation Type</div>
                  <RadioGroup
                    defaultValue="breakfast"
                    value={validationType}
                    onValueChange={setValidationType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2 rounded-md border border-napps-green/30 p-3 hover:bg-napps-green/5">
                      <RadioGroupItem
                        value="breakfast"
                        id="breakfast"
                        className="text-napps-green border-napps-green/50"
                      />
                      <Label htmlFor="breakfast" className="flex-1 cursor-pointer">
                        Breakfast
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border border-napps-green/30 p-3 hover:bg-napps-green/5">
                      <RadioGroupItem value="dinner" id="dinner" className="text-napps-green border-napps-green/50" />
                      <Label htmlFor="dinner" className="flex-1 cursor-pointer">
                        Dinner
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border border-napps-green/30 p-3 hover:bg-napps-green/5">
                      <RadioGroupItem
                        value="accreditation"
                        id="accreditation"
                        className="text-napps-green border-napps-green/50"
                      />
                      <Label htmlFor="accreditation" className="flex-1 cursor-pointer">
                        Accreditation
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                {scanMethod === "qrcode" &&
                  (scanActive ? (
                    <Button variant="destructive" className="w-full" onClick={stopScanning}>
                      Cancel Scan
                    </Button>
                  ) : (
                    <Button className="w-full bg-napps-green hover:bg-napps-green/90" onClick={startScanning}>
                      <Camera className="mr-2 h-4 w-4" />
                      Start Scanning
                    </Button>
                  ))}
              </CardFooter>
            </Card>

            <Card className="border-napps-green/20 dark:border-napps-green/30">
              <CardHeader>
                <CardTitle>Scan Results</CardTitle>
                <CardDescription>Details of the scanned QR code or phone validation</CardDescription>
              </CardHeader>
              <CardContent>
                {scanResult ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 bg-muted/20">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium">Status:</div>
                        <div className="text-sm">
                          {scanResult.success ? (
                            <span className="inline-flex items-center rounded-full bg-napps-green/20 px-2.5 py-0.5 text-xs font-medium text-napps-green">
                              Success
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-500">
                              Failed
                            </span>
                          )}
                        </div>

                        <div className="text-sm font-medium">Name:</div>
                        <div className="text-sm">{scanResult.name}</div>

                        <div className="text-sm font-medium">ID:</div>
                        <div className="text-sm">{scanResult.id}</div>

                        <div className="text-sm font-medium">Validation Type:</div>
                        <div className="text-sm capitalize">{validationType}</div>

                        <div className="text-sm font-medium">Time:</div>
                        <div className="text-sm">{new Date().toLocaleTimeString()}</div>

                        <div className="text-sm font-medium">Date:</div>
                        <div className="text-sm">{new Date().toLocaleDateString()}</div>
                      </div>
                    </div>

                    {scanResult.success ? (
                      <div className="rounded-md bg-napps-green/10 p-4 text-sm text-napps-green">
                        <p className="font-medium">Success:</p>
                        <p>{scanResult.message}</p>
                      </div>
                    ) : (
                      <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-500">
                        <p className="font-medium">Error:</p>
                        <p>{scanResult.message}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No scan results yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {scanMethod === "qrcode"
                        ? "Scan a QR code to see the results here"
                        : "Enter a phone number to validate"}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-napps-green/30 text-napps-green hover:bg-napps-green/10"
                  disabled={!scanResult}
                >
                  Save to History
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-6 border-napps-green/20 dark:border-napps-green/30">
            <CardHeader>
              <CardTitle>Recent Validations</CardTitle>
              <CardDescription>Your recent validations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-napps-green/20">
                <div className="grid grid-cols-5 border-b p-3 font-medium">
                  <div>Name</div>
                  <div>ID</div>
                  <div>Type</div>
                  <div>Time</div>
                  <div>Status</div>
                </div>
                {[
                  {
                    name: "John Doe",
                    id: "NAPPS-2025-1234",
                    type: "Breakfast",
                    time: new Date(Date.now() - 5 * 60000).toLocaleTimeString(),
                    status: "success",
                  },
                  {
                    name: "Jane Smith",
                    id: "NAPPS-2025-1235",
                    type: "Accreditation",
                    time: new Date(Date.now() - 10 * 60000).toLocaleTimeString(),
                    status: "success",
                  },
                  {
                    name: "Unknown",
                    id: "N/A",
                    type: "Dinner",
                    time: new Date(Date.now() - 15 * 60000).toLocaleTimeString(),
                    status: "failed",
                  },
                  {
                    name: "Michael Johnson",
                    id: "NAPPS-2025-1236",
                    type: "Breakfast",
                    time: new Date(Date.now() - 20 * 60000).toLocaleTimeString(),
                    status: "success",
                  },
                  {
                    name: "Emily Brown",
                    id: "NAPPS-2025-1237",
                    type: "Accreditation",
                    time: new Date(Date.now() - 25 * 60000).toLocaleTimeString(),
                    status: "success",
                  },
                ].map((validation, i) => (
                  <div key={i} className="grid grid-cols-5 border-b p-3 last:border-0">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-napps-green" />
                      <span>{validation.name}</span>
                    </div>
                    <div>{validation.id}</div>
                    <div>{validation.type}</div>
                    <div>{validation.time}</div>
                    <div>
                      {validation.status === "success" ? (
                        <span className="inline-flex items-center rounded-full bg-napps-green/20 px-2.5 py-0.5 text-xs font-medium text-napps-green">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-500">
                          <XCircle className="mr-1 h-3 w-3" />
                          Failed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

