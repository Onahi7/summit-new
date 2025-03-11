"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const AdminAccreditationPage = dynamic<{}>(
  () => import("@/components/admin-accreditation").then((mod) => mod.default as ComponentType<{}>),
  { loading: () => <div>Loading...</div> }
)

export default function AdminAccreditation() {
  return <AdminAccreditationPage />
}

