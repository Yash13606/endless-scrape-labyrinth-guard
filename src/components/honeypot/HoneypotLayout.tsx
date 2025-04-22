
import React from 'react';
import HoneypotHeader from './HoneypotHeader';
import HoneypotFooter from './HoneypotFooter';

interface HoneypotLayoutProps {
  children: React.ReactNode;
}

const HoneypotLayout = ({ children }: HoneypotLayoutProps) => {
  return (
    <div className="honeypot min-h-screen flex flex-col">
      <HoneypotHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <HoneypotFooter />
    </div>
  );
};

export default HoneypotLayout;
