
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ResultsLayout } from '@/components/results/ResultsLayout';
import { ResultsHeader } from '@/components/results/ResultsHeader';
import { ResultsContent } from '@/components/results/ResultsContent';
import BotSimulator from '@/components/results/BotSimulator';
import HoneypotSimulator from '@/components/results/HoneypotSimulator';

const Results = () => {
  return (
    <SidebarProvider>
      <ResultsLayout>
        <ResultsHeader />
        <div className="px-6 py-4 space-y-6">
          <BotSimulator />
          <HoneypotSimulator />
          <ResultsContent />
        </div>
      </ResultsLayout>
    </SidebarProvider>
  );
};

export default Results;
