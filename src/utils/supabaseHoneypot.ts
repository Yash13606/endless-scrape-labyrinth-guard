
import { supabase } from "@/integrations/supabase/client";

// Store a single bot/human interaction detected on the Honeypot page
export async function logHoneypotInteraction(data: {
  session_id: string;
  user_agent?: string;
  ip_address?: string;
  fingerprint: string;
  interaction_type: string;
  target_element?: string;
  url_path: string;
  request_headers?: Record<string, any>;
  time_spent?: number;
  is_bot?: boolean;
  bot_type?: string;
  confidence?: number;
  mouse_movements?: number;
  keyboard_interactions?: number;
  navigation_speed?: number;
}) {
  const { error } = await supabase.from("bot_interactions").insert([data]);
  if (error) {
    console.error("Failed to log bot interaction:", error);
  }
}

// Store ML training event (simulate retraining)
export async function logMLModelTraining(data: {
  training_duration: number;
  dataset_size: number;
  accuracy: number;
  precision?: number;
  recall?: number;
  f1_score?: number;
  features_used?: Record<string, number>;
  model_version?: string;
  improvements?: string[];
}) {
  const { error } = await supabase.from("ml_model_training").insert([data]);
  if (error) {
    console.error("Failed to log ML model training:", error);
  }
}

// Store detection metrics (simulate periodic eval)
export async function logMLDetectionMetrics(data: {
  total_traffic: number;
  detected_bots: number;
  false_positives: number;
  false_negatives: number;
  accuracy: number;
  model_version?: string;
}) {
  const { error } = await supabase.from("ml_detection_metrics").insert([data]);
  if (error) {
    console.error("Failed to log detection metrics:", error);
  }
}

// Fetch metrics for dashboard
export async function fetchDetectionMetrics() {
  const { data, error } = await supabase
    .from("ml_detection_metrics")
    .select("*")
    .order("recorded_at", { ascending: false })
    .limit(1);
  if (error) {
    console.error("Failed to fetch detection metrics:", error);
  }
  return data?.[0] ?? null;
}

// Fetch model training history
export async function fetchModelTrainingHistory(limit = 5) {
  const { data, error } = await supabase
    .from("ml_model_training")
    .select("*")
    .order("trained_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("Failed to fetch model training data:", error);
  }
  return data ?? [];
}
