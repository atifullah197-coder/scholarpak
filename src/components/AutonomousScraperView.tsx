import React, { useState } from 'react';
import { ScraperSource, Scholarship, ScholarshipDelta } from '../types';
import { Bot, FileText, Image as ImageIcon, ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, ArrowRight, GitCompare, Upload, Sparkles, FileCode } from 'lucide-react';

interface AutonomousScraperViewProps {
  scrapers: ScraperSource[];
  onAddExtractedScholarship: (scholarship: Scholarship) => void;
}

export const AutonomousScraperView: React.FC<AutonomousScraperViewProps> = ({
  scrapers,
  onAddExtractedScholarship,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'simulator' | 'diffs' | 'cross_verify'>('status');

  // Simulator State
  const [inputMode, setInputMode] = useState<'text' | 'image'>('text');
  const [rawText, setRawText] = useState(`DAAD EPOS Announcement 2026/2027:
The German Academic Exchange Service (DAAD) announces the update for Development-Related Postgraduate Courses (EPOS).
Application Deadline: 30th September 2026.
Monthly Stipend: Increased to €1,300 per month for Master students.
Health insurance, travel allowance, and 100% tuition waiver included.
Requirements: 2 years work experience, IELTS 6.5 minimum, 2 recommendation letters, Europass CV.`);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionResult, setExtractionResult] = useState<any | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAgent = async () => {
    setIsExtracting(true);
    setExtractionResult(null);

    try {
      const payload: any = {
        sourceUrl: 'https://islamabad.diplo.de/pk-en/noticeboard-ocr',
      };

      if (inputMode === 'image' && imagePreview) {
        payload.imageBase64 = imagePreview;
      } else {
        payload.rawText = rawText;
      }

      const res = await fetch('/api/ai/scrape-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      setExtractionResult(json.data);
    } catch (err) {
      console.error('Error running scraper agent:', err);
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Autonomous Data Pipeline & Vision OCR Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            AI Scraper Agents & Delta Change Detection
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            ScholarPak AI continuously monitors web sources, PDF brochures, and embassy notice boards. Instead of static scrapes, agentic vision & OCR diffing track exact deadline, funding, and requirement updates.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'status' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pipeline Health
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'simulator' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Agent Simulator / OCR
          </button>
          <button
            onClick={() => setActiveTab('diffs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'diffs' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Delta Diffing
          </button>
        </div>
      </div>

      {/* Tab 1: Pipeline Health */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Active Scraper Agents</span>
              <span className="text-2xl font-extrabold text-white">4 Running</span>
              <span className="text-[11px] text-emerald-400 block mt-1">100% Uptime across core sources</span>
            </div>
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Daily Source Scraping</span>
              <span className="text-2xl font-extrabold text-white">304 Pages</span>
              <span className="text-[11px] text-slate-400 block mt-1">Web, PDF & Embassy OCR</span>
            </div>
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Detected Deltas (Changes)</span>
              <span className="text-2xl font-extrabold text-amber-400">27 This Week</span>
              <span className="text-[11px] text-slate-400 block mt-1">Deadlines & Stipends updated</span>
            </div>
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Cross-Verification Rate</span>
              <span className="text-2xl font-extrabold text-emerald-400">96.8%</span>
              <span className="text-[11px] text-emerald-400 block mt-1">2+ Independent Sources Agree</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              Scraper Source Monitors & Agent Health
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Agent Name</th>
                    <th className="pb-3 font-semibold">Source Type</th>
                    <th className="pb-3 font-semibold">Uptime</th>
                    <th className="pb-3 font-semibold">Deltas Found</th>
                    <th className="pb-3 font-semibold">Last Scraped</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {scrapers.map((sc) => (
                    <tr key={sc.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 font-medium text-white flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <span>{sc.name}</span>
                          <span className="block text-[10px] text-slate-500 font-mono">{sc.url}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]">
                          {sc.type}
                        </span>
                      </td>
                      <td className="py-3 text-emerald-400 font-semibold">{sc.uptime}%</td>
                      <td className="py-3 text-amber-300 font-semibold">{sc.deltaCount} deltas</td>
                      <td className="py-3 text-slate-400">{sc.lastScraped}</td>
                      <td className="py-3">
                        {sc.status === 'healthy' ? (
                          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold flex items-center gap-1 w-max text-[10px]">
                            <CheckCircle2 className="w-3 h-3" /> Healthy
                          </span>
                        ) : (
                          <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-semibold flex items-center gap-1 w-max text-[10px]">
                            <AlertCircle className="w-3 h-3" /> Degraded
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Agent Simulator / OCR */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Test Agent Extraction & OCR Engine
              </h3>

              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setInputMode('text')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                    inputMode === 'text' ? 'bg-slate-800 text-emerald-300' : 'text-slate-400'
                  }`}
                >
                  <FileText className="w-3 h-3" /> Raw Text / Web
                </button>
                <button
                  onClick={() => setInputMode('image')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                    inputMode === 'image' ? 'bg-slate-800 text-emerald-300' : 'text-slate-400'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" /> Notice Board OCR
                </button>
              </div>
            </div>

            {inputMode === 'text' ? (
              <div>
                <label className="text-xs text-slate-400 block mb-1">Unstructured Announcement / Page Text:</label>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  rows={8}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-xs text-slate-400 block">Upload Embassy Notice Board Photo / PDF Screenshot:</label>
                <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-6 text-center bg-slate-950 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="ocr-upload"
                  />
                  <label htmlFor="ocr-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-emerald-400" />
                    <span className="text-xs font-medium text-slate-200">Click to upload image or drop notice board photo</span>
                    <span className="text-[10px] text-slate-500">PNG, JPG, WEBP accepted for Gemini Vision OCR</span>
                  </label>
                </div>

                {imagePreview && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-800 max-h-48">
                    <img src={imagePreview} alt="OCR Preview" className="w-full object-cover" />
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleRunAgent}
              disabled={isExtracting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isExtracting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Agent Processing with Gemini Vision...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Run Agentic Extraction & Diff Check</span>
                </>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Structured Schema & Extracted Deltas
            </h3>

            {extractionResult ? (
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-300 text-sm">{extractionResult.title}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono">
                      Trust: {extractionResult.trustScore}%
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{extractionResult.description}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Funding:</span>
                      <span className="text-slate-200 font-semibold">{extractionResult.fundingType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Stipend:</span>
                      <span className="text-emerald-400 font-semibold">{extractionResult.stipendAmount}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Extracted Deadline:</span>
                      <span className="text-amber-400 font-semibold">{extractionResult.deadline}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Cross Verified:</span>
                      <span className="text-emerald-400 font-semibold">{extractionResult.isCrossVerified ? 'Yes ✓' : 'Pending'}</span>
                    </div>
                  </div>
                </div>

                {/* Deltas Section */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                    <GitCompare className="w-4 h-4 text-amber-400" />
                    Detected Page Deltas (Changes from previous scrape):
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {extractionResult.deltas?.map((d: any, idx: number) => (
                      <div key={idx} className="bg-slate-950/80 p-2 rounded border border-amber-500/20 flex items-center justify-between">
                        <span className="font-medium text-slate-300">{d.field}:</span>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-rose-400 line-through">{d.oldValue}</span>
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                          <span className="text-emerald-400 font-bold">{d.newValue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 text-xs italic">
                Click "Run Agentic Extraction" to process unstructured input and view the live JSON schema output.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Delta Diffing */}
      {activeTab === 'diffs' && (
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-amber-400" />
            Global Delta Change Log (Live Audit Feed)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Every update to a scholarship page is stored with historical timestamped diffs.
          </p>

          <div className="space-y-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-300">DAAD EPOS Germany</span>
                <span className="text-slate-400 block text-[11px]">Field: Monthly Stipend • Changed on 2026-06-10</span>
              </div>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-rose-400 line-through bg-rose-500/10 px-2 py-1 rounded">€861 / month</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">€934 - €1,300 / month</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-300">DAAD EPOS Germany</span>
                <span className="text-slate-400 block text-[11px]">Field: Application Deadline • Changed on 2026-07-05</span>
              </div>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-rose-400 line-through bg-rose-500/10 px-2 py-1 rounded">2026-10-15</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded">2026-09-30 (Moved 15 days earlier)</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-300">Erasmus Mundus BDMA</span>
                <span className="text-slate-400 block text-[11px]">Field: Installation Allowance • Changed on 2026-01-10</span>
              </div>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-rose-400 line-through bg-rose-500/10 px-2 py-1 rounded">€1,000 / month</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">€1,400 / month (EU Harmonized)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
