'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  User,
  Briefcase,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useSkillForge } from '@/lib/store';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { showToast } = useSkillForge();

  if (!isOpen) return null;

  const handleSelectDemo = (route: string, roleName: string) => {
    showToast(`Loaded ${roleName} Demo environment.`);
    onClose();
    router.push(route);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B] p-6 sm:p-8 shadow-floating space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E5E7EB] dark:border-[#1E293B]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 flex items-center gap-1">
                <Sparkles size={11} />
                Instant Demo Access
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                No Signup Required
              </span>
            </div>
            <h2 id="demo-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] dark:text-[#F8FAFC] tracking-tight">
              Explore SkillForge Platform
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8]">
              Experience real-time skill verification from any perspective with preloaded realistic benchmark data.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC] p-1.5 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            aria-label="Close demo modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* 3 Demo Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* 1. Candidate Demo */}
          <div
            onClick={() => handleSelectDemo('/dashboard', 'Candidate')}
            className="group relative p-4 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#090D16] hover:bg-white dark:hover:bg-[#131D33] hover:border-[#635BFF]/50 dark:hover:border-[#635BFF]/50 shadow-subtle hover:shadow-card transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
                  <User size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 font-bold">
                  89 Trust
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#0A0A0A] dark:text-[#F8FAFC] group-hover:text-[#635BFF] transition-colors">
                  Candidate Demo
                </h3>
                <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
                  Alex Morgan • Full Stack
                </p>
              </div>

              <ul className="space-y-1 text-[11px] text-[#4B5563] dark:text-[#94A3B8] border-t border-[#E5E7EB] dark:border-[#1E293B] pt-2.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Resume-Match Evidence Engine</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>5-Tier Trust & Claim Audit</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Verified Passport & Telemetry</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-2.5 border-t border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between text-xs font-bold text-[#635BFF]">
              <span>Launch Dashboard</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Recruiter Demo */}
          <div
            onClick={() => handleSelectDemo('/recruiter', 'Recruiter')}
            className="group relative p-4 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#090D16] hover:bg-white dark:hover:bg-[#131D33] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-subtle hover:shadow-card transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Briefcase size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 font-bold">
                  142 Screened
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#0A0A0A] dark:text-[#F8FAFC] group-hover:text-emerald-600 transition-colors">
                  Recruiter Demo
                </h3>
                <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
                  Elena Rostova • Talent VP
                </p>
              </div>

              <ul className="space-y-1 text-[11px] text-[#4B5563] dark:text-[#94A3B8] border-t border-[#E5E7EB] dark:border-[#1E293B] pt-2.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Candidate Search Pipeline</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Verification Audit Reports</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Hiring Analytics & Benchmarks</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-2.5 border-t border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Launch Recruiter</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Judge / Organizer Demo */}
          <div
            onClick={() => handleSelectDemo('/organizer', 'Organizer')}
            className="group relative p-4 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#090D16] hover:bg-white dark:hover:bg-[#131D33] hover:border-amber-500/50 dark:hover:border-amber-500/50 shadow-subtle hover:shadow-card transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Trophy size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 font-bold">
                  54 Squads
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#0A0A0A] dark:text-[#F8FAFC] group-hover:text-amber-600 transition-colors">
                  Organizer Demo
                </h3>
                <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
                  Marcus Vance • Lead Judge
                </p>
              </div>

              <ul className="space-y-1 text-[11px] text-[#4B5563] dark:text-[#94A3B8] border-t border-[#E5E7EB] dark:border-[#1E293B] pt-2.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Team Formation Matrix</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Real-Time Leaderboards</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Anti-Cheat Integrity Audit</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-2.5 border-t border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Launch Organizer</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
