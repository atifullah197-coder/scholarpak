import React from 'react';
import { Scholarship, FactorMatch } from '../types';
import { X, ExternalLink, ShieldCheck, Sparkles, Calendar, Award, CheckCircle2, FileText, Lightbulb, GitBranch, ArrowRight } from 'lucide-react';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship;
  matchScore?: FactorMatch;
  onClose: () => void;
  onTrackApplication: (scholarship: Scholarship) => void;
  onStartSop: (scholarship: Scholarship) => void;
  isTracked: boolean;
}

export const ScholarshipDetailModal: React.FC<ScholarshipDetailModalProps> = ({
  scholarship,
  matchScore,
  onClose,
  onTrackApplication,
  onStartSop,
  isTracked,
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200/90 max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-xl relative my-8 max-h-[90vh] overflow-y-auto font-sans">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 pr-10">
          <span className="text-4xl shrink-0 mt-1">{scholarship.flag}</span>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-teal-50 text-teal-800 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-teal-200/80">
                {scholarship.fundingType}
              </span>
              <span className="text-xs text-slate-500 font-medium">• {scholarship.provider}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">{scholarship.title}</h2>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Monthly Allowance:</span>
            <span className="font-mono font-bold text-teal-800 text-sm">{scholarship.stipendAmount}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Deadline:</span>
            <span className="font-mono font-bold text-amber-800 text-sm">{scholarship.deadline}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Verification Status:</span>
            <span className="font-bold text-emerald-700 text-xs flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified ✓
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Est. Acceptance:</span>
            <span className="font-mono font-bold text-slate-800 text-sm">~{scholarship.competitivenessRate}% Pool</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Scholarship Overview & Scope:</h4>
          <p className="text-slate-700 leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-200/70">
            {scholarship.description}
          </p>
        </div>

        {/* Multi-Factor Match Breakdown (If available) */}
        {matchScore && (
          <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                Multi-Factor AI Fit Analysis
              </span>
              <span className="text-xs font-mono font-bold text-teal-800 bg-white px-2.5 py-1 rounded-full border border-teal-200 shadow-2xs">
                {matchScore.overallMatch}% Overall Fit
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between border-b border-teal-100 pb-1.5">
                <span className="font-semibold text-slate-900">Academic Fit ({matchScore.academicFit}%):</span>
                <span className="text-slate-600">{matchScore.academicReason}</span>
              </div>
              <div className="flex justify-between border-b border-teal-100 pb-1.5">
                <span className="font-semibold text-teal-800">Financial Fit ({matchScore.financialFit}%):</span>
                <span className="text-slate-600">{matchScore.financialReason}</span>
              </div>
              <div className="flex justify-between border-b border-teal-100 pb-1.5">
                <span className="font-semibold text-indigo-800">Competitiveness ({matchScore.competitivenessFit}%):</span>
                <span className="text-slate-600">{matchScore.competitivenessReason}</span>
              </div>
            </div>

            {matchScore.counterfactualSuggestion && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{matchScore.counterfactualSuggestion}</span>
              </div>
            )}
          </div>
        )}

        {/* Required Documents Checklist */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Required Documents Checklist:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scholarship.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Data Sources */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Cross-Verified Sources:</h4>
          <div className="space-y-1.5">
            {scholarship.sources.map((src, idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between items-center text-[11px]">
                <div>
                  <span className="font-bold text-slate-800 block">{src.name}</span>
                  <a href={src.url} target="_blank" rel="noreferrer" className="text-teal-700 font-mono hover:underline">
                    {src.url}
                  </a>
                </div>
                <span className="text-emerald-700 font-semibold font-mono bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  {src.reliability}% Verified
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
          <a
            href={scholarship.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium"
          >
            <span>Official Portal Link</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onStartSop(scholarship);
              }}
              className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Draft SOP with AI</span>
            </button>

            <button
              onClick={() => {
                onTrackApplication(scholarship);
              }}
              className={`text-xs font-semibold px-5 py-2.5 rounded-xl transition-all ${
                isTracked
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
              }`}
            >
              {isTracked ? 'Saved ✓' : '+ Save Application'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

