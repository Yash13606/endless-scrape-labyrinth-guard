
// Common bot user agent patterns
const BOT_UA_PATTERNS = [
  /bot/i,
  /spider/i,
  /crawl/i,
  /scrape/i,
  /fetch/i,
  /http/i,
  /python/i,
  /request/i,
  /go-http/i,
  /axios/i,
  /headless/i,
  /puppeteer/i,
  /playwright/i,
  /selenium/i,
  /phantom/i
];

// Common bot behavioral patterns
const BOT_BEHAVIORS = {
  navigationSpeed: {
    threshold: 300, // milliseconds between page navigations
    weight: 2
  },
  mouseMoves: {
    threshold: 5, // minimum mouse movements expected
    weight: 1
  },
  scrollPatterns: {
    threshold: 2, // minimum scroll events expected
    weight: 1
  },
  inputInteraction: {
    threshold: 0, // any input interaction reduces bot score
    weight: 2
  }
};

// Bot confidence scoring
export interface BotDetectionResult {
  isBot: boolean;
  confidence: number;
  reasons: string[];
  fingerprint: string;
  userAgent: string;
  timestamp: number;
  botType?: string; // New field for ML-based detection
}

// Store navigation timestamps to measure speed
let lastNavigationTime: number | null = null;
let mouseMoveCount = 0;
let scrollCount = 0;
let inputInteractionCount = 0;
let hasBeenFingerprinted = false;
let sessionStartTime = Date.now();

// Import ML-based detection
import { 
  extractFeatures, 
  predictBotProbability, 
  mlResultToBotDetection,
  recordFeedback,
  updateModel,
  BotType
} from './mlBotDetector';

const generateFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  
  if (!gl) {
    return 'no-webgl';
  }
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : '';
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  
  // Add some browser properties
  const screenProps = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timezone = new Date().getTimezoneOffset();
  const languages = navigator.languages ? navigator.languages.join(',') : '';
  
  return btoa(`${vendor}|${renderer}|${screenProps}|${timezone}|${languages}`);
};

// Flag to toggle between legacy and ML-based detection
const USE_ML_DETECTION = true;

// Initialize event listeners for behavior detection
export const initBotDetection = (): void => {
  // Reset session start time
  sessionStartTime = Date.now();
  
  // Navigation timing
  lastNavigationTime = Date.now();
  
  // Mouse movement detection
  document.addEventListener('mousemove', () => {
    mouseMoveCount++;
  });
  
  // Scroll detection
  document.addEventListener('scroll', () => {
    scrollCount++;
  });
  
  // Input interaction
  document.addEventListener('keydown', () => {
    inputInteractionCount++;
  });
  
  document.addEventListener('click', () => {
    inputInteractionCount++;
  });
  
  // Generate fingerprint once
  if (!hasBeenFingerprinted) {
    hasBeenFingerprinted = true;
    setTimeout(() => {
      // Short delay to allow for processing
      const initialResult = detectBot();
      
      // If it's likely a bot, add class to html for CSS targeting
      if (initialResult.isBot && initialResult.confidence > 0.7) {
        document.documentElement.classList.add('bot');
      }
      
      // Log detection data
      logBotDetection(initialResult);
    }, 1000);
  }
  
  // Periodic model updates - would connect to backend in real implementation
  setInterval(() => {
    if (USE_ML_DETECTION) {
      updateModel();
    }
  }, 3600000); // Every hour
};

// Check if current client is likely a bot
export const detectBot = (): BotDetectionResult => {
  const userAgent = navigator.userAgent;
  const fingerprint = generateFingerprint();
  
  if (USE_ML_DETECTION) {
    // ML-based detection
    const features = extractFeatures(
      userAgent,
      fingerprint,
      mouseMoveCount,
      scrollCount,
      inputInteractionCount,
      lastNavigationTime,
      sessionStartTime
    );
    
    const prediction = predictBotProbability(features);
    const result = mlResultToBotDetection(prediction, userAgent, fingerprint);
    
    // Update navigation time for next check
    lastNavigationTime = Date.now();
    
    return result;
  } else {
    // Legacy pattern-based detection
    const reasons: string[] = [];
    let botScore = 0;
    let maxScore = 0;
    
    // Check user agent against known patterns
    for (const pattern of BOT_UA_PATTERNS) {
      maxScore += 3;
      if (pattern.test(userAgent)) {
        botScore += 3;
        reasons.push(`UA matches pattern: ${pattern}`);
      }
    }
    
    // Check navigation speed
    maxScore += BOT_BEHAVIORS.navigationSpeed.weight;
    if (lastNavigationTime && (Date.now() - lastNavigationTime < BOT_BEHAVIORS.navigationSpeed.threshold)) {
      botScore += BOT_BEHAVIORS.navigationSpeed.weight;
      reasons.push(`Fast navigation: ${Date.now() - lastNavigationTime}ms`);
    }
    
    // Check mouse movements
    maxScore += BOT_BEHAVIORS.mouseMoves.weight;
    if (mouseMoveCount < BOT_BEHAVIORS.mouseMoves.threshold) {
      botScore += BOT_BEHAVIORS.mouseMoves.weight;
      reasons.push(`Limited mouse activity: ${mouseMoveCount} moves`);
    }
    
    // Check scroll patterns
    maxScore += BOT_BEHAVIORS.scrollPatterns.weight;
    if (scrollCount < BOT_BEHAVIORS.scrollPatterns.threshold) {
      botScore += BOT_BEHAVIORS.scrollPatterns.weight;
      reasons.push(`Limited scrolling: ${scrollCount} events`);
    }
    
    // Check input interaction
    maxScore += BOT_BEHAVIORS.inputInteraction.weight;
    if (inputInteractionCount <= BOT_BEHAVIORS.inputInteraction.threshold) {
      botScore += BOT_BEHAVIORS.inputInteraction.weight;
      reasons.push('No input interaction');
    }
    
    // Generate confidence score (0-1)
    const confidence = maxScore > 0 ? botScore / maxScore : 0;
    
    // Update navigation time for next check
    lastNavigationTime = Date.now();
    
    return {
      isBot: confidence > 0.6, // Threshold for bot classification
      confidence,
      reasons,
      fingerprint,
      userAgent,
      timestamp: Date.now(),
      botType: confidence > 0.6 ? 'UNKNOWN_BOT' : 'HUMAN'
    };
  }
};

// Feedback mechanism to improve bot detection
export const provideFeedback = (result: BotDetectionResult, isActuallyBot: boolean): void => {
  if (USE_ML_DETECTION) {
    recordFeedback(result, isActuallyBot);
  }
  
  // In a real system, this would be sent to a backend for training
  console.log(`Feedback provided: Detection ${result.isBot}, Actual: ${isActuallyBot}`);
};

// Log bot detection data (would normally send to server)
export const logBotDetection = (result: BotDetectionResult): void => {
  console.log('Bot detection result:', result);
  
  // In a real implementation, this would send data to the server
  // For this demo, we'll store in localStorage
  const logs = JSON.parse(localStorage.getItem('botLogs') || '[]');
  logs.push(result);
  localStorage.setItem('botLogs', JSON.stringify(logs));
  
  // Display on dashboard if on admin page
  const event = new CustomEvent('botDetected', { detail: result });
  window.dispatchEvent(event);
};
