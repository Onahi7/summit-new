import { env } from "@/lib/env"

// Types
type PaystackInitiateResponse = {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

type PaystackVerifyResponse = {
  status: boolean
  message: string
  data: {
    status: string
    reference: string
    amount: number
    paid_at: string
    metadata: any
    customer: {
      email: string
      name: string
    }
  }
}

type InitiatePaymentParams = {
  email: string
  amount: number
  metadata?: any
  callback_url?: string
  reference?: string
}

// Initiate payment
export async function initiatePayment(params: InitiatePaymentParams) {
  const { email, amount, metadata, callback_url, reference } = params

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount, // amount in kobo (smallest currency unit)
      metadata,
      callback_url: callback_url || `${env.NEXT_PUBLIC_APP_URL}/payment/verify`,
      reference: reference || `REF-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to initialize payment")
  }

  const data: PaystackInitiateResponse = await response.json()

  return {
    authorization_url: data.data.authorization_url,
    reference: data.data.reference,
  }
}

// Verify payment
export async function verifyPayment(reference: string) {
  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to verify payment")
  }

  const data: PaystackVerifyResponse = await response.json()

  return {
    status: data.data.status,
    reference: data.data.reference,
    amount: data.data.amount / 100, // Convert from kobo to naira
    paid_at: data.data.paid_at,
    metadata: data.data.metadata,
    customer: data.data.customer,
  }
}

