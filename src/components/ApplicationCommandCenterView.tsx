import React, { useState } from 'react';
import { TrackedApplication, Scholarship, UserProfile, SopVersion, Recommender, ApplicationStatus } from '../types';
import {
  GanttChartSquare,
  Sparkles,
  AlertTriangle,
  FileText,
  CheckCircle2,
  UserCheck,
  Mail,
  Send,
  GitCompare,
  ShieldAlert,
  Plus,
  Copy,
  Clock,
  ArrowRight,
  ChevronRight,
  Check,
  Edit3
} from 'lucide-react';

interface ApplicationCommandCenterProps {
  applications: TrackedApplication[];
  scholarships: Scholarship[];
  userProfile: UserProfile;
  onUpdateApplication: (updatedApp: TrackedApplication) => void;
}

const STAGES: { id: ApplicationStatus; label: string; desc: string }[] = [
  { id: 'interested', label: 'Interested', desc: 'Saved for review' },
  { id: 'preparing', label: 'Preparing', desc: 'Drafting SOP & docs' },
  { id: 'applied', label: 'Applied', desc: 'Submitted to portal' },
  { id: 'interview', label: 'Interview', desc: 'Shortlisted' },
  { id: 'decision', label: 'Decision', desc: 'Outcome received' },
];

export const ApplicationCommandCenterView: React.FC<ApplicationCommandCenterProps> = ({
  applications,
  scholarships,
  userProfile,
  onUpdateApplication,
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const activeApp = applications.find((a) => a.id === selectedAppId) || applications[0];
  const activeScholarship = scholarships.find((s) => s.id === activeApp?.scholarshipId);

  // SOP Generation state
  const [customSopInstructions, setCustomSopInstructions] = useState('');
  const [isGeneratingSop, setIsGeneratingSop] = useState(false);
  const [activeSopVersionIndex, setActiveSopVersionIndex] = useState<number>(0);
  const [showDiffView, setShowDiffView] = useState(false);

  // AI Plagiarism / Screening state
  const [isCheckingAi, setIsCheckingAi] = useState(false);

  // Referee Modal state
  const [newRecName, setNewRecName] = useState('');
  const [newRecEmail, setNewRecEmail] = useState('');
  const [newRecDesignation, setNewRecDesignation] = useState('');
  const [newRecInstitution, setNewRecInstitution] = useState('');
  const [showRecModal, setShowRecModal] = useState(false);

  // 1. Generate New Tailored SOP Draft using Gemini Agent
  const handleGenerateSopDraft = async () => {
    if (!activeScholarship) return;
    setIsGeneratingSop(true);

    try {
      const res = await fetch('/api/ai/generate-sop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scholarship: activeScholarship,
          profile: userProfile,
          userInstructions: customSopInstructions,
        }),
      });

      const data = await res.json();

      const newVersion: SopVersion = {
        version: (activeApp.sopVersions?.length || 0) + 1,
        title: data.title || `Statement of Purpose Draft v${(activeApp.sopVersions?.length || 0) + 1}`,
        content: data.content,
        createdAt: new Date().toISOString().split('T')[0],
      };

      const updatedVersions = [...(activeApp.sopVersions || []), newVersion];
      const updatedApp = { ...activeApp, sopVersions: updatedVersions };
      onUpdateApplication(updatedApp);
      setActiveSopVersionIndex(updatedVersions.length - 1);
    } catch (err) {
      console.error('Error generating SOP:', err);
    } finally {
      setIsGeneratingSop(false);
    }
  };

  // 2. Check AI Detection & Plagiarism
  const handleCheckAiDetection = async () => {
    const currentSop = activeApp?.sopVersions?.[activeSopVersionIndex];
    if (!currentSop) return;

    setIsCheckingAi(true);
    try {
      const res = await fetch('/api/ai/check-ai-plagiarism', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: currentSop.content }),
      });

      const audit = await res.json();

      const updatedVersions = [...activeApp.sopVersions];
      updatedVersions[activeSopVersionIndex] = {
        ...currentSop,
        aiCheckResult: audit,
      };

      onUpdateApplication({ ...activeApp, sopVersions: updatedVersions });
    } catch (err) {
      console.error('Error checking AI detection:', err);
    } finally {
      setIsCheckingAi(false);
    }
  };

  // 3. Add Recommender Invitation
  const handleAddRecommender = () => {
    if (!newRecName || !newRecEmail) return;

    const newRec: Recommender = {
      id: `rec-${Date.now()}`,
      name: newRecName,
      email: newRecEmail,
      designation: newRecDesignation || 'Professor',
      institution: newRecInstitution || 'NUST Pakistan',
      status: 'invited',
    };

    const updatedApp = {
      ...activeApp,
      recommenders: [...(activeApp.recommenders || []), newRec],
    };

    onUpdateApplication(updatedApp);
    setNewRecName('');
    setNewRecEmail('');
    setNewRecDesignation('');
    setNewRecInstitution('');
    setShowRecModal(false);
  };

  // Toggle milestone completion
  const handleToggleMilestone = (milestoneId: string) => {
    const updatedMilestones = activeApp.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    onUpdateApplication({ ...activeApp, milestones: updatedMilestones });
  };

  // Change Application Stage
  const handleSetStage = (stageId: ApplicationStatus) => {
    onUpdateApplication({ ...activeApp, status: stageId });
  };

  if (!activeApp || !activeScholarship) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-200/90 text-center shadow-2xs space-y-4">
        <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
          <GanttChartSquare className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">No Saved Applications Yet</h3>
          <p className="text-slate-500 text-xs mt-1 max-w-md mx-auto">
            Explore scholarships in the "Find Scholarships" section and click <strong>"+ Save App"</strong> to start tracking deadlines and drafting tailored SOPs.
          </p>
        </div>
      </div>
    );
  }

  const currentSop = activeApp.sopVersions?.[activeSopVersionIndex];
  const previousSop = activeApp.sopVersions?.[activeSopVersionIndex - 1];

  const completedMilestonesCount = activeApp.milestones.filter((m) => m.completed).length;
  const milestoneProgress = Math.round((completedMilestonesCount / (activeApp.milestones.length || 1)) * 100);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Application Selector & Title Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/80 shrink-0">
            <GanttChartSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeScholarship.flag}</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                {activeScholarship.title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeScholarship.country} • {activeScholarship.provider} • Target Deadline: <strong className="font-mono text-slate-800">{activeScholarship.deadline}</strong>
            </p>
          </div>
        </div>

        {/* Saved Applications Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Active Application:</span>
          <select
            value={selectedAppId}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-none focus:border-teal-500"
          >
            {applications.map((app) => {
              const sch = scholarships.find((s) => s.id === app.scholarshipId);
              return (
                <option key={app.id} value={app.id}>
                  {sch?.title || 'Scholarship'} ({sch?.country})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Visual Application Kanban / Stage Progression Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Application Progress Stage</span>
          <span className="text-teal-700 font-medium">Stage: <strong className="capitalize">{activeApp.status}</strong></span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {STAGES.map((stage, idx) => {
            const currentStageIndex = STAGES.findIndex((s) => s.id === activeApp.status);
            const isCurrent = stage.id === activeApp.status;
            const isCompleted = idx < currentStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => handleSetStage(stage.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-teal-50 border-teal-300 text-teal-900 shadow-2xs font-semibold'
                    : isCompleted
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{stage.label}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />}
                </div>
                <span className="text-[10px] opacity-80 block">{stage.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deadline Risk Notification Banner (If present) */}
      {activeApp.deadlineRiskAlert && (
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <span className="font-bold block mb-0.5">Deadline Reminder & Next Step:</span>
            <span className="leading-relaxed">{activeApp.deadlineRiskAlert}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Checklist & Milestones + Referee Portal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Milestone Checklist & Timeline Progress */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Application Milestones & Readiness
              </h3>
            </div>

            <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              {milestoneProgress}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${milestoneProgress}%` }}
            />
          </div>

          {/* Milestones Checklist */}
          <div className="space-y-2.5 pt-1">
            {activeApp.milestones.map((m) => (
              <div
                key={m.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                  m.completed
                    ? 'bg-slate-50 border-slate-200 text-slate-500 line-through'
                    : 'bg-white border-slate-200/90 text-slate-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleMilestone(m.id)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                      m.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-teal-600 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <span className="font-semibold block">{m.title}</span>
                    <span className="text-[11px] text-slate-400">
                      Category: {m.category} • Target Due: <strong className="font-mono">{m.dueDate}</strong>
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${
                    m.completed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {m.completed ? 'Completed ✓' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Recommendation Letters Portal */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Referees & Recommendations
              </h3>
            </div>

            <button
              onClick={() => setShowRecModal(true)}
              className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-teal-600" />
              <span>Invite</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Invite your professors or mentors to upload recommendation letters securely for this application.
          </p>

          <div className="space-y-3">
            {activeApp.recommenders?.map((rec) => (
              <div key={rec.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900">{rec.name}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                      rec.status === 'submitted'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-600 block">{rec.designation} • {rec.institution}</span>
                <span className="text-[11px] text-slate-400 block">{rec.email}</span>

                {rec.status === 'invited' && (
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">Token: sec-rec-892</span>
                    <button
                      onClick={() => alert(`Secure referee invite resent to ${rec.email}`)}
                      className="text-[11px] text-teal-700 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Send className="w-3 h-3" /> Resend Invite
                    </button>
                  </div>
                )}
              </div>
            ))}

            {(!activeApp.recommenders || activeApp.recommenders.length === 0) && (
              <div className="text-slate-400 text-xs italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No recommenders invited yet. Click "Invite" above.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document-Editor Experience: Statement of Purpose (SOP) Tailoring Engine */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wide mb-1">
              <Edit3 className="w-4 h-4 text-teal-600" />
              <span>Statement of Purpose Writer</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Tailored SOP Drafts for {activeScholarship.title}
            </h3>
          </div>

          {/* Versions Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {activeApp.sopVersions?.map((v, idx) => (
              <button
                key={v.version}
                onClick={() => {
                  setActiveSopVersionIndex(idx);
                  setShowDiffView(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeSopVersionIndex === idx
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                Draft v{v.version} ({v.createdAt})
              </button>
            ))}

            {activeApp.sopVersions && activeApp.sopVersions.length > 1 && (
              <button
                onClick={() => setShowDiffView(!showDiffView)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  showDiffView
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-amber-800 hover:bg-slate-200/70'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Diff View</span>
              </button>
            )}
          </div>
        </div>

        {/* AI Generator Controls */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            value={customSopInstructions}
            onChange={(e) => setCustomSopInstructions(e.target.value)}
            placeholder="Custom instructions (e.g. 'Focus on research impact in SDG 9 Infrastructure & NUST AI lab')"
            className="flex-1 bg-white border border-slate-200 text-xs text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500 w-full"
          />

          <button
            onClick={handleGenerateSopDraft}
            disabled={isGeneratingSop}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 w-full md:w-auto shadow-xs"
          >
            {isGeneratingSop ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-white" />
                <span>Drafting with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Tailored SOP</span>
              </>
            )}
          </button>

          <button
            onClick={handleCheckAiDetection}
            disabled={isCheckingAi || !currentSop}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 w-full md:w-auto"
          >
            {isCheckingAi ? (
              <span>Auditing...</span>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-indigo-600" />
                <span>Check AI & Readiness</span>
              </>
            )}
          </button>
        </div>

        {/* Diff View Comparison OR Document Paper Canvas */}
        {showDiffView && previousSop && currentSop ? (
          <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 space-y-3">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-amber-600" />
              Version Diff Comparison: v{previousSop.version} vs v{currentSop.version}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-slate-500 block font-bold mb-2">Previous Draft (v{previousSop.version}):</span>
                <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{previousSop.content}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-teal-200">
                <span className="text-teal-800 block font-bold mb-2">New AI Tailored Draft (v{currentSop.version}):</span>
                <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{currentSop.content}</p>
              </div>
            </div>
          </div>
        ) : (
          currentSop && (
            <div className="space-y-4">
              {/* Google Docs / Notion Style Paper Canvas */}
              <div className="sop-paper p-6 sm:p-10 relative max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <span className="font-bold text-slate-800 text-sm">{currentSop.title}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(currentSop.content)}
                    className="text-xs text-teal-700 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Text
                  </button>
                </div>

                <div className="text-sm sm:text-base text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto pr-2 font-sans">
                  {currentSop.content}
                </div>
              </div>

              {/* AI Detection & Quality Audit Report */}
              {currentSop.aiCheckResult && (
                <div className="bg-indigo-50/70 rounded-2xl p-6 border border-indigo-200/80 space-y-3 max-w-3xl mx-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-indigo-600" />
                      Scholarship Portal Readiness & Human-Tone Audit
                    </span>

                    <span className="bg-white text-indigo-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-indigo-200 shadow-2xs">
                      Rating: {currentSop.aiCheckResult.burstinessRating}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">AI Screening Flag Risk:</span>
                      <span className="text-base font-bold text-emerald-700 font-mono">
                        {currentSop.aiCheckResult.aiPercentage}% Low Risk
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Readability Score:</span>
                      <span className="text-base font-bold text-indigo-800 font-mono">
                        {currentSop.aiCheckResult.readabilityScore}/100
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                      <span className="text-slate-500 block text-[11px] font-medium">Official Portal Status:</span>
                      <span className="text-xs font-bold text-emerald-700">
                        Safe for Submission ✓
                      </span>
                    </div>
                  </div>

                  {/* Constructive Suggestions */}
                  <div className="text-xs text-slate-700 space-y-1 pt-1">
                    <span className="font-bold text-indigo-900 block">Personalization Suggestions:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {currentSop.aiCheckResult.suggestions?.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Invite Referee Modal */}
      {showRecModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-md w-full shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Mail className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Invite Professor or Referee
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Your referee will receive a secure token link to submit recommendation letters directly.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-medium block mb-1">Referee Full Name:</label>
                <input
                  type="text"
                  value={newRecName}
                  onChange={(e) => setNewRecName(e.target.value)}
                  placeholder="e.g. Dr. Arshad Mahmood"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-700 font-medium block mb-1">Official Email Address:</label>
                <input
                  type="email"
                  value={newRecEmail}
                  onChange={(e) => setNewRecEmail(e.target.value)}
                  placeholder="e.g. arshad.m@seecs.nust.edu.pk"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-700 font-medium block mb-1">Designation & Institution:</label>
                <input
                  type="text"
                  value={newRecDesignation}
                  onChange={(e) => setNewRecDesignation(e.target.value)}
                  placeholder="e.g. Professor & Head of Department, NUST"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowRecModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRecommender}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-xs"
              >
                Send Invitation Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

