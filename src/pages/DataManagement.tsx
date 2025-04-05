
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { 
  Activity, 
  BarChart3, 
  ShieldAlert, 
  Server, 
  List, 
  Database, 
  Settings, 
  Download, 
  RefreshCw, 
  Filter, 
  Trash2,
  Bot,
  Calendar,
  Globe
} from 'lucide-react';

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('logs');
  
  const mockBotData = [
    { id: 1, ip: "103.45.78.92", userAgent: "Python-urllib/3.8", timestamp: "2025-04-05 09:32:14", confidence: 92, country: "China" },
    { id: 2, ip: "188.166.45.23", userAgent: "Go-http-client/1.1", timestamp: "2025-04-05 10:15:08", confidence: 95, country: "Netherlands" },
    { id: 3, ip: "45.227.253.48", userAgent: "Mozilla/5.0 (compatible; Baiduspider/2.0)", timestamp: "2025-04-05 11:42:55", confidence: 88, country: "Brazil" },
    { id: 4, ip: "77.88.5.184", userAgent: "python-requests/2.25.1", timestamp: "2025-04-05 12:03:19", confidence: 97, country: "Russia" },
    { id: 5, ip: "216.244.66.203", userAgent: "Mozilla/5.0 (compatible; DotBot/1.1)", timestamp: "2025-04-05 13:28:42", confidence: 86, country: "United States" },
    { id: 6, ip: "40.77.167.115", userAgent: "Mozilla/5.0 AppleWebKit/537.36 Chrome/91.0.4472.124", timestamp: "2025-04-05 14:57:01", confidence: 79, country: "Ireland" },
    { id: 7, ip: "5.188.62.214", userAgent: "Scrapy/2.5.0 (+https://scrapy.org)", timestamp: "2025-04-05 15:10:33", confidence: 99, country: "Russia" },
  ];
  
  const mockExportFormats = [
    { id: 'csv', name: 'CSV File (.csv)', description: 'Export data in CSV format for use in spreadsheet applications' },
    { id: 'json', name: 'JSON File (.json)', description: 'Export raw data in JSON format for integration with other systems' },
    { id: 'pdf', name: 'PDF Report (.pdf)', description: 'Generate a comprehensive PDF report with visualizations' },
    { id: 'api', name: 'API Access', description: 'Access data programmatically via REST API endpoints' },
  ];
  
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
              <nav className="grid gap-1 px-2">
                <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <Activity className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                
                <Link to="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                
                <Link to="/honeypot" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <Server className="h-4 w-4" />
                  <span>Honeypot</span>
                </Link>

                <Link to="/results" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <List className="h-4 w-4" />
                  <span>Results</span>
                </Link>

                <Link to="/data-management" className="flex items-center gap-3 rounded-md px-3 py-2 bg-secondary text-foreground">
                  <Database className="h-4 w-4" />
                  <span>Data Management</span>
                </Link>

                <Link to="/settings" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </nav>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-abyss-700 p-4">
            <div className="text-xs text-muted-foreground">
              Perpetual Abyss v1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex-1">
          <header className="border-b border-abyss-700 bg-background py-3 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Data Management</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-neon-blue hover:bg-neon-blue/80 text-black">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </header>
          
          <main className="p-6">
            <Tabs defaultValue="logs" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="logs" className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  Bot Logs
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </TabsTrigger>
                <TabsTrigger value="storage" className="flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Storage Management
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="logs" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Bot Detection Logs</CardTitle>
                    <CardDescription>
                      Detailed logs of all detected bot activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-abyss-700">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-abyss-800 hover:bg-abyss-800">
                            <TableHead>ID</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>User Agent</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockBotData.map((bot) => (
                            <TableRow key={bot.id} className="hover:bg-abyss-800">
                              <TableCell className="font-mono">{bot.id}</TableCell>
                              <TableCell className="font-mono">{bot.ip}</TableCell>
                              <TableCell className="font-mono text-xs max-w-xs truncate">{bot.userAgent}</TableCell>
                              <TableCell>{bot.timestamp}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  bot.confidence > 90 ? 'bg-red-900/30 text-red-400' : 
                                  bot.confidence > 80 ? 'bg-orange-900/30 text-orange-400' : 
                                  'bg-yellow-900/30 text-yellow-400'
                                }`}>
                                  {bot.confidence}%
                                </span>
                              </TableCell>
                              <TableCell className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                {bot.country}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-muted-foreground">
                        Showing 7 of 243 records
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Advanced Log Query</CardTitle>
                    <CardDescription>
                      Search and filter logs using custom criteria
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700 flex flex-col items-center justify-center h-32">
                      <p className="text-muted-foreground text-center mb-4">
                        Advanced query features available on Pro and Enterprise plans
                      </p>
                      <Button asChild className="bg-neon-purple hover:bg-neon-purple/80">
                        <Link to="/pricing">
                          Upgrade Your Plan
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Bot Detection Trends</CardTitle>
                      <CardDescription>
                        Bot activity over the past 30 days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700 h-64 flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-10 w-10 text-neon-blue mx-auto mb-2" />
                          <p className="text-muted-foreground">
                            Chart visualization would appear here in the live application
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Geographic Distribution</CardTitle>
                      <CardDescription>
                        Bot origins by country
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700 h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="h-10 w-10 text-neon-purple mx-auto mb-2" />
                          <p className="text-muted-foreground">
                            Map visualization would appear here in the live application
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle>ML Analysis Insights</CardTitle>
                      <CardDescription>
                        Patterns identified by our machine learning system
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                            <h4 className="text-lg font-medium mb-2 text-neon-blue">Anomaly Clusters</h4>
                            <p className="text-sm text-muted-foreground">
                              3 distinct bot behavior patterns identified in the last 24 hours, suggesting coordinated activity.
                            </p>
                          </div>
                          
                          <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                            <h4 className="text-lg font-medium mb-2 text-neon-red">Emerging Threats</h4>
                            <p className="text-sm text-muted-foreground">
                              New signature detected matching known vulnerability scanner patterns from 5 unique IP ranges.
                            </p>
                          </div>
                          
                          <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                            <h4 className="text-lg font-medium mb-2 text-neon-green">Behavioral Analysis</h4>
                            <p className="text-sm text-muted-foreground">
                              87% of detected bots exhibit non-human navigation patterns, focusing on data-rich pages.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="export" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Export Data</CardTitle>
                    <CardDescription>
                      Download your bot detection data in various formats
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockExportFormats.map((format) => (
                          <div key={format.id} className="flex p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium mb-1">{format.name}</h4>
                              <p className="text-sm text-muted-foreground">{format.description}</p>
                            </div>
                            <Button className="self-center bg-neon-blue hover:bg-neon-blue/80 text-black">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 bg-abyss-900 rounded-lg border border-abyss-700">
                        <h4 className="text-lg font-medium mb-3 flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-neon-purple" />
                          Date Range Selection
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-abyss-800 p-3 rounded-md border border-abyss-700">
                            <p className="text-sm text-muted-foreground mb-2">Start Date:</p>
                            <p className="font-medium">2025-03-01</p>
                          </div>
                          <div className="bg-abyss-800 p-3 rounded-md border border-abyss-700">
                            <p className="text-sm text-muted-foreground mb-2">End Date:</p>
                            <p className="font-medium">2025-04-05</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Scheduled Reports</CardTitle>
                    <CardDescription>
                      Set up automated data exports on a regular schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700 flex flex-col items-center justify-center h-32">
                      <p className="text-muted-foreground text-center mb-4">
                        Scheduled reporting available on Enterprise plans
                      </p>
                      <Button asChild className="bg-neon-purple hover:bg-neon-purple/80">
                        <Link to="/pricing">
                          Upgrade to Enterprise
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="storage" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Data Storage Management</CardTitle>
                    <CardDescription>
                      Manage your data retention policies and storage usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                        <h4 className="text-lg font-medium mb-3">Storage Usage</h4>
                        <div className="h-6 w-full bg-abyss-900 rounded-full overflow-hidden">
                          <div className="h-full bg-neon-blue" style={{ width: '42%' }}></div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm text-muted-foreground">42% used (210 MB of 500 MB)</span>
                          <span className="text-sm text-neon-blue">Pro Plan</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                          <h4 className="text-lg font-medium mb-3">Retention Policy</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Your current plan allows data retention for 90 days. Older data will be automatically archived.
                          </p>
                          <Button variant="outline" className="w-full">
                            Modify Retention Policy
                          </Button>
                        </div>
                        
                        <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                          <h4 className="text-lg font-medium mb-3">Data Cleanup</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Remove unnecessary data to free up storage space.
                          </p>
                          <Button variant="outline" className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clean Old Data
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default DataManagement;
