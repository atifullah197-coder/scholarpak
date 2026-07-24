import React, { useState } from 'react';
import { AnomalyAlert, ScraperSource } from '../types';
import { Activity, AlertTriangle, ShieldAlert, CheckCircle2, RefreshCw, Server, Zap, Search, Eye } from 'lucide-react';

interface OpsIntelligenceViewProps {
  anomalies: AnomalyAlert[];
  scrapers: ScraperSource[];
}

export const OpsIntelligenceView: React.FC<OpsIntelligenceViewProps> = ({
  anomalies: initialAnomalies,
  scrapers: initialScrapers,
}) => {
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>(initialAnomalies);
  const [scrapers, setScrapers] = useState<ScraperSource[]>(initialScrapers);
  const [isRefreshingScrapers, setIsRefreshingScrapers] = useState(false);

  const handleResolveAnomaly = (id: string) => {
    setAnomalies(
      anomalies.map((a) => (a.id === id ? { ...a, status: 'resolved' } : a))
    );
  };

  const handleForceRescrape = (sourceId: string) => {
    setScrapers(
      scrapers.map((s) =>
        s.id === sourceId
          ? {
              ...s,
              lastScraped: new Date().toISOString().replace('T', ' ').substring(0, 16),
              status: 'healthy',
            }
          : s
      )
    );
  };

  const handleRefreshAllScrapers = () => {
    setIsRefreshingScrapers(true);
    setTimeout(() => {
      setScrapers(
        scrapers.map((s) => ({
          ...s,
          lastScraped: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'healthy',
          uptime: 99.9,
        }))
      );
      setIsRefreshingScrapers(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Operations & System Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Anomaly Detection & Scraper Health Control
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Real-time operations monitoring. Automatically detects suspicious trust-score spikes, broken source scrapers, duplicate listings, and traffic surges.
          </p>
        </div>

        <button
          onClick={handleRefreshAllScrapers}
          disabled={isRefreshingScrapers}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshingScrapers ? 'animate-spin' : ''}`} />
          <span>{isRefreshingScrapers ? 'Refreshing Pipelines...' : 'Force Pipeline Re-Check'}</span>
        </button>
      </div>

      {/* Grid: Anomalies Dashboard + Scraper Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Anomaly Detection Dashboard */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Automated Anomaly Alerts
            </h3>

            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
              {anomalies.filter((a) => a.status !== 'resolved').length} Open Alerts
            </span>
          </div>

          <div className="space-y-3">
            {anomalies.map((anom) => (
              <div
                key={anom.id}
                className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                  anom.status === 'resolved'
                    ? 'bg-slate-950/50 border-slate-800 opacity-60'
                    : anom.severity === 'high'
                    ? 'bg-rose-500/10 border-rose-500/30'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-white text-sm block">{anom.scholarshipTitle}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Detected: {anom.detectedAt}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      anom.status === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {anom.status}
                  </span>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">{anom.reason}</p>

                {anom.status !== 'resolved' && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-amber-400 font-semibold">Severity: {anom.severity.toUpperCase()}</span>
                    <button
                      onClick={() => handleResolveAnomaly(anom.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] px-3 py-1 rounded-lg transition-colors"
                    >
                      Mark Resolved ✓
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Scraper Uptime & Health Control */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            Scraper Agent Health & Uptime Status
          </h3>

          <div className="space-y-3">
            {scrapers.map((sc) => (
              <div key={sc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">{sc.name}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      sc.status === 'healthy' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {sc.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 pt-1">
                  <div>Uptime: <strong className="text-emerald-400">{sc.uptime}%</strong></div>
                  <div>Deltas: <strong className="text-amber-300">{sc.deltaCount}</strong></div>
                  <div>Scraped: <strong className="text-white">{sc.scrapedCount}</strong></div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-mono">Last Scraped: {sc.lastScraped}</span>
                  <button
                    onClick={() => handleForceRescrape(sc.id)}
                    className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" /> Force Re-scrape
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
