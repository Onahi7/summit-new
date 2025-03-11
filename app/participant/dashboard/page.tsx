"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const ParticipantDashboardPage = dynamic<{}>(
  () => import("@/components/participant-dashboard").then((mod) => mod.ParticipantDashboard as ComponentType<{}>),
  { loading: () => <div>Loading...</div> }
)

export default function ParticipantDashboard() {
  return <ParticipantDashboardPage />
}

