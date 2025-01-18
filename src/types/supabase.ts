export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string | null
          cpf: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          phone?: string | null
          cpf?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string | null
          cpf?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          origin: string
          destination: string
          departure_date: string
          arrival_date: string
          company: string
          price: number
          available_seats: number
          created_at: string
        }
        Insert: {
          id?: string
          origin: string
          destination: string
          departure_date: string
          arrival_date: string
          company: string
          price: number
          available_seats?: number
          created_at?: string
        }
        Update: {
          id?: string
          origin?: string
          destination?: string
          departure_date?: string
          arrival_date?: string
          company?: string
          price?: number
          available_seats?: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          trip_id: string
          status: 'pending' | 'confirmed' | 'cancelled'
          seat_number: string
          qr_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          trip_id: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          seat_number: string
          qr_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          trip_id?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          seat_number?: string
          qr_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          subject: string
          description: string
          status: 'open' | 'in_progress' | 'resolved'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          description: string
          status?: 'open' | 'in_progress' | 'resolved'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          description?: string
          status?: 'open' | 'in_progress' | 'resolved'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}