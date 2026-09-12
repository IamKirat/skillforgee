'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SkillItem } from '@/lib/types';
import { VerificationBadge } from './VerificationBadge';
import { VERIFICATION_LEVELS } from '@/lib/verificationFramework';

interface SkillBadgeProps {
  skill: SkillItem;
  showAction?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  showAction = false,
  size = 'md',
  className = '',
  onClick,
}) => {
  const level = skill.verificationLevel ?? (skill.status === 'VERIFIED' ? 4 : skill.status === 'CLAIMED' ? 1 : 0);
  const def = VERIFICATION_LEVELS[level];

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-between rounded-xl border font-medium transition-all ${
        onClick ? 'cursor-pointer hover:scale-[1.01] hover:border-[#635BFF]/50' : ''
      } ${sizeStyles[size]} ${className} bg-white dark:bg-slate-900 border-[#E5E7EB] dark:border-slate-800 shadow-2xs`}
    >
      <div className="flex items-center gap-2">
        <VerificationBadge
          level={level}
          size={size === 'lg' ? 'md' : 'xs'}
          showScore={false}
          showLevelNumber={true}
        />
        <span className="font-bold text-[#0A0A0A] dark:text-slate-100">{skill.name}</span>
      </div>

      <div className="flex items-center gap-2">
        {skill.trustScore !== undefined ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] dark:text-indigo-400 border border-[#635BFF]/20">
            {skill.trustScore} Trust
          </span>
        ) : skill.confidenceScore !== undefined ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            {skill.confidenceScore}%
          </span>
        ) : null}

        {showAction && level < 4 && (
          <Link
            href={`/assessment/${skill.slug}`}
            className="inline-flex items-center gap-0.5 text-xs text-[#635BFF] hover:text-[#5248E5] font-semibold ml-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Verify</span>
            <ArrowUpRight size={12} />
          </Link>
        )}
      </div>
    </div>
  );
};
