
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ResultsLayout } from '@/components/results/ResultsLayout';
import { ResultsHeader } from '@/components/results/ResultsHeader';
import { ResultsContent } from '@/components/results/ResultsContent';

const Results = () => {
  return (
    <SidebarProvider>
      <ResultsLayout>
        <ResultsHeader />
        <ResultsContent />
      </ResultsLayout>
    </SidebarProvider>
  );
};

export default Results;
