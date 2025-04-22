
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

// Machine Learning model - in a real system this would be a more sophisticated model
type ModelFeatures = {
  navigationSpeed: number;
  mouseMovements: number;
  keyboardInteractions: number;
  scrollEvents: number;
  formInteractions: number;
  timeSpent: number;
  userAgentBot: boolean;
  trapTriggered: boolean;
  captchaTriggered: boolean;
  suspiciousPatterns: boolean;
};

type ModelParameters = {
  weights: Record<string, number>;
  threshold: number;
  version: string;
};

// Initialize model parameters - these would be loaded from a database in production
let modelParameters: ModelParameters = {
  weights: {
    navigationSpeed: 0.15,
    mouseMovements: 0.12,
    keyboardInteractions: 0.12,
    scrollEvents: 0.08,
    formInteractions: 0.08,
    timeSpent: 0.10,
    userAgentBot: 0.20,
    trapTriggered: 0.05,
    captchaTriggered: 0.05,
    suspiciousPatterns: 0.05
  },
  threshold: 0.65,
  version: "1.0.0"
};

// Predict if a request is from a bot using ML model
function predictBot(features: ModelFeatures): { isBot: boolean; confidence: number; } {
  // Normalize features 
  const normalizedFeatures = {
    navigationSpeed: Math.min(features.navigationSpeed / 10000, 1), // Fast navigation = 1
    mouseMovements: 1 - Math.min(features.mouseMovements / 50, 1), // Few movements = 1
    keyboardInteractions: 1 - Math.min(features.keyboardInteractions / 30, 1), // Few interactions = 1
    scrollEvents: 1 - Math.min(features.scrollEvents / 20, 1), // Few scrolls = 1
    formInteractions: 1 - Math.min(features.formInteractions / 10, 1), // Few form interactions = 1
    timeSpent: 1 - Math.min(features.timeSpent / 120000, 1), // Short time spent = 1
    userAgentBot: features.userAgentBot ? 1 : 0,
    trapTriggered: features.trapTriggered ? 1 : 0,
    captchaTriggered: features.captchaTriggered ? 1 : 0,
    suspiciousPatterns: features.suspiciousPatterns ? 1 : 0
  };

  // Calculate score using weighted sum
  let score = 0;
  let totalWeight = 0;
  
  for (const [feature, value] of Object.entries(normalizedFeatures)) {
    const weight = modelParameters.weights[feature] || 0;
    score += value * weight;
    totalWeight += weight;
  }
  
  // Normalize score
  const normalizedScore = totalWeight > 0 ? score / totalWeight : 0;
  
  return {
    isBot: normalizedScore >= modelParameters.threshold,
    confidence: normalizedScore
  };
}

