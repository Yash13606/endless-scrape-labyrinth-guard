
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ResultsLayout } from '@/components/results/ResultsLayout';
import { ResultsHeader } from '@/components/results/ResultsHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, Eye, EyeOff, MousePointer, ChevronsRight, Share2, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const HoneypotShowcase = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('invisible');

  // These represent code snippets for implementing honeypots
  const getCodeSnippet = (type: string) => {
    switch (type) {
      case 'invisible':
        return `// Add invisible links that only bots would click
const trapDiv = document.createElement('div');
trapDiv.style.opacity = '0.01';
trapDiv.style.position = 'absolute';
trapDiv.setAttribute('aria-hidden', 'true');

trapDiv.innerHTML = \`
  <a href="/admin-login" class="trap-link">Admin Login</a>
  <a href="/api-keys" class="trap-link">API Keys</a>
\`;

document.body.appendChild(trapDiv);`;

      case 'form':
        return `// Add invisible form fields that should remain empty
const form = document.querySelector('form');
const honeypotField = document.createElement('div');
honeypotField.style.opacity = '0';
honeypotField.style.position = 'absolute';
honeypotField.style.height = '0';
honeypotField.style.overflow = 'hidden';

honeypotField.innerHTML = \`
  <input type="text" name="honeytrap_username" id="ht-username">
\`;

form.appendChild(honeypotField);

// Check on submission
form.addEventListener('submit', (e) => {
  const trapField = document.getElementById('ht-username');
  if (trapField.value !== '') {
    // It's a bot! Handle accordingly
    e.preventDefault();
  }
});`;

      case 'impossible':
        return `// Create an "impossible" challenge
const captchaDiv = document.createElement('div');
captchaDiv.style.opacity = '0.01';
captchaDiv.style.position = 'absolute';
captchaDiv.setAttribute('aria-hidden', 'true');

captchaDiv.innerHTML = \`
  <div class="captcha-challenge">
    What is the sound of one hand clapping?
  </div>
  <form class="impossible-captcha">
    <input type="text" name="captcha-answer">
    <button type="submit">Verify</button>
  </form>
\`;

document.body.appendChild(captchaDiv);

// Any interaction with this is a bot!
captchaDiv.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Report bot activity
});`;

      case 'behavioral':
        return `// Monitor typical bot behaviors
let mouseMovements = 0;
let keyboardInteractions = 0;
let navigationSpeed = Date.now();

// Track mouse movements
document.addEventListener('mousemove', () => {
  mouseMovements++;
});

// Track keyboard interactions
document.addEventListener('keydown', () => {
  keyboardInteractions++;
});

// Analyze behavior after a short delay
setTimeout(() => {
  const timeSpent = Date.now() - navigationSpeed;
  
  // Bot indicators
  const isSuspicious = 
    mouseMovements < 5 && 
    keyboardInteractions === 0 && 
    timeSpent < 1000;
    
  if (isSuspicious) {
    // Report potential bot
  }
}, 5000);`;

      case 'css':
        return `/* CSS-based honeypot trap */
.bot-trap {
  height: 0;
  opacity: 0;
  position: absolute;
  z-index: -999;
  pointer-events: none;
  /* These commands attempt to hide it from humans */
  
  /* But we use this special selector to make it clickable by bots */
  :where(&) {
    pointer-events: auto;
  }
}

/* CSS in the HTML */
<div class="bot-trap">
  <a href="/admin">Admin Area</a>
</div>

/* Any clicks on these elements indicate bot activity */`;

      default:
        return '';
    }
  };

  const copyCode = (type: string) => {
    navigator.clipboard.writeText(getCodeSnippet(type));
    toast({
      title: "Code Copied",
      description: `The ${type} honeypot code has been copied to your clipboard.`,
    });
  };

  return (
    <SidebarProvider>
      <ResultsLayout>
        <ResultsHeader />
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Honeypot Showcase</h1>
              <p className="text-muted-foreground mt-1">
                Explore different types of honeypots to detect and classify bots
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/honeypot">
                  <ChevronsRight className="mr-2 h-4 w-4" />
                  View Live Honeypot
                </Link>
              </Button>
              <Button asChild>
                <Link to="/results">
                  <Share2 className="mr-2 h-4 w-4" />
                  API Integration
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="invisible" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="invisible">Invisible Links</TabsTrigger>
              <TabsTrigger value="form">Form Field Traps</TabsTrigger>
              <TabsTrigger value="impossible">Impossible CAPTCHAs</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral Analysis</TabsTrigger>
              <TabsTrigger value="css">CSS Tricks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="invisible" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Invisible Link Honeypots</CardTitle>
                      <CardDescription>Links that are invisible to humans but accessible to bots</CardDescription>
                    </div>
                    <Badge className="bg-blue-600">Detection Rate: High</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">How it works</h3>
                        <p className="text-sm text-muted-foreground">
                          Invisible link honeypots work by placing links on your website that are hidden from human users using CSS.
                          These links are typically styled to be invisible (opacity: 0) or positioned off-screen, but remain in the 
                          DOM and are therefore accessible to bots that scrape page content rather than rendering it visually.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Effectiveness</h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Very effective against basic web scrapers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Works against automation tools and scripts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <span>Less effective against sophisticated bots with visual rendering</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border rounded-md p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Implementation</h3>
                        <Button variant="ghost" size="sm" onClick={() => copyCode('invisible')}>
                          <Code className="h-4 w-4 mr-1" /> Copy
                        </Button>
                      </div>
                      <pre className="text-xs bg-black text-white p-4 rounded-md overflow-auto max-h-52">
                        {getCodeSnippet('invisible')}
                      </pre>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="bg-blue-50/50 border border-blue-100 rounded-md p-4">
                    <h3 className="font-medium text-blue-800 mb-2">How we implement this</h3>
                    <p className="text-sm text-blue-700">
                      Our honeypot page includes multiple invisible links with enticing names like "Admin Login", "Customer Database",
                      and "API Keys" that are completely hidden from real users. When a bot clicks these links, we log the interaction,
                      flag the session as a bot, and use this data to train our machine learning model.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Real users can't see or click these elements</span>
                  </div>
                  <Button variant="outline" onClick={() => setActiveTab('form')}>Next: Form Field Traps</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="form" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Form Field Honeypots</CardTitle>
                      <CardDescription>Hidden form fields that should remain empty</CardDescription>
                    </div>
                    <Badge className="bg-green-600">Detection Rate: Very High</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">How it works</h3>
                        <p className="text-sm text-muted-foreground">
                          Form field honeypots add invisible fields to forms that humans can't see but bots will fill out.
                          When a form is submitted, any data in these hidden fields indicates bot activity. Some bots
                          automatically fill in all form fields they encounter, making this technique highly effective.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Effectiveness</h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Excellent against form-filling bots and spam bots</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Low false positive rate - virtually no humans trigger these</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <span>Advanced bots may detect and avoid honeypot fields</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border rounded-md p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Implementation</h3>
                        <Button variant="ghost" size="sm" onClick={() => copyCode('form')}>
                          <Code className="h-4 w-4 mr-1" /> Copy
                        </Button>
                      </div>
                      <pre className="text-xs bg-black text-white p-4 rounded-md overflow-auto max-h-52">
                        {getCodeSnippet('form')}
                      </pre>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="relative border border-gray-200 rounded-md p-5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white px-4 py-2 rounded-full border flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />
                        <span className="text-sm font-medium">Hidden from humans</span>
                      </div>
                    </div>
                    <form className="opacity-20 pointer-events-none">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Name</label>
                          <input type="text" className="border rounded w-full p-2" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <input type="email" className="border rounded w-full p-2" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="text-sm font-medium">Message</label>
                        <textarea className="border rounded w-full p-2 h-24"></textarea>
                      </div>
                      
                      {/* This is the honeypot field */}
                      <div className="mt-4 bg-red-50 border border-red-200 rounded p-2">
                        <label className="text-sm font-medium text-red-500">Phone (Honeypot)</label>
                        <input type="text" className="border border-red-300 rounded w-full p-2" />
                      </div>
                      
                      <div className="mt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
                      </div>
                    </form>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Bots see all fields, humans only see visible ones</span>
                  </div>
                  <Button variant="outline" onClick={() => setActiveTab('impossible')}>Next: Impossible CAPTCHAs</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="impossible" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Impossible CAPTCHA Honeypots</CardTitle>
                      <CardDescription>Challenges that no human could solve</CardDescription>
                    </div>
                    <Badge className="bg-purple-600">Detection Rate: Very High</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">How it works</h3>
                        <p className="text-sm text-muted-foreground">
                          Impossible CAPTCHA honeypots present challenges that are logically impossible to answer or solve.
                          These are hidden from human users (using CSS) but remain in the DOM for bots to find. Any attempt
                          to solve these challenges is a clear indicator of bot activity, as no human would see or attempt them.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Effectiveness</h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Extremely high accuracy in bot detection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Zero false positives - humans never interact with these</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Can detect even sophisticated bots that attempt CAPTCHA solving</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border rounded-md p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Implementation</h3>
                        <Button variant="ghost" size="sm" onClick={() => copyCode('impossible')}>
                          <Code className="h-4 w-4 mr-1" /> Copy
                        </Button>
                      </div>
                      <pre className="text-xs bg-black text-white p-4 rounded-md overflow-auto max-h-52">
                        {getCodeSnippet('impossible')}
                      </pre>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-6 bg-gray-50 border rounded-md">
                    <h3 className="font-medium text-center mb-4">Examples of Impossible CAPTCHAs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-md border">
                        <p className="font-medium mb-2">Logic Paradox</p>
                        <div className="bg-blue-50 p-3 rounded text-center mb-2">
                          What color is the number 7?
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="h-8 rounded bg-red-500"></div>
                          <div className="h-8 rounded bg-blue-500"></div>
                          <div className="h-8 rounded bg-green-500"></div>
                          <div className="h-8 rounded bg-purple-500"></div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md border">
                        <p className="font-medium mb-2">Impossible Math</p>
                        <div className="bg-blue-50 p-3 rounded text-center mb-2">
                          If circle = 0 sides, what is √-1 sides?
                        </div>
                        <input className="w-full border p-2 rounded" placeholder="Enter answer" />
                      </div>
                      
                      <div className="bg-white p-4 rounded-md border">
                        <p className="font-medium mb-2">Non-Existent Object</p>
                        <div className="bg-blue-50 p-3 rounded text-center mb-2">
                          Click on the invisible square
                        </div>
                        <div className="h-32 border rounded relative">
                          {/* No actual clickable element */}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Any attempt to solve these flags as bot activity</span>
                  </div>
                  <Button variant="outline" onClick={() => setActiveTab('behavioral')}>Next: Behavioral Analysis</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="behavioral" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Behavioral Analysis Honeypots</CardTitle>
                      <CardDescription>Tracking how users interact with your site</CardDescription>
                    </div>
                    <Badge className="bg-orange-600">Detection Rate: High</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">How it works</h3>
                        <p className="text-sm text-muted-foreground">
                          Behavioral analysis honeypots track how entities interact with your website. Humans
                          display certain patterns: they move the mouse, scroll naturally, take time to read content,
                          and interact with page elements. Bots often skip these behaviors or perform them in
                          unnatural patterns. By monitoring these behaviors, we can identify bot activity.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Effectiveness</h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Highly effective against basic bots and scrapers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Can detect automated browser tools</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <span>Sophisticated bots can simulate human behavior</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <span>May have false positives with unusual human behavior</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border rounded-md p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Implementation</h3>
                        <Button variant="ghost" size="sm" onClick={() => copyCode('behavioral')}>
                          <Code className="h-4 w-4 mr-1" /> Copy
                        </Button>
                      </div>
                      <pre className="text-xs bg-black text-white p-4 rounded-md overflow-auto max-h-52">
                        {getCodeSnippet('behavioral')}
                      </pre>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-4 bg-gray-50 border rounded-md">
                    <h3 className="font-medium mb-4">Behavioral Indicators We Track</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-3 rounded border text-center">
                        <MousePointer className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h4 className="font-medium">Mouse Movement</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Bots rarely move the mouse or do so in non-human patterns
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border text-center">
                        <svg className="h-8 w-8 mx-auto mb-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <h4 className="font-medium">Scroll Behavior</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Humans scroll at varying speeds and may scroll back up
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border text-center">
                        <svg className="h-8 w-8 mx-auto mb-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="font-medium">Time on Page</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Bots navigate through pages much faster than humans
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border text-center">
                        <svg className="h-8 w-8 mx-auto mb-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h4 className="font-medium">Form Interaction</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Humans take time to fill forms, make errors, and pause
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Machine learning helps improve accuracy over time</span>
                  </div>
                  <Button variant="outline" onClick={() => setActiveTab('css')}>Next: CSS Tricks</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="css" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>CSS Trick Honeypots</CardTitle>
                      <CardDescription>Using advanced CSS to hide elements from humans but not bots</CardDescription>
                    </div>
                    <Badge className="bg-teal-600">Detection Rate: Medium</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">How it works</h3>
                        <p className="text-sm text-muted-foreground">
                          CSS trick honeypots leverage advanced CSS selectors and properties to create elements that are 
                          effectively hidden from human users but may still be processed by bots. Unlike simple visibility 
                          tricks, these use complex CSS mechanisms that many bots cannot properly interpret, creating a 
                          distinction between human and bot interaction.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Effectiveness</h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Effective against bots that don't fully process CSS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Can catch even some sophisticated bots</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <span>Advanced headless browsers with full CSS support may avoid these</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <span>CSS rendering differences across browsers can affect reliability</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border rounded-md p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Implementation</h3>
                        <Button variant="ghost" size="sm" onClick={() => copyCode('css')}>
                          <Code className="h-4 w-4 mr-1" /> Copy
                        </Button>
                      </div>
                      <pre className="text-xs bg-black text-white p-4 rounded-md overflow-auto max-h-52">
                        {getCodeSnippet('css')}
                      </pre>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-6 bg-gray-50 border rounded-md space-y-6">
                    <h3 className="font-medium text-center">Advanced CSS Honeypot Techniques</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-md border">
                        <h4 className="font-medium mb-2">CSS Pointer Events</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Using pointer-events: none to make elements unclickable for humans,
                          but many bots don't respect this property.
                        </p>
                        <div className="bg-gray-100 p-3 rounded text-sm">
                          <code>
                            .honeypot &#123;<br/>
                            &nbsp;&nbsp;pointer-events: none;<br/>
                            &#125;<br/><br/>
                            
                            /* But make it clickable in a specific context */<br/>
                            :where(.honeypot) &#123;<br/>
                            &nbsp;&nbsp;pointer-events: auto;<br/>
                            &#125;
                          </code>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md border">
                        <h4 className="font-medium mb-2">Media Query Tricks</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Using media queries that will never match for real browsers but
                          may be parsed incorrectly by bots.
                        </p>
                        <div className="bg-gray-100 p-3 rounded text-sm">
                          <code>
                            @media (min-width: 0px) and (max-width: 0px) &#123;<br/>
                            &nbsp;&nbsp;.bot-trap &#123;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;display: block !important;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;opacity: 1 !important;<br/>
                            &nbsp;&nbsp;&#125;<br/>
                            &#125;
                          </code>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border">
                      <h4 className="font-medium mb-2">Click Layer Manipulation</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Creating complex layering with z-index and pointer-events that confuse bots but
                        work correctly for human users and real browsers.
                      </p>
                      <div className="relative h-32 border rounded overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                          <p className="text-sm">Normal content visible to humans</p>
                        </div>
                        <div className="absolute inset-0 z-[-1] flex items-center justify-center bg-red-50">
                          <p className="text-sm text-red-500">Honeypot content (z-index: -1)</p>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <Button size="sm" variant="outline">Safe Button</Button>
                        </div>
                        <div className="absolute top-4 left-4 opacity-0">
                          <Button size="sm" variant="outline" className="text-red-500">Trap Button</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Works best when combined with other techniques</span>
                  </div>
                  <Button variant="outline" onClick={() => setActiveTab('invisible')}>Back to Start</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle>Combine Multiple Honeypot Types</CardTitle>
              <CardDescription>For maximum effectiveness, implement multiple types of honeypots on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our honeypot system uses all of these techniques simultaneously, feeding the data into our machine learning model.
                This multi-layered approach significantly improves detection accuracy and reduces false positives.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">View Live Demo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      See our honeypot implementation in action and test how it detects bot-like behavior.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to="/honeypot">
                        Go to Live Honeypot
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">API Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Integrate our honeypot system with your website using our simple API endpoints.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/results">
                        View API Docs
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">ML Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Monitor bot detection metrics and see how our ML model improves over time.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/dashboard">
                        View Dashboard
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Settings & Config</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configure your honeypot implementation and adjust detection thresholds.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/settings">
                        Configure Settings
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </ResultsLayout>
    </SidebarProvider>
  );
};

export default HoneypotShowcase;
