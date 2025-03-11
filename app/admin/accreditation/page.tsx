"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

// Dynamically import AdminAccreditation with no SSR
const AdminAccreditationPage = dynamic<{}>(
  () => import("@/components/admin-accreditation").then((mod) => mod.default as ComponentType<{}>),
  { ssr: false }
)

export default function AccreditationPage() {
  return <AdminAccreditationPage />
}

