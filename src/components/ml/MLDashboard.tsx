
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getDetectionStats, getRecentDetections, StoredDetection } from '@/utils/detectionDatabase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const MLDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalDetections: 0,
    botDetections: 0,
    blockedAttempts: 0,
    botTypeCounts: {} as Record<string, number>,
    detectionRate: 0
  });
  const [recentDetections, setRecentDetections] = useState<StoredDetection[]>([]);
  const [timeseriesData, setTimeseriesData] = useState<any[]>([]);
  
  // Update stats every 5 seconds
  useEffect(() => {
    // Initial load
    updateDashboardData();
    
    // Set up interval to refresh data
    const interval = setInterval(updateDashboardData, 5000);
    
    // Listen for new detections
    window.addEventListener('botDetected', updateDashboardData);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('botDetected', updateDashboardData);
    };
  }, []);
  
  const updateDashboardData = () => {
    // Get latest stats
    const currentStats = getDetectionStats();
    setStats(currentStats);
    
    // Get recent detections
    const recent = getRecentDetections(10);
    setRecentDetections(recent);
    
    // Generate timeseries data for the chart (last 24 hours)
    generateTimeseriesData();
  };
  
  const generateTimeseriesData = () => {
    // For demo, we'll generate synthetic data
    const now = Date.now();
    const data = [];
    
    // Last 24 hour data points (hourly)
    for (let i = 24; i >= 0; i--) {
      const timestamp = now - (i * 3600000); // hours in milliseconds
      
      // Base values with some randomness
      const human = Math.round(100 - (stats.detectionRate * 100) + Math.random() * 10 - 5);
      const scraper = Math.round((stats.botTypeCounts['SCRAPER'] || 0) / (stats.botDetections || 1) * 100 * Math.random() * 0.5 + 5);
      const crawler = Math.round((stats.botTypeCounts['CRAWLER'] || 0) / (stats.botDetections || 1) * 100 * Math.random() * 0.5 + 3);
      const credentialStuffer = Math.round((stats.botTypeCounts['CREDENTIAL_STUFFER'] || 0) / (stats.botDetections || 1) * 100 * Math.random() * 0.5 + 2);
      
      data.push({
        time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        Human: human,
        Scraper: scraper,
        Crawler: crawler,
        'Credential Stuffer': credentialStuffer
      });
    }
    
    setTimeseriesData(data);
  };
  
  return (
    <div className="space-y-4">
      {/* Traffic stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-abyss-800 border-abyss-700">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Total Traffic</div>
            <div className="text-2xl font-bold mt-1">{stats.totalDetections.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-abyss-800 border-abyss-700">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Bot Traffic</div>
            <div className="text-2xl font-bold mt-1 text-neon-purple">
              {stats.botDetections.toLocaleString()} 
              <span className="text-xs text-muted-foreground ml-1">
                ({Math.round(stats.detectionRate * 100)}%)
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-abyss-800 border-abyss-700">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Blocked Attempts</div>
            <div className="text-2xl font-bold mt-1 text-neon-red">{stats.blockedAttempts.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-abyss-800 border-abyss-700">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Bot Types</div>
            <div className="text-2xl font-bold mt-1 text-neon-blue">{Object.keys(stats.botTypeCounts).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic chart */}
      <Card className="bg-abyss-800 border-abyss-700">
        <CardContent className="p-4">
          <div className="text-sm font-medium mb-2">Traffic Distribution (24 Hours)</div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeseriesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorScraper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCrawler" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCredentialStuffer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={10} />
                <YAxis stroke="#475569" fontSize={10} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155',
                    color: '#e2e8f0',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="Human" stroke="#22c55e" fillOpacity={1} fill="url(#colorHuman)" />
                <Area type="monotone" dataKey="Scraper" stroke="#ec4899" fillOpacity={1} fill="url(#colorScraper)" />
                <Area type="monotone" dataKey="Crawler" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorCrawler)" />
                <Area type="monotone" dataKey="Credential Stuffer" stroke="#ef4444" fillOpacity={1} fill="url(#colorCredentialStuffer)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent detections */}
      <Card className="bg-abyss-800 border-abyss-700">
        <CardContent className="p-4">
          <div className="text-sm font-medium mb-2">Recent Bot Detections</div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-abyss-700">
                  <th className="text-left py-2 px-2">Time</th>
                  <th className="text-left py-2 px-2">Type</th>
                  <th className="text-left py-2 px-2">Confidence</th>
                  <th className="text-left py-2 px-2">Status</th>
                  <th className="text-left py-2 px-2">Fingerprint</th>
                </tr>
              </thead>
              <tbody>
                {recentDetections.filter(d => d.isBot).map((detection, i) => (
                  <tr key={i} className="border-b border-abyss-700">
                    <td className="py-2 px-2 text-muted-foreground">{new Date(detection.timestamp).toLocaleTimeString()}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        detection.botType === 'SCRAPER' ? 'bg-pink-900/30 text-pink-400' :
                        detection.botType === 'CRAWLER' ? 'bg-purple-900/30 text-purple-400' :
                        detection.botType === 'CREDENTIAL_STUFFER' ? 'bg-red-900/30 text-red-400' :
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {detection.botType}
                      </span>
                    </td>
                    <td className="py-2 px-2">{Math.round(detection.confidence * 100)}%</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        detection.blocked ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {detection.blocked ? 'Blocked' : 'Monitored'}
                      </span>
                    </td>
                    <td className="py-2 px-2 font-mono text-muted-foreground truncate max-w-[180px]">
                      {detection.fingerprint}
                    </td>
                  </tr>
                ))}
                {recentDetections.filter(d => d.isBot).length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted-foreground">
                      No bot detections recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLDashboard;
