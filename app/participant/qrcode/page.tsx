"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const ParticipantQRCodePage = dynamic<{}>(
  () => import("@/components/participant-qrcode").then((mod) => mod.default as ComponentType<{}>),
  { loading: () => <div>Loading...</div> }
)

export default function ParticipantQRCode() {
  return <ParticipantQRCodePage />
}

