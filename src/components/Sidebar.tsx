'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Compass,
  Users2,
  FileCheck2,
  Briefcase,
  ExternalLink,
  Trophy,
} from 'lucide-react';
import { useSkillForge } from '@/lib/store';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { candidate, updateProfile, invites } = useSkillForge();

  const pendingInvites = invites.filter(i => i.status === 'pending').length;

  const links = [
    { href: '/dashboard', label: 'Candidate Dashboard', icon: LayoutDashboard },
    { href: '/recruiter', label: 'Recruiter Portal', icon: Briefcase },
    { href: '/organizer', label: 'Organizer Center', icon: Trophy },
    { href: '/discover', label: 'Talent Discovery', icon: Compass },
    { href: '/teams', label: 'Teams & Matching', icon: Users2, count: pendingInvites },
    { href: `/passport/${candidate.username}`, label: 'Skill Passport', icon: FileCheck2 },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between border-r border-[#E5E7EB] bg-white p-5 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Candidate Profile Summary Box */}
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] shadow-subtle space-y-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-11 h-11 rounded-xl object-cover border border-[#E5E7EB] bg-white"
              />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#10B981] ring-2 ring-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-[#0A0A0A] text-sm truncate">{candidate.name}</h3>
              <p className="text-[11px] text-[#635BFF] font-medium truncate">{candidate.role}</p>
              <span className="text-[10px] text-[#6B7280] font-mono block mt-0.5">
                {candidate.university}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#6B7280] font-mono uppercase">VERIFIED</span>
              <span className="text-xs font-bold text-[#10B981] font-mono">
                {candidate.verifiedSkillsCount} Skills
              </span>
            </div>
            <div className="h-6 w-px bg-[#E5E7EB]" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-[#6B7280] font-mono uppercase">TRUST</span>
              <span className="text-xs font-bold text-[#635BFF] font-mono">
                {candidate.overallConfidence}%
              </span>
            </div>
          </div>

          {/* Hackathon Availability Toggle */}
          <div className="pt-2.5 border-t border-[#E5E7EB] flex items-center justify-between">
            <span className="text-[11px] text-[#6B7280] font-medium">Open to offers</span>
            <button
              type="button"
              onClick={() => updateProfile({ lookingForTeam: !candidate.lookingForTeam })}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                candidate.lookingForTeam ? 'bg-[#10B981]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  candidate.lookingForTeam ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-[#6B7280] font-bold mb-2">
            Platform Modules
          </p>
          {links.map(link => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#635BFF]/10 text-[#635BFF] font-bold'
                    : 'text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} className={active ? 'text-[#635BFF]' : 'text-[#6B7280]'} />
                  <span>{link.label}</span>
                </div>
                {link.count !== undefined && link.count > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#635BFF] text-white font-bold">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer link to public passport */}
      <div className="pt-4 border-t border-[#E5E7EB]">
        <Link
          href={`/passport/${candidate.username}`}
          className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] text-xs font-semibold text-[#0A0A0A] transition-colors"
        >
          <span className="truncate">Public Passport</span>
          <ExternalLink size={13} className="text-[#6B7280] shrink-0" />
        </Link>
      </div>
    </aside>
  );
};
