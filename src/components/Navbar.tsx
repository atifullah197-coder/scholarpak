import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Search,
  Bot,
  GanttChartSquare,
  Mic,
  Users,
  Activity,
  CheckCircle2,
  Globe,
  FileUser,
  ChevronDown,
  Cpu,
  Settings,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { RegionTenant } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  regionTenant: RegionTenant;
  setRegionTenant: (tenant: RegionTenant) => void;
  openProfileModal: () => void;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  regionTenant,
  setRegionTenant,
  openProfileModal,
  userName,
}) => {
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showSystemStatusModal, setShowSystemStatusModal] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark') ||
      localStorage.getItem('scholarpak_theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('scholarpak_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('scholarpak_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const studentNavItems = [
    { id: 'search', label: 'Find Scholarships', icon: Search },
    { id: 'command', label: 'My Applications', icon: GanttChartSquare },
    { id: 'interview', label: 'Mock Interview', icon: Mic },
    { id: 'community', label: 'Community & Guides', icon: Users },
  ];

  const adminNavItems = [
    { id: 'scraper', label: 'Scraper Pipeline', icon: Bot, desc: 'Live AI scraping pipeline' },
    { id: 'trust', label: 'Trust Graph', icon: ShieldCheck, desc: 'Source verification matrix' },
    { id: 'ops', label: 'Ops Intelligence', icon: Activity, desc: 'Telemetry & system logs' },
  ];

  const isAdminActive = adminNavItems.some((item) => item.id === activeTab);

  return (
    <header className="bg-white border-b border-slate-200/90 text-slate-800 sticky top-0 z-40 shadow-xs">
      {/* Top Utility & Profile Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 border-b border-slate-100">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-xs text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 font-sans">
                ScholarPak <span className="text-teal-600">AI</span>
              </h1>
              <span className="bg-teal-50 text-teal-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-teal-200 uppercase tracking-wide">
                Verified Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Your trusted companion for fully funded scholarships & AI application guidance
            </p>
          </div>
        </div>

        {/* Right Controls: Region, System Status Trigger, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Region Tenant Switcher */}
          <div className="hidden md:flex items-center bg-slate-100/80 rounded-lg p-0.5 border border-slate-200 text-xs">
            <button
              onClick={() => setRegionTenant('pakistan')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                regionTenant === 'pakistan'
                  ? 'bg-white text-teal-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇵🇰</span>
              <span>Pakistan</span>
            </button>
            <button
              onClick={() => setRegionTenant('south_asia')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                regionTenant === 'south_asia'
                  ? 'bg-white text-teal-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🌏</span>
              <span>South Asia</span>
            </button>
            <button
              onClick={() => setRegionTenant('global')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                regionTenant === 'global'
                  ? 'bg-white text-teal-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🌐</span>
              <span>Global</span>
            </button>
          </div>

          {/* System Telemetry Modal Button (Tucked Away for Power Users) */}
          <button
            onClick={() => setShowSystemStatusModal(true)}
            className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
            title="View system status and AI model telemetry"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden lg:inline text-xs font-medium">System Status</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition-colors"
            title={isDark ? 'Switch to Warm Light Mode' : 'Switch to Soft Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Button */}
          <button
            onClick={openProfileModal}
            className="flex items-center gap-2 bg-teal-50 hover:bg-teal-100/80 text-teal-800 px-3 py-1.5 rounded-lg border border-teal-200/80 transition-all font-medium text-xs shadow-xs"
          >
            <FileUser className="w-4 h-4 text-teal-600" />
            <span className="font-semibold max-w-[120px] truncate">{userName}</span>
          </button>
        </div>
      </div>

      {/* Main Student Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <nav className="flex space-x-1 py-1.5 overflow-x-auto no-scrollbar font-sans text-xs">
          {studentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 border border-teal-200/80 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Secondary / Admin Tools Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAdminDropdown(!showAdminDropdown)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isAdminActive
                ? 'bg-slate-100 text-teal-700 border border-slate-300 font-semibold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin Pipeline</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showAdminDropdown && (
            <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 space-y-1">
              <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Technical Tools
              </div>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowAdminDropdown(false);
                    }}
                    className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-all ${
                      isActive
                        ? 'bg-teal-50 text-teal-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Tucked Away System Status Modal */}
      {showSystemStatusModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-md w-full shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">System & AI Engine Telemetry</h3>
              </div>
              <button
                onClick={() => setShowSystemStatusModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-medium">Offline PWA Cache:</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active ✓
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-medium">AI Model Provider:</span>
                <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Gemini 3.6 Flash
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-medium">Multi-Tenant Region:</span>
                <span className="font-mono text-slate-800 font-bold uppercase">{regionTenant}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                All scholarship criteria and deadlines are continuously updated via verified RSS & web scraper feeds. Data is cached locally for instant offline access.
              </div>
            </div>

            <button
              onClick={() => setShowSystemStatusModal(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded-xl text-xs transition-colors"
            >
              Close Telemetry Modal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

