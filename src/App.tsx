
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Honeypot from "./pages/Honeypot";
import Results from "./pages/Results";
import PricingPage from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import DataManagement from "./pages/DataManagement";
import Settings from "./pages/Settings";
import HoneypotShowcase from "./pages/HoneypotShowcase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/honeypot" element={<Honeypot />} />
          <Route path="/results" element={<Results />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/data-management" element={<DataManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/honeypot-showcase" element={<HoneypotShowcase />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
