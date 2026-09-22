export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      access_points: {
        Row: {
          connected_users: number
          created_at: string
          group_name: string | null
          id: string
          ip_address: string | null
          is_demo: boolean
          last_seen: string | null
          location_id: string | null
          mac_address: string | null
          manufacturer: string | null
          model: string | null
          name: string
          organization_id: string
          router_id: string | null
          signal_dbm: number | null
          status: string
          updated_at: string
        }
        Insert: {
          connected_users?: number
          created_at?: string
          group_name?: string | null
          id?: string
          ip_address?: string | null
          is_demo?: boolean
          last_seen?: string | null
          location_id?: string | null
          mac_address?: string | null
          manufacturer?: string | null
          model?: string | null
          name: string
          organization_id: string
          router_id?: string | null
          signal_dbm?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          connected_users?: number
          created_at?: string
          group_name?: string | null
          id?: string
          ip_address?: string | null
          is_demo?: boolean
          last_seen?: string | null
          location_id?: string | null
          mac_address?: string | null
          manufacturer?: string | null
          model?: string | null
          name?: string
          organization_id?: string
          router_id?: string | null
          signal_dbm?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_points_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_points_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_points_router_id_fkey"
            columns: ["router_id"]
            isOneToOne: false
            referencedRelation: "routers"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          balance: number
          commission_rate: number
          created_at: string
          id: string
          is_demo: boolean
          name: string
          organization_id: string
          phone: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          balance?: number
          commission_rate?: number
          created_at?: string
          id?: string
          is_demo?: boolean
          name: string
          organization_id: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          balance?: number
          commission_rate?: number
          created_at?: string
          id?: string
          is_demo?: boolean
          name?: string
          organization_id?: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          actor_name: string | null
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          organization_id: string | null
          result: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          organization_id?: string | null
          result?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          organization_id?: string | null
          result?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_devices: {
        Row: {
          blocked: boolean
          created_at: string
          customer_id: string
          id: string
          is_demo: boolean
          last_seen: string | null
          mac_address: string
          name: string | null
          organization_id: string
          updated_at: string
        }
        Insert: {
          blocked?: boolean
          created_at?: string
          customer_id: string
          id?: string
          is_demo?: boolean
          last_seen?: string | null
          mac_address: string
          name?: string | null
          organization_id: string
          updated_at?: string
        }
        Update: {
          blocked?: boolean
          created_at?: string
          customer_id?: string
          id?: string
          is_demo?: boolean
          last_seen?: string | null
          mac_address?: string
          name?: string | null
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_devices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_devices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string
          email: string | null
          expires_at: string | null
          full_name: string
          id: string
          ip_address: string | null
          is_demo: boolean
          last_login_at: string | null
          location_id: string | null
          mac_address: string | null
          organization_id: string
          package_id: string | null
          phone: string | null
          status: string
          total_data_mb: number
          total_spent: number
          updated_at: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          expires_at?: string | null
          full_name: string
          id?: string
          ip_address?: string | null
          is_demo?: boolean
          last_login_at?: string | null
          location_id?: string | null
          mac_address?: string | null
          organization_id: string
          package_id?: string | null
          phone?: string | null
          status?: string
          total_data_mb?: number
          total_spent?: number
          updated_at?: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          expires_at?: string | null
          full_name?: string
          id?: string
          ip_address?: string | null
          is_demo?: boolean
          last_login_at?: string | null
          location_id?: string | null
          mac_address?: string | null
          organization_id?: string
          package_id?: string | null
          phone?: string | null
          status?: string
          total_data_mb?: number
          total_spent?: number
          updated_at?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          created_at: string
          id: string
          is_demo: boolean
          name: string
          notes: string | null
          organization_id: string
          type: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          name: string
          notes?: string | null
          organization_id: string
          type?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          name?: string
          notes?: string | null
          organization_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          country: string
          created_at: string
          created_by: string | null
          currency: string
          id: string
          is_demo: boolean
          logo_url: string | null
          name: string
          plan: string
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          is_demo?: boolean
          logo_url?: string | null
          name: string
          plan?: string
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          is_demo?: boolean
          logo_url?: string | null
          name?: string
          plan?: string
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          created_at: string
          currency: string
          data_limit_mb: number | null
          description: string | null
          device_limit: number
          duration_minutes: number
          grace_minutes: number
          id: string
          is_demo: boolean
          name: string
          organization_id: string
          price: number
          speed_profile_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          data_limit_mb?: number | null
          description?: string | null
          device_limit?: number
          duration_minutes?: number
          grace_minutes?: number
          id?: string
          is_demo?: boolean
          name: string
          organization_id: string
          price?: number
          speed_profile_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          data_limit_mb?: number | null
          description?: string | null
          device_limit?: number
          duration_minutes?: number
          grace_minutes?: number
          id?: string
          is_demo?: boolean
          name?: string
          organization_id?: string
          price?: number
          speed_profile_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "packages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packages_speed_profile_id_fkey"
            columns: ["speed_profile_id"]
            isOneToOne: false
            referencedRelation: "speed_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          customer_id: string | null
          external_id: string | null
          gateway: string | null
          id: string
          is_demo: boolean
          method: string
          organization_id: string
          package_id: string | null
          paid_at: string | null
          phone: string | null
          reference: string
          router_id: string | null
          status: string
          updated_at: string
          voucher_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          customer_id?: string | null
          external_id?: string | null
          gateway?: string | null
          id?: string
          is_demo?: boolean
          method?: string
          organization_id: string
          package_id?: string | null
          paid_at?: string | null
          phone?: string | null
          reference: string
          router_id?: string | null
          status?: string
          updated_at?: string
          voucher_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          customer_id?: string | null
          external_id?: string | null
          gateway?: string | null
          id?: string
          is_demo?: boolean
          method?: string
          organization_id?: string
          package_id?: string | null
          paid_at?: string | null
          phone?: string | null
          reference?: string
          router_id?: string | null
          status?: string
          updated_at?: string
          voucher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_router_id_fkey"
            columns: ["router_id"]
            isOneToOne: false
            referencedRelation: "routers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      routers: {
        Row: {
          api_port: number
          connection_method: string
          cpu_load: number | null
          created_at: string
          enabled: boolean
          id: string
          ip_address: string
          is_demo: boolean
          last_seen: string | null
          location_id: string | null
          memory_usage_pct: number | null
          name: string
          organization_id: string
          password_encrypted: string | null
          routeros_version: string | null
          status: string
          updated_at: string
          uptime_seconds: number | null
          username: string
        }
        Insert: {
          api_port?: number
          connection_method?: string
          cpu_load?: number | null
          created_at?: string
          enabled?: boolean
          id?: string
          ip_address: string
          is_demo?: boolean
          last_seen?: string | null
          location_id?: string | null
          memory_usage_pct?: number | null
          name: string
          organization_id: string
          password_encrypted?: string | null
          routeros_version?: string | null
          status?: string
          updated_at?: string
          uptime_seconds?: number | null
          username: string
        }
        Update: {
          api_port?: number
          connection_method?: string
          cpu_load?: number | null
          created_at?: string
          enabled?: boolean
          id?: string
          ip_address?: string
          is_demo?: boolean
          last_seen?: string | null
          location_id?: string | null
          memory_usage_pct?: number | null
          name?: string
          organization_id?: string
          password_encrypted?: string | null
          routeros_version?: string | null
          status?: string
          updated_at?: string
          uptime_seconds?: number | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "routers_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          access_point_id: string | null
          created_at: string
          customer_id: string | null
          download_mb: number
          ended_at: string | null
          id: string
          ip_address: string | null
          is_demo: boolean
          mac_address: string | null
          organization_id: string
          package_id: string | null
          router_id: string | null
          started_at: string
          status: string
          updated_at: string
          upload_mb: number
          username: string | null
        }
        Insert: {
          access_point_id?: string | null
          created_at?: string
          customer_id?: string | null
          download_mb?: number
          ended_at?: string | null
          id?: string
          ip_address?: string | null
          is_demo?: boolean
          mac_address?: string | null
          organization_id: string
          package_id?: string | null
          router_id?: string | null
          started_at?: string
          status?: string
          updated_at?: string
          upload_mb?: number
          username?: string | null
        }
        Update: {
          access_point_id?: string | null
          created_at?: string
          customer_id?: string | null
          download_mb?: number
          ended_at?: string | null
          id?: string
          ip_address?: string | null
          is_demo?: boolean
          mac_address?: string | null
          organization_id?: string
          package_id?: string | null
          router_id?: string | null
          started_at?: string
          status?: string
          updated_at?: string
          upload_mb?: number
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_access_point_id_fkey"
            columns: ["access_point_id"]
            isOneToOne: false
            referencedRelation: "access_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_router_id_fkey"
            columns: ["router_id"]
            isOneToOne: false
            referencedRelation: "routers"
            referencedColumns: ["id"]
          },
        ]
      }
      speed_profiles: {
        Row: {
          created_at: string
          download_kbps: number
          id: string
          is_demo: boolean
          name: string
          organization_id: string
          updated_at: string
          upload_kbps: number
        }
        Insert: {
          created_at?: string
          download_kbps: number
          id?: string
          is_demo?: boolean
          name: string
          organization_id: string
          updated_at?: string
          upload_kbps: number
        }
        Update: {
          created_at?: string
          download_kbps?: number
          id?: string
          is_demo?: boolean
          name?: string
          organization_id?: string
          updated_at?: string
          upload_kbps?: number
        }
        Relationships: [
          {
            foreignKeyName: "speed_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      voucher_batches: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_demo: boolean
          name: string
          organization_id: string
          package_id: string | null
          prefix: string | null
          quantity: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_demo?: boolean
          name: string
          organization_id: string
          package_id?: string | null
          prefix?: string | null
          quantity?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_demo?: boolean
          name?: string
          organization_id?: string
          package_id?: string | null
          prefix?: string | null
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_batches_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_batches_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          activated_at: string | null
          agent_id: string | null
          batch_id: string | null
          code: string
          created_at: string
          customer_id: string | null
          expires_at: string | null
          id: string
          is_demo: boolean
          location_id: string | null
          organization_id: string
          package_id: string | null
          price: number
          router_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          activated_at?: string | null
          agent_id?: string | null
          batch_id?: string | null
          code: string
          created_at?: string
          customer_id?: string | null
          expires_at?: string | null
          id?: string
          is_demo?: boolean
          location_id?: string | null
          organization_id: string
          package_id?: string | null
          price?: number
          router_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          activated_at?: string | null
          agent_id?: string | null
          batch_id?: string | null
          code?: string
          created_at?: string
          customer_id?: string | null
          expires_at?: string | null
          id?: string
          is_demo?: boolean
          location_id?: string | null
          organization_id?: string
          package_id?: string | null
          price?: number
          router_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vouchers_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "voucher_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_router_id_fkey"
            columns: ["router_id"]
            isOneToOne: false
            referencedRelation: "routers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_organization: {
        Args: { _email?: string; _name: string; _phone?: string }
        Returns: string
      }
      has_org_role: {
        Args: {
          _org: string
          _roles: Database["public"]["Enums"]["app_role"][]
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_org_member: { Args: { _org: string }; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "org_owner"
        | "network_admin"
        | "billing_staff"
        | "agent"
        | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "org_owner",
        "network_admin",
        "billing_staff",
        "agent",
        "customer",
      ],
    },
  },
} as const
