
import React, { useEffect, useState } from "react";
import { GettingStartedSection } from './GettingStartedSection';
import { MLProtectionSection } from './MLProtectionSection';
import {
  fetchDetectionMetrics,
  fetchModelTrainingHistory,
} from "@/utils/supabaseHoneypot";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ResultsContent = () => {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [modelHistory, setModelHistory] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchDetectionMetrics().then(setMetrics);
    fetchModelTrainingHistory().then(setModelHistory);
  }, []);

  const copyApiKey = () => {
    navigator.clipboard.writeText("honeypot-secure-api-key-123456");
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const copyEndpoint = () => {
    navigator.clipboard.writeText("https://jogdukxsxjwjhozwfapy.functions.supabase.co/honeypot-api");
    toast({
      title: "API Endpoint Copied",
      description: "The API endpoint has been copied to your clipboard.",
    });
  };

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 gap-6 mb-8">
        <GettingStartedSection />
        <MLProtectionSection />
        
        <section className="p-6 bg-white rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">API Integration</h2>
          <Alert className="mb-4">
            <AlertTitle className="text-blue-600">External API Access</AlertTitle>
            <AlertDescription>
              You can access honeypot data from external websites using the API endpoint and key below.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-700">API Endpoint</p>
                <code className="text-xs sm:text-sm bg-gray-100 p-1 rounded">
                  https://jogdukxsxjwjhozwfapy.functions.supabase.co/honeypot-api
                </code>
              </div>
              <Button size="sm" variant="outline" onClick={copyEndpoint} className="whitespace-nowrap">
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-700">API Key</p>
                <code className="text-xs sm:text-sm bg-gray-100 p-1 rounded">honeypot-secure-api-key-123456</code>
                <Badge variant="outline" className="ml-2">demo only</Badge>
              </div>
              <Button size="sm" variant="outline" onClick={copyApiKey} className="whitespace-nowrap">
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">API Documentation</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">GET /</h4>
                <p className="text-sm mb-2">Fetches recent honeypot data, metrics and model history.</p>
                <p className="text-sm mb-2"><strong>Headers:</strong></p>
                <code className="text-xs block bg-gray-100 p-2 rounded mb-3">
                  x-api-key: your-api-key
                </code>
                
                <h4 className="font-medium mb-2">POST /</h4>
                <p className="text-sm mb-2">Submit model training data.</p>
                <p className="text-sm mb-2"><strong>Headers:</strong></p>
                <code className="text-xs block bg-gray-100 p-2 rounded mb-2">
                  Content-Type: application/json<br/>
                  x-api-key: your-api-key
                </code>
                <p className="text-sm mb-2"><strong>Body:</strong></p>
                <code className="text-xs block bg-gray-100 p-2 rounded">
                  {`{\n  "type": "train_model",\n  "accuracy": 0.95,\n  "samples": 200,\n  "improvements": ["Better crawler detection"]\n}`}
                </code>
              </div>
            </div>
          </div>
        </section>
        
        <section className="p-6 bg-white rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">ML Model Detection Metrics</h2>
          {metrics ? (
            <div className="space-y-2">
              <div>
                <strong>Accuracy:</strong> {(metrics.accuracy * 100).toFixed(2)}%
              </div>
              <div>
                <strong>Total Traffic:</strong> {metrics.total_traffic}
              </div>
              <div>
                <strong>Detected Bots:</strong> {metrics.detected_bots}
              </div>
              <div>
                <strong>False Positives:</strong> {metrics.false_positives}
              </div>
              <div>
                <strong>False Negatives:</strong> {metrics.false_negatives}
              </div>
              <div>
                <strong>Model Version:</strong>{" "}
                {metrics.model_version ?? "(unversioned)"}
              </div>
              <div>
                <strong>Recorded At:</strong>{" "}
                {new Date(metrics.recorded_at).toLocaleString()}
              </div>
            </div>
          ) : (
            <div>No metrics data found.</div>
          )}
        </section>
        
        <section className="p-6 bg-white rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">ML Model Training History</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left font-semibold pr-4">Time</th>
                <th className="text-left font-semibold pr-4">Accuracy</th>
                <th className="text-left font-semibold pr-4">Precision</th>
                <th className="text-left font-semibold pr-4">Recall</th>
                <th className="text-left font-semibold pr-4">F1</th>
                <th className="text-left font-semibold pr-4">Model Version</th>
                <th className="text-left font-semibold pr-4">Improvements</th>
              </tr>
            </thead>
            <tbody>
              {modelHistory.map((row, i) => (
                <tr key={row.id || i}>
                  <td className="pr-4">
                    {new Date(row.trained_at).toLocaleString()}
                  </td>
                  <td className="pr-4">{(row.accuracy * 100).toFixed(2)}%</td>
                  <td className="pr-4">
                    {row.precision !== null && row.precision !== undefined
                      ? (row.precision * 100).toFixed(2) + "%"
                      : "—"}
                  </td>
                  <td className="pr-4">
                    {row.recall !== null && row.recall !== undefined
                      ? (row.recall * 100).toFixed(2) + "%"
                      : "—"}
                  </td>
                  <td className="pr-4">
                    {row.f1_score !== null && row.f1_score !== undefined
                      ? (row.f1_score * 100).toFixed(2) + "%"
                      : "—"}
                  </td>
                  <td className="pr-4">{row.model_version ?? "(unversioned)"}</td>
                  <td className="pr-4">
                    {Array.isArray(row.improvements)
                      ? row.improvements.join(", ")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modelHistory.length === 0 && <div>No training records found.</div>}
        </section>
      </div>
    </main>
  );
};
