'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useSkillForge } from '@/lib/store';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CandidateCard } from '@/components/CandidateCard';
import { EmptyState } from '@/components/EmptyState';
import { InviteToTeamModal } from '@/components/InviteToTeamModal';
import { Candidate } from '@/lib/types';

export default function DiscoverPage() {
  const { allCandidates, teams } = useSkillForge();

  const [activeTab, setActiveTab] = useState<'candidates' | 'teams'>('candidates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [minConfidence, setMinConfidence] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  // Invite modal state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const availableSkills = ['all', 'React', 'Python', 'Machine Learning', 'PyTorch', 'Solidity', 'Rust', 'Go', 'Next.js'];

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter(candidate => {
      // Search term
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Skill filter
      const matchesSkill =
        selectedSkill === 'all' ||
        candidate.skills.some(
          s =>
            s.name.toLowerCase() === selectedSkill.toLowerCase() &&
            (!verifiedOnly || s.status === 'VERIFIED')
        );

      // Role filter
      const matchesRole =
        selectedRole === 'all' ||
        candidate.role.toLowerCase().includes(selectedRole.toLowerCase());

      // Min confidence
      const matchesConfidence = candidate.overallConfidence >= minConfidence;

      return matchesSearch && matchesSkill && matchesRole && matchesConfidence;
    });
  }, [allCandidates, searchQuery, selectedSkill, selectedRole, minConfidence, verifiedOnly]);

  const handleOpenInvite = (cand: Candidate) => {
    setSelectedCandidate(cand);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
                Builder & Team Discovery
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 font-semibold">
                HackGenesis &apos;26
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Discover verified technical builders by practical assessment score or recruit for open team roles.
            </p>
          </div>

          {/* Toggle between Candidates and Teams */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F1F5F9] border border-[#E5E7EB] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('candidates')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'candidates'
                  ? 'bg-white text-[#0A0A0A] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0A0A0A]'
              }`}
            >
              Verified Builders ({allCandidates.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('teams')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'teams'
                  ? 'bg-white text-[#0A0A0A] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0A0A0A]'
              }`}
            >
              Hackathon Teams ({teams.length})
            </button>
          </div>
        </div>

        {activeTab === 'candidates' ? (
          <div className="space-y-6">
            {/* Search and Filters Toolbar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Search input */}
                <div className="relative w-full sm:flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                    <Search size={15} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by name, university, or tech (e.g. Alex, Stanford, React, Python)..."
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#635BFF] focus:bg-white transition-colors"
                  />
                </div>

                {/* Min Confidence Dropdown */}
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <span className="text-xs text-[#6B7280] shrink-0 font-medium">Min Trust:</span>
                  <select
                    value={minConfidence}
                    onChange={e => setMinConfidence(Number(e.target.value))}
                    className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] focus:outline-none focus:border-[#635BFF] font-mono cursor-pointer"
                  >
                    <option value={0}>Any Score</option>
                    <option value={80}>≥ 80% (High)</option>
                    <option value={90}>≥ 90% (Top Tier)</option>
                  </select>
                </div>

                {/* Verified Only Toggle */}
                <label className="w-full sm:w-auto flex items-center gap-2 text-xs text-[#374151] px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] cursor-pointer shrink-0 select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={e => setVerifiedOnly(e.target.checked)}
                    className="rounded border-[#E5E7EB] text-[#635BFF] focus:ring-[#635BFF]"
                  />
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span className="font-medium">Verified Only</span>
                </label>
              </div>

              {/* Skill Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[#9CA3AF] font-mono text-[11px] mr-1 shrink-0">Skills:</span>
                {availableSkills.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-3 py-1 rounded-lg font-mono text-xs capitalize whitespace-nowrap transition-all cursor-pointer ${
                      selectedSkill === skill
                        ? 'bg-[#635BFF] text-white font-bold shadow-xs'
                        : 'bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] hover:text-[#0A0A0A] hover:bg-white'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Grid */}
            {filteredCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCandidates.map(c => (
                  <CandidateCard
                    key={c.id}
                    candidate={c}
                    onInvite={handleOpenInvite}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No verified candidates match this criteria"
                description="Try lowering the minimum trust threshold or removing skill filters."
                actionLabel="Reset All Filters"
                onAction={() => {
                  setSearchQuery('');
                  setSelectedSkill('all');
                  setSelectedRole('all');
                  setMinConfidence(0);
                  setVerifiedOnly(false);
                }}
              />
            )}
          </div>
        ) : (
          /* Teams Tab */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map(team => (
                <div
                  key={team.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={team.avatar}
                          alt={team.name}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#E5E7EB] bg-[#F8FAFC]"
                        />
                        <div>
                          <h3 className="text-base font-bold text-[#0A0A0A]">{team.name}</h3>
                          <p className="text-xs text-[#635BFF] font-semibold">{team.tagline}</p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {team.openSpots} Open Spot{team.openSpots > 1 ? 's' : ''}
                      </span>
                    </div>

                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {team.description}
                    </p>

                    {/* Skill Coverage Matrix Bar */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] font-bold block">
                        Team Skill Coverage
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {team.skillCoverage.map(sc => (
                          <div
                            key={sc.category}
                            className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-between"
                          >
                            <span className="text-[11px] text-[#4B5563] truncate">{sc.category}</span>
                            <span className="font-mono font-bold text-[#635BFF]">
                              {sc.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Seeking Roles */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] font-bold block">
                        Recruiting Roles:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {team.lookingFor.map(role => (
                          <span
                            key={role}
                            className="text-xs px-2.5 py-0.5 rounded-md bg-[#635BFF]/10 border border-[#635BFF]/20 text-[#635BFF] font-medium"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {team.members.map(m => (
                        <img
                          key={m.id}
                          src={m.avatar}
                          alt={m.name}
                          className="w-7 h-7 rounded-full object-cover border-2 border-white"
                          title={`${m.name} (${m.role})`}
                        />
                      ))}
                      <span className="text-[11px] text-[#6B7280] pl-3 font-medium">
                        {team.members.length} builder{team.members.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Application submitted for ${team.name}!`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <span>Apply to Join</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightweight Team Invitation Dialog */}
      {selectedCandidate && (
        <InviteToTeamModal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          candidateName={selectedCandidate.name}
          candidateUsername={selectedCandidate.username}
          initialRole="Frontend Developer"
          initialMessage="We're looking for someone strong in React. Your verified profile looks like a good fit."
        />
      )}
    </DashboardLayout>
  );
}
