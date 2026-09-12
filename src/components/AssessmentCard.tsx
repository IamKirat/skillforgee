'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, HelpCircle, Award, ArrowRight, Play } from 'lucide-react';
import { Assessment, SkillStatus } from '@/lib/types';
import { VerifiedBadge } from './VerifiedBadge';

interface AssessmentCardProps {
  assessment: Assessment;
  status?: SkillStatus;
  userScore?: number;
  className?: string;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  status = 'CLAIMED',
  userScore,
  className = '',
}) => {
  const isVerified = status === 'VERIFIED';
  const isPending = status === 'PENDING';

  return (
    <div
      className={`relative rounded-2xl border bg-white p-5 transition-all duration-200 hover:border-[#635BFF]/40 shadow-subtle hover:shadow-card flex flex-col justify-between ${
        isVerified ? 'border-emerald-200' : isPending ? 'border-amber-200' : 'border-[#E5E7EB]'
      } ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="inline-block text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] mb-1.5">
              {assessment.category} • {assessment.level}
            </span>
            <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight flex items-center gap-2">
              {assessment.skillName}
            </h3>
          </div>

          {isVerified ? (
            <VerifiedBadge size="sm" confidenceScore={userScore} />
          ) : isPending ? (
            <span className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <Clock size={12} className="animate-pulse" />
              Pending
            </span>
          ) : (
            <span className="text-xs font-mono text-[#6B7280] px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E5E7EB]">
              5-Min Test
            </span>
          )}
        </div>

        <p className="text-xs text-[#4B5563] mb-4 line-clamp-2 leading-relaxed">
          {assessment.description}
        </p>

        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#6B7280] font-mono flex items-center gap-1">
              <Clock size={11} /> Time
            </span>
            <span className="font-semibold text-[#0A0A0A] mt-0.5 font-mono">
              ~{assessment.estimatedMinutes}m
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#6B7280] font-mono flex items-center gap-1">
              <HelpCircle size={11} /> Format
            </span>
            <span className="font-semibold text-[#0A0A0A] mt-0.5 font-mono">
              {assessment.totalQuestions} Qs
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#6B7280] font-mono flex items-center gap-1">
              <Award size={11} /> Pass Mark
            </span>
            <span className="font-semibold text-emerald-700 mt-0.5 font-mono">
              {assessment.passThreshold}%
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
        <span className="text-xs text-[#6B7280]">
          {isVerified ? 'Verified & On Passport' : 'Earn Verified Badge'}
        </span>

        <Link
          href={`/assessment/${assessment.slug}`}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isVerified
              ? 'bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0A0A0A] border border-[#E5E7EB]'
              : 'bg-[#635BFF] hover:bg-[#5248E5] text-white shadow-xs'
          }`}
        >
          {isVerified ? (
            <>
              <span>Retake</span>
              <ArrowRight size={13} />
            </>
          ) : (
            <>
              <Play size={12} className="fill-current" />
              <span>{isPending ? 'Take Now' : 'Start Test'}</span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
};
