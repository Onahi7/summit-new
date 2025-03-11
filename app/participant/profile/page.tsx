"use client"

import type React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Upload, Bell, Lock, CreditCard } from "lucide-react"
import { useState } from "react"

export default function ParticipantProfile() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "08012345678",
    organization: "ABC Private School",
    bio: "School proprietor with 10 years of experience in education management.",
    dietaryRequirements: "No specific requirements",
    emailNotifications: true,
    smsNotifications: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProfileData((prev) => ({ ...prev, [name]: checked }))
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] bg-background">
      <DashboardSidebar role="participant" />
      <div className="flex flex-col">
        <DashboardHeader role="participant" title="My Profile" />
        <main className="flex-1 p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <Card className="border-napps-gold/30 card-glow w-full md:w-80">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4 ring-2 ring-napps-gold/30">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                  <AvatarFallback className="text-3xl bg-napps-gold text-black font-bold">JD</AvatarFallback>
                </Avatar>
                <Button variant="gold-outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-napps-gold" />
                  <span>John Doe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-napps-gold" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-napps-gold" />
                  <span>Regular Ticket</span>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-napps-gold/30 card-glow flex-1">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        className="border-napps-gold/30 focus-visible:ring-napps-gold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        className="border-napps-gold/30 focus-visible:ring-napps-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="border-napps-gold/30 focus-visible:ring-napps-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="border-napps-gold/30 focus-visible:ring-napps-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-white">
                      School/Organization
                    </Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={profileData.organization}
                      onChange={handleInputChange}
                      className="border-napps-gold/30 focus-visible:ring-napps-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      className="min-h-[100px] border-napps-gold/30 focus-visible:ring-napps-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietaryRequirements" className="text-white">
                      Dietary Requirements
                    </Label>
                    <Textarea
                      id="dietaryRequirements"
                      name="dietaryRequirements"
                      value={profileData.dietaryRequirements}
                      onChange={handleInputChange}
                      placeholder="Please specify any dietary requirements or allergies"
                      className="min-h-[80px] border-napps-gold/30 focus-visible:ring-napps-gold"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button variant="gold" className="shadow-gold">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-napps-gold/30 card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-napps-gold" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications" className="text-white">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive conference updates via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={profileData.emailNotifications}
                      onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                      className="data-[state=checked]:bg-napps-gold"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smsNotifications" className="text-white">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive conference updates via SMS</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={profileData.smsNotifications}
                      onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
                      className="data-[state=checked]:bg-napps-gold"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-napps-gold/30 card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-napps-gold" />
                  Security
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-white">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="border-napps-gold/30 focus-visible:ring-napps-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-white">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      className="border-napps-gold/30 focus-visible:ring-napps-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="border-napps-gold/30 focus-visible:ring-napps-gold"
                    />
                  </div>

                  <Button variant="gold" className="w-full shadow-gold">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

