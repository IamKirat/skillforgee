'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, UserPlus, GraduationCap, ShieldCheck } from 'lucide-react';
import { Candidate, SkillItem } from '@/lib/types';
import { ConfidenceScore } from './ConfidenceScore';
import { VerifiedBadge } from './VerifiedBadge';
import { VerificationBadge } from './VerificationBadge';
import { VerificationLevel, VERIFICATION_LEVELS } from '@/lib/verificationFramework';

interface CandidateCardProps {
  candidate: Candidate;
  onInvite?: (candidate: Candidate) => void;
  onInspectSkill?: (skillSlug: string) => void;
  className?: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onInvite,
  onInspectSkill,
  className = '',
}) => {
  // Sort candidate skills by verification level descending
  const sortedSkills = [...candidate.skills].sort((a, b) => {
    const lvlA = a.verificationLevel ?? (a.status === 'VERIFIED' ? 4 : 1);
    const lvlB = b.verificationLevel ?? (b.status === 'VERIFIED' ? 4 : 1);
    return lvlB - lvlA;
  });

  const verifiedSkills = sortedSkills.filter(s => (s.verificationLevel ?? (s.status === 'VERIFIED' ? 4 : 0)) >= 2);
  const claimedSkills = sortedSkills.filter(s => (s.verificationLevel ?? (s.status === 'VERIFIED' ? 4 : 0)) < 2);

  // Highest verified tier
  const highestLevel = sortedSkills.length > 0
    ? (sortedSkills[0].verificationLevel ?? 4)
    : 0;

  return (
    <div
      className={`relative rounded-2xl border border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-all duration-200 hover:border-[#635BFF]/50 hover:shadow-card flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Header: Avatar, Name, Role & Confidence Gauge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="relative">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#E5E7EB] dark:border-slate-800 bg-[#F8FAFC]"
              />
              <span
                className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"
                title="Active Verified Builder"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/passport/${candidate.username}`}
                  className="font-bold text-[#0A0A0A] dark:text-slate-100 text-base hover:text-[#635BFF] transition-colors"
                >
                  {candidate.name}
                </Link>
                <VerifiedBadge size="sm" showText={false} />
              </div>
              <p className="text-xs text-[#635BFF] font-semibold">{candidate.role}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-[#6B7280] dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <GraduationCap size={12} className="text-[#9CA3AF]" />
                  {candidate.university}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <ConfidenceScore
              score={candidate.overallConfidence}
              size="sm"
              variant="circular"
              showLabel={false}
            />
            <span className="text-[10px] text-[#6B7280] dark:text-slate-400 font-mono mt-1">Trust Score</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-[#4B5563] dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed bg-[#F8FAFC] dark:bg-slate-800/60 p-3 rounded-xl border border-[#E5E7EB] dark:border-slate-800">
          &ldquo;{candidate.bio}&rdquo;
        </p>

        {/* Multi-Tier Verified Skills Pills */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] text-[#6B7280] dark:text-slate-400 mb-2">
            <span className="font-mono uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-slate-400 font-bold flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-600" />
              Verified Competencies ({verifiedSkills.length})
            </span>
            <span className="text-[10px] font-mono text-[#635BFF] font-bold">
              Top: L{highestLevel} {VERIFICATION_LEVELS[highestLevel as VerificationLevel]?.badgeName}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {verifiedSkills.slice(0, 4).map(skill => {
              const lvl = skill.verificationLevel ?? 4;
              return (
                <div
                  key={skill.id}
                  onClick={() => onInspectSkill?.(skill.slug)}
                  className="cursor-pointer hover:opacity-90"
                  title={`${skill.name}: Level ${lvl} (${VERIFICATION_LEVELS[lvl as VerificationLevel]?.badgeName}) • Trust: ${skill.trustScore ?? 85}/100`}
                >
                  <VerificationBadge
                    level={lvl as VerificationLevel}
                    size="xs"
                    showScore={true}
                    trustScore={skill.trustScore ?? skill.confidenceScore}
                    showLevelNumber={true}
                  />
                </div>
              );
            })}
            {claimedSkills.length > 0 && (
              <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                +{claimedSkills.length} Claimed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between gap-2">
        <Link
          href={`/passport/${candidate.username}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B7280] dark:text-slate-300 hover:text-[#0A0A0A] dark:hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors"
        >
          <span>Skill Passport</span>
          <ExternalLink size={12} />
        </Link>

        {onInvite && (
          <button
            type="button"
            onClick={() => onInvite(candidate)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <UserPlus size={13} />
            <span>Invite to Team</span>
          </button>
        )}
      </div>
    </div>
  );
};
