
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BotDetectionResult } from '@/utils/botDetector';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, PieChart, BarChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { 
  Activity, 
  BarChart as BarChartIcon, 
  Home, 
  Settings, 
  Database, 
  ShieldAlert, 
  Monitor, 
  LineChart, 
  PieChart as PieChartIcon, 
  AlertTriangle,
  Download,
  Share2,
  RefreshCw,
  ListChecks
} from 'lucide-react';

const Dashboard = () => {
  const [botLogs, setBotLogs] = useState<BotDetectionResult[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  useEffect(() => {
    // Load bot logs from local storage
    const loadBotLogs = () => {
      const logs = JSON.parse(localStorage.getItem('botLogs') || '[]');
      setBotLogs(logs);
      setLastUpdated(new Date());
    };
    
    loadBotLogs();
    
    // Set up event listener for new bot detections
    const handleBotDetected = (event: CustomEvent<BotDetectionResult>) => {
      setBotLogs(prev => [...prev, event.detail]);
      setLastUpdated(new Date());
    };
    
    window.addEventListener('botDetected', handleBotDetected as EventListener);
    
    return () => {
      window.removeEventListener('botDetected', handleBotDetected as EventListener);
    };
  }, []);
  
  const refreshData = () => {
    // Simulate refresh
    const logs = JSON.parse(localStorage.getItem('botLogs') || '[]');
    setBotLogs([...logs]);
    setLastUpdated(new Date());
  };
  
  const clearData = () => {
    if (confirm('Are you sure you want to clear all bot detection data?')) {
      localStorage.setItem('botLogs', '[]');
      setBotLogs([]);
    }
  };
  
  // Calculate statistics
  const totalDetections = botLogs.length;
  const confirmedBots = botLogs.filter(log => log.isBot).length;
  const humanVisitors = totalDetections - confirmedBots;
  const botPercentage = totalDetections > 0 ? (confirmedBots / totalDetections) * 100 : 0;
  
  // Group bots by user agent for distribution chart
  const botsByUserAgent = botLogs
    .filter(log => log.isBot)
    .reduce((acc, log) => {
      // Extract browser/bot name from user agent
      const uaMatch = log.userAgent.match(/(Chrome|Firefox|Safari|Edge|MSIE|Trident|bot|spider|crawl|Python|curl)/i);
      const uaType = uaMatch ? uaMatch[1] : 'Other';
      
      acc[uaType] = (acc[uaType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  // Create data for the charts
  const botDistributionData = Object.entries(botsByUserAgent).map(([name, value]) => ({
    name, value
  }));
  
  // Time series data - group by hour for the last 24 hours
  const timeSeriesData = Array.from({ length: 24 }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - 23 + i);
    date.setMinutes(0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 1);
    
    const logsInHour = botLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= date && logDate < endDate;
    });
    
    const bots = logsInHour.filter(log => log.isBot).length;
    const humans = logsInHour.length - bots;
    
    return {
      name: date.getHours().toString().padStart(2, '0') + ':00',
      bots,
      humans
    };
  });
  
  // User agent chart data
  const userAgentData = Object.entries(
    botLogs.reduce((acc, log) => {
      // Simplified user agent categorization
      let category = 'Other';
      if (log.userAgent.includes('Firefox')) category = 'Firefox';
      else if (log.userAgent.includes('Chrome')) category = 'Chrome';
      else if (log.userAgent.includes('Safari')) category = 'Safari';
      else if (log.userAgent.includes('Edge')) category = 'Edge';
      else if (/bot|spider|crawl/i.test(log.userAgent)) category = 'Known Bot';
      else if (/python|curl|http/i.test(log.userAgent)) category = 'Script/Tool';
      
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar className="border-r border-abyss-700">
          <SidebarHeader className="px-6 py-3">
            <Link to="/" className="flex items-center space-x-2">
              <ShieldAlert className="h-6 w-6 text-neon-blue" />
              <span className="text-lg font-bold">Perpetual Abyss</span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarContent className="py-2">
                <nav className="grid gap-1 px-2">
                  <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                  
                  <Link to="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 bg-secondary text-foreground">
                    <Activity className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link to="/honeypot" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <Monitor className="h-4 w-4" />
                    <span>Honeypot</span>
                  </Link>
                  
                  <Link to="/results" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <ListChecks className="h-4 w-4" />
                    <span>Results</span>
                  </Link>
                  
                  <Button variant="ghost" className="flex items-center justify-start gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <Database className="h-4 w-4" />
                    <span>Data Management</span>
                  </Button>
                  
                  <Button variant="ghost" className="flex items-center justify-start gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                </nav>
              </SidebarContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-abyss-700 p-4">
            <div className="flex flex-col gap-2">
              <div className="text-xs text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button size="sm" variant="outline" className="w-full" onClick={refreshData}>
                <RefreshCw className="h-3.5 w-3.5 mr-2" />
                Refresh Data
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex-1">
          <header className="border-b border-abyss-700 bg-background py-3 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Bot Detection Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearData}>
                Clear Data
              </Button>
            </div>
          </header>
          
          <main className="p-6">
            <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-6">
                <TabsList className="grid grid-cols-3 w-[400px]">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="logs">Bot Logs</TabsTrigger>
                </TabsList>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Detections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{totalDetections}</div>
                      <p className="text-xs text-muted-foreground mt-1">All client interactions</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed Bots</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-neon-red">{confirmedBots}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {botPercentage.toFixed(1)}% of all traffic
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Human Visitors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-neon-blue">{humanVisitors}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(100 - botPercentage).toFixed(1)}% of all traffic
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Traps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground mt-1">Honeypot mechanisms enabled</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LineChart className="h-4 w-4 mr-2" />
                        Bot Detection Timeline
                      </CardTitle>
                      <CardDescription>Last 24 hours of detection activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AreaChart 
                        className="h-80"
                        data={timeSeriesData}
                        index="name"
                        categories={["bots", "humans"]}
                        colors={["#ff003c", "#00f2ff"]}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChartIcon className="h-4 w-4 mr-2" />
                        User Agent Distribution
                      </CardTitle>
                      <CardDescription>Client types detected by the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PieChart 
                        className="h-80"
                        data={userAgentData}
                        index="name"
                        valueKey="value"
                        colors={["#00f2ff", "#8a2be2", "#ff003c", "#2be270", "#e2a82b", "#e22b2b"]}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                {/* Active Threats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Active Threats
                    </CardTitle>
                    <CardDescription>Recent high-confidence bot detections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {botLogs.filter(log => log.isBot && log.confidence > 0.8).slice(-5).map((log, i) => (
                        <div key={i} className="border border-abyss-700 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row justify-between mb-2">
                            <div className="font-medium text-neon-red">High Confidence Bot</div>
                            <div className="text-muted-foreground text-sm">
                              {new Date(log.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2 font-mono break-all">
                            {log.userAgent}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Confidence:</span>{" "}
                              {(log.confidence * 100).toFixed(1)}%
                            </div>
                            <div>
                              <span className="text-muted-foreground">Fingerprint:</span>{" "}
                              {log.fingerprint.substring(0, 12)}...
                            </div>
                          </div>
                          {log.reasons && log.reasons.length > 0 && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              <div>Detection triggers:</div>
                              <ul className="list-disc list-inside mt-1">
                                {log.reasons.slice(0, 3).map((reason, i) => (
                                  <li key={i}>{reason}</li>
                                ))}
                                {log.reasons.length > 3 && <li>...and {log.reasons.length - 3} more</li>}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {botLogs.filter(log => log.isBot && log.confidence > 0.8).length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No high-confidence bot detections yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bot Detection Analytics</CardTitle>
                    <CardDescription>Detailed breakdown of bot activity and patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-muted-foreground">
                      <BarChartIcon className="h-10 w-10 mx-auto mb-4 opacity-50" />
                      <p>Analytics will be available in the next version</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Logs Tab */}
              <TabsContent value="logs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bot Detection Logs</CardTitle>
                    <CardDescription>Detailed records of all client interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-abyss-700 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-abyss-800">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">Timestamp</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Confidence</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">User Agent</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Fingerprint</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-abyss-700">
                          {botLogs.slice().reverse().slice(0, 15).map((log, i) => (
                            <tr key={i} className={log.isBot ? "bg-neon-red/5" : ""}>
                              <td className="px-4 py-3 text-sm">
                                {new Date(log.timestamp).toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {log.isBot ? 
                                  <span className="text-neon-red font-medium">BOT</span> : 
                                  <span className="text-neon-blue">Human</span>
                                }
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {(log.confidence * 100).toFixed(1)}%
                              </td>
                              <td className="px-4 py-3 text-sm font-mono truncate max-w-xs">
                                {log.userAgent}
                              </td>
                              <td className="px-4 py-3 text-sm font-mono">
                                {log.fingerprint.substring(0, 8)}...
                              </td>
                            </tr>
                          ))}
                          
                          {botLogs.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                No detection logs yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    
                    {botLogs.length > 15 && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">
                          Load More Logs
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
