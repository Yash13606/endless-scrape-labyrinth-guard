
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Configure CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://jogdukxsxjwjhozwfapy.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Define valid API keys (in a real implementation, store these securely)
// For demo purposes, we're hardcoding one key
const VALID_API_KEYS = ["honeypot-secure-api-key-123456"];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  // API key validation
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized. Invalid API key.' }),
      {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    if (req.method === 'GET') {
      // Fetch recent interactions
      const { data: interactions, error: interactionsError } = await supabase
        .from("bot_interactions")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(50);
      
      if (interactionsError) throw interactionsError;

      // Fetch latest metrics
      const { data: metrics, error: metricsError } = await supabase
        .from("ml_detection_metrics")
        .select("*")
        .order("recorded_at", { ascending: false })
        .limit(1);
      
      if (metricsError) throw metricsError;

      // Fetch model training history
      const { data: modelHistory, error: modelError } = await supabase
        .from("ml_model_training")
        .select("*")
        .order("trained_at", { ascending: false })
        .limit(3);
      
      if (modelError) throw modelError;

      return new Response(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          interactions,
          metrics: metrics[0] || null,
          modelHistory: modelHistory || []
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } else if (req.method === 'POST') {
      // Handle incoming data (e.g., for training the model)
      const data = await req.json();
      
      if (data.type === 'train_model') {
        // Simulate model training with the provided data
        const trainingResult = {
          training_duration: data.duration || 5000,
          dataset_size: data.samples || 100,
          accuracy: data.accuracy || 0.92,
          precision: data.precision || 0.90,
          recall: data.recall || 0.88,
          f1_score: data.f1_score || 0.89,
          model_version: `v${new Date().toISOString().split('T')[0]}`,
          improvements: data.improvements || ['Improved detection of crawler bots']
        };
        
        const { error } = await supabase
          .from("ml_model_training")
          .insert([trainingResult]);
          
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true, message: 'Model training recorded', result: trainingResult }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Invalid operation type' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    );
  } catch (error) {
    console.error('API error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Server error', details: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
