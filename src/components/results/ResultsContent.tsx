
import React, { useEffect, useState } from "react";
import { GettingStartedSection } from './GettingStartedSection';
import { MLProtectionSection } from './MLProtectionSection';
import {
  fetchDetectionMetrics,
  fetchModelTrainingHistory,
} from "@/utils/supabaseHoneypot";

export const ResultsContent = () => {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [modelHistory, setModelHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchDetectionMetrics().then(setMetrics);
    fetchModelTrainingHistory().then(setModelHistory);
  }, []);

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 gap-6 mb-8">
        <GettingStartedSection />
        <MLProtectionSection />
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
