import React, { useState } from 'react';
import { UserProfile, DegreeLevel } from '../types';
import { X, FileUser, Upload, CheckCircle2, AlertCircle, Save } from 'lucide-react';

interface UserProfileModalProps {
  userProfile: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  userProfile,
  onSaveProfile,
  onClose,
}) => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);

  const handleToggleDocReady = (index: number) => {
    const updatedDocs = [...profile.uploadedDocuments];
    updatedDocs[index] = { ...updatedDocs[index], ready: !updatedDocs[index].ready };
    setProfile({ ...profile, uploadedDocuments: updatedDocs });
  };

  const handleSave = () => {
    onSaveProfile(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200/90 max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-xl relative my-8 max-h-[90vh] overflow-y-auto font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold border border-teal-200/80 shrink-0">
            <FileUser className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Student Academic Profile & Document Vault</h3>
            <p className="text-xs text-slate-500">
              Used by ScholarPak AI to match scholarships and tailor personalized Statement of Purpose drafts.
            </p>
          </div>
        </div>

        {/* Inputs Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-700 block mb-1 font-semibold">Full Name:</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-semibold">Email Address:</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-semibold">Target Degree Level:</label>
            <select
              value={profile.targetDegree}
              onChange={(e) => setProfile({ ...profile, targetDegree: e.target.value as DegreeLevel })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
            >
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              <option value="Bachelors">Bachelors</option>
              <option value="PostDoc">PostDoc</option>
            </select>
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-semibold">Field of Study:</label>
            <input
              type="text"
              value={profile.fieldOfStudy}
              onChange={(e) => setProfile({ ...profile, fieldOfStudy: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-semibold">GPA (Out of 4.0):</label>
            <input
              type="number"
              step="0.01"
              value={profile.gpa}
              onChange={(e) => setProfile({ ...profile, gpa: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-semibold">IELTS / TOEFL Score:</label>
            <input
              type="number"
              step="0.5"
              value={profile.ieltsScore}
              onChange={(e) => setProfile({ ...profile, ieltsScore: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-semibold">Work Experience (Years):</label>
            <input
              type="number"
              value={profile.workExpYears}
              onChange={(e) => setProfile({ ...profile, workExpYears: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-semibold">Citizenship:</label>
            <input
              type="text"
              value={profile.citizenship}
              onChange={(e) => setProfile({ ...profile, citizenship: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
            />
          </div>
        </div>

        {/* Uploaded CV Text */}
        <div className="space-y-1 text-xs">
          <label className="text-slate-700 block font-semibold">CV & Academic Profile Highlights:</label>
          <textarea
            value={profile.uploadedCvText}
            onChange={(e) => setProfile({ ...profile, uploadedCvText: e.target.value })}
            rows={4}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-teal-500 font-sans leading-relaxed"
          />
        </div>

        {/* Document Readiness Vault */}
        <div className="space-y-2 text-xs">
          <label className="text-slate-700 block font-semibold">Document Vault Readiness Checklist:</label>
          <div className="space-y-2">
            {profile.uploadedDocuments?.map((doc, idx) => (
              <div
                key={idx}
                onClick={() => handleToggleDocReady(idx)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  doc.ready
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${doc.ready ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span className="font-semibold">{doc.name}</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  {doc.ready ? 'Ready ✓' : 'Pending / Missing'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

