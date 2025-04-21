
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotType } from '@/utils/mlBotDetector';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BotTypeDistribution {
  name: string;
  value: number;
  color: string;
}

interface MLDetectionStatsProps {
  botTypeDistribution: BotTypeDistribution[];
  totalDetections: number;
  accuracyRate: number;
}

const MLDetectionStats: React.FC<MLDetectionStatsProps> = ({
  botTypeDistribution,
  totalDetections,
  accuracyRate
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>ML Detection Statistics</CardTitle>
        <CardDescription>
          Real-time analysis of bot detection results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
            <div className="text-2xl font-bold mb-1">{totalDetections}</div>
            <div className="text-sm text-muted-foreground">Total Sessions Analyzed</div>
          </div>
          
          <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
            <div className="text-2xl font-bold mb-1">{Math.round(accuracyRate * 100)}%</div>
            <div className="text-sm text-muted-foreground">Model Accuracy</div>
          </div>
          
          <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
            <div className="text-2xl font-bold mb-1">
              {Math.round((botTypeDistribution.find(b => b.name !== 'HUMAN')?.value || 0) / 
                totalDetections * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Bot Traffic Rate</div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={botTypeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {botTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} sessions`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Simulated data for development purposes
export const getSimulatedMLStats = () => {
  const botTypeDistribution: BotTypeDistribution[] = [
    { name: 'HUMAN', value: 68, color: '#4ade80' },
    { name: 'SCRAPER', value: 12, color: '#f87171' },
    { name: 'CRAWLER', value: 8, color: '#facc15' },
    { name: 'CREDENTIAL_STUFFER', value: 4, color: '#fb7185' },
    { name: 'UNKNOWN_BOT', value: 8, color: '#a78bfa' },
  ];
  
  const totalDetections = botTypeDistribution.reduce((sum, item) => sum + item.value, 0);
  const accuracyRate = 0.958; // 95.8% accuracy
  
  return {
    botTypeDistribution,
    totalDetections,
    accuracyRate
  };
};

export default MLDetectionStats;
