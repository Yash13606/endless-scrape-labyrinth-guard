
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Brain, RefreshCw, Shield, Code, FileCode, Activity, AlertCircle, ExternalLink } from 'lucide-react';

export const MLProtectionSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ML-Powered Protection</CardTitle>
        <CardDescription>
          How Perpetual Abyss uses machine learning to enhance bot detection and create effective honeypots
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Protection Technology</h3>
            <p className="text-muted-foreground mb-6">
              Perpetual Abyss combines machine learning with advanced honeypot techniques to create
              an intelligent protection system that adapts to evolving bot threats. Our solution creates
              deceptive content specifically designed to trap automated scrapers while being invisible to legitimate users.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                <h4 className="text-lg font-medium mb-3 text-neon-green flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Dynamic Content Generation
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our system uses advanced algorithms to create an endless stream of realistic but fake content:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li>Generates content that mimics your website's style and formatting</li>
                  <li>Creates endless pagination traps that keep bots circling through fake data</li>
                  <li>Constructs deceptive links that normal users would never see or click</li>
                  <li>Deploys invisible form fields that only bots would interact with</li>
                </ul>
                
                <div className="mt-4 bg-abyss-900 p-3 rounded-md">
                  <code className="text-xs text-neon-purple block">
                    # How our content generation works (Python pseudocode)<br />
                    def generate_honeypot_content(site_template, depth=10):<br />
                    &nbsp;&nbsp;content = []<br />
                    &nbsp;&nbsp;for i in range(depth):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;fake_data = generate_fake_data(site_template)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;trap_links = create_circular_references(i, depth)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;content.append(combine(fake_data, trap_links))<br />
                    &nbsp;&nbsp;return content
                  </code>
                </div>
              </div>
              
              <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                <h4 className="text-lg font-medium mb-3 text-neon-blue flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Real-Time Analysis & Adaptation
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our system continuously monitors and analyzes bot behavior to improve detection:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li>Records and analyzes interaction patterns across all honeypot pages</li>
                  <li>Identifies common bot fingerprints and behavior signatures</li>
                  <li>Uses anomaly detection to flag suspicious activity in real-time</li>
                  <li>Adapts honeypot content based on observed bot behavior</li>
                </ul>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/data-management">
                      <Activity className="h-4 w-4 mr-2" />
                      View Real-Time Analysis
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-abyss-700 pt-6">
            <h3 className="text-xl font-semibold mb-4">Implementation Guide</h3>
            <p className="text-muted-foreground mb-6">
              Follow these steps to implement Perpetual Abyss protection on your website:
            </p>
            
            <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
              <ol className="space-y-4">
                <li className="pb-4 border-b border-abyss-700">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-neon-blue/10 p-2 rounded-full mr-3">
                      <Code className="h-5 w-5 text-neon-blue" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Add our JavaScript snippet to your site</h5>
                      <p className="text-sm text-muted-foreground mt-1 mb-2">
                        Place this code in the &lt;head&gt; section of your website. This snippet contains your unique 
                        site identifier and connects to our protection service.
                      </p>
                      <div className="bg-abyss-900 p-3 rounded-md overflow-x-auto">
                        <code className="text-xs text-neon-green">
                          &lt;script src="https://api.perpetual-abyss.com/client.js" data-site-id="YOUR_SITE_ID"&gt;&lt;/script&gt;
                        </code>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li className="pb-4 border-b border-abyss-700">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-neon-purple/10 p-2 rounded-full mr-3">
                      <FileCode className="h-5 w-5 text-neon-purple" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Set up honeypot traps (optional but recommended)</h5>
                      <p className="text-sm text-muted-foreground mt-1 mb-2">
                        Add these invisible elements to your forms to catch automated bots. Our script will automatically 
                        detect interactions with these fields.
                      </p>
                      <div className="bg-abyss-900 p-3 rounded-md overflow-x-auto">
                        <code className="text-xs text-neon-purple">
                          &lt;input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off" /&gt;
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        This creates a honeypot field named "website" that is invisible to human users but will be filled in by bots.
                      </p>
                    </div>
                  </div>
                </li>
                
                <li className="pb-4 border-b border-abyss-700">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-neon-red/10 p-2 rounded-full mr-3">
                      <Bot className="h-5 w-5 text-neon-red" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Test your protection</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Use our simulator to generate safe test traffic that mimics common bot patterns. This helps verify 
                        that your protection is working correctly.
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/honeypot">
                            Run Bot Simulator
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-neon-blue/10 p-2 rounded-full mr-3">
                      <Shield className="h-5 w-5 text-neon-blue" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Monitor and adjust</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monitor your Dashboard for detected bot activity and adjust sensitivity settings based on results. 
                        Fine-tuning the protection will improve effectiveness over time.
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/dashboard">
                            View Dashboard
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/settings">
                            Adjust Settings
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-abyss-700 pt-6">
            <div className="bg-abyss-700/50 p-4 rounded-lg border border-abyss-600">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-neon-red mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-medium mb-2">Security Best Practices</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    For maximum protection, combine Perpetual Abyss with these additional security measures:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Use a Web Application Firewall (WAF) like Cloudflare or AWS WAF</li>
                    <li>Implement rate limiting to prevent request flooding</li>
                    <li>Enable HTTPS across your entire site</li>
                    <li>Keep all website software and plugins updated</li>
                    <li>Use strong authentication methods for admin areas</li>
                  </ul>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="text-neon-blue border-neon-blue" asChild>
                      <a href="https://docs.perpetual-abyss.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Security Documentation
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
