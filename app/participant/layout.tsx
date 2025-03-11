"use client"

import { ParticipantAuthProvider } from "@/components/participant-auth-provider"

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ParticipantAuthProvider>{children}</ParticipantAuthProvider>
}