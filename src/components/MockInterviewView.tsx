import React, { useState } from 'react';
import { Mic, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Award, HeartHandshake, Smile, Volume2 } from 'lucide-react';
import { Scholarship } from '../types';

interface MockInterviewViewProps {
  scholarships: Scholarship[];
}

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({ scholarships }) => {
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string>(scholarships[0]?.id || '');
  const activeScholarship = scholarships.find((s) => s.id === selectedScholarshipId) || scholarships[0];

  const interviewQuestions = [
    `Why did you specifically choose ${activeScholarship?.country || 'this country'} over other global study destinations?`,
    `How does your professional experience align with the core values of ${activeScholarship?.provider || 'this funding provider'}?`,
    `Describe a scenario where you demonstrated leadership or initiative without an official title.`,
    `What is your 5-year post-graduation career plan upon returning to your home country?`,
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState(
    'In my experience as a software engineer at TechLogix Pakistan, I led the development of automated document pipelines. I chose Germany because of its world-class state engineering universities like TU Munich. After completing my degree, I plan to return to Pakistan to establish a machine learning lab focusing on local flood resilience.'
  );

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState<any | null>(null);

  // Simulated Voice Recording Toggle
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 25) {
            clearInterval(interval);
            setIsRecording(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Run AI Evaluation
  const handleEvaluateAnswer = async () => {
    if (!candidateAnswer.trim()) return;
    setIsEvaluating(true);
    setInterviewFeedback(null);

    try {
      const res = await fetch('/api/ai/mock-interview-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: interviewQuestions[currentQuestionIndex],
          answerText: candidateAnswer,
          scholarshipTitle: activeScholarship?.title,
        }),
      });

      const data = await res.json();
      setInterviewFeedback(data);
    } catch (err) {
      console.error('Error evaluating interview answer:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wide mb-1.5">
            <HeartHandshake className="w-4 h-4 text-teal-600" />
            <span>Supportive Interview Practice Environment</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Mock Scholarship Interview Practice
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Practice at your own pace in a friendly, pressure-free space. Simulate panel questions for DAAD, Chevening, Fulbright, and MEXT to build authentic confidence and refine your personal stories.
          </p>
        </div>

        {/* Target Scholarship Picker */}
        <div className="flex items-center gap-2 shrink-0 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <span className="text-xs text-slate-600 font-semibold">Practicing For:</span>
          <select
            value={selectedScholarshipId}
            onChange={(e) => {
              setSelectedScholarshipId(e.target.value);
              setInterviewFeedback(null);
            }}
            className="bg-white border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-1.5 font-semibold focus:outline-none focus:border-teal-500 shadow-2xs"
          >
            {scholarships.map((sch) => (
              <option key={sch.id} value={sch.id}>
                {sch.title} ({sch.flag})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Virtual Interview Stage + AI Feedback Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Virtual Interview Stage */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
          {/* Virtual Panel Avatar Card */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs border border-teal-200 shrink-0">
                  <Smile className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">AI Panel Mentor</span>
                  <span className="text-[11px] text-slate-500">{activeScholarship?.provider} Selection Board</span>
                </div>
              </div>

              <span className="bg-teal-50 text-teal-800 text-[11px] px-3 py-1 rounded-full border border-teal-200 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Practice Mode Active
              </span>
            </div>

            {/* Question Card */}
            <div className="bg-white p-5 rounded-xl border border-teal-200/80 shadow-2xs space-y-2">
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wide block">
                Question {currentQuestionIndex + 1} of {interviewQuestions.length}:
              </span>
              <p className="text-base font-bold text-slate-900 leading-snug">
                "{interviewQuestions[currentQuestionIndex]}"
              </p>
            </div>

            {/* Question Selector Dots */}
            <div className="flex items-center gap-2 justify-center pt-1">
              {interviewQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setInterviewFeedback(null);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    currentQuestionIndex === idx ? 'bg-teal-600 w-8' : 'bg-slate-200 hover:bg-slate-300 w-2.5'
                  }`}
                  title={`Go to question ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Candidate Answer Box & Recording Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-semibold">Your Spoken or Written Response:</span>
              <button
                onClick={toggleRecording}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isRecording
                    ? 'bg-rose-50 text-rose-800 border border-rose-200 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-rose-600" />
                <span>{isRecording ? `Recording... (${recordingTime}s)` : 'Simulate Mic Practice'}</span>
              </button>
            </div>

            <textarea
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              rows={5}
              placeholder="Type or speak your practice answer to the selection board..."
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white font-sans leading-relaxed"
            />

            <button
              onClick={handleEvaluateAnswer}
              disabled={isEvaluating}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing Answer & Preparing Helpful Feedback...</span>
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  <span>Get Gentle Board Feedback & Tips</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Feedback & Gauges */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-teal-600" />
            Interview Board Guidance & Encouraging Feedback
          </h3>

          {interviewFeedback ? (
            <div className="space-y-4 font-sans">
              {/* Encouraging Progress Indicator Bars */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-slate-700">Overall Readiness</span>
                    <span className="text-teal-800 font-mono">{interviewFeedback.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full transition-all duration-500" style={{ width: `${interviewFeedback.score}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-slate-700">Answer Clarity & Depth</span>
                    <span className="text-indigo-800 font-mono">{interviewFeedback.contentQualityScore}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${interviewFeedback.contentQualityScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-slate-700">Pacing & Vocal Confidence</span>
                    <span className="text-amber-800 font-mono">{interviewFeedback.simulatedConfidencePercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-amber-600 h-2 rounded-full transition-all duration-500" style={{ width: `${interviewFeedback.simulatedConfidencePercentage}%` }} />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs flex justify-between items-center text-emerald-900 font-medium">
                <span>Tone & Flow Indicator:</span>
                <span className="font-bold bg-white text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                  {interviewFeedback.toneAndPacingRating}
                </span>
              </div>

              {/* Strengths */}
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 text-xs space-y-2">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Key Strengths Noted by Board:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
                  {interviewFeedback.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-xs space-y-2">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" /> Constructive Refinement Tips:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-800 leading-relaxed">
                  {interviewFeedback.improvements?.map((imp: string, idx: number) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>

              {/* Ideal Sample Answer */}
              <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200 text-xs space-y-2">
                <span className="font-bold text-teal-900 block">Sample Stronger Response Structure:</span>
                <p className="text-slate-800 leading-relaxed font-sans bg-white p-3 rounded-lg border border-teal-100">
                  "{interviewFeedback.sampleStrongerAnswer}"
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 text-xs space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Volume2 className="w-6 h-6 text-slate-400" />
              </div>
              <p className="max-w-xs mx-auto leading-relaxed">
                Practice your answer on the left and click <strong>"Get Gentle Board Feedback"</strong> to view clear, encouraging tips from our AI panel simulator.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

