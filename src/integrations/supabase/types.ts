export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bot_interactions: {
        Row: {
          bot_type: string | null
          confidence: number | null
          fingerprint: string | null
          id: string
          interaction_type: string
          ip_address: string | null
          is_bot: boolean | null
          keyboard_interactions: number | null
          mouse_movements: number | null
          navigation_speed: number | null
          request_headers: Json | null
          session_id: string
          target_element: string | null
          time_spent: number | null
          timestamp: string | null
          url_path: string | null
          user_agent: string | null
        }
        Insert: {
          bot_type?: string | null
          confidence?: number | null
          fingerprint?: string | null
          id?: string
          interaction_type: string
          ip_address?: string | null
          is_bot?: boolean | null
          keyboard_interactions?: number | null
          mouse_movements?: number | null
          navigation_speed?: number | null
          request_headers?: Json | null
          session_id: string
          target_element?: string | null
          time_spent?: number | null
          timestamp?: string | null
          url_path?: string | null
          user_agent?: string | null
        }
        Update: {
          bot_type?: string | null
          confidence?: number | null
          fingerprint?: string | null
          id?: string
          interaction_type?: string
          ip_address?: string | null
          is_bot?: boolean | null
          keyboard_interactions?: number | null
          mouse_movements?: number | null
          navigation_speed?: number | null
          request_headers?: Json | null
          session_id?: string
          target_element?: string | null
          time_spent?: number | null
          timestamp?: string | null
          url_path?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      ml_detection_metrics: {
        Row: {
          accuracy: number | null
          detected_bots: number | null
          false_negatives: number | null
          false_positives: number | null
          id: string
          model_version: string | null
          recorded_at: string | null
          total_traffic: number | null
        }
        Insert: {
          accuracy?: number | null
          detected_bots?: number | null
          false_negatives?: number | null
          false_positives?: number | null
          id?: string
          model_version?: string | null
          recorded_at?: string | null
          total_traffic?: number | null
        }
        Update: {
          accuracy?: number | null
          detected_bots?: number | null
          false_negatives?: number | null
          false_positives?: number | null
          id?: string
          model_version?: string | null
          recorded_at?: string | null
          total_traffic?: number | null
        }
        Relationships: []
      }
      ml_model_training: {
        Row: {
          accuracy: number | null
          dataset_size: number | null
          f1_score: number | null
          features_used: Json | null
          id: string
          improvements: string[] | null
          model_version: string | null
          precision: number | null
          recall: number | null
          trained_at: string | null
          training_duration: number | null
        }
        Insert: {
          accuracy?: number | null
          dataset_size?: number | null
          f1_score?: number | null
          features_used?: Json | null
          id?: string
          improvements?: string[] | null
          model_version?: string | null
          precision?: number | null
          recall?: number | null
          trained_at?: string | null
          training_duration?: number | null
        }
        Update: {
          accuracy?: number | null
          dataset_size?: number | null
          f1_score?: number | null
          features_used?: Json | null
          id?: string
          improvements?: string[] | null
          model_version?: string | null
          precision?: number | null
          recall?: number | null
          trained_at?: string | null
          training_duration?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
