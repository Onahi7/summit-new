"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const ValidatorDashboardPage = dynamic<{}>(
  () => import("@/components/validator-dashboard"),
  { loading: () => <div>Loading...</div> }
)

export default function ValidatorDashboard() {
  return <ValidatorDashboardPage />
}

