'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Users2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BarChart3,
  Search,
  Filter,
  Flame,
  Award,
  Clock,
  ExternalLink,
  Code2,
  Check,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useSkillForge } from '@/lib/store';

export default function OrganizerDashboardPage() {
  const { teams, allCandidates } = useSkillForge();
  const [activeTab, setActiveTab] = useState<'teams' | 'leaderboard' | 'reports'>('teams');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Alex Morgan', role: 'Full Stack', skill: 'React 19', score: 92, university: 'Tech University', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', username: 'alexmorgan' },
    { rank: 2, name: 'David Kim', role: 'Backend Systems', skill: 'Go & Distributed', score: 94, university: 'UC Berkeley', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', username: 'davidkim' },
    { rank: 3, name: 'Sarah Chen', role: 'AI / Machine Learning', skill: 'PyTorch & LLMs', score: 96, university: 'Stanford', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', username: 'sarahchen' },
    { rank: 4, name: 'Marcus Patel', role: 'Smart Contracts', skill: 'Solidity & EVM', score: 88, university: 'MIT', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', username: 'marcus' },
    { rank: 5, name: 'Elena Rostova', role: 'Cloud & Kubernetes', skill: 'DevOps & CI/CD', score: 90, university: 'Carnegie Mellon', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', username: 'elena' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Organizer Hero Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB] dark:border-[#1E293B]">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 flex items-center gap-1.5">
                <Trophy size={13} />
                Organizer Command Center
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Hackathon: SkillSprint 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] dark:text-[#F8FAFC] tracking-tight">
              Hackathon Oversight & Skill Verification
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8] mt-1">
              Verify participant skills in real-time, monitor squad formation coverage, and inspect tamper-proof judge leaderboards.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/teams"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Users2 size={14} />
              <span>Squad Formation Hub</span>
            </Link>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-subtle space-y-1">
            <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#94A3B8] uppercase">Verified Participants</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0A0A0A] dark:text-[#F8FAFC] font-mono">248</span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">99.2% Verified</span>
            </div>
            <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">0 unverified claims</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-subtle space-y-1">
            <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#94A3B8] uppercase">Formed Teams</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0A0A0A] dark:text-[#F8FAFC] font-mono">54</span>
              <span className="text-xs font-mono text-[#635BFF] font-semibold">100% Balanced</span>
            </div>
            <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">Full frontend/backend/AI mix</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-subtle space-y-1">
            <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#94A3B8] uppercase">Practical Benchmarks</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0A0A0A] dark:text-[#F8FAFC] font-mono">782</span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Pass Rate 74%</span>
            </div>
            <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">Timed scenario assessments</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-subtle space-y-1">
            <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#94A3B8] uppercase">Average Trust Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#635BFF] font-mono">91.4</span>
              <span className="text-xs font-mono text-[#6B7280] dark:text-[#94A3B8]">/ 100</span>
            </div>
            <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">Tamper-proof verifiable</p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] dark:border-[#1E293B] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('teams')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'teams'
                ? 'bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 shadow-2xs'
                : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            <Users2 size={14} />
            <span>Team Formation Roster ({teams.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 shadow-2xs'
                : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            <Award size={14} />
            <span>Skill Leaderboards</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'reports'
                ? 'bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 shadow-2xs'
                : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            <BarChart3 size={14} />
            <span>Verification Reports & Anti-Cheat</span>
          </button>
        </div>

        {/* Tab 1: Teams */}
        {activeTab === 'teams' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {teams.map(t => (
                <div
                  key={t.id}
                  className="p-6 rounded-3xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-subtle hover:shadow-card transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-1 ring-[#E5E7EB] dark:ring-[#1E293B]"
                      />
                      <div>
                        <h3 className="text-base font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">{t.name}</h3>
                        <p className="text-xs text-[#635BFF] font-semibold">{t.tagline}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                      Verified Squad
                    </span>
                  </div>

                  <p className="text-xs text-[#4B5563] dark:text-[#94A3B8] leading-relaxed">
                    {t.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {t.skillCoverage.map(sc => (
                      <div
                        key={sc.category}
                        className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#090D16] border border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between text-xs"
                      >
                        <span className="text-[#6B7280] dark:text-[#94A3B8] text-[11px] truncate">{sc.category}</span>
                        <span className="font-mono font-bold text-[#635BFF]">{sc.percentage}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {t.members.map(m => (
                        <img
                          key={m.id}
                          src={m.avatar}
                          alt={m.name}
                          className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-[#0F172A]"
                          title={`${m.name} (${m.role})`}
                        />
                      ))}
                      <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] pl-3 font-medium">
                        {t.members.length} members
                      </span>
                    </div>

                    <Link
                      href="/teams"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#635BFF] hover:underline"
                    >
                      <span>Manage Squad</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="p-5 rounded-3xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-[#1E293B]">
              <h2 className="text-sm font-bold text-[#0A0A0A] dark:text-[#F8FAFC] font-mono uppercase tracking-wider flex items-center gap-2">
                <Trophy size={16} className="text-amber-500" />
                <span>Verified Benchmark Standings</span>
              </h2>
              <span className="text-xs text-[#6B7280] dark:text-[#94A3B8] font-mono">
                Updated in real-time
              </span>
            </div>

            <div className="divide-y divide-[#E5E7EB] dark:divide-[#1E293B]">
              {leaderboard.map(entry => (
                <div
                  key={entry.rank}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#F8FAFC] dark:hover:bg-[#090D16] px-3 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                        entry.rank === 1
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : entry.rank === 2
                          ? 'bg-slate-200 text-slate-800 border border-slate-300'
                          : entry.rank === 3
                          ? 'bg-amber-700/10 text-amber-800 border border-amber-700/20'
                          : 'bg-[#F1F5F9] dark:bg-[#1E293B] text-[#6B7280] dark:text-[#94A3B8]'
                      }`}
                    >
                      #{entry.rank}
                    </span>

                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#E5E7EB] dark:ring-[#1E293B]"
                    />

                    <div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/passport/${entry.username}`}
                          className="font-bold text-sm text-[#0A0A0A] dark:text-[#F8FAFC] hover:text-[#635BFF] transition-colors"
                        >
                          {entry.name}
                        </Link>
                        <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">
                        {entry.role} • {entry.university}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-xs font-mono px-2.5 py-1 rounded-lg bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0A0A0A] dark:text-[#F8FAFC]">
                      {entry.skill}
                    </span>

                    <div className="text-right">
                      <span className="text-base font-black font-mono text-emerald-700 dark:text-emerald-400">
                        {entry.score}%
                      </span>
                      <span className="block text-[10px] text-[#9CA3AF] font-mono">Score</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Reports */}
        {activeTab === 'reports' && (
          <div className="p-6 rounded-3xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-[#1E293B]">
              <div>
                <h3 className="text-sm font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">
                  Automated Integrity Shield & Assessment Logs
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">
                  Zero anti-cheat flags recorded. All practical benchmarks validated by deterministic test suites.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                <Check size={12} />
                Audit Passed
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#090D16] border border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
                <span>[2026-09-12 19:34:10] React 19 Benchmark: Alex Morgan (Passed 92%)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">CONFIRMED</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#090D16] border border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
                <span>[2026-09-12 19:28:45] Distributed Systems Benchmark: David Kim (Passed 94%)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">CONFIRMED</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#090D16] border border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
                <span>[2026-09-12 19:20:12] PyTorch LLM Benchmark: Sarah Chen (Passed 96%)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">CONFIRMED</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
