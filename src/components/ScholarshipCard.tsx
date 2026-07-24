import React from 'react';
import { Scholarship, FactorMatch } from '../types';
import { ShieldCheck, Calendar, Award, ExternalLink, ArrowRight, Sparkles, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  matchScore?: FactorMatch;
  onViewDetails: (scholarship: Scholarship) => void;
  onTrackApplication: (scholarship: Scholarship) => void;
  onStartSop: (scholarship: Scholarship) => void;
  isTracked: boolean;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  matchScore,
  onViewDetails,
  onTrackApplication,
  onStartSop,
  isTracked,
}) => {
  // Calculate deadline urgency
  const deadlineDate = new Date(scholarship.deadline);
  const now = new Date();
  const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 3600 * 24));

  let urgencyPill = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  if (diffDays <= 30) {
    urgencyPill = 'bg-rose-50 text-rose-800 border-rose-200';
  } else if (diffDays <= 75) {
    urgencyPill = 'bg-amber-50 text-amber-800 border-amber-200';
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between group relative overflow-hidden">
      {/* Top Subtle Brand Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-teal-600 to-indigo-500 opacity-80" />

      <div>
        {/* Header Row: Flag, Title, Verified Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-2.5">
            <span className="text-2xl shrink-0 mt-0.5" title={scholarship.country}>{scholarship.flag}</span>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                {scholarship.country} • {scholarship.provider}
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                {scholarship.title}
              </h3>
            </div>
          </div>

          {/* Reassuring Verified Trust Badge */}
          <div className="shrink-0 flex flex-col items-end">
            <div
              className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 text-xs font-semibold"
              title={`${scholarship.trustSourcesCount} cross-verified official source links`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Source ✓</span>
            </div>
          </div>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 my-3">
          <span className="bg-teal-50 text-teal-800 text-xs px-2.5 py-1 rounded-full font-medium border border-teal-200/80">
            {scholarship.fundingType}
          </span>
          {scholarship.degreeLevels.map((lvl) => (
            <span key={lvl} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium border border-slate-200">
              {lvl}
            </span>
          ))}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${urgencyPill}`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>Deadline: <span className="font-mono">{scholarship.deadline}</span> ({diffDays > 0 ? `${diffDays}d left` : 'Expired'})</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {scholarship.description}
        </p>

        {/* Financial & Acceptance Rate Summary Box */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-xl p-3 border border-slate-200/70 mb-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Monthly Stipend:</span>
            <span className="font-mono font-bold text-teal-800">{scholarship.stipendAmount}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Est. Acceptance:</span>
            <span className="font-mono font-semibold text-slate-800">~{scholarship.competitivenessRate}% Pool</span>
          </div>
        </div>

        {/* AI Multi-Factor Match Score Card */}
        {matchScore && (
          <div className="bg-teal-50/60 rounded-xl p-3.5 border border-teal-100/90 mb-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                AI Profile Match
              </span>
              <span className="text-xs font-mono font-bold text-teal-800 bg-white px-2.5 py-0.5 rounded-full border border-teal-200 shadow-2xs">
                {matchScore.overallMatch}% Overall
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Academic</span>
                <span className="font-mono font-bold text-slate-800">{matchScore.academicFit}%</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Financial</span>
                <span className="font-mono font-bold text-teal-700">{matchScore.financialFit}%</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Compet.</span>
                <span className="font-mono font-bold text-indigo-700">{matchScore.competitivenessFit}%</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Timeline</span>
                <span className="font-mono font-bold text-amber-700">{matchScore.timelineFit}%</span>
              </div>
            </div>

            {/* Supportive Counterfactual Hint */}
            {matchScore.counterfactualSuggestion && (
              <div className="mt-2 bg-amber-50 border border-amber-200/90 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{matchScore.counterfactualSuggestion}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <button
          onClick={() => onViewDetails(scholarship)}
          className="flex-1 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Details</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={() => onStartSop(scholarship)}
          className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
          title="Draft Statement of Purpose with AI"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Draft SOP</span>
        </button>

        <button
          onClick={() => onTrackApplication(scholarship)}
          className={`py-2 px-3.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            isTracked
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
          }`}
        >
          {isTracked ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Saved ✓</span>
            </>
          ) : (
            <>
              <span>+ Save App</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

