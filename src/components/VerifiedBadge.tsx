'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
  confidenceScore?: number;
  hash?: string;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'md',
  showText = true,
  text = 'Verified',
  confidenceScore,
  hash,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <div
      className={`inline-flex items-center rounded-full font-semibold transition-all duration-150 border bg-emerald-50 border-emerald-200 text-emerald-800 shadow-2xs ${sizeClasses[size]} ${className}`}
      title={hash ? `Cryptographically Verified • Hash: ${hash}` : 'Verified via SkillForge Assessment'}
    >
      <div className="relative flex items-center justify-center">
        <ShieldCheck size={iconSizes[size]} className="text-emerald-600 stroke-[2.2]" />
        <span className="absolute -top-0.5 -right-0.5 flex h-1 w-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
        </span>
      </div>

      {showText && (
        <span className="tracking-wide">
          {text}
          {confidenceScore !== undefined && (
            <span className="ml-1 opacity-90 font-mono font-bold text-emerald-900">
              {confidenceScore}%
            </span>
          )}
        </span>
      )}
    </div>
  );
};
