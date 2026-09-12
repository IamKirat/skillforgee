'use client';

import React from 'react';

interface ConfidenceScoreProps {
  score: number; // 0 - 100
  variant?: 'circular' | 'linear' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({
  score,
  variant = 'circular',
  size = 'md',
  label = 'Confidence',
  showLabel = true,
  className = '',
}) => {
  // Determine color scheme based on score
  const getColorScheme = (val: number) => {
    if (val >= 90) {
      return {
        text: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        stroke: '#10b981',
        label: 'Exceptional',
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    } else if (val >= 80) {
      return {
        text: 'text-[#635BFF]',
        bg: 'bg-[#635BFF]/10',
        border: 'border-[#635BFF]/20',
        stroke: '#635BFF',
        label: 'High Proficiency',
        badge: 'bg-[#635BFF]/10 text-[#635BFF] border-[#635BFF]/20',
      };
    } else if (val >= 70) {
      return {
        text: 'text-cyan-700',
        bg: 'bg-cyan-50',
        border: 'border-cyan-200',
        stroke: '#0891b2',
        label: 'Competent',
        badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      };
    } else {
      return {
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        stroke: '#f59e0b',
        label: 'Developing',
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    }
  };

  const scheme = getColorScheme(score);

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono font-bold ${scheme.badge} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: scheme.stroke }} />
        <span>{score}%</span>
        {showLabel && <span className="opacity-70 font-sans font-normal">Confidence</span>}
      </div>
    );
  }

  if (variant === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between text-xs mb-1.5">
          {showLabel && <span className="text-[#6B7280] font-medium">{label}</span>}
          <div className="flex items-center gap-1.5 font-mono">
            <span className={`font-bold ${scheme.text}`}>{score}%</span>
            <span className="text-[11px] text-[#9CA3AF] font-sans">({scheme.label})</span>
          </div>
        </div>
        <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, score))}%`,
              backgroundColor: scheme.stroke,
            }}
          />
        </div>
      </div>
    );
  }

  // Circular SVG gauge
  const dimensions = {
    sm: { size: 64, stroke: 5, fontSize: 'text-sm', subSize: 'text-[9px]' },
    md: { size: 84, stroke: 6, fontSize: 'text-lg', subSize: 'text-[10px]' },
    lg: { size: 110, stroke: 8, fontSize: 'text-2xl', subSize: 'text-xs' },
  };

  const dim = dimensions[size];
  const radius = (dim.size - dim.stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`inline-flex flex-col items-center justify-center relative ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: dim.size, height: dim.size }}>
        <svg className="transform -rotate-90" width={dim.size} height={dim.size}>
          {/* Background circle */}
          <circle
            cx={dim.size / 2}
            cy={dim.size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={dim.stroke}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={dim.size / 2}
            cy={dim.size / 2}
            r={radius}
            stroke={scheme.stroke}
            strokeWidth={dim.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Inner text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-mono font-extrabold leading-none ${dim.fontSize} ${scheme.text}`}>
            {score}%
          </span>
          {showLabel && (
            <span className={`text-[#9CA3AF] font-medium tracking-tight mt-0.5 ${dim.subSize}`}>
              Score
            </span>
          )}
        </div>
      </div>
      {showLabel && (
        <span className="text-[11px] font-medium text-[#6B7280] mt-1.5 flex items-center gap-1">
          {label}
        </span>
      )}
    </div>
  );
};
