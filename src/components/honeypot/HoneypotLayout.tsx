
import React from 'react';
import HoneypotHeader from './HoneypotHeader';
import HoneypotFooter from './HoneypotFooter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Code, Copy, Hexagon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HoneypotLayoutProps {
  children: React.ReactNode;
}

const HoneypotLayout = ({ children }: HoneypotLayoutProps) => {
  const { toast } = useToast();
  
  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API code snippet has been copied to your clipboard.",
    });
  };

  // API integration code samples
  const apiSampleHtml = `<!-- Add this to your website -->
<div id="abyss-bot-protection" data-api-key="YOUR_API_KEY"></div>
<script src="https://api.abyssbot.io/client/v1.js" async></script>`;

  const apiSampleJs = `// JavaScript integration
import { AbyssBotProtection } from 'abyss-bot-protection';

// Initialize on your website
const protection = new AbyssBotProtection({
  apiKey: 'YOUR_API_KEY',
  mode: 'active', // or 'passive' for monitoring only
  onBotDetected: (result) => {
    console.log('Bot detected:', result);
    // Handle the bot (redirect, show captcha, etc.)
  }
});`;

  const apiSampleReact = `// React Component integration
import { AbyssBotProvider, useAbyssBotProtection } from 'abyss-bot-react';

// In your app root
<AbyssBotProvider apiKey="YOUR_API_KEY">
  <App />
</AbyssBotProvider>

// In your components
function LoginForm() {
  const { isBot, confidence } = useAbyssBotProtection();
  
  if (isBot) {
    return <CaptchaChallenge />;
  }
  
  return <YourLoginForm />;
}`;

  return (
    <div className="honeypot min-h-screen flex flex-col">
      <HoneypotHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
        
        <div className="mt-12 border-t pt-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Hexagon className="h-6 w-6 mr-2 text-blue-600" />
            AbyssBOT API Integration
          </h2>
          <p className="text-gray-600 mb-6">
            Integrate our powerful bot detection technology into your website with just a few lines of code.
            Use your API key to access our real-time ML-powered bot detection.
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Integration Guide</CardTitle>
              <CardDescription>
                Choose your preferred method to integrate AbyssBOT protection into your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="html" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                </TabsList>
                
                <TabsContent value="html" className="mt-6">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{apiSampleHtml}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2" 
                      onClick={() => handleCopyClick(apiSampleHtml)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Simple HTML integration that works with any website. Just add the script tag and div element to your HTML.
                  </p>
                </TabsContent>
                
                <TabsContent value="js" className="mt-6">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{apiSampleJs}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2" 
                      onClick={() => handleCopyClick(apiSampleJs)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    JavaScript integration for more control and customization. Perfect for SPAs and advanced websites.
                  </p>
                </TabsContent>
                
                <TabsContent value="react" className="mt-6">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{apiSampleReact}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2" 
                      onClick={() => handleCopyClick(apiSampleReact)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    React integration with hooks and context. Easy to use with your React applications.
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1">
                  <Code className="mr-2 h-4 w-4" />
                  Get API Key
                </Button>
                <Button variant="outline" className="flex-1">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <HoneypotFooter />
    </div>
  );
};

export default HoneypotLayout;
