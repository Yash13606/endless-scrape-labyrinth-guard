
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, Shield, Database, BarChart3, Users } from 'lucide-react';

const PricingPage = () => {
  // Features for each plan
  const basicFeatures = [
    "Basic bot detection",
    "Simple honeypot configuration",
    "7-day data retention",
    "Email alerts for suspicious activity",
    "Standard support"
  ];

  const proFeatures = [
    "Advanced bot fingerprinting",
    "Custom honeypot templates",
    "30-day data retention",
    "Real-time notifications",
    "Priority support",
    "Basic analytics dashboard"
  ];

  const enterpriseFeatures = [
    "Full-spectrum bot detection",
    "AI-powered threat analysis",
    "Unlimited data retention",
    "Custom reporting",
    "Dedicated support team",
    "Advanced analytics & insights",
    "API access",
    "On-premises deployment option"
  ];

  const consultingServices = [
    "Security assessment",
    "Custom implementation",
    "Staff training",
    "24/7 monitoring",
    "Threat response team",
    "Compliance reporting"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-abyss-900 to-abyss-800">
      {/* Header */}
      <header className="py-12 px-4 md:px-8 lg:px-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          <span className="text-neon-blue">Premium</span> <span className="text-neon-red">Solutions</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Choose the right plan to protect your digital assets and gain intelligence on scraping bots targeting your websites.
        </p>
      </header>

      {/* Pricing Plans */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <Card className="bg-abyss-800 border-abyss-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription className="text-gray-400">For small websites and blogs</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {basicFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-abyss-800 border-abyss-700 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-neon-red text-black text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-45 shadow-lg">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Professional</CardTitle>
              <CardDescription className="text-gray-400">For medium-sized businesses</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$149</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-neon-red hover:bg-neon-red/80 text-white">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-abyss-800 border-abyss-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription className="text-gray-400">For large organizations</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$499</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {enterpriseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-abyss-700 rounded-lg p-8 border border-abyss-600">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold text-white mb-4">Consulting Services</h2>
              <p className="text-gray-300 mb-6">
                Need a custom solution or expert guidance? Our security specialists can help you implement the perfect bot trap strategy for your organization.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {consultingServices.map((service, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-neon-green mr-2 flex-shrink-0" />
                    <span className="text-gray-200">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Button asChild variant="default" size="lg" className="bg-neon-green hover:bg-neon-green/80 text-black">
                <Link to="/contact">
                  Request Consultation
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Data Analytics as a Service */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Data Analytics */}
          <Card className="bg-abyss-800 border-abyss-700 text-white h-full">
            <CardHeader>
              <div className="mb-4">
                <Database className="h-12 w-12 text-neon-blue" />
              </div>
              <CardTitle>Data Analytics</CardTitle>
              <CardDescription className="text-gray-400">
                Gain insights from anonymized bot behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Purchase comprehensive reports on bot patterns, access anonymized data sets, and receive industry-specific threat intelligence.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-blue mr-2" />
                  <span>Monthly trend reports</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-blue mr-2" />
                  <span>Custom data analysis</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-blue mr-2" />
                  <span>API access to datasets</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          {/* Security Audits */}
          <Card className="bg-abyss-800 border-abyss-700 text-white h-full">
            <CardHeader>
              <div className="mb-4">
                <Shield className="h-12 w-12 text-neon-red" />
              </div>
              <CardTitle>Security Audits</CardTitle>
              <CardDescription className="text-gray-400">
                Comprehensive risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our security experts will evaluate your current defenses, identify vulnerabilities, and provide recommendations tailored to your organization.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-red mr-2" />
                  <span>Vulnerability assessment</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-red mr-2" />
                  <span>Penetration testing</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-red mr-2" />
                  <span>Compliance evaluation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-neon-red text-neon-red hover:bg-neon-red/10">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          {/* Training */}
          <Card className="bg-abyss-800 border-abyss-700 text-white h-full">
            <CardHeader>
              <div className="mb-4">
                <Users className="h-12 w-12 text-neon-purple" />
              </div>
              <CardTitle>Staff Training</CardTitle>
              <CardDescription className="text-gray-400">
                Empower your security team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Comprehensive training sessions on bot detection, threat analysis, and response strategies for your security personnel.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-purple mr-2" />
                  <span>Online and in-person sessions</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-purple mr-2" />
                  <span>Practical exercises</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-neon-purple mr-2" />
                  <span>Certification program</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-t from-abyss-900 to-abyss-800 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to secure your digital assets?</h2>
          <p className="text-lg mb-8 text-gray-300">
            Deploy Perpetual Abyss today and take control of your web security strategy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="default" className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium">
              <Link to="/dashboard">
                Try Demo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-neon-red text-neon-red hover:bg-neon-red/10">
              <Link to="/contact">
                Contact Sales
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-abyss-900 border-t border-abyss-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© 2025 Perpetual Abyss. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-neon-blue">Home</Link>
            <Link to="/dashboard" className="text-sm text-gray-400 hover:text-neon-blue">Dashboard</Link>
            <Link to="/honeypot" className="text-sm text-gray-400 hover:text-neon-blue">Honeypot</Link>
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-neon-blue">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
