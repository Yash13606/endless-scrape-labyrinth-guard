
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export const MLProtectionSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Machine Learning Protection</CardTitle>
        <CardDescription>How our AI enhances your security</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h4 className="text-lg font-medium mb-3 text-neon-purple">Anomaly Detection</h4>
              <p className="text-sm text-muted-foreground">
                Our ML models analyze traffic patterns to identify anomalies that indicate bot activity, 
                even when they attempt to mimic human behavior.
              </p>
            </div>
            
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h4 className="text-lg font-medium mb-3 text-neon-blue">Adaptive Learning</h4>
              <p className="text-sm text-muted-foreground">
                The system continuously learns from new bot behaviors, improving detection capabilities 
                and staying ahead of evolving threats.
              </p>
            </div>
            
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <h4 className="text-lg font-medium mb-3 text-neon-red">Threat Intelligence</h4>
              <p className="text-sm text-muted-foreground">
                Real-time updates from our global network provide insights into emerging threats and 
                attack patterns before they reach your site.
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-abyss-900 p-4 rounded-lg border border-abyss-700">
            <h4 className="text-lg font-medium mb-3 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
              Performance Metrics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-abyss-800 rounded-md">
                <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                <div className="text-2xl font-bold text-neon-green">97.5%</div>
              </div>
              <div className="p-3 bg-abyss-800 rounded-md">
                <div className="text-sm text-muted-foreground">False Positive Rate</div>
                <div className="text-2xl font-bold text-neon-purple">0.2%</div>
              </div>
              <div className="p-3 bg-abyss-800 rounded-md">
                <div className="text-sm text-muted-foreground">Adaptation Speed</div>
                <div className="text-2xl font-bold text-neon-blue">1.5h</div>
              </div>
              <div className="p-3 bg-abyss-800 rounded-md">
                <div className="text-sm text-muted-foreground">Threats Analyzed</div>
                <div className="text-2xl font-bold text-neon-red">2.4M+</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