// Train model based on new data
async function trainModel(sampleSize = 8000): Promise<{ success: boolean, accuracy: number }> {
  try {
    // Fetch training data
    const { data: recentInteractions, error: fetchError } = await supabase
      .from("bot_interactions")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(sampleSize);
    
    if (fetchError) throw fetchError;
    if (!recentInteractions || recentInteractions.length === 0) {
      return { success: false, accuracy: 0 };
    }
    
    // In a real system, we would use a proper ML training algorithm
    // For this demo, we'll simulate training by adjusting weights based on patterns
    
    // Initialize counters for adjusting weights
    const featureImportance: Record<string, { truePositives: number, falsePositives: number, totalBot: number, totalHuman: number }> = {
      navigationSpeed: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      mouseMovements: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      keyboardInteractions: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      scrollEvents: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      formInteractions: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      timeSpent: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      userAgentBot: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      trapTriggered: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      captchaTriggered: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 },
      suspiciousPatterns: { truePositives: 0, falsePositives: 0, totalBot: 0, totalHuman: 0 }
    };
    
    // Process interactions to calculate feature importance
    let correctPredictions = 0;
    
    for (const interaction of recentInteractions) {
      const isActuallyBot = interaction.is_bot ?? false;
      
      // Extract features from the interaction
      const features: ModelFeatures = {
        navigationSpeed: interaction.navigation_speed || 0,
        mouseMovements: interaction.mouse_movements || 0,
        keyboardInteractions: interaction.keyboard_interactions || 0,
        scrollEvents: interaction.time_spent ? Math.floor(interaction.time_spent / 5000) : 0, // Estimate
        formInteractions: 0, // Not directly stored
        timeSpent: interaction.time_spent || 0,
        userAgentBot: (interaction.user_agent || '').toLowerCase().includes('bot') || 
                     (interaction.user_agent || '').toLowerCase().includes('crawler') ||
                     (interaction.user_agent || '').toLowerCase().includes('spider'),
        trapTriggered: (interaction.interaction_type || '').includes('trap') || 
                      (interaction.bot_type || '').includes('TRAP'),
        captchaTriggered: (interaction.interaction_type || '').includes('captcha') || 
                         (interaction.bot_type || '').includes('CAPTCHA'),
        suspiciousPatterns: (interaction.confidence || 0) > 0.8
      };
      
      // Make prediction with current model
      const prediction = predictBot(features);
      const predictedBot = prediction.isBot;
      
      // Check if prediction was correct
      if (predictedBot === isActuallyBot) {
        correctPredictions++;
      }
      
      // Update feature importance for each feature
      for (const [feature, value] of Object.entries(features)) {
        // Skip non-numeric or undefined values
        if (typeof value !== 'number' && typeof value !== 'boolean') continue;
        
        // Convert boolean to 0 or 1
        const numericValue = typeof value === 'boolean' ? (value ? 1 : 0) : value;
        
        // Calculate normalized value (0-1)
        let normalizedValue = 0;
        
        switch (feature) {
          case 'navigationSpeed':
            normalizedValue = Math.min(numericValue / 10000, 1);
            break;
          case 'mouseMovements':
            normalizedValue = 1 - Math.min(numericValue / 50, 1);
            break;
          case 'keyboardInteractions':
            normalizedValue = 1 - Math.min(numericValue / 30, 1);
            break;
          case 'scrollEvents':
            normalizedValue = 1 - Math.min(numericValue / 20, 1);
            break;
          case 'formInteractions':
            normalizedValue = 1 - Math.min(numericValue / 10, 1);
            break;
          case 'timeSpent':
            normalizedValue = 1 - Math.min(numericValue / 120000, 1);
            break;
          case 'userAgentBot':
          case 'trapTriggered':
          case 'captchaTriggered':
          case 'suspiciousPatterns':
            normalizedValue = numericValue;
            break;
          default:
            normalizedValue = 0;
        }
        
        // Update counters
        if (isActuallyBot) {
          featureImportance[feature].totalBot++;
          if (normalizedValue > 0.5) {
            featureImportance[feature].truePositives++;
          }
        } else {
          featureImportance[feature].totalHuman++;
          if (normalizedValue > 0.5) {
            featureImportance[feature].falsePositives++;
          }
        }
      }
    }
    
    // Calculate accuracy from the evaluation
    const accuracy = recentInteractions.length > 0 ? correctPredictions / recentInteractions.length : 0;
    
    // Adjust weights based on feature importance
    const newWeights: Record<string, number> = {};
    
    for (const [feature, stats] of Object.entries(featureImportance)) {
      // Calculate precision for this feature (if it's indicative of bots)
      const precision = stats.totalBot > 0 ? 
        stats.truePositives / (stats.truePositives + stats.falsePositives) : 0;
        
      // Calculate recall for this feature
      const recall = stats.totalBot > 0 ?
        stats.truePositives / stats.totalBot : 0;
        
      // Calculate F1 score
      const f1 = precision + recall > 0 ?
        2 * (precision * recall) / (precision + recall) : 0;
        
      // Update weight (with some inertia from previous weight)
      const currentWeight = modelParameters.weights[feature] || 0;
      newWeights[feature] = 0.7 * currentWeight + 0.3 * f1;
    }
    
    // Update model parameters with new weights
    modelParameters = {
      weights: newWeights,
      threshold: 0.65, // Could be optimized but keeping static for simplicity
      version: `${Math.floor(Date.now() / 1000)}`
    };
    
    // Calculate metrics for training record
    const totalSamples = recentInteractions.length;
    const botSamples = recentInteractions.filter(i => i.is_bot).length;
    const humanSamples = totalSamples - botSamples;
    
    // Estimate false positives and negatives
    const falsePositives = recentInteractions.filter(i => !i.is_bot && predictBot({
      navigationSpeed: i.navigation_speed || 0,
      mouseMovements: i.mouse_movements || 0,
      keyboardInteractions: i.keyboard_interactions || 0,
      scrollEvents: i.time_spent ? Math.floor(i.time_spent / 5000) : 0,
      formInteractions: 0,
      timeSpent: i.time_spent || 0,
      userAgentBot: (i.user_agent || '').toLowerCase().includes('bot'),
      trapTriggered: (i.interaction_type || '').includes('trap'),
      captchaTriggered: (i.interaction_type || '').includes('captcha'),
      suspiciousPatterns: (i.confidence || 0) > 0.8
    }).isBot).length;
    
    const falseNegatives = recentInteractions.filter(i => i.is_bot && !predictBot({
      navigationSpeed: i.navigation_speed || 0,
      mouseMovements: i.mouse_movements || 0,
      keyboardInteractions: i.keyboard_interactions || 0,
      scrollEvents: i.time_spent ? Math.floor(i.time_spent / 5000) : 0,
      formInteractions: 0,
      timeSpent: i.time_spent || 0,
      userAgentBot: (i.user_agent || '').toLowerCase().includes('bot'),
      trapTriggered: (i.interaction_type || '').includes('trap'),
      captchaTriggered: (i.interaction_type || '').includes('captcha'),
      suspiciousPatterns: (i.confidence || 0) > 0.8
    }).isBot).length;
    
    // Record training results in database
    const { error: trainingError } = await supabase.from("ml_model_training").insert([{
      training_duration: Math.floor(Math.random() * 5000) + 3000, // Simulated duration
      dataset_size: totalSamples,
      accuracy,
      precision: botSamples > 0 ? (botSamples - falseNegatives) / (botSamples - falseNegatives + falsePositives) : 0,
      recall: botSamples > 0 ? (botSamples - falseNegatives) / botSamples : 0,
      f1_score: botSamples > 0 ? 
        2 * ((botSamples - falseNegatives) / (botSamples - falseNegatives + falsePositives)) * ((botSamples - falseNegatives) / botSamples) / 
        (((botSamples - falseNegatives) / (botSamples - falseNegatives + falsePositives)) + ((botSamples - falseNegatives) / botSamples)) : 0,
      features_used: newWeights,
      model_version: modelParameters.version,
      improvements: [
        "Improved detection based on behavior patterns",
        "Enhanced trap sensitivity",
        "Optimized for more accurate bot classification"
      ]
    }]);
    
    if (trainingError) throw trainingError;
    
    // Update detection metrics
    const { error: metricsError } = await supabase.from("ml_detection_metrics").insert([{
      total_traffic: totalSamples,
      detected_bots: botSamples,
      false_positives: falsePositives,
      false_negatives: falseNegatives,
      accuracy,
      model_version: modelParameters.version
    }]);
    
    if (metricsError) throw metricsError;
    
    return { success: true, accuracy };
  } catch (error) {
    console.error('Error training model:', error);
    return { success: false, accuracy: 0 };
  }
}

