
import React from 'react';
import { GettingStartedSection } from './GettingStartedSection';
import { MLProtectionSection } from './MLProtectionSection';

export const ResultsContent = () => {
  return (
    <main className="p-6">
      <div className="grid grid-cols-1 gap-6 mb-8">
        <GettingStartedSection />
        <MLProtectionSection />
      </div>
    </main>
  );
};
