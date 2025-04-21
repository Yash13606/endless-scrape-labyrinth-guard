
// Machine Learning Bot Detection System
// This is a simulated ML system that demonstrates the concept without requiring actual ML training

import { BotDetectionResult } from './botDetector';

// Simulated feature extraction
interface FeatureVector {
  technicalFeatures: TechnicalFeatures;
  behavioralFeatures: BehavioralFeatures;
  contentInteraction: ContentInteraction;
}

interface TechnicalFeatures {
  userAgent: string;
  ipReputation: number; // Simulated score
  headerConsistency: number; // Simulated score
  fingerprint: string;
}

interface BehavioralFeatures {
  navigationSpeed: number;
  mouseMovements: number;
  scrollPatterns: number;
  clickPatterns: number;
  inputInteraction: number;
  sessionDuration: number;
}

interface ContentInteraction {
  pagesVisited: string[];
  resourceRequests: number;
  searchQueries: number;
  apiCalls: number;
}

// Bot classification types
export enum BotType {
  HUMAN = 'HUMAN',
  SCRAPER = 'SCRAPER',
  CRAWLER = 'CRAWLER',
  CREDENTIAL_STUFFER = 'CREDENTIAL_STUFFER',
  UNKNOWN_BOT = 'UNKNOWN_BOT'
}

// ML Prediction result
export interface MLPrediction {
  isBot: boolean;
  botType: BotType;
  confidence: number;
  featureImportance: Record<string, number>;
  timestamp: number;
}

// Simulated training data - in a real system this would be stored in a database
const simulatedTrainingData = {
  botPatterns: [
    { pattern: /bot|spider|crawl/i, type: BotType.CRAWLER, baseConfidence: 0.85 },
    { pattern: /python|requests|http|urllib/i, type: BotType.SCRAPER, baseConfidence: 0.9 },
    { pattern: /headless|phantom|selenium|playwright/i, type: BotType.SCRAPER, baseConfidence: 0.95 },
    { pattern: /go-http|axios|fetch/i, type: BotType.SCRAPER, baseConfidence: 0.8 },
  ],
  
  // Behavioral thresholds from "training data"
  behavioralThresholds: {
    navigationSpeed: { threshold: 300, weight: 0.3 },
    mouseMovements: { threshold: 5, weight: 0.2 },
    scrollPatterns: { threshold: 2, weight: 0.15 },
    clickPatterns: { threshold: 3, weight: 0.15 },
    inputInteraction: { threshold: 0, weight: 0.2 },
  }
};

// Feature extraction from user session
export const extractFeatures = (
  userAgent: string, 
  fingerprint: string,
  mouseMoveCount: number,
  scrollCount: number,
  inputInteractionCount: number,
  navigationTime: number | null,
  sessionStart: number
): FeatureVector => {
  // In a real system, these would be actual features extracted from user behavior
  return {
    technicalFeatures: {
      userAgent,
      ipReputation: Math.random() * 100, // Simulated score
      headerConsistency: Math.random() * 100, // Simulated score
      fingerprint,
    },
    behavioralFeatures: {
      navigationSpeed: navigationTime ? Date.now() - navigationTime : 1000,
      mouseMovements: mouseMoveCount,
      scrollPatterns: scrollCount,
      clickPatterns: Math.floor(Math.random() * 10), // Simulated data
      inputInteraction: inputInteractionCount,
      sessionDuration: Date.now() - sessionStart,
    },
    contentInteraction: {
      pagesVisited: [], // Would track actual pages in a real implementation
      resourceRequests: Math.floor(Math.random() * 50), // Simulated data
      searchQueries: Math.floor(Math.random() * 3), // Simulated data
      apiCalls: Math.floor(Math.random() * 10), // Simulated data
    }
  };
};

