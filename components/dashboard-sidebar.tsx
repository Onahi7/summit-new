"use client"

import { cn } from "@/lib/utils"
import {
  BarChart,
  BookOpen,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  QrCode,
  Settings,
  User,
  Users,
  FileText,
  Coffee,
  School,
  CheckSquare,
  BedDouble,
  Building,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"

interface DashboardSidebarProps {
  role: "admin" | "participant" | "validator"
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const adminMenuItems = [
    { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { href: "/admin/registrations", icon: Users, label: "Registrations" },
    { href: "/admin/payments", icon: CreditCard, label: "Payments" },
    { href: "/admin/validators", icon: QrCode, label: "Validators" },
    { href: "/admin/accreditation", icon: CheckSquare, label: "Accreditation" },
    { href: "/admin/hotels", icon: Building, label: "Hotels" },
    { href: "/admin/meals", icon: Coffee, label: "Meal Tracking" },
    { href: "/admin/resources", icon: FileText, label: "Resources" },
    { href: "/admin/reports", icon: BarChart, label: "Reports" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ]

  const participantMenuItems = [
    { href: "/participant/dashboard", icon: Home, label: "Dashboard" },
    { href: "/participant/qrcode", icon: QrCode, label: "My QR Code" },
    { href: "/participant/accreditation", icon: CheckSquare, label: "Accreditation" },
    { href: "/participant/accommodation", icon: BedDouble, label: "Accommodation" },
    { href: "/participant/meals", icon: Coffee, label: "Meal Status" },
    { href: "/participant/schedule", icon: Calendar, label: "Schedule" },
    { href: "/participant/resources", icon: BookOpen, label: "Resources" },
    { href: "/participant/profile", icon: User, label: "Profile" },
  ]

  const validatorMenuItems = [
    { href: "/validator/dashboard", icon: Home, label: "Dashboard" },
    { href: "/validator/scan", icon: QrCode, label: "Scan QR Code" },
    { href: "/validator/history", icon: Calendar, label: "Validation History" },
    { href: "/validator/profile", icon: User, label: "Profile" },
  ]

  const menuItems = role === "admin" ? adminMenuItems : role === "validator" ? validatorMenuItems : participantMenuItems

  const handleLogout = () => {
    logout()
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center border-b border-napps-gold/30 px-4">
        <Link href={`/${role}/dashboard`} className="flex items-center gap-2">
          <School className="h-6 w-6 text-napps-gold" />
          <span className="font-semibold text-napps-gold text-shadow-sm">NAPPS Conference</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                className={cn(
                  "hover:bg-napps-gold/10 data-[active=true]:bg-napps-gold/20 data-[active=true]:text-napps-gold",
                  "data-[active=true]:border-l-2 data-[active=true]:border-napps-gold",
                )}
              >
                <Link href={item.href}>
                  <item.icon
                    className={cn("h-5 w-5", pathname === item.href ? "text-napps-gold" : "text-muted-foreground")}
                  />
                  <span className={pathname === item.href ? "text-napps-gold font-medium" : ""}>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className="bg-napps-gold/30" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="hover:bg-red-500/10 hover:text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

