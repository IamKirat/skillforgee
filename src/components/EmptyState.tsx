'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Sparkles,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F8FAFC] ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/20 flex items-center justify-center text-[#635BFF] mb-4">
        <Icon size={24} />
      </div>

      <h3 className="text-base font-bold text-[#0A0A0A] mb-1">{title}</h3>
      <p className="text-sm text-[#6B7280] max-w-sm mb-5 leading-relaxed">{description}</p>

      {actionLabel && (
        actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
};
