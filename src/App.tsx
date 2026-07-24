import React, { useState, useEffect } from 'react';
import {
  Scholarship,
  UserProfile,
  TrackedApplication,
  ScraperSource,
  AnomalyAlert,
  CommunityPost,
  CountryGuide,
  RegionTenant,
} from './types';
import {
  INITIAL_SCHOLARSHIPS,
  INITIAL_USER_PROFILE,
  INITIAL_TRACKED_APPLICATIONS,
  INITIAL_SCRAPERS,
  INITIAL_ANOMALIES,
  INITIAL_COMMUNITY_POSTS,
  COUNTRY_GUIDES,
} from './data/mockDatabase';

import { Navbar } from './components/Navbar';
import { SearchAndMatchView } from './components/SearchAndMatchView';
import { AutonomousScraperView } from './components/AutonomousScraperView';
import { ApplicationCommandCenterView } from './components/ApplicationCommandCenterView';
import { MockInterviewView } from './components/MockInterviewView';
import { TrustGraphView } from './components/TrustGraphView';
import { CommunityAndCountryHubView } from './components/CommunityAndCountryHubView';
import { OpsIntelligenceView } from './components/OpsIntelligenceView';
import { ScholarshipDetailModal } from './components/ScholarshipDetailModal';
import { UserProfileModal } from './components/UserProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('search');
  const [regionTenant, setRegionTenant] = useState<RegionTenant>('pakistan');

  // Core Data States (with LocalStorage PWA fallback)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('scholarpak_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
    const saved = localStorage.getItem('scholarpak_scholarships');
    return saved ? JSON.parse(saved) : INITIAL_SCHOLARSHIPS;
  });

  const [applications, setApplications] = useState<TrackedApplication[]>(() => {
    const saved = localStorage.getItem('scholarpak_applications');
    return saved ? JSON.parse(saved) : INITIAL_TRACKED_APPLICATIONS;
  });

  const [scrapers, setScrapers] = useState<ScraperSource[]>(INITIAL_SCRAPERS);
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>(INITIAL_ANOMALIES);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  // Modals
  const [selectedDetailScholarship, setSelectedDetailScholarship] = useState<Scholarship | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Sync state to LocalStorage for Offline-First PWA Support
  useEffect(() => {
    localStorage.setItem('scholarpak_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('scholarpak_scholarships', JSON.stringify(scholarships));
  }, [scholarships]);

  useEffect(() => {
    localStorage.setItem('scholarpak_applications', JSON.stringify(applications));
  }, [applications]);

  // Track / Untrack Scholarship Application Handler
  const handleToggleTrackApplication = (sch: Scholarship) => {
    const existingIndex = applications.findIndex((a) => a.scholarshipId === sch.id);
    if (existingIndex >= 0) {
      // Untrack
      const updated = applications.filter((a) => a.scholarshipId !== sch.id);
      setApplications(updated);
    } else {
      // Track
      const newTracked: TrackedApplication = {
        id: `app-${sch.id}-${Date.now()}`,
        scholarshipId: sch.id,
        status: 'preparing',
        addedAt: new Date().toISOString().split('T')[0],
        targetDeadline: sch.deadline,
        deadlineRiskAlert: `Deadline in ${sch.deadline}. Complete Statement of Purpose and references early.`,
        milestones: [
          { id: 'm1', title: 'Submit degree transcripts & HEC attestation', dueDate: sch.deadline, category: 'Documents', completed: false },
          { id: 'm2', title: 'Draft tailored Statement of Purpose (SOP)', dueDate: sch.deadline, category: 'SOP', completed: false },
          { id: 'm3', title: 'Request 2 recommendation letters', dueDate: sch.deadline, category: 'Recommender', completed: false },
        ],
        sopVersions: [],
        recommenders: [],
      };
      setApplications([...applications, newTracked]);
    }
  };

  const handleStartSop = (sch: Scholarship) => {
    handleToggleTrackApplication(sch);
    setActiveTab('command');
  };

  const handleUpdateApplication = (updatedApp: TrackedApplication) => {
    setApplications(
      applications.map((a) => (a.id === updatedApp.id ? updatedApp : a))
    );
  };

  const handleAddExtractedScholarship = (newSch: Scholarship) => {
    setScholarships([newSch, ...scholarships]);
    setSelectedDetailScholarship(newSch);
  };

  // Filter scholarships by region tenant
  const tenantFilteredScholarships = scholarships.filter((s) => {
    if (regionTenant === 'global') return true;
    if (regionTenant === 'pakistan') return s.regionTenant === 'pakistan' || s.regionTenant === 'global';
    if (regionTenant === 'south_asia') return s.regionTenant === 'south_asia' || s.regionTenant === 'global';
    return true;
  });

  const trackedIds = applications.map((a) => a.scholarshipId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-12">
      {/* Primary Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        regionTenant={regionTenant}
        setRegionTenant={setRegionTenant}
        openProfileModal={() => setShowProfileModal(true)}
        userName={userProfile.name}
      />

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'search' && (
          <SearchAndMatchView
            scholarships={tenantFilteredScholarships}
            userProfile={userProfile}
            onViewDetails={(sch) => setSelectedDetailScholarship(sch)}
            onTrackApplication={handleToggleTrackApplication}
            onStartSop={handleStartSop}
            trackedIds={trackedIds}
          />
        )}

        {activeTab === 'scraper' && (
          <AutonomousScraperView
            scrapers={scrapers}
            onAddExtractedScholarship={handleAddExtractedScholarship}
          />
        )}

        {activeTab === 'command' && (
          <ApplicationCommandCenterView
            applications={applications}
            scholarships={scholarships}
            userProfile={userProfile}
            onUpdateApplication={handleUpdateApplication}
          />
        )}

        {activeTab === 'interview' && (
          <MockInterviewView scholarships={tenantFilteredScholarships} />
        )}

        {activeTab === 'trust' && (
          <TrustGraphView scholarships={tenantFilteredScholarships} />
        )}

        {activeTab === 'community' && (
          <CommunityAndCountryHubView
            posts={posts}
            countryGuides={COUNTRY_GUIDES}
          />
        )}

        {activeTab === 'ops' && (
          <OpsIntelligenceView
            anomalies={anomalies}
            scrapers={scrapers}
          />
        )}
      </main>

      {/* Modals */}
      {selectedDetailScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedDetailScholarship}
          onClose={() => setSelectedDetailScholarship(null)}
          onTrackApplication={handleToggleTrackApplication}
          onStartSop={handleStartSop}
          isTracked={trackedIds.includes(selectedDetailScholarship.id)}
        />
      )}

      {showProfileModal && (
        <UserProfileModal
          userProfile={userProfile}
          onSaveProfile={(updated) => setUserProfile(updated)}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}
