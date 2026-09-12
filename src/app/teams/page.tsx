'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users2,
  ShieldCheck,
  CheckCircle2,
  UserPlus,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Briefcase,
  Send,
  Clock,
  Crown,
} from 'lucide-react';
import { useSkillForge } from '@/lib/store';
import { DashboardLayout } from '@/components/DashboardLayout';
import { InviteToTeamModal } from '@/components/InviteToTeamModal';

export default function TeamsPage() {
  const { invites, teams, allCandidates } = useSkillForge();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'invites'>('overview');

  // Primary active team: CodeForge
  const codeForgeTeam = teams.find(t => t.name === 'CodeForge') || teams[0];

  // Suggested Candidate: Alex Morgan
  const alexCandidate =
    allCandidates.find(
      c => c.username === 'alexmorgan' || c.name.toLowerCase().includes('alex')
    ) || allCandidates[0];

  // Check if an invitation to Alex Morgan has been sent
  const alexInvite = invites.find(
    i =>
      i.invitedCandidateUsername === 'alexmorgan' ||
      i.invitedCandidateUsername === alexCandidate.username
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
                CodeForge
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 font-semibold">
                SkillSprint 2026
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Squad
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Collaborative developer workspace and verified skill squad for technical hackathons.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setInviteModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <UserPlus size={14} />
              <span>Invite Frontend Developer</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 shadow-sm'
                : 'text-[#6B7280] hover:text-[#0A0A0A]'
            }`}
          >
            <Users2 size={14} />
            <span>Team Roster & Open Role</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('invites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'invites'
                ? 'bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 shadow-sm'
                : 'text-[#6B7280] hover:text-[#0A0A0A]'
            }`}
          >
            <Send size={14} />
            <span>Sent Invitations</span>
            {invites.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#635BFF] text-white font-bold">
                {invites.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* ========================================================= */}
            {/* SECTION 1: MEMBERS                                        */}
            {/* ========================================================= */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider font-mono flex items-center gap-2">
                    <Users2 size={16} className="text-[#635BFF]" />
                    <span>Members</span>
                  </h2>
                  <p className="text-xs text-[#6B7280]">
                    Current active builders collaborating in CodeForge.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#6B7280] font-medium">
                  3 of 4 Spots Filled
                </span>
              </div>

              {/* Members Grid: Sam, Maya, You */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Sam — Backend */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#635BFF]/40 shadow-subtle hover:shadow-card transition-all space-y-3 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                          alt="Sam"
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#E5E7EB] bg-[#F8FAFC]"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#0A0A0A]">Sam</h3>
                        <p className="text-xs text-[#635BFF] font-semibold">Backend</p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20">
                      Sam — Backend
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B7280] text-[11px]">Primary Competency</span>
                      <span className="font-mono text-emerald-700 font-semibold text-[11px]">Go & Distributed Systems</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B7280] text-[11px]">Trust Score</span>
                      <span className="font-mono text-[#635BFF] font-bold text-[11px]">94% Confidence</span>
                    </div>
                  </div>
                </div>

                {/* 2. Maya — UI/UX */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#635BFF]/40 shadow-subtle hover:shadow-card transition-all space-y-3 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
                          alt="Maya"
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#E5E7EB] bg-[#F8FAFC]"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#0A0A0A]">Maya</h3>
                        <p className="text-xs text-purple-600 font-semibold">UI/UX</p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                      Maya — UI/UX
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B7280] text-[11px]">Primary Competency</span>
                      <span className="font-mono text-emerald-700 font-semibold text-[11px]">Design Systems & Figma</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B7280] text-[11px]">Trust Score</span>
                      <span className="font-mono text-purple-700 font-bold text-[11px]">91% Confidence</span>
                    </div>
                  </div>
                </div>

                {/* 3. You — AI/ML */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-white via-[#F8FAFC] to-[#F1F5F9] border border-[#635BFF]/30 hover:border-[#635BFF]/60 transition-all space-y-3 flex flex-col justify-between shadow-subtle hover:shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                          alt="You"
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#635BFF]/40 bg-[#F8FAFC]"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#635BFF] ring-2 ring-white flex items-center justify-center">
                          <Crown size={9} className="text-white" />
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-[#0A0A0A]">You</h3>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#635BFF]/10 text-[#635BFF]">
                            Team Lead
                          </span>
                        </div>
                        <p className="text-xs text-cyan-700 font-semibold">AI/ML</p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200">
                      You — AI/ML
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B7280] text-[11px]">Primary Competency</span>
                      <span className="font-mono text-emerald-700 font-semibold text-[11px]">LLMs & Agentic Systems</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B7280] text-[11px]">Trust Score</span>
                      <span className="font-mono text-cyan-700 font-bold text-[11px]">95% Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SECTION 2: OPEN ROLE                                      */}
            {/* ========================================================= */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider font-mono flex items-center gap-2">
                <Briefcase size={16} className="text-amber-600" />
                <span>Open Role</span>
              </h2>

              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A]">
                      Frontend Developer
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                      1 Position Open
                    </span>
                  </div>
                  <p className="text-xs text-[#4B5563] leading-relaxed max-w-2xl">
                    We need a verified React / Next.js engineer to build real-time interactive dashboards and connect our agentic AI backend to client-facing web surfaces for SkillSprint 2026.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white border border-[#E5E7EB] text-[#374151] font-medium shadow-2xs">
                      Required: React Verified (≥85%)
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white border border-[#E5E7EB] text-[#374151] font-medium shadow-2xs">
                      Bonus: Python / API Integration
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setInviteModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <UserPlus size={14} />
                  <span>Recruit for Role</span>
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SECTION 3: SUGGESTED CANDIDATE                            */}
            {/* ========================================================= */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider font-mono flex items-center gap-2">
                  <Sparkles size={16} className="text-[#635BFF]" />
                  <span>Suggested candidate</span>
                </h2>
                <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  98% Role Match
                </span>
              </div>

              {/* Alex Morgan Candidate Card */}
              <div className="p-6 rounded-3xl bg-white border border-[#635BFF]/30 hover:border-[#635BFF]/60 shadow-card transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Candidate Information */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={alexCandidate.avatar}
                        alt="Alex Morgan"
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#635BFF]/30 shadow bg-[#F8FAFC]"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center">
                        <CheckCircle2 size={10} className="text-white" />
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/passport/${alexCandidate.username}`}
                            className="text-lg font-bold text-[#0A0A0A] hover:text-[#635BFF] transition-colors flex items-center gap-1.5"
                          >
                            <span>Alex Morgan</span>
                            <ExternalLink size={13} className="text-[#6B7280]" />
                          </Link>
                          <span className="text-xs font-mono text-[#6B7280]">
                            @{alexCandidate.username}
                          </span>
                        </div>
                        <p className="text-xs text-[#635BFF] font-semibold">
                          Full Stack Developer • Tech University
                        </p>
                      </div>

                      <p className="text-xs text-[#4B5563] italic max-w-xl leading-relaxed">
                        &ldquo;{alexCandidate.bio}&rdquo;
                      </p>

                      {/* Verified Skills Requirement */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        {/* React Verified 92% */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
                          <ShieldCheck size={14} className="text-emerald-600" />
                          <span>React Verified</span>
                          <span className="font-mono font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded text-[11px]">
                            92%
                          </span>
                        </div>

                        {/* Python Verified 88% */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
                          <ShieldCheck size={14} className="text-emerald-600" />
                          <span>Python Verified</span>
                          <span className="font-mono font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded text-[11px]">
                            88%
                          </span>
                        </div>

                        {/* Trust Score */}
                        <span className="text-xs font-mono text-[#6B7280] flex items-center gap-1">
                          <span>SkillForge Trust Score:</span>
                          <span className="text-[#635BFF] font-bold">89 / 100</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Invite */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 shrink-0">
                    {alexInvite ? (
                      <div className="space-y-1 text-right">
                        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                          <CheckCircle2 size={14} />
                          <span>Invitation Sent</span>
                        </div>
                        <p className="text-[10px] font-mono text-[#9CA3AF]">
                          Pending Alex&apos;s response
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setInviteModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer"
                      >
                        <UserPlus size={16} />
                        <span>Invite</span>
                      </button>
                    )}

                    <Link
                      href={`/passport/${alexCandidate.username}`}
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-[#6B7280] hover:text-[#0A0A0A] px-3 py-1.5 rounded-xl hover:bg-[#F8FAFC] transition-colors"
                    >
                      <span>View Skill Passport</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sent Invitations History */}
        {activeTab === 'invites' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider font-mono">
                Sent Invitations ({invites.length})
              </h2>
            </div>

            {invites.length > 0 ? (
              <div className="space-y-3">
                {invites.map(invite => (
                  <div
                    key={invite.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/20 text-[#635BFF] flex items-center justify-center shrink-0">
                        <Send size={18} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#0A0A0A]">
                            {invite.invitedCandidateUsername}
                          </h4>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 font-medium">
                            Role: {invite.role}
                          </span>
                        </div>
                        <p className="text-xs text-[#4B5563] leading-relaxed bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E5E7EB] max-w-xl">
                          &ldquo;{invite.message}&rdquo;
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF] font-mono">
                          <span>Team: {invite.teamName}</span>
                          <span>•</span>
                          <span>Hackathon: {invite.hackathon}</span>
                          <span>•</span>
                          <span>Sent {invite.sentAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock size={12} />
                        <span>Pending Response</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F8FAFC] text-center text-[#6B7280] text-xs">
                No invitations dispatched yet. Use the Invite button to recruit Alex Morgan for Frontend Developer.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightweight Team Invitation Dialog */}
      <InviteToTeamModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        candidateName={alexCandidate.name}
        candidateUsername={alexCandidate.username}
        initialRole="Frontend Developer"
        initialMessage="We're looking for someone strong in React. Your verified profile looks like a good fit."
      />
    </DashboardLayout>
  );
}
