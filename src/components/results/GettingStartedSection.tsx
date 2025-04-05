
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Activity, Database, Shield } from 'lucide-react';

export const GettingStartedSection = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Getting Started with Perpetual Abyss</CardTitle>
        <CardDescription>Understand how to use our platform to protect your website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">How Perpetual Abyss Works</h3>
            <p className="text-muted-foreground mb-4">
              Perpetual Abyss is a powerful honeypot system designed to protect your website from malicious bots 
              by creating an endless maze of fake content that traps and analyzes bot behavior.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                <h4 className="text-lg font-medium mb-3 text-neon-blue flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  Step 1: Integrate with Your Website
                </h4>
                <p className="text-sm text-muted-foreground">
                  Add our JavaScript snippet to your website. This will allow Perpetual Abyss to detect and 
                  redirect suspicious bot traffic to our honeypot system while letting legitimate users 
                  access your real content.
                </p>
                <div className="mt-4 bg-abyss-900 p-3 rounded-md">
                  <code className="text-xs text-neon-green">
                    &lt;script src="https://api.perpetual-abyss.com/client.js" 
                    data-site-id="YOUR_SITE_ID"&gt;&lt;/script&gt;
                  </code>
                </div>
              </div>
              
              <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                <h4 className="text-lg font-medium mb-3 text-neon-purple flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Step 2: Configure Detection Settings
                </h4>
                <p className="text-sm text-muted-foreground">
                  Use the Settings page to customize bot detection parameters. Adjust thresholds for 
                  user agent analysis, browser fingerprinting, behavior patterns, and request frequency 
                  to match your website's specific needs.
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/settings">
                      Configure Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                <h4 className="text-lg font-medium mb-3 text-neon-red flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Step 3: Monitor and Analyze
                </h4>
                <p className="text-sm text-muted-foreground">
                  Use the Dashboard and Data Management pages to view real-time insights about bot 
                  activity targeting your site. Analyze patterns, geographic origins, and behavior 
                  profiles to better understand threats.
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/data-management">
                      View Data Analysis
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
                <h4 className="text-lg font-medium mb-3 text-neon-blue flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Step 4: Take Action
                </h4>
                <p className="text-sm text-muted-foreground">
                  Based on the insights gathered, take action to protect your site. Implement IP blocking, 
                  adjust your site's security settings, or contact our team for advanced protection 
                  strategies and custom solutions.
                </p>
              </div>
            </div>
          </div>
          
          <BotsTestingSection />
        </div>
      </CardContent>
    </Card>
  );
};

const BotsTestingSection = () => {
  return (
    <div className="border-t border-abyss-700 pt-6">
      <h3 className="text-xl font-semibold mb-4">Testing Perpetual Abyss</h3>
      <p className="text-muted-foreground mb-4">
        To verify that Perpetual Abyss is working correctly on your website, you can use our built-in testing tools:
      </p>
      
      <div className="bg-abyss-800 p-4 rounded-lg border border-abyss-700">
        <h4 className="text-lg font-medium mb-3 text-neon-green">Simulated Bot Attacks</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Our platform includes a simulator that can generate safe bot traffic to test your protection. 
          This helps you confirm that the system is properly detecting and redirecting malicious traffic.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium mb-2">Test Types:</h5>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
              <li>Basic crawler simulation</li>
              <li>Advanced scraper testing</li>
              <li>Distributed attack simulation</li>
              <li>Custom behavior patterns</li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-medium mb-2">What to Look For:</h5>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
              <li>Detection rates in Dashboard</li>
              <li>Honeypot engagement metrics</li>
              <li>Protection effectiveness scores</li>
              <li>False positive monitoring</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4">
          <Button className="w-full bg-neon-blue text-black hover:bg-neon-blue/80" asChild>
            <Link to="/honeypot">
              Launch Bot Simulator
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
