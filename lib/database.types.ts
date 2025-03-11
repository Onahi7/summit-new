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
      hotels: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          address: string
          price_per_night: number
          image_url: string
          available_rooms: number
          amenities: string[]
          rating: number
          distance_to_venue: number
          featured: boolean
          price_category: "economy" | "standard" | "premium"
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          address: string
          price_per_night: number
          image_url: string
          available_rooms: number
          amenities: string[]
          rating: number
          distance_to_venue: number
          featured?: boolean
          price_category: "economy" | "standard" | "premium"
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          address?: string
          price_per_night?: number
          image_url?: string
          available_rooms?: number
          amenities?: string[]
          rating?: number
          distance_to_venue?: number
          featured?: boolean
          price_category?: "economy" | "standard" | "premium"
        }
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          user_id: string
          hotel_id: string
          check_in_date: string
          check_out_date: string
          status: "pending" | "confirmed" | "cancelled"
          payment_reference: string
          payment_status: "pending" | "paid" | "failed"
          total_amount: number
          special_requests: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          hotel_id: string
          check_in_date: string
          check_out_date: string
          status?: "pending" | "confirmed" | "cancelled"
          payment_reference: string
          payment_status?: "pending" | "paid" | "failed"
          total_amount: number
          special_requests?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          hotel_id?: string
          check_in_date?: string
          check_out_date?: string
          status?: "pending" | "confirmed" | "cancelled"
          payment_reference?: string
          payment_status?: "pending" | "paid" | "failed"
          total_amount?: number
          special_requests?: string | null
        }
      }
    }
  }
}

