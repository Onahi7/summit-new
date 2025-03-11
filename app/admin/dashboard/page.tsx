"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const AdminDashboardPage = dynamic<{}>(
  () => import("@/components/admin-dashboard").then((mod) => mod.AdminDashboard as ComponentType<{}>),
  { loading: () => <div>Loading...</div> }
)

export default function AdminDashboard() {
  return <AdminDashboardPage />
}

