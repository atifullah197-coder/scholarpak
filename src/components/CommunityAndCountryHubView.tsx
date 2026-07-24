import React, { useState } from 'react';
import { CommunityPost, CountryGuide } from '../types';
import { Users, Globe, Award, MessageSquare, ThumbsUp, CheckCircle2, Sparkles, MapPin, Building, BookOpen, ChevronRight, HeartHandshake } from 'lucide-react';

interface CommunityAndCountryHubProps {
  posts: CommunityPost[];
  countryGuides: CountryGuide[];
}

export const CommunityAndCountryHubView: React.FC<CommunityAndCountryHubProps> = ({
  posts: initialPosts,
  countryGuides,
}) => {
  const [activeTab, setActiveTab] = useState<'community' | 'guides'>('community');
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('DE');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const activeGuide = countryGuides.find((g) => g.code === selectedCountryCode) || countryGuides[0];

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostContent) return;
    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      author: 'Hamza Khan',
      verifiedAlumni: true,
      alumniBadge: 'NUST Graduate & Verified Scholar',
      university: 'NUST Pakistan',
      country: 'Pakistan / Global',
      title: newPostTitle,
      content: newPostContent,
      likes: 1,
      commentsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      tags: ['Scholarship Advice', 'Community'],
    };

    setPosts([post, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wide mb-1.5">
            <HeartHandshake className="w-4 h-4 text-teal-600" />
            <span>Alumni Knowledge Sharing & Country Guides</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Verified Alumni & Country Study Guides
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Connect with verified scholarship recipients. Explore AI-summarized visa requirements, HEC degree attestation checklists, and living cost breakdowns for top destinations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'community'
                ? 'bg-white text-teal-800 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Alumni Q&A & Advice
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'guides'
                ? 'bg-white text-teal-800 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Country & Visa Guides
          </button>
        </div>
      </div>

      {/* Tab 1: Verified Alumni Community Threads */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              Verified Scholar & Alumni Insights
            </h3>

            <button
              onClick={() => setShowNewPostModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs"
            >
              + Ask Question or Share Tip
            </button>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4 font-sans">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm border border-teal-200/80 shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">{post.author}</span>
                        {post.verifiedAlumni && (
                          <span className="bg-teal-50 text-teal-800 text-[11px] px-2.5 py-0.5 rounded-full border border-teal-200/80 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Verified Scholar
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-amber-800 font-medium">{post.alumniBadge}</span>
                    </div>
                  </div>

                  <span className="text-xs text-slate-500 font-mono">{post.createdAt}</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 hover:text-teal-700 transition-colors leading-snug">
                  {post.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.map((t) => (
                      <span key={t} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-slate-200/60">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="hover:text-teal-700 flex items-center gap-1.5 font-medium transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes} Helpful</span>
                    </button>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentsCount} replies</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Country Guides & Visa / HEC Steps */}
      {activeTab === 'guides' && (
        <div className="space-y-6">
          {/* Country Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {countryGuides.map((g) => (
              <button
                key={g.code}
                onClick={() => setSelectedCountryCode(g.code)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCountryCode === g.code
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span className="text-base">{g.flag}</span>
                <span>{g.name}</span>
              </button>
            ))}
          </div>

          {/* Active Country Guide Details */}
          {activeGuide && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
              {/* Left 2 Cols: Main Guide Content */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{activeGuide.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{activeGuide.name} Study & Visa Guide</h3>
                      <span className="text-xs text-slate-500 font-medium">Visa Category: {activeGuide.visaType}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-left sm:text-right">
                    <span className="text-[11px] text-slate-500 block font-medium">Avg Living Cost:</span>
                    <span className="text-sm font-bold text-teal-800 font-mono">{activeGuide.avgLivingCost}</span>
                  </div>
                </div>

                {/* AI Summary Box */}
                <div className="bg-teal-50/60 p-4 sm:p-5 rounded-2xl border border-teal-200/80 text-xs sm:text-sm space-y-2">
                  <span className="font-bold text-teal-900 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    AI Country Study Overview & Post-Study Work Opportunities
                  </span>
                  <p className="text-slate-800 leading-relaxed">{activeGuide.aiSummary}</p>
                </div>

                {/* HEC Attestation Steps Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    HEC & MoFA Degree Attestation Checklist for {activeGuide.name}:
                  </h4>

                  <div className="space-y-2">
                    {activeGuide.hecAttestationSteps.map((step, idx) => (
                      <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs text-slate-800 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold shrink-0 text-xs border border-teal-200">
                          {idx + 1}
                        </span>
                        <span className="font-medium leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Frequently Asked Questions (Scholars & Applicants):
                  </h4>

                  <div className="space-y-3">
                    {activeGuide.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                        <span className="font-bold text-teal-900 block text-xs">Q: {faq.question}</span>
                        <p className="text-slate-700 leading-relaxed">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 1 Col: Top Universities */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Building className="w-4 h-4 text-teal-600" />
                  Top Target Universities in {activeGuide.name}
                </h4>

                <div className="space-y-2">
                  {activeGuide.topUniversities.map((uni, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs font-medium text-slate-800 flex items-center justify-between hover:bg-teal-50/50 transition-colors">
                      <span>{uni}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 max-w-lg w-full shadow-xl space-y-4 font-sans">
            <h3 className="text-base font-bold text-slate-900">Create Alumni Discussion Post</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Title / Question:</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="e.g. Tips for DAAD EPOS Interview or Chevening Essay"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Detailed Content:</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={5}
                  placeholder="Share advice, visa steps, or scholarship questions..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs shadow-xs"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
