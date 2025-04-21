
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MLDashboard from '@/components/ml/MLDashboard';
import { Brain, ShieldCheck, Bot, Globe } from 'lucide-react';

export function MLProtectionSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-neon-blue" />
        <h2 className="text-xl font-semibold">ML-Powered Protection</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-5 w-5 text-neon-green" />
              <CardTitle className="text-base">Bot Classification</CardTitle>
            </div>
            <CardDescription>
              Multi-layer neural networks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Our system uses sophisticated neural networks to analyze visitor behavior in real-time, 
              classifying traffic into multiple categories with 95.8% accuracy.
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="h-5 w-5 text-neon-purple" />
              <CardTitle className="text-base">Behavior Analysis</CardTitle>
            </div>
            <CardDescription>
              Temporal pattern recognition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              LSTM networks analyze temporal patterns in visitor interactions, detecting non-human 
              behaviors that might indicate automation or scripted access.
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="h-5 w-5 text-neon-blue" />
              <CardTitle className="text-base">Advanced Fingerprinting</CardTitle>
            </div>
            <CardDescription>
              Device and browser analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Our system analyzes over 50 browser and device characteristics to create unique 
              fingerprints that persist even when bots change their IP addresses.
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Implementation Guide</CardTitle>
          <CardDescription>
            How to implement ML-powered bot protection in your applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our ML-powered bot protection system can be implemented in your applications 
              with minimal configuration. Follow these steps to get started:
            </p>
            
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h4 className="text-sm font-medium mb-2">1. Client-Side Integration</h4>
              <pre className="bg-abyss-900 p-3 rounded text-xs font-mono overflow-x-auto">
                {`// Add this script to your HTML
<script src="https://cdn.perpetualabyss.com/detector.js" 
  data-api-key="YOUR_API_KEY" 
  data-sensitivity="medium">
</script>`}
              </pre>
            </div>
            
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h4 className="text-sm font-medium mb-2">2. Server-Side Verification</h4>
              <pre className="bg-abyss-900 p-3 rounded text-xs font-mono overflow-x-auto">
                {`// Node.js example
const { verifyVisitor } = require('@perpetual-abyss/server');

app.use(async (req, res, next) => {
  const token = req.headers['x-bot-token'];
  const result = await verifyVisitor(token, {
    apiKey: process.env.ABYSS_API_KEY,
    threshold: 0.8 // confidence threshold
  });
  
  if (result.isBot) {
    // Serve honeypot content or block
    return res.redirect('/honeypot');
  }
  
  next();
});`}
              </pre>
            </div>
            
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h4 className="text-sm font-medium mb-2">3. Configure Protection Levels</h4>
              <div className="text-sm">
                <p className="mb-2">
                  You can configure different protection levels based on the content you're protecting:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Passive monitoring (log only, no blocking)</li>
                  <li>Moderate protection (challenge suspicious visitors)</li>
                  <li>Aggressive protection (block high-confidence bot detections)</li>
                  <li>Custom honeypot (serve deceptive content to detected bots)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>ML Dashboard</CardTitle>
          <CardDescription>
            Real-time monitoring and analysis of bot traffic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MLDashboard />
        </CardContent>
      </Card>
    </div>
  );
}
