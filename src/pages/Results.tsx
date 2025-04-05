
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { ArrowLeft, Globe, BarChart3, ShieldAlert, Shield, Activity, Server, HexagonAlert, List, FileCode, Lightbulb } from 'lucide-react';

const Results = () => {
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

                <Link to="/results" className="flex items-center gap-3 rounded-md px-3 py-2 bg-secondary text-foreground">
                  <List className="h-4 w-4" />
                  <span>Results</span>
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
              <h1 className="text-xl font-semibold">Results and Conclusion</h1>
            </div>
          </header>
          
          <main className="p-6">
            <div className="mb-6">
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cyber Threat Map */}
              <Card className="overflow-hidden">
                <CardHeader className="p-4 border-b border-abyss-700 bg-abyss-800">
                  <CardTitle className="text-lg text-center">CYBER THREAT MAP</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/a42e15d3-083f-4cb4-8dd6-9ef4c5a89f9d.png" 
                      alt="Cyber Threat Map" 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Key Findings */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Results and Conclusion</CardTitle>
                  <CardDescription>Key findings from our honeypot system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-800 text-white rounded-md">
                        <span className="text-2xl font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium mb-2">Key Findings</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Top bot sources (countries, IP ranges)</li>
                          <li>• Most common bot targets (specific pages or content)</li>
                          <li>• Identified bot signatures and behaviors</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-800 text-white rounded-md">
                        <span className="text-2xl font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium mb-2">Benefits of Perpetual Abyss</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Proactive threat detection</li>
                          <li>• Improved understanding of bot behavior</li>
                          <li>• Enhanced security</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-800 text-white rounded-md">
                        <span className="text-2xl font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium mb-2">Future Directions</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Integration with existing security systems</li>
                          <li>• Machine learning-based bot detection</li>
                          <li>• Community sharing of threat intelligence</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Technical Architecture */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Mechanism and Analysis</CardTitle>
                  <CardDescription>How Perpetual Abyss works under the hood</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-blue-900 text-white">
                      <CardHeader>
                        <CardTitle className="text-lg">Technical Architecture</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p>Framework uses Python/Flask backend. Dynamic content is generated with Faker library.</p>
                        <p className="mt-2">Logs are stored in JSON format. Logs contain timestamp, IP address, and bot signature.</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-blue-900 text-white">
                      <CardHeader>
                        <CardTitle className="text-lg">Bot Detection Techniques</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="space-y-1">
                          <li>• Heuristic analysis</li>
                          <li>• Blacklist checking</li>
                          <li>• Behavioral analysis</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-blue-900 text-white">
                      <CardHeader>
                        <CardTitle className="text-lg">Honeypot Placement</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <img 
                          src="/lovable-uploads/7254206a-8a8c-4c56-bb16-2232e50c41f5.png" 
                          alt="Honeypot placement in network" 
                          className="w-full h-auto object-contain mb-2"
                        />
                        <p>Strategic placement in the network to maximize bot interaction while keeping sensitive systems secure.</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-3 bg-blue-900 text-white">
                      <CardHeader>
                        <CardTitle className="text-lg">Data Analysis and Visualization</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p>Bot identification accuracy is 85%. Visualize bot behavior with graphs. Identify bot origins and track attack patterns.</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              {/* Introduction */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Introduction to Perpetual Abyss</CardTitle>
                  <CardDescription>Understanding the core concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">What is Perpetual Abyss?</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>It's an endless honeypot. It is designed to mislead and trap web scraping bots.</p>
                        <p>It serves an infinite stream of deceptive content. The content is served to unauthorized clients.</p>
                        <p>This honeypot engages non-compliant bots in a resource-intensive loop, diverting them from sensitive systems while collecting valuable data for analysis.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Why Perpetual Abyss?</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Malicious web scraping and content theft are growing threats. Bot traffic increased 300% in 2023 (Imperva report).</p>
                        <p>Traditional honeypots are detectable and have limited interaction.</p>
                        <p>There is a need for real-time bot behavior analysis.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Key Features</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Endless generation of deceptive content</li>
                        <li>• Dynamic adaptation to bot behavior</li>
                        <li>• Comprehensive logging and analysis</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Live Demo */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Live System Demonstration</CardTitle>
                  <CardDescription>See Perpetual Abyss in action</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-abyss-800 rounded-lg p-4 border border-abyss-700">
                      <h3 className="text-neon-blue font-medium mb-2 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Live Honeypot Stats
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-abyss-700 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Active Bots</div>
                          <div className="text-2xl font-bold text-neon-red">24</div>
                        </div>
                        <div className="bg-abyss-700 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Content Served</div>
                          <div className="text-2xl font-bold text-neon-blue">14,582</div>
                        </div>
                        <div className="bg-abyss-700 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Detection Rate</div>
                          <div className="text-2xl font-bold text-neon-purple">85%</div>
                        </div>
                        <div className="bg-abyss-700 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Unique IPs</div>
                          <div className="text-2xl font-bold text-neon-green">347</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/f8f1063e-ced2-4a87-b0cf-d699c1eb7526.png" 
                        alt="Mechanism and Analysis" 
                        className="w-full max-w-4xl h-auto object-contain"
                      />
                    </div>
                    
                    <div className="text-center">
                      <Button size="lg" className="mt-4 bg-neon-blue hover:bg-blue-600" asChild>
                        <Link to="/honeypot">
                          Try Honeypot Demo
                        </Link>
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Visit our demo honeypot page to see how bot detection works in real-time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Results;
