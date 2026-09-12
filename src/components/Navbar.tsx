'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Briefcase,
  User,
  Users2,
  FileCheck2,
  ExternalLink,
  Settings,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useSkillForge } from '@/lib/store';
import { ThemeToggle } from './ThemeToggle';
import { DemoModal } from './DemoModal';
import { SupabaseStatusBadge } from './SupabaseStatusBadge';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { candidate } = useSkillForge();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
    setSolutionsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Handle outside click for user profile dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-[#E5E7EB] dark:border-[#1E293B] shadow-subtle'
          : 'bg-white/70 dark:bg-[#0F172A]/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Primary Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center text-white shadow-sm group-hover:bg-[#5346E0] transition-colors">
              <ShieldCheck size={18} className="stroke-[2.3]" />
            </div>
            <span className="font-bold text-lg text-[#0A0A0A] dark:text-[#F8FAFC] tracking-tight font-sans">
              SkillForge
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-[#6B7280] dark:text-[#94A3B8]">
            {/* Products Dropdown */}
            <div className="relative" onMouseLeave={() => setProductsOpen(false)}>
              <button
                type="button"
                onClick={() => setProductsOpen(prev => !prev)}
                onMouseEnter={() => setProductsOpen(true)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer ${
                  productsOpen ? 'text-[#0A0A0A] dark:text-[#F8FAFC] bg-[#F8FAFC] dark:bg-[#1E293B]' : ''
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${productsOpen ? 'rotate-180 text-[#0A0A0A] dark:text-[#F8FAFC]' : ''}`}
                />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 p-2 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B] shadow-floating space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <Link
                    href="/dashboard"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center shrink-0 mt-0.5">
                      <User size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] group-hover:text-[#635BFF] transition-colors">
                        Candidate Dashboard
                      </p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                        Claim & verify competencies
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/recruiter"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] group-hover:text-[#635BFF] transition-colors">
                        Recruiter Analytics
                      </p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                        Audit practical talent pipelines
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/organizer"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Trophy size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] group-hover:text-[#635BFF] transition-colors">
                        Organizer Center
                      </p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                        Squad metrics & leaderboards
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/passport/alex"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FileCheck2 size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] group-hover:text-[#635BFF] transition-colors">
                        Skill Passport
                      </p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                        Shareable tamper-proof proof
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/teams"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Users2 size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] group-hover:text-[#635BFF] transition-colors">
                        Team Matching Hub
                      </p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                        CodeForge squad recruitment
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative" onMouseLeave={() => setSolutionsOpen(false)}>
              <button
                type="button"
                onClick={() => setSolutionsOpen(prev => !prev)}
                onMouseEnter={() => setSolutionsOpen(true)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer ${
                  solutionsOpen ? 'text-[#0A0A0A] dark:text-[#F8FAFC] bg-[#F8FAFC] dark:bg-[#1E293B]' : ''
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180 text-[#0A0A0A] dark:text-[#F8FAFC]' : ''}`}
                />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 p-2 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B] shadow-floating space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <Link
                    href="/recruiter"
                    className="block p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
                  >
                    <p className="text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC]">
                      For Technical Recruiters
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                      Zero resume inflation, fast hire
                    </p>
                  </Link>
                  <Link
                    href="/#problem"
                    className="block p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
                  >
                    <p className="text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC]">
                      For YC & High-Growth Startups
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                      Assess full-stack real ability
                    </p>
                  </Link>
                  <Link
                    href="/organizer"
                    className="block p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
                  >
                    <p className="text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC]">
                      For Hackathons & Judges
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                      Real-time skill validation & scoring
                    </p>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#pricing"
              className="px-3 py-1.5 rounded-lg hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
            >
              Pricing
            </Link>

            <Link
              href="/#how-it-works"
              className="px-3 py-1.5 rounded-lg hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
            >
              Resources
            </Link>

            <Link
              href="/recruiter"
              className="px-3 py-1.5 rounded-lg hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors flex items-center gap-1"
            >
              <span>Enterprise</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#635BFF]/10 text-[#635BFF] font-semibold">
                SOC2
              </span>
            </Link>
          </nav>
        </div>

        {/* Right Corner: Prominent "Explore Demo", Theme Toggle & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Supabase MCP Live Status Indicator */}
          <SupabaseStatusBadge />

          {/* Prominent Explore Demo Button (Primary Conversion Driver) */}
          <button
            type="button"
            onClick={() => setDemoModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#635BFF]/10 dark:bg-[#635BFF]/20 text-[#635BFF] dark:text-[#818CF8] hover:bg-[#635BFF]/20 dark:hover:bg-[#635BFF]/30 border border-[#635BFF]/30 px-3 py-1.5 rounded-xl transition-all shadow-2xs hover:shadow-subtle cursor-pointer select-none"
          >
            <Sparkles size={13} className="text-[#635BFF]" />
            <span>Explore Demo</span>
          </button>

          {/* Quick Sign In / Book Demo Links */}
          <Link
            href="/login"
            className="hidden xl:inline-flex items-center text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:text-[#635BFF] px-2.5 py-1.5 rounded-xl transition-colors"
          >
            Sign In
          </Link>

          {/* Theme Toggle (Light / Dark / System) positioned right next to user profile */}
          <ThemeToggle />

          {/* User Profile Component in the top-right corner */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(prev => !prev)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#1E293B] transition-all duration-300 shadow-2xs hover:shadow-subtle cursor-pointer select-none"
              aria-label="User profile menu"
              aria-expanded={profileOpen}
            >
              <div className="relative">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#E5E7EB] dark:ring-[#334155] bg-white dark:bg-[#090D16]"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white dark:ring-[#0F172A]"
                  title="Verified Builder Status"
                />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#0A0A0A] dark:text-[#F8FAFC] leading-none flex items-center gap-1">
                  <span>{candidate.name}</span>
                  <ShieldCheck size={11} className="text-[#10B981]" />
                </span>
                <span className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-mono leading-none mt-1">
                  89 Trust
                </span>
              </div>

              <ChevronDown
                size={12}
                className={`text-[#6B7280] dark:text-[#94A3B8] transition-transform duration-200 hidden sm:block ${
                  profileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1.5 w-64 p-2 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-floating z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                {/* Profile Header */}
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#090D16] border border-[#E5E7EB] dark:border-[#1E293B] mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#E5E7EB] dark:ring-[#334155]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold text-[#0A0A0A] dark:text-[#F8FAFC] truncate">
                          {candidate.name}
                        </p>
                        <ShieldCheck size={12} className="text-[#10B981] shrink-0" />
                      </div>
                      <p className="text-[11px] text-[#635BFF] font-semibold truncate">
                        {candidate.role}
                      </p>
                      <p className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-mono">
                        @{candidate.username}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between text-[11px]">
                    <span className="text-[#6B7280] dark:text-[#94A3B8] font-mono">Trust Score:</span>
                    <span className="font-mono font-bold text-[#10B981] bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 px-1.5 py-0.2 rounded">
                      89 / 100
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-0.5">
                  <Link
                    href={`/passport/${candidate.username}`}
                    className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#635BFF] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileCheck2 size={14} className="text-[#635BFF]" />
                      <span>View Skill Passport</span>
                    </div>
                    <ExternalLink size={12} className="text-[#9CA3AF]" />
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#635BFF] transition-colors"
                  >
                    <User size={14} className="text-emerald-500" />
                    <span>Candidate Dashboard</span>
                  </Link>

                  <Link
                    href="/recruiter"
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#635BFF] transition-colors"
                  >
                    <Briefcase size={14} className="text-amber-500" />
                    <span>Recruiter Portal</span>
                  </Link>

                  <Link
                    href="/organizer"
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#635BFF] transition-colors"
                  >
                    <Trophy size={14} className="text-amber-600" />
                    <span>Organizer Center</span>
                  </Link>

                  <Link
                    href="/teams"
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#635BFF] transition-colors"
                  >
                    <Users2 size={14} className="text-purple-500" />
                    <span>Team Matching</span>
                  </Link>
                </div>

                <div className="mt-1 pt-1 border-t border-[#F1F5F9] dark:border-[#1E293B]">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-[#6B7280] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC] transition-colors"
                  >
                    <Settings size={14} />
                    <span>Account Settings</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="flex md:hidden items-center ml-1">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A] text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-[#F8FAFC]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-white dark:bg-[#0F172A] border-b border-[#E5E7EB] dark:border-[#1E293B] space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setDemoModalOpen(true);
              }}
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold bg-[#635BFF]/10 text-[#635BFF]"
            >
              <span>Explore Platform Demos</span>
              <Sparkles size={15} />
            </button>
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]"
            >
              Candidate Dashboard
            </Link>
            <Link
              href="/recruiter"
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]"
            >
              Recruiter Portal
            </Link>
            <Link
              href="/organizer"
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]"
            >
              Organizer Center
            </Link>
            <Link
              href="/passport/alex"
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]"
            >
              Skill Passport
            </Link>
            <Link
              href="/teams"
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]"
            >
              Teams & Matching
            </Link>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#1E293B] flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2 text-xs font-semibold text-[#0A0A0A] dark:text-[#F8FAFC] rounded-xl border border-[#E5E7EB] dark:border-[#1E293B]"
            >
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setDemoModalOpen(true);
              }}
              className="w-full text-center py-2 text-xs font-semibold bg-[#635BFF] text-white rounded-xl shadow-sm"
            >
              Explore Instant Demo
            </button>
          </div>
        </div>
      )}

      {/* Global Instant Demo Access Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </header>
  );
};
