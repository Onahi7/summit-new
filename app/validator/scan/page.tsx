"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const ValidatorScanPage = dynamic<{}>(
  () => import("@/components/validator-scan"),
  { loading: () => <div>Loading...</div> }
)

export default function ValidatorScan() {
  return <ValidatorScanPage />
}

