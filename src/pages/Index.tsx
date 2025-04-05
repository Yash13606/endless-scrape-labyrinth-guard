import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BotDetectionResult, initBotDetection } from '@/utils/botDetector';
import { Link } from 'react-router-dom';
import { ChevronRight, Activity, ShieldAlert, Database, BarChart3, Settings, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const [botLogs, setBotLogs] = useState<BotDetectionResult[]>([]);
  const [botCount, setBotCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500);
    }, 5000);

    const storedLogs = localStorage.getItem('botLogs');
    if (storedLogs) {
      const logs = JSON.parse(storedLogs);
      setBotLogs(logs);
      setBotCount(logs.filter((log: BotDetectionResult) => log.isBot).length);
    }

    initBotDetection();

    const handleBotDetected = (event: CustomEvent<BotDetectionResult>) => {
      setBotLogs(prev => [...prev, event.detail]);
      if (event.detail.isBot) {
        setBotCount(prev => prev + 1);
      }
    };

    window.addEventListener('botDetected', handleBotDetected as EventListener);

    return () => {
      clearInterval(interval);
      window.removeEventListener('botDetected', handleBotDetected as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-abyss-900 to-abyss-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                <span className="text-neon-blue">Perpetual</span> <span className="text-neon-red">Abyss</span>
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-300">
                An endless honeypot for web scraping bots that generates infinite streams of deceptive but realistic-looking content.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium">
                  <Link to="/dashboard">
                    Access Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-neon-red text-neon-red hover:bg-neon-red/10">
                  <Link to="/honeypot">
                    View Honeypot
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md relative">
              <div className="bg-abyss-800 border border-abyss-700 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center p-2 bg-abyss-700 rounded-full mb-2">
                    <Activity className="h-6 w-6 text-neon-blue" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Bot Activity</h2>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-400">Detected Bots</div>
                  <div className="text-2xl font-bold text-white">{botCount}</div>
                </div>
                <div className="relative h-24 border border-abyss-700 rounded bg-abyss-900 overflow-hidden">
                  {botLogs.length > 0 ? (
                    <div className={`p-2 text-xs font-mono text-gray-400 transition-transform ${isAnimating ? 'animate-data-flow' : ''}`}>
                      {botLogs.slice(-5).map((log, i) => (
                        <div key={i} className="mb-1">
                          {log.isBot ? 
                            <span className="text-neon-red">BOT</span> : 
                            <span className="text-gray-500">USER</span>
                          } 
                          &nbsp;{new Date(log.timestamp).toLocaleTimeString()} - 
                          {log.userAgent.substring(0, 25)}...
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                      No bot activity detected yet
                    </div>
                  )}
                </div>
              </div>
              
              <div className="absolute -top-3 -right-3 h-20 w-20 bg-neon-purple/10 rounded-full blur-xl animate-pulse-subtle"></div>
              <div className="absolute -bottom-5 -left-5 h-28 w-28 bg-neon-blue/10 rounded-full blur-xl animate-pulse-subtle"></div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 px-4 md:px-8 bg-abyss-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldAlert className="h-10 w-10 text-neon-blue" />,
                title: "Bot Detection",
                description: "Sophisticated algorithms to identify and classify various types of scraping bots."
              },
              {
                icon: <Database className="h-10 w-10 text-neon-purple" />,
                title: "Infinite Content",
                description: "Dynamically generated fake content that keeps bots trapped in endless pagination cycles."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-neon-red" />,
                title: "Analytics Dashboard",
                description: "Comprehensive insights into bot behavior, patterns, and origin information."
              },
              {
                icon: <Settings className="h-10 w-10 text-gray-400" />,
                title: "Customizable Traps",
                description: "Configurable honeypot mechanisms tailored to different types of web scrapers."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-abyss-800 border border-abyss-700 rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-neon-blue/5 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-abyss-800 to-abyss-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Premium Solutions</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Protect your digital assets with our comprehensive security solutions and expert services.
            </p>
          </div>
          
          <div className="bg-abyss-700/50 border border-abyss-600 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold mb-4 text-white">Enterprise-Grade Bot Protection</h3>
                <p className="text-gray-300 mb-6">
                  Our tiered subscription plans provide scalable solutions for businesses of all sizes. From basic bot detection for small websites to advanced AI-powered threat analysis for large enterprises.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Tiered subscription plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Custom implementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Consulting services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Data analytics reports</span>
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Button asChild variant="default" size="lg" className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium">
                  <Link to="/pricing">
                    View Pricing Plans
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-abyss-800 to-abyss-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to start trapping bots?</h2>
          <p className="text-lg mb-8 text-gray-300">
            Deploy your Perpetual Abyss honeypot and gather valuable intelligence on scraping activity targeting your websites.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="default" className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium">
              <Link to="/dashboard">
                Access Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-neon-red text-neon-red hover:bg-neon-red/10">
              <Link to="/honeypot">
                View Honeypot
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 md:px-8 bg-abyss-900 border-t border-abyss-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© 2025 Perpetual Abyss. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link to="/dashboard" className="text-sm text-gray-400 hover:text-neon-blue">Dashboard</Link>
            <Link to="/honeypot" className="text-sm text-gray-400 hover:text-neon-blue">Honeypot</Link>
            <Link to="/results" className="text-sm text-gray-400 hover:text-neon-blue">Results</Link>
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-neon-blue">Pricing</Link>
            <a href="#" className="text-sm text-gray-400 hover:text-neon-blue">Documentation</a>
            <a href="#" className="text-sm text-gray-400 hover:text-neon-blue">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
