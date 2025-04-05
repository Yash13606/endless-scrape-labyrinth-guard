
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { 
  Activity, 
  BarChart3, 
  ShieldAlert, 
  Server, 
  List, 
  Database, 
  Settings as SettingsIcon, 
  Save, 
  Key, 
  AlertTriangle, 
  UserCheck, 
  Bot,
  Users,
  Bell,
  Sliders,
  Shield
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('detection');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };
  
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

                <Link to="/data-management" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <Database className="h-4 w-4" />
                  <span>Data Management</span>
                </Link>

                <Link to="/settings" className="flex items-center gap-3 rounded-md px-3 py-2 bg-secondary text-foreground">
                  <SettingsIcon className="h-4 w-4" />
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
              <h1 className="text-xl font-semibold">Settings</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleSave} className="bg-neon-blue hover:bg-neon-blue/80 text-black">
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
              {saveSuccess && (
                <span className="text-green-400 text-sm ml-2 animate-fade-in">Settings saved successfully!</span>
              )}
            </div>
          </header>
          
          <main className="p-6">
            <Tabs defaultValue="detection" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="detection" className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  Bot Detection
                </TabsTrigger>
                <TabsTrigger value="honeypot" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Honeypot Config
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  API Keys
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="detection" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Bot Detection Configuration</CardTitle>
                    <CardDescription>
                      Configure how Perpetual Abyss identifies and responds to bot traffic
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Detection Thresholds</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <FormLabel>Detection Sensitivity</FormLabel>
                              <span className="text-neon-blue font-medium">75%</span>
                            </div>
                            <div className="h-2 w-full bg-abyss-800 rounded-full overflow-hidden">
                              <div className="h-full bg-neon-blue" style={{ width: '75%' }}></div>
                            </div>
                            <FormDescription>
                              Higher sensitivity catches more bots but may increase false positives
                            </FormDescription>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <FormLabel>Request Rate Threshold</FormLabel>
                              <span className="text-neon-purple font-medium">50 req/min</span>
                            </div>
                            <div className="h-2 w-full bg-abyss-800 rounded-full overflow-hidden">
                              <div className="h-full bg-neon-purple" style={{ width: '60%' }}></div>
                            </div>
                            <FormDescription>
                              Maximum requests per minute before triggering detection
                            </FormDescription>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <FormLabel>ML Confidence Threshold</FormLabel>
                              <span className="text-neon-green font-medium">85%</span>
                            </div>
                            <div className="h-2 w-full bg-abyss-800 rounded-full overflow-hidden">
                              <div className="h-full bg-neon-green" style={{ width: '85%' }}></div>
                            </div>
                            <FormDescription>
                              Minimum confidence level for ML-based bot classification
                            </FormDescription>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <FormLabel>Navigation Speed Threshold</FormLabel>
                              <span className="text-neon-red font-medium">300ms</span>
                            </div>
                            <div className="h-2 w-full bg-abyss-800 rounded-full overflow-hidden">
                              <div className="h-full bg-neon-red" style={{ width: '30%' }}></div>
                            </div>
                            <FormDescription>
                              Minimum time between page navigations for human-like behavior
                            </FormDescription>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-abyss-700">
                      <h3 className="text-lg font-medium">Detection Methods</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">User Agent Analysis</FormLabel>
                              <FormDescription>
                                Identify bots based on user agent strings
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={true} />
                            </FormControl>
                          </FormItem>
                        </div>
                        
                        <div>
                          <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Behavioral Analysis</FormLabel>
                              <FormDescription>
                                Detect non-human navigation patterns
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={true} />
                            </FormControl>
                          </FormItem>
                        </div>
                        
                        <div>
                          <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Browser Fingerprinting</FormLabel>
                              <FormDescription>
                                Identify bots through canvas and WebGL fingerprinting
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={true} />
                            </FormControl>
                          </FormItem>
                        </div>
                        
                        <div>
                          <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">ML-powered Detection</FormLabel>
                              <FormDescription>
                                Use machine learning to identify sophisticated bots
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={true} />
                            </FormControl>
                          </FormItem>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Response Actions</CardTitle>
                    <CardDescription>
                      Define how the system responds when a bot is detected
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                        <FormItem className="space-y-3">
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-base font-medium">Redirect to Honeypot</FormLabel>
                            <Switch checked={true} />
                          </div>
                          <FormDescription>
                            Redirect detected bots to the honeypot system
                          </FormDescription>
                        </FormItem>
                      </div>
                      
                      <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                        <FormItem className="space-y-3">
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-base font-medium">Log Detection Events</FormLabel>
                            <Switch checked={true} />
                          </div>
                          <FormDescription>
                            Record detailed information about detected bots
                          </FormDescription>
                        </FormItem>
                      </div>
                      
                      <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                        <FormItem className="space-y-3">
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-base font-medium">Block Access</FormLabel>
                            <Switch checked={false} />
                          </div>
                          <FormDescription>
                            Completely block detected bots from accessing any content
                          </FormDescription>
                        </FormItem>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="honeypot" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Honeypot Configuration</CardTitle>
                    <CardDescription>
                      Configure how the honeypot system generates and serves content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Content Generation</h3>
                        
                        <FormItem className="space-y-3">
                          <FormLabel>Content Type</FormLabel>
                          <div className="flex flex-wrap gap-2">
                            {['Blog Posts', 'Product Pages', 'User Profiles', 'Forum Threads'].map(type => (
                              <div key={type} className="flex items-center space-x-2 bg-abyss-800 px-3 py-1 rounded-md">
                                <Switch checked={true} />
                                <span className="text-sm">{type}</span>
                              </div>
                            ))}
                          </div>
                          <FormDescription>
                            Types of fake content to generate in the honeypot
                          </FormDescription>
                        </FormItem>
                        
                        <FormItem className="space-y-3">
                          <div className="flex justify-between">
                            <FormLabel>Content Depth</FormLabel>
                            <span className="text-neon-blue font-medium">Unlimited</span>
                          </div>
                          <div className="h-2 w-full bg-abyss-800 rounded-full overflow-hidden">
                            <div className="h-full bg-neon-blue" style={{ width: '100%' }}></div>
                          </div>
                          <FormDescription>
                            How many levels of content to generate for trapped bots
                          </FormDescription>
                        </FormItem>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Behavior Settings</h3>
                        
                        <FormItem className="space-y-3">
                          <div className="flex justify-between">
                            <FormLabel>Response Delay</FormLabel>
                            <span className="text-neon-purple font-medium">250ms</span>
                          </div>
                          <div className="h-2 w-full bg-abyss-800 rounded-full overflow-hidden">
                            <div className="h-full bg-neon-purple" style={{ width: '25%' }}></div>
                          </div>
                          <FormDescription>
                            Artificial delay before serving honeypot content
                          </FormDescription>
                        </FormItem>
                        
                        <FormItem className="space-y-3">
                          <FormLabel>Link Structure</FormLabel>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'Hierarchical', checked: true },
                              { name: 'Mesh Network', checked: true },
                              { name: 'Circular', checked: false },
                              { name: 'Random', checked: true }
                            ].map(type => (
                              <div key={type.name} className="flex items-center space-x-2 bg-abyss-800 px-3 py-1 rounded-md">
                                <Switch checked={type.checked} />
                                <span className="text-sm">{type.name}</span>
                              </div>
                            ))}
                          </div>
                          <FormDescription>
                            How links between honeypot pages are structured
                          </FormDescription>
                        </FormItem>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-abyss-700">
                      <h3 className="text-lg font-medium">Advanced Configuration</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Dynamic Content</FormLabel>
                            <FormDescription>
                              Generate unique content for each bot session
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Realistic Metadata</FormLabel>
                            <FormDescription>
                              Include realistic SEO metadata in honeypot pages
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Fake Forms</FormLabel>
                            <FormDescription>
                              Include non-functional forms to trap form scrapers
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Bot Session Recording</FormLabel>
                            <FormDescription>
                              Record full interaction sequences with trapped bots
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure alerts and notifications for bot detection events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>
                              Receive email alerts for high-confidence bot detections
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Dashboard Alerts</FormLabel>
                            <FormDescription>
                              Show real-time notifications in the dashboard
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Slack Integration</FormLabel>
                            <FormDescription>
                              Send alerts to a Slack channel
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={false} />
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-row items-center justify-between p-4 bg-abyss-800 rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Webhook Notifications</FormLabel>
                            <FormDescription>
                              Send events to a custom webhook endpoint
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={false} />
                          </FormControl>
                        </FormItem>
                      </div>
                      
                      <div className="space-y-4 pt-4 border-t border-abyss-700">
                        <h3 className="text-lg font-medium">Alert Conditions</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                            <FormItem className="space-y-3">
                              <FormLabel className="text-base">Alert on High-Risk Bots</FormLabel>
                              <div className="flex justify-between items-center">
                                <FormDescription>
                                  Minimum confidence threshold
                                </FormDescription>
                                <span className="text-neon-red font-medium">90%</span>
                              </div>
                              <div className="h-2 w-full bg-abyss-900 rounded-full overflow-hidden">
                                <div className="h-full bg-neon-red" style={{ width: '90%' }}></div>
                              </div>
                            </FormItem>
                          </div>
                          
                          <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                            <FormItem className="space-y-3">
                              <FormLabel className="text-base">Alert on Traffic Spikes</FormLabel>
                              <div className="flex justify-between items-center">
                                <FormDescription>
                                  Requests per minute threshold
                                </FormDescription>
                                <span className="text-neon-purple font-medium">100</span>
                              </div>
                              <div className="h-2 w-full bg-abyss-900 rounded-full overflow-hidden">
                                <div className="h-full bg-neon-purple" style={{ width: '70%' }}></div>
                              </div>
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>API Keys Management</CardTitle>
                    <CardDescription>
                      Manage API keys for programmatic access to Perpetual Abyss
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                        <h3 className="text-lg font-medium mb-4">Active API Keys</h3>
                        
                        <div className="space-y-4">
                          <div className="p-3 bg-abyss-900 rounded-md border border-abyss-700">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">Dashboard Integration</h4>
                                <p className="text-sm text-muted-foreground">Created: 2025-02-15</p>
                              </div>
                              <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                Revoke
                              </Button>
                            </div>
                            <div className="mt-3 p-2 bg-abyss-800 rounded font-mono text-xs text-neon-blue">
                              pa_api_7f9e2d1b3a5c8*******************
                            </div>
                          </div>
                          
                          <div className="p-3 bg-abyss-900 rounded-md border border-abyss-700">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">Reporting Integration</h4>
                                <p className="text-sm text-muted-foreground">Created: 2025-03-22</p>
                              </div>
                              <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                Revoke
                              </Button>
                            </div>
                            <div className="mt-3 p-2 bg-abyss-800 rounded font-mono text-xs text-neon-blue">
                              pa_api_2a5b9f3e6d1c8*******************
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black">
                        <Key className="h-4 w-4 mr-2" />
                        Generate New API Key
                      </Button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-abyss-900 rounded-lg border border-abyss-700">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-500">API Key Security</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            API keys provide full access to your Perpetual Abyss account. Never share your API keys 
                            and store them securely. Revoke keys immediately if you suspect they've been compromised.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>API Documentation</CardTitle>
                    <CardDescription>
                      Resources for using the Perpetual Abyss API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700 flex flex-col">
                        <h4 className="text-lg font-medium mb-2">API Reference</h4>
                        <p className="text-sm text-muted-foreground flex-1 mb-4">
                          Complete documentation of all API endpoints and parameters
                        </p>
                        <Button variant="outline" className="mt-auto w-full">
                          View Documentation
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700 flex flex-col">
                        <h4 className="text-lg font-medium mb-2">Code Examples</h4>
                        <p className="text-sm text-muted-foreground flex-1 mb-4">
                          Sample code in multiple languages to help you get started
                        </p>
                        <Button variant="outline" className="mt-auto w-full">
                          View Examples
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700 flex flex-col">
                        <h4 className="text-lg font-medium mb-2">API Changelog</h4>
                        <p className="text-sm text-muted-foreground flex-1 mb-4">
                          History of API updates and version changes
                        </p>
                        <Button variant="outline" className="mt-auto w-full">
                          View Changelog
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Team Management</CardTitle>
                    <CardDescription>
                      Manage access and permissions for your team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                        <h3 className="text-lg font-medium mb-4">Team Members</h3>
                        
                        <div className="space-y-3">
                          <div className="p-3 bg-abyss-900 rounded-md border border-abyss-700 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-neon-blue flex items-center justify-center text-black font-medium">
                                JD
                              </div>
                              <div>
                                <h4 className="font-medium">John Doe</h4>
                                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full">
                                Admin
                              </span>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-abyss-900 rounded-md border border-abyss-700 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-neon-purple flex items-center justify-center text-black font-medium">
                                JS
                              </div>
                              <div>
                                <h4 className="font-medium">Jane Smith</h4>
                                <p className="text-sm text-muted-foreground">jane.smith@example.com</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded-full">
                                Analyst
                              </span>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                          <h4 className="text-lg font-medium mb-3">Invite Team Member</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Send an invitation to a new team member
                          </p>
                          <Button className="w-full">
                            <UserCheck className="h-4 w-4 mr-2" />
                            Invite User
                          </Button>
                        </div>
                        
                        <div className="p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                          <h4 className="text-lg font-medium mb-3">Pending Invitations</h4>
                          <div className="p-3 bg-abyss-900 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">mike.johnson@example.com</p>
                                <p className="text-xs text-muted-foreground">Sent: 2025-04-03</p>
                              </div>
                              <Button variant="outline" size="sm" className="text-xs">
                                Resend
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Role Permissions</CardTitle>
                    <CardDescription>
                      Configure access levels for different user roles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 p-4 bg-abyss-800 rounded-lg border border-abyss-700">
                      <div className="grid grid-cols-4 gap-2 pb-2 border-b border-abyss-700">
                        <div></div>
                        <div className="text-center font-medium text-neon-blue">Admin</div>
                        <div className="text-center font-medium text-neon-purple">Analyst</div>
                        <div className="text-center font-medium text-neon-green">Viewer</div>
                      </div>
                      
                      {[
                        { permission: "View Dashboard", admin: true, analyst: true, viewer: true },
                        { permission: "Access Honeypot Config", admin: true, analyst: true, viewer: false },
                        { permission: "Modify Settings", admin: true, analyst: false, viewer: false },
                        { permission: "Export Data", admin: true, analyst: true, viewer: false },
                        { permission: "Manage API Keys", admin: true, analyst: false, viewer: false },
                        { permission: "Add Team Members", admin: true, analyst: false, viewer: false },
                      ].map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 py-2 border-b border-abyss-700 last:border-0">
                          <div className="text-sm">{item.permission}</div>
                          <div className="text-center">{item.admin ? "✓" : "✗"}</div>
                          <div className="text-center">{item.analyst ? "✓" : "✗"}</div>
                          <div className="text-center">{item.viewer ? "✓" : "✗"}</div>
                        </div>
                      ))}
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

export default Settings;
