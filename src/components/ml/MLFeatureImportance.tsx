
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
                <span className="text-sm">{featureDisplayNames[feature] || feature}</span>
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
