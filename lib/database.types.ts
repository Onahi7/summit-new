export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string
          phone: string
          role: "admin" | "participant" | "validator"
          state: string
          lga: string
          chapter: string
          organization: string | null
          position: string | null
          avatar_url: string | null
          payment_status: "pending" | "paid" | "failed"
          payment_reference: string | null
          payment_amount: number | null
          payment_date: string | null
          accreditation_status: "pending" | "approved" | "rejected"
          accreditation_date: string | null
          qr_code: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name: string
          phone: string
          role?: "admin" | "participant" | "validator"
          state: string
          lga: string
          chapter: string
          organization?: string | null
          position?: string | null
          avatar_url?: string | null
          payment_status?: "pending" | "paid" | "failed"
          payment_reference?: string | null
          payment_amount?: number | null
          payment_date?: string | null
          accreditation_status?: "pending" | "approved" | "rejected"
          accreditation_date?: string | null
          qr_code?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          phone?: string
          role?: "admin" | "participant" | "validator"
          state?: string
          lga?: string
          chapter?: string
          organization?: string | null
          position?: string | null
          avatar_url?: string | null
          payment_status?: "pending" | "paid" | "failed"
          payment_reference?: string | null
          payment_amount?: number | null
          payment_date?: string | null
          accreditation_status?: "pending" | "approved" | "rejected"
          accreditation_date?: string | null
          qr_code?: string | null
        }
      }
      // Other tables remain the same
    }
  }
}

