
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const ResultsHeader = () => {
  return (
    <>
      <header className="border-b border-abyss-700 bg-background py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">How Perpetual Abyss Works</h1>
        </div>
      </header>
      
      <div className="p-6 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </>
  );
};
