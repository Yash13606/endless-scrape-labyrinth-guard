
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FeatureImportanceProps {
  featureImportance: Record<string, number>;
  detectionConfidence: number;
  botType: string;
}

const featureDisplayNames: Record<string, string> = {
  'userAgent': 'User Agent Analysis',
  'fingerprint': 'Device Fingerprint',
  'navigationPatterns': 'Navigation Patterns',
  'mouseMovements': 'Mouse Movements',
  'scrollBehavior': 'Scroll Behavior',
  'inputInteraction': 'Input Interaction',
};

const featureDescriptions: Record<string, string> = {
  'userAgent': 'Analysis of browser identification, including device and OS information',
  'fingerprint': 'Hardware and software fingerprinting to identify unique devices',
  'navigationPatterns': 'How the visitor navigates between pages and site sections',
  'mouseMovements': 'Analysis of cursor movements, precision, and natural behavior',
  'scrollBehavior': 'How the visitor scrolls through content (speed, consistency)',
  'inputInteraction': 'How the visitor interacts with form fields and interactive elements',
};

const MLFeatureImportance: React.FC<FeatureImportanceProps> = ({ 
  featureImportance, 
  detectionConfidence,
  botType
}) => {
  // Sort features by importance
  const sortedFeatures = Object.entries(featureImportance)
    .sort(([, valueA], [, valueB]) => valueB - valueA);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>ML Detection Confidence</span>
          <span className={`px-3 py-1 rounded-full text-xs ${
            detectionConfidence > 0.9 ? 'bg-red-900/30 text-red-400' : 
            detectionConfidence > 0.7 ? 'bg-orange-900/30 text-orange-400' : 
            'bg-green-900/30 text-green-400'
          }`}>
            {Math.round(detectionConfidence * 100)}%
          </span>
        </CardTitle>
        <CardDescription>
          {botType === 'HUMAN' 
            ? 'Traffic classified as human' 
            : `Traffic classified as bot type: ${botType.replace('_', ' ')}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedFeatures.map(([feature, importance]) => (
            <div key={feature} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm">{featureDisplayNames[feature] || feature}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-3 w-3 ml-1 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">{featureDescriptions[feature] || 'Feature description'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm text-muted-foreground">{Math.round(importance * 100)}%</span>
              </div>
              <Progress 
                value={importance * 100} 
                className={`h-2 ${
                  importance > 0.3 ? 'bg-abyss-700 [&>div]:bg-neon-red' : 
                  importance > 0.2 ? 'bg-abyss-700 [&>div]:bg-neon-orange' : 
                  'bg-abyss-700 [&>div]:bg-neon-blue'
                }`} 
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-abyss-700">
          <p className="text-xs text-muted-foreground">
            The ML model analyzes multiple features to make a classification decision.
            Higher percentages indicate greater importance in the final decision.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MLFeatureImportance;
