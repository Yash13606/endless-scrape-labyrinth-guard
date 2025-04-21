
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MLFeatureImportance from './MLFeatureImportance';
import MLDetectionStats, { getSimulatedMLStats } from './MLDetectionStats';
import { Bot, Brain, BarChart3, AlertTriangle } from 'lucide-react';
import { BotDetectionResult } from '@/utils/botDetector';
import { Button } from '@/components/ui/button';

const MLDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [recentDetections, setRecentDetections] = useState<BotDetectionResult[]>([]);
  
  // Simulated ML stats
  const mlStats = getSimulatedMLStats();
  
  // Sample feature importance for demonstration
  const sampleFeatureImportance = {
    'userAgent': 0.35,
    'fingerprint': 0.15,
    'navigationPatterns': 0.20,
    'mouseMovements': 0.15,
    'scrollBehavior': 0.10,
    'inputInteraction': 0.05,
  };
  
  useEffect(() => {
    // Load recent detections from localStorage
    const storedLogs = localStorage.getItem('botLogs');
    if (storedLogs) {
      const logs = JSON.parse(storedLogs);
      setRecentDetections(logs.slice(-5).reverse());
    }
    
    // Listen for new detections
    const handleBotDetected = (event: CustomEvent<BotDetectionResult>) => {
      setRecentDetections(prev => [event.detail, ...prev].slice(0, 5));
    };
    
    window.addEventListener('botDetected', handleBotDetected as EventListener);
    
    return () => {
      window.removeEventListener('botDetected', handleBotDetected as EventListener);
    };
  }, []);
  
  // Get bot type color
  const getBotTypeColor = (botType: string): string => {
    switch (botType) {
      case 'HUMAN': return 'bg-green-900/30 text-green-400';
      case 'SCRAPER': return 'bg-red-900/30 text-red-400';
      case 'CRAWLER': return 'bg-yellow-900/30 text-yellow-400';
      case 'CREDENTIAL_STUFFER': return 'bg-pink-900/30 text-pink-400';
      default: return 'bg-purple-900/30 text-purple-400';
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            ML Overview
          </TabsTrigger>
          <TabsTrigger value="detections" className="flex items-center">
            <Bot className="h-4 w-4 mr-2" />
            Recent Detections
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            Feature Analysis
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Threat Intelligence
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MLDetectionStats
              botTypeDistribution={mlStats.botTypeDistribution}
              totalDetections={mlStats.totalDetections}
              accuracyRate={mlStats.accuracyRate}
            />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>ML Model Performance</CardTitle>
                <CardDescription>
                  Performance metrics of the current ML model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                      <div className="text-sm text-muted-foreground mb-1">False Positive Rate</div>
                      <div className="text-xl font-bold">0.08%</div>
                    </div>
                    <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                      <div className="text-sm text-muted-foreground mb-1">False Negative Rate</div>
                      <div className="text-xl font-bold">4.2%</div>
                    </div>
                  </div>
                  
                  <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                    <div className="text-sm text-muted-foreground mb-1">Model Last Updated</div>
                    <div className="text-xl font-bold">Today, 3:45 PM</div>
                  </div>
                  
                  <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                    <div className="text-sm text-muted-foreground mb-2">Training Progress</div>
                    <div className="h-2 bg-abyss-900 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-blue" style={{ width: '100%' }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">Model is up to date</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Real-Time Classification</CardTitle>
              <CardDescription>
                Current visitor session analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Session</div>
                    <div className="text-lg font-semibold mt-1">
                      {recentDetections[0]?.isBot ? 'Bot Traffic Detected' : 'Human Visitor'}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs ${
                    recentDetections[0]?.isBot 
                      ? 'bg-red-900/30 text-red-400' 
                      : 'bg-green-900/30 text-green-400'
                  }`}>
                    {recentDetections[0]?.botType || 'Unknown'}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                    <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                    <div className="text-lg font-medium">
                      {recentDetections[0] 
                        ? `${Math.round(recentDetections[0].confidence * 100)}%` 
                        : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                    <div className="text-xs text-muted-foreground mb-1">Detection Time</div>
                    <div className="text-lg font-medium">
                      {recentDetections[0] 
                        ? formatTime(recentDetections[0].timestamp) 
                        : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                    <div className="text-xs text-muted-foreground mb-1">Primary Indicator</div>
                    <div className="text-lg font-medium truncate">
                      {recentDetections[0]?.reasons?.[0] || 'No indicators'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detections" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent ML Detections</CardTitle>
              <CardDescription>
                Latest bot detection results from the ML system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentDetections.length > 0 ? (
                <div className="space-y-4">
                  {recentDetections.map((detection, index) => (
                    <div key={index} className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1 rounded-full text-xs ${getBotTypeColor(detection.botType || 'UNKNOWN_BOT')}`}>
                            {detection.botType || 'UNKNOWN_BOT'}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(detection.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm font-medium">
                          Confidence: {Math.round(detection.confidence * 100)}%
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                          <div className="text-xs text-muted-foreground mb-1">User Agent</div>
                          <div className="text-sm font-mono truncate">{detection.userAgent}</div>
                        </div>
                        <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                          <div className="text-xs text-muted-foreground mb-1">Fingerprint</div>
                          <div className="text-sm font-mono truncate">{detection.fingerprint.substring(0, 20)}...</div>
                        </div>
                      </div>
                      
                      <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                        <div className="text-xs text-muted-foreground mb-1">Detection Reasons</div>
                        <ul className="list-disc list-inside text-sm">
                          {detection.reasons.length > 0 ? detection.reasons.map((reason, i) => (
                            <li key={i} className="text-muted-foreground">{reason}</li>
                          )) : (
                            <li className="text-muted-foreground">No specific reasons provided</li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                          Report False
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No detection data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MLFeatureImportance 
              featureImportance={sampleFeatureImportance} 
              detectionConfidence={0.87}
              botType="SCRAPER"
            />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Feature Effectiveness</CardTitle>
                <CardDescription>
                  How well each feature performs in detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                    <h4 className="text-lg font-medium mb-2">Top Performing Features</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      <li className="text-sm">
                        <span className="text-neon-blue font-medium">User Agent Analysis</span>
                        <span className="text-muted-foreground"> - 94% accuracy</span>
                      </li>
                      <li className="text-sm">
                        <span className="text-neon-blue font-medium">Navigation Patterns</span>
                        <span className="text-muted-foreground"> - 89% accuracy</span>
                      </li>
                      <li className="text-sm">
                        <span className="text-neon-blue font-medium">Mouse Movement Analysis</span>
                        <span className="text-muted-foreground"> - 87% accuracy</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                    <h4 className="text-lg font-medium mb-2">Features Needing Improvement</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      <li className="text-sm">
                        <span className="text-neon-red font-medium">Canvas Fingerprinting</span>
                        <span className="text-muted-foreground"> - 68% accuracy</span>
                      </li>
                      <li className="text-sm">
                        <span className="text-neon-red font-medium">Input Interaction Analysis</span>
                        <span className="text-muted-foreground"> - 72% accuracy</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                    <h4 className="text-lg font-medium mb-2">Recently Added Features</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li className="text-sm">
                        <span className="text-neon-purple font-medium">WebGL Rendering Analysis</span>
                        <span className="text-muted-foreground"> - Added 3 days ago</span>
                      </li>
                      <li className="text-sm">
                        <span className="text-neon-purple font-medium">CSS Property Access Patterns</span>
                        <span className="text-muted-foreground"> - Added 5 days ago</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Threat Intelligence</CardTitle>
              <CardDescription>
                Emerging bot patterns and threat intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                  <h4 className="text-lg font-medium mb-2">Emerging Bot Patterns</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-md">
                      <h5 className="text-red-400 font-medium">New Evasion Technique Detected</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Bots are now using randomized delays between actions and simulated mouse movements
                        to evade traditional detection methods.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-yellow-900/20 border border-yellow-900/30 rounded-md">
                      <h5 className="text-yellow-400 font-medium">Increased Headless Browser Activity</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        30% increase in sophisticated headless browser usage with full JavaScript execution
                        capabilities.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                  <h4 className="text-lg font-medium mb-2">Bot Campaign Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-abyss-900 border border-abyss-700 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-neon-red font-medium">Scraper Campaign #127</h5>
                        <span className="text-xs text-muted-foreground">Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Targeting product data and pricing information.
                      </p>
                      <div className="text-xs">First seen: 2 days ago</div>
                    </div>
                    
                    <div className="p-3 bg-abyss-900 border border-abyss-700 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-neon-purple font-medium">Crawler Campaign #94</h5>
                        <span className="text-xs text-muted-foreground">Dormant</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Content indexing with periodic access patterns.
                      </p>
                      <div className="text-xs">Last seen: 5 days ago</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                  <h4 className="text-lg font-medium mb-2">ML Model Adaptations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-sm">
                        Added detection for timing randomization patterns (2 days ago)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-sm">
                        Improved fingerprinting of Playwright-based crawlers (3 days ago)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-sm">
                        Enhanced detection of simulated mouse movements (1 week ago)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MLDashboard;
