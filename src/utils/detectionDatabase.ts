// Simulated database for storing bot detection results
// In a real implementation, this would connect to an actual database

// Detection result interface
export interface StoredDetection {
  id: string;
  timestamp: number;
  fingerprint: string;
  userAgent: string;
  isBot: boolean;
  botType: string;
  confidence: number;
  reasons: string[];
  blocked: boolean;
}

// In-memory storage
let detections: StoredDetection[] = [];

// Generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Store a new detection
export const storeDetection = (detection: Omit<StoredDetection, 'id'>): StoredDetection => {
  const newDetection = {
    ...detection,
    id: generateId()
  };
  
  detections.push(newDetection);
  
  // Keep only the last 1000 detections
  if (detections.length > 1000) {
    detections = detections.slice(-1000);
  }
  
  // Persist to localStorage for demo purposes
  try {
    localStorage.setItem('abyss_detections', JSON.stringify(detections));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
  
  return newDetection;
};

// Retrieve all detections
export const getAllDetections = (): StoredDetection[] => {
  return [...detections];
};

// Get detections by bot type
export const getDetectionsByBotType = (botType: string): StoredDetection[] => {
  return detections.filter(d => d.botType === botType);
};

// Get recent detections
export const getRecentDetections = (count: number = 10): StoredDetection[] => {
  return [...detections].sort((a, b) => b.timestamp - a.timestamp).slice(0, count);
};

// Get detection statistics
export const getDetectionStats = () => {
  const totalDetections = detections.length;
  const botDetections = detections.filter(d => d.isBot).length;
  const blockedAttempts = detections.filter(d => d.blocked).length;
  
  // Count by bot type
  const botTypeCounts: Record<string, number> = {};
  detections.forEach(d => {
    if (d.isBot) {
      botTypeCounts[d.botType] = (botTypeCounts[d.botType] || 0) + 1;
    }
  });
  
  return {
    totalDetections,
    botDetections,
    blockedAttempts,
    botTypeCounts,
    detectionRate: totalDetections > 0 ? botDetections / totalDetections : 0
  };
};

// Clear all detections
export const clearDetections = (): void => {
  detections = [];
  localStorage.removeItem('abyss_detections');
};

// Initialize database from localStorage if available
export const initDatabase = (): void => {
  try {
    const stored = localStorage.getItem('abyss_detections');
    if (stored) {
      detections = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to initialize from localStorage', e);
  }
};

// Initialize the database when this module is imported
initDatabase();
