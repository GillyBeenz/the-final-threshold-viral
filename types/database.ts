// Database Types - Auto-generated from Supabase schema

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
      referrals: {
        Row: {
          id: string
          referral_code: string
          share_channel: string | null
          created_at: string
          user_agent: string | null
          source_page: string | null
        }
        Insert: {
          id?: string
          referral_code: string
          share_channel?: string | null
          created_at?: string
          user_agent?: string | null
          source_page?: string | null
        }
        Update: {
          id?: string
          referral_code?: string
          share_channel?: string | null
          created_at?: string
          user_agent?: string | null
          source_page?: string | null
        }
      }
      clicks: {
        Row: {
          id: string
          referral_id: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          device_type: string | null
          ip_hash: string | null
          country_code: string | null
          created_at: string
          landing_page: boolean | null
          converted: boolean | null
        }
        Insert: {
          id?: string
          referral_id?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          device_type?: string | null
          ip_hash?: string | null
          country_code?: string | null
          created_at?: string
          landing_page?: boolean | null
          converted?: boolean | null
        }
        Update: {
          id?: string
          referral_id?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          device_type?: string | null
          ip_hash?: string | null
          country_code?: string | null
          created_at?: string
          landing_page?: boolean | null
          converted?: boolean | null
        }
      }
      conversions: {
        Row: {
          id: string
          click_id: string | null
          referral_id: string | null
          amazon_url: string
          created_at: string
        }
        Insert: {
          id?: string
          click_id?: string | null
          referral_id?: string | null
          amazon_url: string
          created_at?: string
        }
        Update: {
          id?: string
          click_id?: string | null
          referral_id?: string | null
          amazon_url?: string
          created_at?: string
        }
      }
      email_signups: {
        Row: {
          id: string
          email: string
          referral_id: string | null
          subscribed: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          referral_id?: string | null
          subscribed?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          referral_id?: string | null
          subscribed?: boolean | null
          created_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
    Views: {
      referral_performance: {
        Row: {
          id: string
          referral_code: string
          share_channel: string | null
          created_at: string
          total_clicks: number
          conversions: number
          conversion_rate: number
        }
      }
      daily_stats: {
        Row: {
          date: string
          total_clicks: number
          unique_referrals: number
          conversions: number
          mobile_clicks: number
          desktop_clicks: number
        }
      }
      top_referrers: {
        Row: {
          referral_code: string
          share_channel: string | null
          total_clicks: number
          conversions: number
          created_at: string
        }
      }
    }
    Functions: {
      generate_referral_code: {
        Args: Record<string, never>
        Returns: string
      }
      hash_ip: {
        Args: { ip_address: string }
        Returns: string
      }
      get_device_type: {
        Args: { user_agent: string }
        Returns: string
      }
    }
  }
}

// Helper types
export type Referral = Database['public']['Tables']['referrals']['Row']
export type Click = Database['public']['Tables']['clicks']['Row']
export type Conversion = Database['public']['Tables']['conversions']['Row']
export type EmailSignup = Database['public']['Tables']['email_signups']['Row']
export type Setting = Database['public']['Tables']['settings']['Row']

export type ReferralPerformance = Database['public']['Views']['referral_performance']['Row']
export type DailyStats = Database['public']['Views']['daily_stats']['Row']
export type TopReferrer = Database['public']['Views']['top_referrers']['Row']