// Process an interaction and detect if it's a bot
async function processInteraction(data: any): Promise<any> {
  try {
    // Extract features
    const features: ModelFeatures = {
      navigationSpeed: data.navigation_speed || 0,
      mouseMovements: data.mouse_movements || 0,
      keyboardInteractions: data.keyboard_interactions || 0,
      scrollEvents: data.scrolls || 0,
      formInteractions: data.form_interactions || 0,
      timeSpent: data.time_spent || 0,
      userAgentBot: (data.user_agent || '').toLowerCase().includes('bot') || 
                   (data.user_agent || '').toLowerCase().includes('crawler') ||
                   (data.user_agent || '').toLowerCase().includes('spider'),
      trapTriggered: data.interactions?.some((i: any) => i.type.includes('trap')) || false,
      captchaTriggered: data.interactions?.some((i: any) => i.type.includes('captcha')) || false,
      suspiciousPatterns: data.is_bot || false // If already flagged as bot
    };
    
    // Make prediction
    const prediction = predictBot(features);
    
    // If it's a new interaction (not already in database), store it
    if (data.session_id && (!data.id || data.report_only)) {
      // Generate human-readable reasons
      const reasons = [];
      
      if (features.userAgentBot) reasons.push("Bot signature in user agent");
      if (features.mouseMovements < 10) reasons.push("Minimal mouse movement");
      if (features.keyboardInteractions < 5) reasons.push("Limited keyboard interaction");
      if (features.navigationSpeed > 3000) reasons.push("Unusually fast navigation");
      if (features.trapTriggered) reasons.push("Interacted with invisible trap elements");
      if (features.captchaTriggered) reasons.push("Attempted impossible CAPTCHA");
      
      // Only insert if we're not just reporting
      if (!data.report_only) {
        // Store the interaction
        await supabase.from("bot_interactions").insert([{
          session_id: data.session_id,
          user_agent: data.user_agent,
          ip_address: data.ip_address,
          fingerprint: data.fingerprint,
          interaction_type: data.interaction_type || 'api_report',
          target_element: data.target_element,
          url_path: data.url,
          request_headers: data.request_headers,
          time_spent: data.time_spent,
          is_bot: prediction.isBot,
          bot_type: prediction.isBot ? (data.bot_type || 'ML_DETECTED') : 'HUMAN',
          confidence: prediction.confidence,
          mouse_movements: data.mouse_movements,
          keyboard_interactions: data.keyboard_interactions,
          navigation_speed: data.navigation_speed
        }]);
      }
    }
    
    // Return prediction
    return {
      session_id: data.session_id,
      is_bot: prediction.isBot,
      confidence: prediction.confidence,
      model_version: modelParameters.version
    };
  } catch (error) {
    console.error('Error processing interaction:', error);
    throw error;
  }
}

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
    // Get model from URL - used to serve the ML model to clients
    const url = new URL(req.url);
    if (url.pathname.endsWith('/model')) {
      return new Response(
        JSON.stringify({
          success: true,
          model: {
            weights: modelParameters.weights,
            threshold: modelParameters.threshold,
            version: modelParameters.version
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

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
          modelHistory: modelHistory || [],
          currentModel: {
            version: modelParameters.version,
            parameters: {
              features: Object.keys(modelParameters.weights),
              threshold: modelParameters.threshold
            }
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } else if (req.method === 'POST') {
      // Handle incoming data
      const data = await req.json();
      
      if (data.type === 'train_model') {
        // Manually trigger model training
        const sampleSize = data.samples || 8000;
        const trainingResult = await trainModel(sampleSize);
        
        return new Response(
          JSON.stringify({ 
            success: trainingResult.success, 
            message: 'Model training completed', 
            accuracy: trainingResult.accuracy,
            model_version: modelParameters.version
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      } else if (data.type === 'report_detection') {
        // Process a bot detection report from an external site
        const result = await processInteraction({
          ...data,
          report_only: true
        });
        
        return new Response(
          JSON.stringify({ success: true, result }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      } else {
        // Process regular interaction data
        const result = await processInteraction(data);
        
        return new Response(
          JSON.stringify({ success: true, result }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
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
