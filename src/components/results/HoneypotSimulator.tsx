
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Bot, Shield, AlertTriangle, Link, Code, Database, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { detectBot, logBotDetection } from '@/utils/botDetector';
import { BotType, mlResultToBotDetection, predictBotProbability, extractFeatures } from '@/utils/mlBotDetector';
import MLFeatureImportance from '../ml/MLFeatureImportance';

// Simulated detection results database
let detectionLog: any[] = [];

const HoneypotSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('monitor');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [honeypotUrl, setHoneypotUrl] = useState('');
  const [monitoringTime, setMonitoringTime] = useState(0);
  const [detectedAttacks, setDetectedAttacks] = useState(0);
  const [blockedAttacks, setBlockedAttacks] = useState(0);
  const [latestDetection, setLatestDetection] = useState<any>(null);
  const [activeAttack, setActiveAttack] = useState(false);
  const [attackProgress, setAttackProgress] = useState(0);
  const [attackIntensity, setAttackIntensity] = useState(50);
  const [attackResult, setAttackResult] = useState<{
    requestsSent: number;
    requestsBlocked: number;
    detectionRate: number;
  }>({
    requestsSent: 0,
    requestsBlocked: 0,
    detectionRate: 0,
  });
  
  const { toast } = useToast();
  
  // Simulate connection to honeypot
  useEffect(() => {
    setHoneypotUrl('https://shop.abyss-honeypot.com');
  }, []);
  
  // Handle monitoring start/stop
  const toggleMonitoring = () => {
    if (isMonitoring) {
      setIsMonitoring(false);
      toast({
        title: "Monitoring stopped",
        description: `Detected ${detectedAttacks} attacks over ${monitoringTime} seconds`,
      });
    } else {
      setIsMonitoring(true);
      setMonitoringTime(0);
      toast({
        title: "Monitoring started",
        description: "Connecting to ShopAbyss honeypot...",
      });
      
      // Simulate some initial detections
      setTimeout(() => {
        const botDetection = detectBot();
        logBotDetection(botDetection);
        setLatestDetection(botDetection);
        setDetectedAttacks(1);
      }, 2000);
    }
  };
  
  // Simulate monitoring time passing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isMonitoring) {
      timer = setInterval(() => {
        setMonitoringTime(prev => prev + 1);
        
        // Randomly detect attacks
        if (Math.random() < 0.05) {
          const randomBotType = Object.values(BotType)[
            Math.floor(Math.random() * (Object.values(BotType).length - 1)) + 1
          ];
          
          const features = extractFeatures(
            `Mozilla/5.0 (compatible; ${randomBotType}/1.0; +http://example.com/bot)`,
            `bot-${Date.now()}`,
            Math.round(Math.random() * 3),
            Math.round(Math.random() * 2),
            0,
            Date.now() - 300,
            Date.now() - 1000
          );
          
          const prediction = predictBotProbability(features);
          const botDetection = mlResultToBotDetection(
            prediction, 
            `Mozilla/5.0 (compatible; ${randomBotType}/1.0; +http://example.com/bot)`,
            `bot-${Date.now()}`
          );
          
          logBotDetection(botDetection);
          detectionLog.push({
            ...botDetection,
            timestamp: new Date().toISOString()
          });
          
          setLatestDetection(botDetection);
          setDetectedAttacks(prev => prev + 1);
          
          if (botDetection.confidence > 0.7) {
            setBlockedAttacks(prev => prev + 1);
          }
        }
      }, 1000);
    }
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isMonitoring]);
  
  // Launch attack on honeypot
  const launchAttack = () => {
    if (activeAttack) return;
    
    setActiveAttack(true);
    setAttackProgress(0);
    
    const totalRequests = Math.floor(attackIntensity * 2);
    let successfulRequests = 0;
    let blockedRequests = 0;
    
    toast({
      title: "Attack launched",
      description: `Sending ${totalRequests} requests to ShopAbyss honeypot`,
    });
    
    const attackInterval = setInterval(() => {
      setAttackProgress(prev => {
        const newProgress = prev + (100 / totalRequests);
        
        // Simulate request
        successfulRequests++;
        
        // Detection is based on intensity (higher intensity = easier to detect)
        const detectionChance = attackIntensity / 100 * 0.7 + 0.2;
        if (Math.random() < detectionChance) {
          blockedRequests++;
        }
        
        if (newProgress >= 100) {
          clearInterval(attackInterval);
          setActiveAttack(false);
          setAttackProgress(100);
          
          const detectionRate = blockedRequests / successfulRequests;
          setAttackResult({
            requestsSent: successfulRequests,
            requestsBlocked: blockedRequests,
            detectionRate: Math.round(detectionRate * 100)
          });
          
          toast({
            title: "Attack completed",
            description: `${blockedRequests} of ${successfulRequests} requests blocked (${Math.round(detectionRate * 100)}% detection)`,
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 100);
  };
  
  return (
    <Card className="border-abyss-700">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link className="mr-2 h-5 w-5 text-neon-blue" />
          ShopAbyss Honeypot Monitor
        </CardTitle>
        <CardDescription>
          Connect to the ShopAbyss honeypot to monitor and test bot protection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monitor">Live Monitor</TabsTrigger>
            <TabsTrigger value="attack">Test Attack</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monitor" className="space-y-4 mt-4">
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Honeypot Connection</h3>
                <div className={`px-2 py-1 text-xs rounded-full ${isMonitoring ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {isMonitoring ? 'Connected' : 'Disconnected'}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm mb-4">
                <Server className="h-4 w-4 text-neon-purple" />
                <span>URL:</span>
                <code className="bg-abyss-900 px-2 py-0.5 rounded">{honeypotUrl}</code>
              </div>
              
              <Button onClick={toggleMonitoring} variant={isMonitoring ? "destructive" : "default"} className="w-full">
                {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
              </Button>
            </div>
            
            {isMonitoring && (
              <div className="space-y-4">
                <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                  <h3 className="text-lg font-medium mb-3">Live Monitoring</h3>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                      <div className="text-xs text-muted-foreground mb-1">Monitoring Time</div>
                      <div className="text-xl font-semibold">{monitoringTime}s</div>
                    </div>
                    <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                      <div className="text-xs text-muted-foreground mb-1">Detected Attacks</div>
                      <div className="text-xl font-semibold text-neon-purple">{detectedAttacks}</div>
                    </div>
                    <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                      <div className="text-xs text-muted-foreground mb-1">Blocked Attacks</div>
                      <div className="text-xl font-semibold text-neon-red">{blockedAttacks}</div>
                    </div>
                  </div>
                  
                  {latestDetection && (
                    <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Latest Detection</div>
                        <div className={`px-2 py-0.5 rounded text-xs ${
                          latestDetection.confidence > 0.9 ? 'bg-red-900/30 text-red-400' :
                          latestDetection.confidence > 0.7 ? 'bg-orange-900/30 text-orange-400' :
                          'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {Math.round(latestDetection.confidence * 100)}% confidence
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mb-2 font-mono truncate">
                        {latestDetection.userAgent}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {latestDetection.reasons && latestDetection.reasons.map((reason: string, i: number) => (
                          <div key={i} className="text-xs bg-abyss-800 px-2 py-1 rounded">
                            {reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {latestDetection && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MLFeatureImportance 
                      featureImportance={{
                        'userAgent': 0.35,
                        'fingerprint': 0.15,
                        'navigationPatterns': 0.20,
                        'mouseMovements': 0.15,
                        'scrollBehavior': 0.10,
                        'inputInteraction': 0.05,
                      }}
                      detectionConfidence={latestDetection.confidence}
                      botType={latestDetection.botType || BotType.UNKNOWN_BOT}
                    />
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center">
                          <Database className="mr-2 h-4 w-4 text-neon-green" />
                          Detection Database
                        </CardTitle>
                        <CardDescription>
                          Recent detection events stored in database
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-abyss-900 rounded-md border border-abyss-700 h-[250px] overflow-y-auto">
                          <div className="p-3 space-y-3">
                            {detectionLog.length === 0 ? (
                              <div className="text-sm text-muted-foreground text-center py-10">
                                No detection events recorded yet
                              </div>
                            ) : (
                              detectionLog.slice().reverse().map((event, i) => (
                                <div key={i} className="text-xs border-b border-abyss-700 pb-2">
                                  <div className="flex justify-between mb-1">
                                    <span className="font-medium">{event.botType}</span>
                                    <span className="text-muted-foreground">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                  </div>
                                  <div className="font-mono text-muted-foreground truncate">
                                    {event.fingerprint}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="attack" className="space-y-4 mt-4">
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h3 className="text-lg font-medium mb-3">Attack Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Attack Intensity</span>
                    <span>{attackIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={attackIntensity}
                    onChange={(e) => setAttackIntensity(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Stealthy</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                
                <Button 
                  onClick={launchAttack} 
                  disabled={activeAttack} 
                  className="w-full"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Launch Bot Attack
                </Button>
              </div>
            </div>
            
            {(activeAttack || attackResult.requestsSent > 0) && (
              <div className="space-y-4">
                {activeAttack && (
                  <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Attack progress</span>
                      <span>{Math.round(attackProgress)}%</span>
                    </div>
                    <Progress value={attackProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Sending requests to ShopAbyss honeypot...
                    </p>
                  </div>
                )}
                
                {attackResult.requestsSent > 0 && !activeAttack && (
                  <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                    <h3 className="text-lg font-medium mb-3">Attack Results</h3>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                        <div className="text-xs text-muted-foreground mb-1">Requests Sent</div>
                        <div className="text-xl font-semibold">{attackResult.requestsSent}</div>
                      </div>
                      <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                        <div className="text-xs text-muted-foreground mb-1">Requests Blocked</div>
                        <div className="text-xl font-semibold text-neon-red">{attackResult.requestsBlocked}</div>
                      </div>
                      <div className="bg-abyss-900 p-3 rounded-md border border-abyss-700">
                        <div className="text-xs text-muted-foreground mb-1">Detection Rate</div>
                        <div className="text-xl font-semibold text-neon-purple">{attackResult.detectionRate}%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Shield className={`h-5 w-5 mt-0.5 ${
                          attackResult.detectionRate > 80 ? 'text-neon-green' : 
                          attackResult.detectionRate > 50 ? 'text-neon-blue' : 
                          'text-neon-red'
                        }`} />
                        <div>
                          <p className="font-medium">Protection Assessment</p>
                          <p className="text-sm text-muted-foreground">
                            {attackResult.detectionRate > 80 
                              ? 'Strong protection against bot attacks.' 
                              : attackResult.detectionRate > 50 
                              ? 'Moderate protection, some bots getting through.' 
                              : 'Weak protection, most bots bypassing detection.'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 mt-0.5 text-yellow-400" />
                        <div>
                          <p className="font-medium">Recommendation</p>
                          <p className="text-sm text-muted-foreground">
                            {attackResult.detectionRate > 80 
                              ? 'Continue monitoring for new attack patterns.' 
                              : attackResult.detectionRate > 50 
                              ? 'Consider increasing detection sensitivity.' 
                              : 'ML model needs retraining with latest attack patterns.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Code className="mr-2 h-4 w-4 text-neon-purple" />
                      Attack Implementation
                    </CardTitle>
                    <CardDescription>
                      Technical details of the simulated attack
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-abyss-900 p-3 rounded text-xs font-mono overflow-x-auto">
{`// Simulated bot attack script
const targets = [
  '/products',
  '/category/electronics',
  '/category/fashion',
  '/search?q=latest',
  '/product/details/123'
];

async function scrapeProducts() {
  const results = [];
  
  for (const target of targets) {
    console.log(\`Scraping \${target}...\`);
    
    try {
      // Randomize request timing
      await new Promise(r => 
        setTimeout(r, ${attackIntensity < 50 ? '(Math.random() * 1000) + 500' : '(Math.random() * 200) + 100'})
      );
      
      // Send request with modified headers
      const response = await fetch(\`\${baseUrl}\${target}\`, {
        headers: {
          'User-Agent': '${attackIntensity < 30 ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' : 'ScrapeBot/1.0 (+http://example.com/bot)'}',
          'Accept': 'text/html',
          'Connection': '${attackIntensity < 50 ? 'keep-alive' : 'close'}'
        }
      });
      
      // Extract data
      const html = await response.text();
      const productData = extractProductData(html);
      results.push(...productData);
    } catch (error) {
      console.error(\`Error scraping \${target}: \${error}\`);
    }
  }
  
  return results;
}

// Start scraping with concurrency=${attackIntensity < 40 ? '1' : attackIntensity < 70 ? '5' : '10'}
scrapeProducts().then(data => saveResults(data));`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HoneypotSimulator;
