
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Bot, Play, Code, AlertTriangle, Shield, Check, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import MLFeatureImportance from '../ml/MLFeatureImportance';
import { recordFeedback, BotType } from '@/utils/mlBotDetector';
import { BotDetectionResult, detectBot, logBotDetection } from '@/utils/botDetector';

interface SimulationScenario {
  name: string;
  description: string;
  intensity: number;
  botType: BotType;
  featureImportance: Record<string, number>;
}

const scenarios: SimulationScenario[] = [
  {
    name: 'Basic Web Scraper',
    description: 'Simulates a simple scraper that extracts content without sophisticated evasion techniques',
    intensity: 30,
    botType: BotType.SCRAPER,
    featureImportance: {
      'userAgent': 0.40,
      'fingerprint': 0.25,
      'navigationPatterns': 0.15,
      'mouseMovements': 0.10,
      'scrollBehavior': 0.05,
      'inputInteraction': 0.05,
    }
  },
  {
    name: 'Advanced Crawler',
    description: 'Simulates a sophisticated crawler that attempts to mimic human behavior',
    intensity: 60,
    botType: BotType.CRAWLER,
    featureImportance: {
      'userAgent': 0.20,
      'fingerprint': 0.15,
      'navigationPatterns': 0.30,
      'mouseMovements': 0.15,
      'scrollBehavior': 0.10,
      'inputInteraction': 0.10,
    }
  },
  {
    name: 'Credential Stuffing Attack',
    description: 'Simulates a bot attempting to brute force login credentials',
    intensity: 90,
    botType: BotType.CREDENTIAL_STUFFER,
    featureImportance: {
      'userAgent': 0.15,
      'fingerprint': 0.10,
      'navigationPatterns': 0.25,
      'mouseMovements': 0.05,
      'scrollBehavior': 0.05,
      'inputInteraction': 0.40,
    }
  }
];

// Simulated training data for demo purposes
const simulatedTrainingData = [
  { label: 'HUMAN', count: 5000 },
  { label: 'SCRAPER', count: 1200 },
  { label: 'CRAWLER', count: 800 },
  { label: 'CREDENTIAL_STUFFER', count: 400 },
  { label: 'UNKNOWN_BOT', count: 600 }
];

const BotSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('train');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelAccuracy, setModelAccuracy] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(scenarios[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationResults, setSimulationResults] = useState<{
    totalRequests: number;
    detectedBots: number;
    blockedRequests: number;
    detection: BotDetectionResult | null;
  }>({
    totalRequests: 0,
    detectedBots: 0,
    blockedRequests: 0,
    detection: null
  });
  
  const { toast } = useToast();
  
  // Simulated ML model training
  const startTraining = () => {
    if (isTraining) return;
    
    setIsTraining(true);
    setTrainingProgress(0);
    setModelAccuracy(0);
    
    toast({
      title: "Training started",
      description: "The ML model is now training with simulated data",
    });
    
    const trainingInterval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = prev + (Math.random() * 5);
        if (newProgress >= 100) {
          clearInterval(trainingInterval);
          setIsTraining(false);
          setModelAccuracy(Math.random() * 10 + 89); // 89-99% accuracy
          
          toast({
            title: "Training complete",
            description: "The ML model has been successfully trained",
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  // Simulated bot attack
  const startSimulation = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setSimulationProgress(0);
    setSimulationResults({
      totalRequests: 0,
      detectedBots: 0,
      blockedRequests: 0,
      detection: null
    });
    
    toast({
      title: "Bot simulation started",
      description: `Simulating ${selectedScenario.name} attack`,
    });
    
    // Number of simulated requests based on intensity
    const totalRequests = Math.floor(selectedScenario.intensity * 2 + 50);
    let detectedBots = 0;
    let blockedRequests = 0;
    let currentRequest = 0;
    let latestDetection: BotDetectionResult | null = null;
    
    const simulationInterval = setInterval(() => {
      currentRequest++;
      const progress = (currentRequest / totalRequests) * 100;
      setSimulationProgress(progress);
      
      // Simulate detection results
      const isDetected = Math.random() < (selectedScenario.intensity / 100 * 0.8 + 0.2); // 20-100% detection rate based on intensity
      if (isDetected) {
        detectedBots++;
        
        // Simulate blocking (higher chance based on intensity)
        const isBlocked = Math.random() < (selectedScenario.intensity / 100 * 0.9);
        if (isBlocked) {
          blockedRequests++;
        }
        
        // Create a detection result for display
        latestDetection = {
          isBot: true,
          confidence: selectedScenario.intensity / 100 * 0.7 + 0.3, // 30-100% confidence
          reasons: [
            "Suspicious user agent pattern",
            "Irregular navigation speed",
            "Unusual interaction pattern"
          ],
          fingerprint: `bot-sim-${Date.now()}`,
          userAgent: selectedScenario.botType === BotType.SCRAPER ? 
            "Mozilla/5.0 (compatible; ScraperBot/1.0; +http://example.com/bot)" :
            selectedScenario.botType === BotType.CRAWLER ?
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" :
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          timestamp: Date.now(),
          botType: selectedScenario.botType
        };
        
        // Log the detection for ML dashboard
        logBotDetection(latestDetection);
      }
      
      setSimulationResults({
        totalRequests: currentRequest,
        detectedBots,
        blockedRequests,
        detection: latestDetection
      });
      
      if (currentRequest >= totalRequests) {
        clearInterval(simulationInterval);
        setIsSimulating(false);
        
        toast({
          title: "Simulation completed",
          description: `Detected ${detectedBots} bots out of ${totalRequests} requests`,
        });
      }
    }, 100);
  };
  
  return (
    <Card className="border-abyss-700">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-neon-purple" />
          Bot Attack Simulator
        </CardTitle>
        <CardDescription>
          Train the ML model and simulate various bot attack scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="train">Train Model</TabsTrigger>
            <TabsTrigger value="simulate">Simulate Attack</TabsTrigger>
          </TabsList>
          
          <TabsContent value="train" className="space-y-4 mt-4">
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h3 className="text-lg font-medium mb-2">Training Dataset</h3>
              <div className="space-y-3">
                {simulatedTrainingData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${
                        item.label === 'HUMAN' ? 'bg-green-500' :
                        item.label === 'SCRAPER' ? 'bg-red-500' :
                        item.label === 'CRAWLER' ? 'bg-yellow-500' :
                        item.label === 'CREDENTIAL_STUFFER' ? 'bg-pink-500' :
                        'bg-purple-500'
                      }`}></span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-muted-foreground">{item.count.toLocaleString()} samples</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Total training samples: {simulatedTrainingData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h3 className="text-lg font-medium mb-2">Model Training</h3>
              
              {isTraining ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Training progress</span>
                    <span>{Math.round(trainingProgress)}%</span>
                  </div>
                  <Progress value={trainingProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Training a hybrid model with Random Forest and Sequential Pattern Analysis...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {modelAccuracy > 0 && (
                    <div className="bg-abyss-900 p-3 rounded border border-abyss-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Model Accuracy</span>
                        <span className="text-neon-blue font-medium">{modelAccuracy.toFixed(2)}%</span>
                      </div>
                    </div>
                  )}
                  
                  <Button onClick={startTraining} className="w-full" disabled={isTraining}>
                    <Play className="mr-2 h-4 w-4" />
                    {modelAccuracy > 0 ? 'Retrain Model' : 'Train Model'}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="simulate" className="space-y-4 mt-4">
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h3 className="text-lg font-medium mb-2">Select Attack Scenario</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scenarios.map((scenario, index) => (
                  <div 
                    key={index}
                    className={`bg-abyss-900 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedScenario.name === scenario.name 
                        ? 'border-neon-purple' 
                        : 'border-abyss-700 hover:border-abyss-600'
                    }`}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{scenario.name}</h4>
                      <div className={`px-2 py-0.5 rounded text-xs ${
                        scenario.intensity > 70 ? 'bg-red-900/30 text-red-400' :
                        scenario.intensity > 40 ? 'bg-orange-900/30 text-orange-400' :
                        'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {scenario.intensity}% intensity
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h3 className="text-lg font-medium mb-2">Simulation Control</h3>
              
              {isSimulating ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Simulation progress</span>
                    <span>{Math.round(simulationProgress)}%</span>
                  </div>
                  <Progress value={simulationProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Simulating {selectedScenario.name} requests...
                  </p>
                </div>
              ) : (
                <Button 
                  onClick={startSimulation} 
                  className="w-full" 
                  disabled={isSimulating || modelAccuracy === 0}
                  variant={modelAccuracy === 0 ? "outline" : "default"}
                >
                  <Bot className="mr-2 h-4 w-4" />
                  {modelAccuracy === 0 
                    ? 'Train the model first' 
                    : simulationResults.totalRequests > 0 
                      ? 'Run Another Simulation' 
                      : 'Start Bot Simulation'}
                </Button>
              )}
            </div>
            
            {simulationResults.totalRequests > 0 && (
              <div className="space-y-4">
                <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                  <h3 className="text-lg font-medium mb-3">Simulation Results</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                      <div className="text-xs text-muted-foreground mb-1">Total Requests</div>
                      <div className="text-xl font-semibold">{simulationResults.totalRequests}</div>
                    </div>
                    <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                      <div className="text-xs text-muted-foreground mb-1">Detected Bots</div>
                      <div className="text-xl font-semibold text-neon-purple">
                        {simulationResults.detectedBots} 
                        <span className="text-xs text-muted-foreground ml-1">
                          ({Math.round(simulationResults.detectedBots/simulationResults.totalRequests*100)}%)
                        </span>
                      </div>
                    </div>
                    <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                      <div className="text-xs text-muted-foreground mb-1">Blocked Requests</div>
                      <div className="text-xl font-semibold text-neon-red">
                        {simulationResults.blockedRequests}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({Math.round(simulationResults.blockedRequests/simulationResults.totalRequests*100)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {simulationResults.detection && (
                    <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Latest Detection</div>
                        <div className={`px-2 py-0.5 rounded text-xs ${
                          simulationResults.detection.confidence > 0.9 ? 'bg-red-900/30 text-red-400' :
                          simulationResults.detection.confidence > 0.7 ? 'bg-orange-900/30 text-orange-400' :
                          'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {Math.round(simulationResults.detection.confidence * 100)}% confidence
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mb-2 font-mono truncate">
                        {simulationResults.detection.userAgent}
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-400 border-green-900/50 hover:bg-green-900/20"
                          onClick={() => {
                            recordFeedback(simulationResults.detection!, true);
                            toast({
                              title: "Feedback recorded",
                              description: "Confirmed as correct bot detection",
                            });
                          }}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Confirm Bot
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-400 border-red-900/50 hover:bg-red-900/20"
                          onClick={() => {
                            recordFeedback(simulationResults.detection!, false);
                            toast({
                              title: "Feedback recorded",
                              description: "Reported as false positive",
                            });
                          }}
                        >
                          <X className="mr-1 h-3 w-3" />
                          False Positive
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {simulationResults.detection && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MLFeatureImportance 
                      featureImportance={selectedScenario.featureImportance}
                      detectionConfidence={simulationResults.detection.confidence}
                      botType={selectedScenario.botType}
                    />
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-neon-blue" />
                          Protection Measures
                        </CardTitle>
                        <CardDescription>
                          Actions taken against detected bot traffic
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                              simulationResults.detection.confidence > 0.8 ? 'text-neon-red' : 'text-yellow-400'
                            }`} />
                            <div>
                              <p className="font-medium">Detection Alert Triggered</p>
                              <p className="text-sm text-muted-foreground">
                                Bot activity logged and reported to security monitoring
                              </p>
                            </div>
                          </div>
                          
                          {simulationResults.detection.confidence > 0.7 && (
                            <div className="flex items-start space-x-2">
                              <Code className="h-5 w-5 mt-0.5 text-neon-purple" />
                              <div>
                                <p className="font-medium">Honeypot Content Activated</p>
                                <p className="text-sm text-muted-foreground">
                                  Serving deceptive content to isolate and study bot behavior
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {simulationResults.detection.confidence > 0.9 && (
                            <div className="flex items-start space-x-2">
                              <Shield className="h-5 w-5 mt-0.5 text-neon-blue" />
                              <div>
                                <p className="font-medium">Request Blocked</p>
                                <p className="text-sm text-muted-foreground">
                                  High-confidence bot traffic blocked from accessing protected resources
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-abyss-700">
                          <p className="text-xs text-muted-foreground">
                            Protection measures escalate based on bot confidence level and attack type.
                            Higher confidence triggers more aggressive countermeasures.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BotSimulator;
