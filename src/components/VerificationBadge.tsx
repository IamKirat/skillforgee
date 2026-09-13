'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Search,
  UserCheck,
  AlertCircle,
  Gem,
  CheckCircle2,
} from 'lucide-react';
import { VerificationLevel, VERIFICATION_LEVELS } from '@/lib/verificationFramework';

interface VerificationBadgeProps {
  level: VerificationLevel;
  trustScore?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showScore?: boolean;
  showLevelNumber?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function VerificationBadge({
  level,
  trustScore,
  size = 'md',
  showScore = false,
  showLevelNumber = true,
  interactive = false,
  className = '',
  onClick,
}: VerificationBadgeProps) {
  const def = VERIFICATION_LEVELS[level] || VERIFICATION_LEVELS[0];

  // Visual styling for LinkedIn-grade verification badges
  const badgeConfig = {
    5: {
      // Diamond / Field Proven
      gradient: 'bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 dark:from-emerald-500/25 dark:via-teal-500/25 dark:to-cyan-500/25',
      border: 'border-emerald-500/40 dark:border-emerald-400/50 hover:border-emerald-400',
      text: 'text-emerald-700 dark:text-emerald-300',
      pillBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
      icon: Gem,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      glow: 'shadow-[0_0_12px_rgba(16,185,129,0.25)]',
    },
    4: {
      // Platinum / Practical Verified
      gradient: 'bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-blue-500/15 dark:from-indigo-500/25 dark:via-purple-500/25 dark:to-blue-500/25',
      border: 'border-indigo-500/40 dark:border-indigo-400/50 hover:border-indigo-400',
      text: 'text-indigo-700 dark:text-indigo-300',
      pillBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300',
      icon: ShieldCheck,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      glow: 'shadow-[0_0_12px_rgba(99,91,255,0.25)]',
    },
    3: {
      // Gold / Semantic Verified
      gradient: 'bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-600/15 dark:from-amber-500/25 dark:via-yellow-500/25 dark:to-amber-600/25',
      border: 'border-amber-500/40 dark:border-amber-400/50 hover:border-amber-400',
      text: 'text-amber-800 dark:text-amber-300',
      pillBg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300',
      icon: Award,
      iconColor: 'text-amber-600 dark:text-amber-400',
      glow: 'shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    },
    2: {
      // Silver / Evidence Supported
      gradient: 'bg-gradient-to-r from-slate-200/50 via-slate-300/40 to-slate-200/50 dark:from-slate-800/60 dark:via-slate-700/60 dark:to-slate-800/60',
      border: 'border-slate-300 dark:border-slate-600 hover:border-slate-400',
      text: 'text-slate-800 dark:text-slate-200',
      pillBg: 'bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
      icon: Search,
      iconColor: 'text-slate-600 dark:text-slate-300',
      glow: '',
    },
    1: {
      // Bronze / Profile Claimed
      gradient: 'bg-gradient-to-r from-amber-100/60 to-orange-100/60 dark:from-amber-950/40 dark:to-orange-950/40',
      border: 'border-amber-300/80 dark:border-amber-800/80',
      text: 'text-amber-900 dark:text-amber-300',
      pillBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300',
      icon: UserCheck,
      iconColor: 'text-amber-700 dark:text-amber-400',
      glow: '',
    },
    0: {
      // Gray / Unverified
      gradient: 'bg-slate-100 dark:bg-slate-800/60',
      border: 'border-slate-200 dark:border-slate-700',
      text: 'text-slate-600 dark:text-slate-400',
      pillBg: 'bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400',
      icon: AlertCircle,
      iconColor: 'text-slate-400 dark:text-slate-500',
      glow: '',
    },
  }[level];

  const IconComponent = badgeConfig.icon;

  const sizeClasses = {
    xs: {
      badge: 'px-2 py-0.5 text-[10px] gap-1',
      icon: 11,
      score: 'text-[9px] px-1 py-0.2',
    },
    sm: {
      badge: 'px-2.5 py-0.5 text-xs gap-1.5',
      icon: 13,
      score: 'text-[10px] px-1.5 py-0.5',
    },
    md: {
      badge: 'px-3 py-1 text-xs gap-2',
      icon: 14,
      score: 'text-[11px] px-2 py-0.5',
    },
    lg: {
      badge: 'px-4 py-1.5 text-sm gap-2.5',
      icon: 16,
      score: 'text-xs px-2.5 py-1',
    },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center shrink-0 whitespace-nowrap rounded-full font-mono font-bold tracking-tight border transition-all duration-200 ${badgeConfig.gradient} ${badgeConfig.border} ${badgeConfig.text} ${badgeConfig.glow} ${sizeClasses.badge} ${
        interactive || onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${className}`}
      title={`${def.title}: ${def.tagline} (Trust Range: ${def.trustScoreRange[0]}-${def.trustScoreRange[1]})`}
    >
      <IconComponent size={sizeClasses.icon} className={`shrink-0 ${badgeConfig.iconColor}`} />

      <div className="inline-flex items-center gap-1 font-sans shrink-0">
        {showLevelNumber && (
          <span className="font-mono text-[10px] uppercase opacity-75 font-semibold">
            L{level}
          </span>
        )}
        <span className="truncate">{def.badgeName}</span>
      </div>

      {showScore && trustScore !== undefined && (
        <span
          className={`font-mono font-bold shrink-0 whitespace-nowrap rounded-full ${badgeConfig.pillBg} ${sizeClasses.score}`}
        >
          {trustScore}/100
        </span>
      )}
    </div>
  );
}
