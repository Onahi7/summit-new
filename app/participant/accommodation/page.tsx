"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const ParticipantAccommodationPage = dynamic<{}>(
  () => import("@/components/ui/participant-accommodation").then((mod) => mod.default as ComponentType<{}>),
  { ssr: false }
)

export default function AccommodationPage() {
  return <ParticipantAccommodationPage />
}

