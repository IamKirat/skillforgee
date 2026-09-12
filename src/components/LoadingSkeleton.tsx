'use client';

import React from 'react';

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-[#F1F5F9] border border-[#E5E7EB] ${className}`}
    />
  );
};

export const CandidateCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 space-y-4 animate-pulse shadow-subtle">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#F1F5F9]" />
          <div className="space-y-2">
            <div className="w-28 h-4 bg-[#F1F5F9] rounded" />
            <div className="w-36 h-3 bg-[#F1F5F9]/70 rounded" />
          </div>
        </div>
        <div className="w-14 h-14 rounded-full bg-[#F1F5F9]" />
      </div>
      <div className="w-full h-10 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]" />
      <div className="flex gap-2">
        <div className="w-16 h-6 bg-[#F1F5F9] rounded-lg" />
        <div className="w-20 h-6 bg-[#F1F5F9] rounded-lg" />
        <div className="w-14 h-6 bg-[#F1F5F9] rounded-lg" />
      </div>
      <div className="flex justify-between pt-2 border-t border-[#E5E7EB]">
        <div className="w-24 h-7 bg-[#F1F5F9] rounded-lg" />
        <div className="w-24 h-7 bg-[#F1F5F9] rounded-lg" />
      </div>
    </div>
  );
};
