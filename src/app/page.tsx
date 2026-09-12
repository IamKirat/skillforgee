'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  FileCheck2,
  Users2,
  TrendingUp,
  Brain,
  Code2,
  ExternalLink,
  Lock,
  ChevronRight,
  Building2,
  Cpu,
  BarChart3,
  Search,
  Check,
  Briefcase,
  GitBranch,
} from 'lucide-react';
import { Footer } from '@/components/Footer';
import { VerificationBadge } from '@/components/VerificationBadge';
import { AIVerificationSimulatorModal } from '@/components/AIVerificationSimulatorModal';
import {
  VERIFICATION_LEVELS,
  VerificationLevel,
  SKILL_EVIDENCE_DATABASE,
} from '@/lib/verificationFramework';

export default function LandingPage() {
  const [activeShowcase, setActiveShowcase] = useState<'candidate' | 'recruiter' | 'passport' | 'assessment' | 'teams' | 'analytics'>('candidate');
  const [activeFrameworkLevel, setActiveFrameworkLevel] = useState<VerificationLevel>(4);
  const [simulatorModalOpen, setSimulatorModalOpen] = useState(false);
  const [simulatorSkill, setSimulatorSkill] = useState('Python');

  return (
    <div className="w-full bg-white text-[#0A0A0A] overflow-hidden">
      {/* ========================================================= */}
      {/* 2. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 bg-stripe-mesh border-b border-[#E5E7EB]">
        {/* Subtle background ambient mesh */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#635BFF]/8 border border-[#635BFF]/20 text-[#635BFF] text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#635BFF]" />
              <span>Trusted Skill Verification Infrastructure</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0A0A0A] tracking-tight leading-[1.08] font-sans">
              Know what candidates can do.{' '}
              <span className="text-[#6B7280] font-normal">Not what they claim.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              SkillForge evaluates real-world abilities through practical assessments and generates trusted credentials that teams can verify instantly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] text-white font-semibold text-sm shadow-subtle hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/passport/alex"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0A0A0A] border border-[#E5E7EB] font-semibold text-sm shadow-subtle transition-all cursor-pointer"
              >
                <span>View Demo</span>
                <ExternalLink size={14} className="text-[#6B7280]" />
              </Link>
            </div>
          </div>

          {/* Hero Visual: Stripe-Style Floating Dashboard Mockup */}
          <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto">
            <div className="rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] p-4 sm:p-6 shadow-floating">
              {/* Browser bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E7EB] text-xs text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E5E7EB]" />
                  <div className="w-3 h-3 rounded-full bg-[#E5E7EB]" />
                  <div className="w-3 h-3 rounded-full bg-[#E5E7EB]" />
                  <span className="ml-2 font-mono text-[11px] text-[#6B7280]">app.skillforge.com/verify</span>
                </div>
                <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-[#E5E7EB] text-[#10B981] font-semibold">
                  ECDSA Verified
                </span>
              </div>

              {/* Main Dashboard Canvas Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left Card: Verified Skills & Score */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">Candidate Audit</p>
                      <h3 className="text-base font-bold text-[#0A0A0A]">Alex Morgan</h3>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-[#6B7280] font-medium">SkillForge Trust Score</span>
                      <span className="text-2xl font-bold font-mono text-[#0A0A0A]">89<span className="text-xs text-[#6B7280]">/100</span></span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#635BFF] h-full rounded-full" style={{ width: '89%' }} />
                    </div>
                    <p className="text-[11px] text-[#6B7280]">Top 5% verified percentile across 50k benchmarks.</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#0A0A0A]">Verified Competencies</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span>React</span>
                        <span className="font-mono text-[#635BFF] font-bold">92%</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span>Python</span>
                        <span className="font-mono text-[#635BFF] font-bold">88%</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span>Git</span>
                        <span className="font-mono text-[#635BFF] font-bold">81%</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center Card: Practical Assessment Benchmark */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">Practical Benchmark</p>
                      <h3 className="text-base font-bold text-[#0A0A0A]">Real-World Challenge</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#635BFF]/10 text-[#635BFF] font-bold">
                      Passing: 70%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0A0A0A] text-[#F8FAFC] font-mono text-xs space-y-1">
                    <p className="text-[#6B7280]">// Scenario 3 of 5: Hook Lifecycle</p>
                    <p className="text-[#10B981]">function useSocket(url: string) &#123;</p>
                    <p className="pl-4 text-[#F8FAFC]">useEffect(() =&gt; &#123;</p>
                    <p className="pl-8 text-amber-300">return () =&gt; socket.close();</p>
                    <p className="pl-4 text-[#F8FAFC]">&#125;, [url]);</p>
                    <p className="text-[#10B981]">&#125;</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B7280]">Verification Accuracy</span>
                      <span className="font-mono font-bold text-[#10B981]">98.4% Confidence</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 text-xs text-[#0A0A0A] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                      <span>Benchmark passed without resume guesswork.</span>
                    </div>
                  </div>
                </div>

                {/* Right Card: Team Formation & Recruiter Insights */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">Recruiter Intelligence</p>
                      <h3 className="text-base font-bold text-[#0A0A0A]">Team CodeForge</h3>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-between text-xs">
                      <span className="font-medium text-[#0A0A0A]">Sam — Backend</span>
                      <span className="font-mono text-[#10B981] font-semibold">Verified Go</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-between text-xs">
                      <span className="font-medium text-[#0A0A0A]">Maya — UI/UX</span>
                      <span className="font-mono text-[#10B981] font-semibold">Verified Figma</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#635BFF]/5 border border-[#635BFF]/20 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#635BFF]">Alex Morgan (Invite Sent)</span>
                      <span className="font-mono text-[#635BFF] font-bold">Frontend 92%</span>
                    </div>
                  </div>

                  <Link
                    href="/teams"
                    className="block w-full text-center py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-semibold transition-all"
                  >
                    Inspect Team Formation
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Stripe-Style Accent Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-floating items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-bold">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0A0A0A]">Cryptographic Proof</p>
                <p className="text-[11px] text-[#6B7280]">Zero self-reported inflation</p>
              </div>
            </div>

            {/* Floating Stripe-Style Metric Badge */}
            <div className="hidden sm:flex absolute -top-6 -right-6 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-floating items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center font-bold">
                <TrendingUp size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0A0A0A]">4.2 Days Time-to-Hire</p>
                <p className="text-[11px] text-[#6B7280]">73% faster than resume reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TRUST SECTION                                          */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Key Metrics Requested */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1">
              <p className="text-3xl sm:text-4xl font-bold font-mono text-[#0A0A0A] tracking-tight">50,000+</p>
              <p className="text-xs sm:text-sm text-[#6B7280] font-medium">Assessments Completed</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1">
              <p className="text-3xl sm:text-4xl font-bold font-mono text-[#10B981] tracking-tight">92%</p>
              <p className="text-xs sm:text-sm text-[#6B7280] font-medium">Verification Accuracy</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1">
              <p className="text-3xl sm:text-4xl font-bold font-mono text-[#635BFF] tracking-tight">10,000+</p>
              <p className="text-xs sm:text-sm text-[#6B7280] font-medium">Verified Profiles</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1">
              <p className="text-3xl sm:text-4xl font-bold font-mono text-[#0A0A0A] tracking-tight">500+</p>
              <p className="text-xs sm:text-sm text-[#6B7280] font-medium">Organizations</p>
            </div>
          </div>

          {/* Subtle Monochrome Company Logos */}
          <div className="space-y-4 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
              Trusted by engineering teams at high-growth startups and global enterprises
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-200">
              <span className="font-bold text-lg tracking-wider text-[#0A0A0A]">STRIPE</span>
              <span className="font-bold text-lg tracking-wider text-[#0A0A0A]">LINEAR</span>
              <span className="font-bold text-lg tracking-wider text-[#0A0A0A]">VERCEL</span>
              <span className="font-bold text-lg tracking-wider text-[#0A0A0A]">MERCURY</span>
              <span className="font-bold text-lg tracking-wider text-[#0A0A0A]">RETOOL</span>
              <span className="font-bold text-lg tracking-wider text-[#0A0A0A]">RAMP</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PROBLEM SECTION                                        */}
      {/* ========================================================= */}
      <section id="problem" className="py-20 sm:py-32 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0A0A0A] tracking-tight">
              Resumes measure claims.<br />
              <span className="text-[#635BFF]">We measure capability.</span>
            </h2>
            <p className="text-base text-[#6B7280]">
              Traditional technical hiring relies on unverified keywords, inflated claims, and ambiguous group projects. SkillForge provides empirical signal.
            </p>
          </div>

          {/* Three Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Resume Inflation */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/40 hover:shadow-card transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                <FileCheck2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A]">Resume Inflation</h3>
              <p className="text-sm font-semibold text-[#635BFF]">Anyone can list skills.</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Candidates copy keywords from job descriptions. 78% of engineering resumes overstate proficiency in core frameworks like React, Go, and Python.
              </p>
            </div>

            {/* Card 2: Ghost Contributions */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/40 hover:shadow-card transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <GitBranch size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A]">Ghost Contributions</h3>
              <p className="text-sm font-semibold text-[#635BFF]">Projects don't reveal individual impact.</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Github repos and team hackathon projects mask whether an engineer wrote the core architecture or simply edited markdown files.
              </p>
            </div>

            {/* Card 3: Unverified Expertise */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/40 hover:shadow-card transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center font-bold">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A]">Unverified Expertise</h3>
              <p className="text-sm font-semibold text-[#635BFF]">Recruiters lack objective proof.</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Hiring managers waste hundreds of hours screening candidates who pass automated keyword filters but struggle on fundamental architectural questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4.5 NEW 6-TIER VERIFICATION FRAMEWORK & AI ENGINE SHOWCASE */}
      {/* ========================================================= */}
      <section id="verification-framework" className="py-20 sm:py-32 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#635BFF]/10 text-[#635BFF] text-xs font-mono font-bold tracking-wide border border-[#635BFF]/25">
              <Sparkles size={13} />
              <span>Next-Generation Verification Framework</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A0A0A] tracking-tight">
              The LinkedIn Verification Badge Equivalent for Technical Skills.
            </h2>
            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
              Inspired by <strong>ResumeMatch</strong>, <strong>ATS Skill Extraction</strong>, <strong>Semantic AST Analysis</strong>, <strong>GitHub Evidence</strong>, and <strong>Practical Benchmark Telemetry</strong>. Measure not only whether someone claims a skill, but whether evidence across their digital footprint supports that claim.
            </p>
          </div>

          {/* 6-Level Interactive Badge Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {([0, 1, 2, 3, 4, 5] as VerificationLevel[]).map(lvl => {
              const def = VERIFICATION_LEVELS[lvl];
              const isSelected = activeFrameworkLevel === lvl;
              return (
                <div
                  key={lvl}
                  onClick={() => setActiveFrameworkLevel(lvl)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'ring-2 ring-[#635BFF] border-[#635BFF] bg-[#F8FAFC] shadow-card'
                      : 'bg-white hover:bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[10px] text-[#6B7280]">
                      LEVEL {lvl}
                    </span>
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/5 text-[#6B7280]">
                      {def.trustScoreRange[0]}–{def.trustScoreRange[1]}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-xs text-[#0A0A0A] truncate">
                      {def.title}
                    </h4>
                    <p className="text-[10px] text-[#6B7280] line-clamp-2 mt-0.5 leading-snug">
                      {def.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E5E7EB]">
                    <VerificationBadge level={lvl} size="xs" showLevelNumber={false} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Interactive Engine Showcase for Selected Level */}
          {(() => {
            const def = VERIFICATION_LEVELS[activeFrameworkLevel];
            const sampleReport =
              activeFrameworkLevel === 5 ? SKILL_EVIDENCE_DATABASE.react :
              activeFrameworkLevel === 4 ? SKILL_EVIDENCE_DATABASE.python :
              activeFrameworkLevel === 3 ? SKILL_EVIDENCE_DATABASE['machine-learning'] :
              activeFrameworkLevel === 2 ? SKILL_EVIDENCE_DATABASE.git :
              activeFrameworkLevel === 1 ? SKILL_EVIDENCE_DATABASE.nodejs :
              SKILL_EVIDENCE_DATABASE['cloud-computing'];

            return (
              <div className="rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] p-6 sm:p-10 shadow-floating grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Level Definition, Engine Analysis & Evidence Sources (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <VerificationBadge
                        level={activeFrameworkLevel}
                        size="md"
                        showScore={true}
                        trustScore={sampleReport.trustScore}
                      />
                      <span className="text-xs font-mono font-bold text-[#6B7280]">
                        Trust Range: {def.trustScoreRange[0]}–{def.trustScoreRange[1]} Score
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                      Level {activeFrameworkLevel} — {def.title}
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      {def.description}
                    </p>
                  </div>

                  {/* Requirements & Evidence Extraction */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] space-y-2">
                      <span className="font-mono uppercase font-bold text-[#635BFF] text-[10px] block">
                        Evaluation Protocol
                      </span>
                      <ul className="space-y-1.5 text-[#4B5563]">
                        {def.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] space-y-2">
                      <span className="font-mono uppercase font-bold text-[#635BFF] text-[10px] block">
                        Evidence Sources Analyzed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {def.evidenceSources.map((src, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-mono font-semibold text-[#0A0A0A]"
                          >
                            ✓ {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Level Highlight Notes */}
                  {activeFrameworkLevel === 4 && (
                    <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-xs space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                        <Cpu size={14} className="text-indigo-600" />
                        <span>SkillForge 5-Dimension Evaluation Passed</span>
                      </div>
                      <p className="text-indigo-800 leading-relaxed">
                        Evaluated across <strong>Coding</strong> (94%), <strong>Debugging</strong> (92%), <strong>System Design</strong> (88%), <strong>Problem Solving</strong> (90%), and <strong>Communication</strong> (86%). Ranked in the <strong>91st cohort percentile</strong> with zero anti-cheat flags.
                      </p>
                    </div>
                  )}

                  {activeFrameworkLevel === 3 && (
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900">
                        <Sparkles size={14} className="text-amber-600" />
                        <span>ResumeMatch Semantic Verification Example</span>
                      </div>
                      <p className="text-amber-800 leading-relaxed">
                        Candidate claims <strong>Machine Learning</strong>. Semantic engine analyzes repos and coursework, confirming <strong>84% Semantic Match</strong> across <strong>KNN Project</strong>, <strong>Decision Tree Project</strong>, <strong>Orange Data Mining</strong>, and <strong>AI Coursework</strong>.
                      </p>
                    </div>
                  )}

                  {activeFrameworkLevel === 2 && (
                    <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-slate-900 text-xs space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5 text-slate-800">
                        <Search size={14} className="text-slate-600" />
                        <span>AI Evidence Extraction Example (Python)</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        Evidence Found across digital footprint: <strong>Data Science Project</strong>, <strong>Web Scraper</strong>, and <strong>AI Research Internship</strong>. Generated Evidence Score: 72, Confidence Score: <strong>68%</strong>.
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSimulatorSkill(sampleReport.skillName);
                        setSimulatorModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white font-bold text-xs shadow-subtle hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <Sparkles size={14} />
                      <span>Launch AI Verification Simulator</span>
                    </button>

                    <Link
                      href="/passport/alex"
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0A0A0A] border border-[#E5E7EB] font-semibold text-xs transition-all"
                    >
                      <span>View Sample Skill Passport</span>
                      <ExternalLink size={13} className="text-[#6B7280]" />
                    </Link>
                  </div>
                </div>

                {/* Right: Exact Skill Passport Output Card (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280] font-bold">
                      Exact Skill Passport Output
                    </span>
                    <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                      Live Output Format
                    </span>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border-2 border-[#E5E7EB] shadow-xl space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-2xl font-black text-[#0A0A0A]">
                          {sampleReport.skillName}
                        </h4>
                        <p className="text-[10px] font-mono text-[#635BFF] font-semibold">
                          SkillForge Technical Credential
                        </p>
                      </div>
                      <VerificationBadge
                        level={sampleReport.verificationLevel}
                        size="sm"
                        showScore={true}
                        trustScore={sampleReport.trustScore}
                      />
                    </div>

                    <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-1">
                      <div className="text-[10px] font-mono text-[#6B7280] uppercase">
                        Verification Level:
                      </div>
                      <div className="text-xs font-bold text-[#0A0A0A]">
                        {sampleReport.levelTitle}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] font-mono text-xs">
                      <span className="text-[10px] text-[#6B7280] uppercase">
                        Trust Score:
                      </span>
                      <span className="text-base font-extrabold text-[#0A0A0A]">
                        {sampleReport.trustScore}/100
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono text-[#6B7280] uppercase font-semibold">
                        Evidence Sources:
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                        {sampleReport.evidenceSources.map((src, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[11px] ${
                              src.verified
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                                : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                            }`}
                          >
                            <span>{src.verified ? '✓' : '✗'}</span>
                            <span className="truncate">{src.source}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-1">
                      <div className="text-[10px] font-mono text-[#6B7280] uppercase font-semibold">
                        Supporting Evidence:
                      </div>
                      <div className="text-xs font-mono text-[#0A0A0A] font-bold flex items-center justify-between">
                        <span>{sampleReport.supportingProjects.length} Projects</span>
                        <span>•</span>
                        <span>{sampleReport.supportingRepositories.length} Repositories</span>
                        <span>•</span>
                        <span>{sampleReport.supportingCertifications.length} Certification</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                        <span className="text-[9px] text-[#6B7280] uppercase block">Confidence:</span>
                        <span className="text-sm font-bold text-[#10B981]">{sampleReport.confidenceScore}%</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                        <span className="text-[9px] text-[#6B7280] uppercase block">Status:</span>
                        <span className={`text-sm font-bold ${sampleReport.status === 'Verified' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {sampleReport.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. HOW IT WORKS (3-STEP STRIPE-STYLE PROCESS)             */}
      {/* ========================================================= */}
      <section id="how-it-works" className="py-20 sm:py-32 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-wider text-[#635BFF] font-semibold">Verification Architecture</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0A0A0A] tracking-tight">
              Three steps to verifiable proof.
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280]">
              A deterministic protocol designed to verify technical abilities with zero resume friction.
            </p>
          </div>

          {/* Elegant 3-Step Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-subtle space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-mono font-bold text-sm">
                  1
                </span>
                <span className="text-xs font-mono text-[#6B7280]">~5 Minutes</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">Take Practical Assessment</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Candidates complete concise, scenario-based evaluations testing code debugging, edge case handling, and architecture fundamentals.
              </p>
              <div className="pt-2 text-xs font-mono text-[#635BFF] font-medium flex items-center gap-1">
                <span>Passing threshold: 70%</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-subtle space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-mono font-bold text-sm">
                  2
                </span>
                <span className="text-xs font-mono text-[#10B981] font-semibold">Instant Issuance</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">Generate Verified Credential</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Scores pass through our calibration model to issue a tamper-proof cryptographic badge with an audited confidence score.
              </p>
              <div className="pt-2 text-xs font-mono text-[#10B981] font-medium flex items-center gap-1">
                <span>ECDSA signed on-chain</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-subtle space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-mono font-bold text-sm">
                  3
                </span>
                <span className="text-xs font-mono text-[#635BFF] font-semibold">Public Passport</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">Share Proof & Find Opportunities</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Share a live public Skill Passport with recruiters, join verified hackathon squads, or receive direct team invitations without sending a resume.
              </p>
              <div className="pt-2 text-xs font-mono text-[#0A0A0A] font-medium flex items-center gap-1">
                <span>Direct recruitment signal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FEATURES SECTION                                       */}
      {/* ========================================================= */}
      <section id="features" className="py-20 sm:py-32 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-wider text-[#635BFF] font-semibold">Platform Capabilities</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0A0A0A] tracking-tight">
              Engineered for absolute trust.
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280]">
              Everything you need to audit, verify, and recruit technical talent at scale.
            </p>
          </div>

          {/* 8-Card Premium Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. AI Skill Benchmarking */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/30 hover:shadow-card transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#635BFF] flex items-center justify-center shadow-subtle">
                <Brain size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#0A0A0A]">AI Skill Benchmarking</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Practical scenario simulations that adapt difficulty dynamically based on real-world engineering challenges.
              </p>
            </div>

            {/* 2. Confidence Scoring */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/30 hover:shadow-card transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#10B981] flex items-center justify-center shadow-subtle">
                <TrendingUp size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#0A0A0A]">Confidence Scoring</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Deterministic 0–100% confidence calculation weighting platform benchmarks, peer validations, and challenge history.
              </p>
            </div>

            {/* 3. Tamper-Proof Credentials */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/30 hover:shadow-card transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-indigo-600 flex items-center justify-center shadow-subtle">
                <Lock size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#0A0A0A]">Tamper-Proof Credentials</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Each verified competency is minted with an ECDSA cryptographic signature that can be audited by third parties.
              </p>
            </div>

            {/* 4. Skill Passport */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/30 hover:shadow-card transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-purple-600 flex items-center justify-center shadow-subtle">
                <FileCheck2 size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#0A0A0A]">Skill Passport</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                A public, shareable engineering passport that acts as an objective alternative to unverified LinkedIn profiles.
              </p>
            </div>

            {/* 5. Team Formation Engine */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/30 hover:shadow-card transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-cyan-600 flex items-center justify-center shadow-subtle">
                <Users2 size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#0A0A0A]">Team Formation Engine</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Algorithmic team assembly matching complimentary skills across frontend, backend, AI, and infrastructure.
              </p>
            </div>

            {/* 6. Recruiter Analytics */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/30 hover:shadow-card transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-amber-600 flex items-center justify-center shadow-subtle">
                <BarChart3 size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#0A0A0A]">Recruiter Analytics</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Deep pipeline visibility into verified skill cohorts, assessment pass rates, and time-to-hire compression.
              </p>
            </div>

            {/* 7. Skill Graph */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/30 hover:shadow-card transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-rose-600 flex items-center justify-center shadow-subtle">
                <Layers size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#0A0A0A]">Skill Graph</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Dynamic visual dependency trees highlighting adjacent frameworks and multi-disciplinary capabilities.
              </p>
            </div>

            {/* 8. Verification History */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#635BFF]/30 hover:shadow-card transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-emerald-600 flex items-center justify-center shadow-subtle">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#0A0A0A]">Verification History</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Auditable timeline documenting every practical assessment attempt, verified date, and credential status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. PRODUCT SHOWCASE (INTERACTIVE TABS)                    */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-32 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-wider text-[#635BFF] font-semibold">Interactive Platform</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0A0A0A] tracking-tight">
              A unified system for candidate & recruiter truth.
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280]">
              Toggle through the active modules of the SkillForge ecosystem.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {[
              { id: 'candidate', label: 'Candidate Dashboard' },
              { id: 'recruiter', label: 'Recruiter Dashboard' },
              { id: 'passport', label: 'Skill Passport' },
              { id: 'assessment', label: 'Assessment Interface' },
              { id: 'teams', label: 'Team Matching' },
              { id: 'analytics', label: 'Analytics Center' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveShowcase(tab.id as typeof activeShowcase)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeShowcase === tab.id
                    ? 'bg-[#635BFF] text-white shadow-subtle'
                    : 'bg-white text-[#6B7280] hover:text-[#0A0A0A] border border-[#E5E7EB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Showcase Display Canvas */}
          <div className="rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-8 shadow-floating max-w-5xl mx-auto">
            {activeShowcase === 'candidate' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Candidate Dashboard</h3>
                    <p className="text-xs text-[#6B7280]">Welcome back, Alex. Build your Skill Passport with empirical proof.</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#635BFF] text-white text-xs font-semibold hover:bg-[#5346E0] transition-colors"
                  >
                    <span>Open Live Dashboard</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-1">
                    <p className="text-xs text-[#6B7280]">Profile Completeness</p>
                    <p className="text-2xl font-bold font-mono text-[#0A0A0A]">82%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-1">
                    <p className="text-xs text-[#6B7280]">Verified Skills</p>
                    <p className="text-2xl font-bold font-mono text-[#10B981]">3 Badges</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-1">
                    <p className="text-xs text-[#6B7280]">Team Invitations</p>
                    <p className="text-2xl font-bold font-mono text-[#635BFF]">2 Pending</p>
                  </div>
                </div>
              </div>
            )}

            {activeShowcase === 'recruiter' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Recruiter Talent Pipeline</h3>
                    <p className="text-xs text-[#6B7280]">Real-time verified engineering candidates ranked by practical benchmarks.</p>
                  </div>
                  <Link
                    href="/recruiter"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#635BFF] text-white text-xs font-semibold hover:bg-[#5346E0] transition-colors"
                  >
                    <span>Open Recruiter Portal</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6B7280]">
                    <span>CANDIDATE</span>
                    <span>VERIFIED BENCHMARKS</span>
                    <span>CONFIDENCE</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-2 border-t border-[#E5E7EB]">
                    <span className="font-semibold text-[#0A0A0A]">Alex Morgan</span>
                    <span className="text-[#10B981] font-mono">React 92% • Python 88%</span>
                    <span className="font-mono font-bold text-[#635BFF]">89% Trust</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-2 border-t border-[#E5E7EB]">
                    <span className="font-semibold text-[#0A0A0A]">Sarah Chen</span>
                    <span className="text-[#10B981] font-mono">PyTorch 96% • Python 94%</span>
                    <span className="font-mono font-bold text-[#635BFF]">94% Trust</span>
                  </div>
                </div>
              </div>
            )}

            {activeShowcase === 'passport' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Live Skill Passport</h3>
                    <p className="text-xs text-[#6B7280]">Shareable cryptographic proof of real engineering competency.</p>
                  </div>
                  <Link
                    href="/passport/alex"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#635BFF] text-white text-xs font-semibold hover:bg-[#5346E0] transition-colors"
                  >
                    <span>View Alex's Passport</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-bold">
                      AM
                    </div>
                    <div>
                      <p className="font-bold text-[#0A0A0A]">Alex Morgan</p>
                      <p className="text-xs text-[#6B7280]">Full Stack Developer • Tech University</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                      Top 5% Trust Score (89/100)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeShowcase === 'assessment' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Assessment Interface</h3>
                    <p className="text-xs text-[#6B7280]">A short, practical benchmark designed to verify understanding without resume friction.</p>
                  </div>
                  <Link
                    href="/assessment/react"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#635BFF] text-white text-xs font-semibold hover:bg-[#5346E0] transition-colors"
                  >
                    <span>Launch React Assessment</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2 text-xs">
                  <p className="font-semibold text-[#0A0A0A]">Question 1 of 5: React Architecture</p>
                  <p className="text-[#6B7280]">Which lifecycle mechanism clears memory subscriptions before the component unmounts?</p>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E7EB] text-[#0A0A0A] font-medium">
                    useEffect cleanup callback function
                  </div>
                </div>
              </div>
            )}

            {activeShowcase === 'teams' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Team Matching (CodeForge)</h3>
                    <p className="text-xs text-[#6B7280]">SkillSprint 2026 team roster with open Frontend Developer position.</p>
                  </div>
                  <Link
                    href="/teams"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#635BFF] text-white text-xs font-semibold hover:bg-[#5346E0] transition-colors"
                  >
                    <span>View Team CodeForge</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                    <p className="font-bold text-[#0A0A0A]">Sam — Backend</p>
                    <p className="text-[#6B7280]">Go & Distributed</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                    <p className="font-bold text-[#0A0A0A]">Maya — UI/UX</p>
                    <p className="text-[#6B7280]">Design Systems & Figma</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/30 text-[#635BFF]">
                    <p className="font-bold">You — AI/ML</p>
                    <p className="text-xs">Team Lead</p>
                  </div>
                </div>
              </div>
            )}

            {activeShowcase === 'analytics' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Analytics Center</h3>
                    <p className="text-xs text-[#6B7280]">Real-time technical cohort metrics, assessment accuracy, and candidate conversion.</p>
                  </div>
                  <Link
                    href="/recruiter"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#635BFF] text-white text-xs font-semibold hover:bg-[#5346E0] transition-colors"
                  >
                    <span>Explore Analytics</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#6B7280] space-y-2">
                  <div className="flex justify-between font-mono">
                    <span>ASSESSMENT VELOCITY</span>
                    <span className="text-[#10B981] font-bold">+18.4% this week</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>CANDIDATE DISCOVERY INDEX</span>
                    <span className="text-[#635BFF] font-bold">99.1% High Match</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. TESTIMONIALS (LINEAR-STYLE CLEAN OUTCOMES)             */}
      {/* ========================================================= */}
      <section id="testimonials" className="py-20 sm:py-32 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-wider text-[#635BFF] font-semibold">Hiring Outcomes</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0A0A0A] tracking-tight">
              Trusted by engineering leaders.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] shadow-subtle space-y-4 flex flex-col justify-between">
              <p className="text-sm text-[#0A0A0A] leading-relaxed">
                "We cut our technical screening time by 65%. Instead of conducting 30 first-round phone calls, we look at the SkillForge confidence score and hire with empirical certainty."
              </p>
              <div className="pt-4 border-t border-[#E5E7EB]">
                <p className="text-xs font-bold text-[#0A0A0A]">Elena Rostova</p>
                <p className="text-[11px] text-[#6B7280]">VP of Engineering, HyperScale</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] shadow-subtle space-y-4 flex flex-col justify-between">
              <p className="text-sm text-[#0A0A0A] leading-relaxed">
                "As a candidate without a traditional CS degree, resumes never got me interviews. My SkillForge React 92% and Python 88% verified badges landed me 4 inbound recruiter offers in 48 hours."
              </p>
              <div className="pt-4 border-t border-[#E5E7EB]">
                <p className="text-xs font-bold text-[#0A0A0A]">Alex Morgan</p>
                <p className="text-[11px] text-[#6B7280]">Full Stack Engineer</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] shadow-subtle space-y-4 flex flex-col justify-between">
              <p className="text-sm text-[#0A0A0A] leading-relaxed">
                "SkillForge solved hackathon ghosting. When squads form around verified practical competencies, project completion rates jump from 40% to 91%."
              </p>
              <div className="pt-4 border-t border-[#E5E7EB]">
                <p className="text-xs font-bold text-[#0A0A0A]">Marcus Vance</p>
                <p className="text-[11px] text-[#6B7280]">Director, SkillSprint 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. PRICING                                                */}
      {/* ========================================================= */}
      <section id="pricing" className="py-20 sm:py-32 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-wider text-[#635BFF] font-semibold">Predictable Pricing</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0A0A0A] tracking-tight">
              Invest in verified capability.
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280]">
              Free for candidates proving skills. Scalable plans for recruiting teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-subtle space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">Starter</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0A0A0A] font-mono">$0</span>
                  <span className="text-xs text-[#6B7280]">/ forever</span>
                </div>
                <p className="text-xs text-[#6B7280]">For individual developers proving their skills.</p>
                <ul className="space-y-2.5 text-xs text-[#0A0A0A] pt-2">
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Up to 5 verified skill benchmarks</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Public Skill Passport with QR link</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Hackathon team matching access</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Direct recruiter invitations</li>
                </ul>
              </div>
              <Link
                href="/login"
                className="block w-full py-3 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0A0A0A] border border-[#E5E7EB] text-center text-xs font-semibold shadow-subtle transition-all"
              >
                Create Candidate Passport
              </Link>
            </div>

            {/* Professional */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#635BFF] shadow-floating-purple space-y-6 flex flex-col justify-between relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#635BFF] text-white uppercase tracking-wider">
                Most Popular
              </span>
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider text-[#635BFF] font-semibold">Professional</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0A0A0A] font-mono">$79</span>
                  <span className="text-xs text-[#6B7280]">/ seat / mo</span>
                </div>
                <p className="text-xs text-[#6B7280]">For fast-growing startups and recruitment teams.</p>
                <ul className="space-y-2.5 text-xs text-[#0A0A0A] pt-2">
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Unlimited candidate discovery</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> One-click optional skill challenges</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Verified confidence score analytics</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Direct team invitation system</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> CSV & ATS webhook export</li>
                </ul>
              </div>
              <Link
                href="/recruiter"
                className="block w-full py-3 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] text-white text-center text-xs font-semibold shadow-subtle transition-all"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-subtle space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">Enterprise</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0A0A0A] font-mono">Custom</span>
                </div>
                <p className="text-xs text-[#6B7280]">For enterprise organizations and large hackathons.</p>
                <ul className="space-y-2.5 text-xs text-[#0A0A0A] pt-2">
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Custom benchmark creation</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Dedicated talent pipeline auditing</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> SOC2 Type II & SSO / SAML integration</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> Dedicated customer success manager</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#10B981]" /> 99.9% uptime SLA guarantee</li>
                </ul>
              </div>
              <Link
                href="/recruiter"
                className="block w-full py-3 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0A0A0A] border border-[#E5E7EB] text-center text-xs font-semibold shadow-subtle transition-all"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FINAL CTA                                             */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-bold text-[#0A0A0A] tracking-tight">
            Build teams on evidence.<br />
            <span className="text-[#635BFF]">Not assumptions.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-xl mx-auto leading-relaxed">
            Start verifying skills today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] text-white font-semibold text-sm shadow-subtle transition-all"
            >
              <span>Get Started</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/recruiter"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0A0A0A] border border-[#E5E7EB] font-semibold text-sm transition-all"
            >
              <span>Schedule Enterprise Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Verification Engine Simulator Modal */}
      <AIVerificationSimulatorModal
        isOpen={simulatorModalOpen}
        onClose={() => setSimulatorModalOpen(false)}
        initialSkill={simulatorSkill}
      />

      {/* ========================================================= */}
      {/* 11. FOOTER                                                */}
      {/* ========================================================= */}
      <Footer />
    </div>
  );
}