// Simulated ML model inference
export const predictBotProbability = (features: FeatureVector): MLPrediction => {
  // Technical features analysis
  let technicalScore = 0;
  let detectedBotType = BotType.HUMAN;
  let baseConfidence = 0;
  
  // Check for bot patterns in user agent
  for (const pattern of simulatedTrainingData.botPatterns) {
    if (pattern.pattern.test(features.technicalFeatures.userAgent)) {
      technicalScore += pattern.baseConfidence;
      detectedBotType = pattern.type;
      baseConfidence = pattern.baseConfidence;
      break;
    }
  }
  
  // Behavioral features analysis
  let behavioralScore = 0;
  const behaviors = simulatedTrainingData.behavioralThresholds;
  
  if (features.behavioralFeatures.navigationSpeed < behaviors.navigationSpeed.threshold) {
    behavioralScore += behaviors.navigationSpeed.weight;
  }
  
  if (features.behavioralFeatures.mouseMovements < behaviors.mouseMovements.threshold) {
    behavioralScore += behaviors.mouseMovements.weight;
  }
  
  if (features.behavioralFeatures.scrollPatterns < behaviors.scrollPatterns.threshold) {
    behavioralScore += behaviors.scrollPatterns.weight;
  }
  
  if (features.behavioralFeatures.clickPatterns < behaviors.clickPatterns.threshold) {
    behavioralScore += behaviors.clickPatterns.weight;
  }
  
  if (features.behavioralFeatures.inputInteraction <= behaviors.inputInteraction.threshold) {
    behavioralScore += behaviors.inputInteraction.weight;
  }
  
  // Combined score
  const combinedScore = technicalScore * 0.6 + behavioralScore * 0.4;
  
  // Determine if it's a bot based on combined score
  const isBot = combinedScore > 0.6;
  
  // If technical score didn't identify a specific bot type but behavioral is suspicious
  if (detectedBotType === BotType.HUMAN && isBot) {
    detectedBotType = BotType.UNKNOWN_BOT;
  }
  
  // Feature importance simulation - this would come from the model in a real system
  const featureImportance = {
    'userAgent': 0.35,
    'fingerprint': 0.15,
    'navigationPatterns': 0.20,
    'mouseMovements': 0.15,
    'scrollBehavior': 0.10,
    'inputInteraction': 0.05,
  };
  
  return {
    isBot,
    botType: detectedBotType,
    confidence: isBot ? combinedScore : 1 - combinedScore,
    featureImportance,
    timestamp: Date.now()
  };
};

// Convert ML prediction to standard BotDetectionResult
export const mlResultToBotDetection = (
  prediction: MLPrediction, 
  userAgent: string, 
  fingerprint: string
): BotDetectionResult => {
  const reasons: string[] = [];
  
  // Generate human-readable reasons based on prediction
  if (prediction.botType !== BotType.HUMAN) {
    reasons.push(`User agent matches ${prediction.botType.toLowerCase()} pattern`);
  }
  
  // Add behavioral reasons based on feature importance
  for (const [feature, importance] of Object.entries(prediction.featureImportance)) {
    if (importance > 0.1 && prediction.isBot) {
      reasons.push(`Suspicious ${feature} (importance: ${Math.round(importance * 100)}%)`);
    }
  }
  
  // If no specific reasons but still flagged as bot
  if (reasons.length === 0 && prediction.isBot) {
    reasons.push('Combined behavioral factors suggest automated activity');
  }
  
  return {
    isBot: prediction.isBot,
    confidence: prediction.confidence, 
    reasons,
    fingerprint,
    userAgent,
    timestamp: prediction.timestamp,
    botType: prediction.botType // Extended property from standard detection
  } as BotDetectionResult & { botType: BotType };
};

// Active learning simulation - in a real system this would update the model
export const recordFeedback = (result: BotDetectionResult, actualLabel: boolean): void => {
  console.log(`Feedback recorded: Detection ${result.isBot}, Actual: ${actualLabel}`);
  // In a real system, this would be sent to a backend for model improvement
};

// This would be called periodically to update the model with new training data
export const updateModel = (): void => {
  console.log('Model updated with latest training data');
  // In a real system, this would trigger model retraining
};
