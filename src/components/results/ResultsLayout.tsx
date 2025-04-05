
import React from 'react';
import { AppSidebar } from '@/components/shared/AppSidebar';

interface ResultsLayoutProps {
  children: React.ReactNode;
}

export const ResultsLayout = ({ children }: ResultsLayoutProps) => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
