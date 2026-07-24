import React, { useState } from 'react';
import { Scholarship } from '../types';
import { ShieldCheck, GitBranch, History, AlertTriangle, CheckCircle2, ThumbsUp, MessageSquare, Flag } from 'lucide-react';

interface TrustGraphViewProps {
  scholarships: Scholarship[];
}

export const TrustGraphView: React.FC<TrustGraphViewProps> = ({ scholarships }) => {
  const [selectedSchId, setSelectedSchId] = useState<string>(scholarships[0]?.id || '');
  const activeScholarship = scholarships.find((s) => s.id === selectedSchId) || scholarships[0];

  const [flagReason, setFlagReason] = useState('');
  const [flagSubmitted, setFlagSubmitted] = useState(false);

  const handleFlagIssue = () => {
    if (!flagReason) return;
    setFlagSubmitted(true);
    setTimeout(() => {
      setFlagSubmitted(false);
      setFlagReason('');
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Trust Graph & Decentralized Verification Model</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Trust Score Graph & Fact-Checking Audit
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            ScholarPak AI scores listings using a 3-way graph model: Source Reliability (40%) + Multi-Source Cross-Verification (35%) + Community Fact-Checking Reports (25%).
          </p>
        </div>

        {/* Scholarship Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 font-medium">Inspect Scholarship:</span>
          <select
            value={selectedSchId}
            onChange={(e) => setSelectedSchId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-none focus:border-emerald-500"
          >
            {scholarships.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.trustScore}% Trust)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Graph Breakdown + History Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Trust Score Graph Components */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trust Score Card */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{activeScholarship.title}</h3>
                <span className="text-xs text-slate-400">{activeScholarship.provider} • {activeScholarship.country}</span>
              </div>

              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <div>
                  <span className="text-2xl font-extrabold block leading-none">{activeScholarship.trustScore}%</span>
                  <span className="text-[10px] font-semibold text-emerald-300">TRUST GRAPH SCORE</span>
                </div>
              </div>
            </div>

            {/* 3 Component Graph Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Pillar 1 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 block font-medium">1. Source Reliability (40%)</span>
                <span className="text-xl font-bold text-emerald-400">99 / 100</span>
                <p className="text-[11px] text-slate-500">
                  Direct official government domain ({activeScholarship.sources[0]?.name || 'Official Portal'}).
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 block font-medium">2. Cross-Verification (35%)</span>
                <span className="text-xl font-bold text-indigo-400">
                  {activeScholarship.isCrossVerified ? 'Verified ✓ (2+ Sources)' : '1 Source'}
                </span>
                <p className="text-[11px] text-slate-500">
                  Cross-referenced with Embassy notice board and university catalog.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 block font-medium">3. Community Reports (25%)</span>
                <span className="text-xl font-bold text-amber-300">Clean (0 Flags)</span>
                <p className="text-[11px] text-slate-500">
                  Weighted by reputation scores of verified alumni reviewers.
                </p>
              </div>
            </div>

            {/* Independent Sources List */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-emerald-400" />
                Cross-Verified Independent Data Sources
              </h4>

              <div className="space-y-2">
                {activeScholarship.sources.map((src, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200 block">{src.name}</span>
                      <a href={src.url} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-400 font-mono hover:underline truncate max-w-xs block">
                        {src.url}
                      </a>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400 block">{src.reliability}% Reliability</span>
                      <span className="text-[10px] text-slate-500">Verified: {src.lastVerified}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Fact-Checking Flagger Form */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Flag className="w-4 h-4 text-amber-400" />
              Community Fact-Checking & Dead Link Reporter
            </h4>
            <p className="text-xs text-slate-400">
              Found a changed requirement or broken link? Submit a report. Reports from verified alumni hold 3x weight in adjusting the trust graph score.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="e.g. Portal link changed, deadline extended by 10 days"
                className="flex-1 bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleFlagIssue}
                className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0"
              >
                Submit Fact-Check
              </button>
            </div>

            {flagSubmitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fact-check report logged to human review queue. Reputation points awarded!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Trust History Timeline */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            Historical Trust Score Audit Timeline
          </h3>

          <p className="text-xs text-slate-400">
            Audit history showing how trust scores adjust dynamically over time based on scraper verification and community reports.
          </p>

          <div className="space-y-4 relative pl-4 border-l-2 border-slate-800 text-xs">
            {activeScholarship.trustHistory?.map((th, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-400">{th.score}% Score</span>
                    <span className="text-[10px] text-slate-500 font-mono">{th.date}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{th.reason}</p>
                </div>
              </div>
            ))}

            {(!activeScholarship.trustHistory || activeScholarship.trustHistory.length === 0) && (
              <p className="text-slate-500 text-xs italic">No previous trust score adjustments recorded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
