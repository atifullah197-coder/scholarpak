import React, { useState, useEffect } from 'react';
import { Scholarship, UserProfile, FactorMatch } from '../types';
import { ScholarshipCard } from './ScholarshipCard';
import { Search, Sparkles, Filter, SlidersHorizontal, RefreshCw, X, Check, ArrowUpDown, ChevronDown } from 'lucide-react';

interface SearchAndMatchViewProps {
  scholarships: Scholarship[];
  userProfile: UserProfile;
  onViewDetails: (scholarship: Scholarship) => void;
  onTrackApplication: (scholarship: Scholarship) => void;
  onStartSop: (scholarship: Scholarship) => void;
  trackedIds: string[];
}

export const SearchAndMatchView: React.FC<SearchAndMatchViewProps> = ({
  scholarships,
  userProfile,
  onViewDetails,
  onTrackApplication,
  onStartSop,
  trackedIds,
}) => {
  const [queryInput, setQueryInput] = useState('Masters in Europe in CS with full tuition and monthly stipend');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedChips, setParsedChips] = useState<string[]>([
    'Degree: Masters',
    'Location: Europe',
    'Funding: Fully Funded',
    'Field: CS & AI',
  ]);
  const [intentSummary, setIntentSummary] = useState(
    'Understood: Searching for fully funded Masters programs in Europe for CS & AI graduates.'
  );

  // Filters
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedFunding, setSelectedFunding] = useState<string>('All');
  const [minTrustScore, setMinTrustScore] = useState<number>(85);
  const [sortBy, setSortBy] = useState<'match' | 'trust' | 'deadline' | 'stipend'>('match');

  // Match Scores state per scholarship ID
  const [matchScores, setMatchScores] = useState<Record<string, FactorMatch>>({});
  const [isMatchingAll, setIsMatchingAll] = useState(false);

  // Trigger Gemini Natural Language Query Parser
  const handleParseQuery = async () => {
    if (!queryInput.trim()) return;
    setIsParsing(true);
    try {
      const res = await fetch('/api/ai/parse-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryInput }),
      });
      const data = await res.json();
      if (data.parsedChips) {
        setParsedChips(data.parsedChips);
      }
      if (data.intentSummary) {
        setIntentSummary(data.intentSummary);
      }
      if (data.degreeLevel) {
        setSelectedDegree(data.degreeLevel);
      }
      if (data.location) {
        setSelectedCountry(data.location);
      }
    } catch (err) {
      console.error('Error parsing query:', err);
    } finally {
      setIsParsing(false);
    }
  };

  // Run AI Multi-Factor Matching for all loaded scholarships
  const handleRunMatchEngine = async () => {
    setIsMatchingAll(true);
    const newScores: Record<string, FactorMatch> = {};

    for (const sch of scholarships) {
      try {
        const res = await fetch('/api/ai/match-factor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile: userProfile, scholarship: sch }),
        });
        const factorData = await res.json();
        newScores[sch.id] = factorData;
      } catch (err) {
        console.error('Error matching factor for', sch.id, err);
      }
    }

    setMatchScores(newScores);
    setIsMatchingAll(false);
  };

  useEffect(() => {
    handleRunMatchEngine();
  }, []);

  const handleRemoveChip = (chipToRemove: string) => {
    setParsedChips(parsedChips.filter((c) => c !== chipToRemove));
  };

  // Filter & Sort logic
  const filteredScholarships = scholarships.filter((s) => {
    if (s.trustScore < minTrustScore) return false;
    if (selectedDegree !== 'All' && !s.degreeLevels.includes(selectedDegree as any)) return false;
    if (selectedCountry !== 'All' && s.country.toLowerCase() !== selectedCountry.toLowerCase() && !s.country.toLowerCase().includes(selectedCountry.toLowerCase())) return false;
    if (selectedFunding !== 'All' && s.fundingType !== selectedFunding) return false;
    return true;
  });

  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    if (sortBy === 'match') {
      const matchA = matchScores[a.id]?.overallMatch || 0;
      const matchB = matchScores[b.id]?.overallMatch || 0;
      return matchB - matchA;
    }
    if (sortBy === 'trust') {
      return b.trustScore - a.trustScore;
    }
    if (sortBy === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 p-6 sm:p-8 rounded-2xl border border-teal-800 shadow-xs relative overflow-hidden text-white">
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-teal-200 font-semibold text-xs tracking-wide uppercase mb-2">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>AI Search Assistant</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">
            Find Your Ideal Scholarship in Plain Language
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 mb-5 leading-relaxed">
            Tell us about your background, target field, or funding preferences. Our smart assistant will extract criteria and match you against verified opportunities.
          </p>

          {/* Natural Language Search Input Bar */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-md border border-white/50">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 text-slate-800">
              <Search className="w-5 h-5 text-teal-600 shrink-0" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleParseQuery()}
                placeholder="e.g. Fully funded PhD in Germany for CS graduate with 2 years experience"
                className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-sans"
              />
            </div>

            <button
              onClick={handleParseQuery}
              disabled={isParsing}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-5 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm shrink-0 disabled:opacity-50"
            >
              {isParsing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Understanding...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Search Criteria</span>
                </>
              )}
            </button>
          </div>

          {/* Parsed Chips Section */}
          <div className="mt-4 pt-4 border-t border-teal-700/50 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-teal-200/80 font-medium">Extracted Criteria:</span>
            {parsedChips.map((chip) => (
              <span
                key={chip}
                className="bg-white/15 text-white border border-white/25 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium backdrop-blur-xs"
              >
                <span>{chip}</span>
                <button
                  onClick={() => handleRemoveChip(chip)}
                  className="hover:text-amber-200 text-teal-200 p-0.5 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <p className="text-[11px] text-teal-200/90 mt-2 font-medium">
            💡 {intentSummary}
          </p>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Left Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="w-4 h-4 text-teal-600" />
            <span>Filters:</span>
          </div>

          {/* Degree Filter */}
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Degree Levels</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
            <option value="Bachelors">Bachelors</option>
          </select>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Countries</option>
            <option value="Germany">Germany 🇩🇪</option>
            <option value="United Kingdom">United Kingdom 🇬🇧</option>
            <option value="United States">United States 🇺🇸</option>
            <option value="Japan">Japan 🇯🇵</option>
            <option value="Turkey">Turkey 🇹🇷</option>
            <option value="European Union">European Union 🇪🇺</option>
          </select>

          {/* Funding Filter */}
          <select
            value={selectedFunding}
            onChange={(e) => setSelectedFunding(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Funding Types</option>
            <option value="Fully Funded">Fully Funded Only</option>
            <option value="Partially Funded">Partially Funded</option>
          </select>

          {/* Min Verification Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
            <span className="text-slate-500">Min Verification:</span>
            <input
              type="range"
              min="80"
              max="99"
              value={minTrustScore}
              onChange={(e) => setMinTrustScore(Number(e.target.value))}
              className="w-16 accent-teal-600"
            />
            <span className="font-mono font-bold text-teal-700">{minTrustScore}%</span>
          </div>
        </div>

        {/* Right Sort & Re-Match Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none text-slate-800 font-semibold focus:outline-none"
            >
              <option value="match">Highest Profile Match %</option>
              <option value="trust">Verification Rank</option>
              <option value="deadline">Nearest Deadline</option>
            </select>
          </div>

          <button
            onClick={handleRunMatchEngine}
            disabled={isMatchingAll}
            className="bg-teal-50 hover:bg-teal-100/80 text-teal-800 border border-teal-200 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            title="Recalculate profile match fit"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-600 ${isMatchingAll ? 'animate-spin' : ''}`} />
            <span>{isMatchingAll ? 'Matching...' : 'Re-Match Profile'}</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
        <span>Showing <strong className="text-slate-900 font-mono">{sortedScholarships.length}</strong> verified scholarships</span>
        <span>Latest Official Source Sync: <strong className="text-teal-700">Today, 23:30 PKT</strong></span>
      </div>

      {/* Grid of Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedScholarships.map((sch) => (
          <ScholarshipCard
            key={sch.id}
            scholarship={sch}
            matchScore={matchScores[sch.id]}
            onViewDetails={onViewDetails}
            onTrackApplication={onTrackApplication}
            onStartSop={onStartSop}
            isTracked={trackedIds.includes(sch.id)}
          />
        ))}
      </div>

      {sortedScholarships.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-slate-600 text-sm mb-3">No scholarships match your exact filter combination.</p>
          <button
            onClick={() => {
              setSelectedDegree('All');
              setSelectedCountry('All');
              setSelectedFunding('All');
              setMinTrustScore(80);
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs"
          >
            Reset Search Filters
          </button>
        </div>
      )}
    </div>
  );
};

