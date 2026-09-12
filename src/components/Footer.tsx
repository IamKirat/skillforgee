'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-[#E5E7EB] text-[#0A0A0A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-[#E5E7EB]">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center text-white shadow-sm">
                <ShieldCheck size={18} className="stroke-[2.2]" />
              </div>
              <span className="font-bold text-lg text-[#0A0A0A] tracking-tight">
                SkillForge
              </span>
            </Link>
            <p className="text-xs text-[#6B7280] max-w-sm leading-relaxed">
              The trust infrastructure for skills. Proof beats promises.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-mono text-[#0A0A0A] shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#635BFF] text-white hover:bg-[#5346E0] shadow-subtle transition-all"
            >
              <span>Platform Portal</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* 6 Structured Columns as requested */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 py-12 text-xs">
          {/* Column 1: Products */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#0A0A0A] text-xs uppercase tracking-wider font-mono">
              Products
            </h4>
            <ul className="space-y-2 text-[#6B7280]">
              <li><Link href="/dashboard" className="hover:text-[#0A0A0A] transition-colors">Skill Verification</Link></li>
              <li><Link href="/passport/alex" className="hover:text-[#0A0A0A] transition-colors">Skill Passport</Link></li>
              <li><Link href="/recruiter" className="hover:text-[#0A0A0A] transition-colors">Recruiter Analytics</Link></li>
              <li><Link href="/teams" className="hover:text-[#0A0A0A] transition-colors">Team Formation</Link></li>
              <li><Link href="/assessment/react" className="hover:text-[#0A0A0A] transition-colors">Micro-Assessments</Link></li>
              <li><Link href="/discover" className="hover:text-[#0A0A0A] transition-colors">Talent Discovery</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#0A0A0A] text-xs uppercase tracking-wider font-mono">
              Solutions
            </h4>
            <ul className="space-y-2 text-[#6B7280]">
              <li><Link href="/recruiter" className="hover:text-[#0A0A0A] transition-colors">For Recruiters</Link></li>
              <li><Link href="/#pricing" className="hover:text-[#0A0A0A] transition-colors">For Startups</Link></li>
              <li><Link href="/teams" className="hover:text-[#0A0A0A] transition-colors">For Hackathons</Link></li>
              <li><Link href="/#pricing" className="hover:text-[#0A0A0A] transition-colors">For Enterprise</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#0A0A0A] transition-colors">For Candidates</Link></li>
              <li><Link href="/recruiter" className="hover:text-[#0A0A0A] transition-colors">Technical Hiring</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#0A0A0A] text-xs uppercase tracking-wider font-mono">
              Resources
            </h4>
            <ul className="space-y-2 text-[#6B7280]">
              <li><Link href="/#problem" className="hover:text-[#0A0A0A] transition-colors">Why Resumes Fail</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-[#0A0A0A] transition-colors">Trust Methodology</Link></li>
              <li><Link href="/#features" className="hover:text-[#0A0A0A] transition-colors">Practical Benchmarks</Link></li>
              <li><Link href="/#testimonials" className="hover:text-[#0A0A0A] transition-colors">Customer Stories</Link></li>
              <li><Link href="/#pricing" className="hover:text-[#0A0A0A] transition-colors">ROI Calculator</Link></li>
              <li><Link href="/passport/alex" className="hover:text-[#0A0A0A] transition-colors">Sample Credentials</Link></li>
            </ul>
          </div>

          {/* Column 4: Developers */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#0A0A0A] text-xs uppercase tracking-wider font-mono">
              Developers
            </h4>
            <ul className="space-y-2 text-[#6B7280]">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">API Documentation</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">Verification Webhooks</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">Node.js SDK</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">Python SDK</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">GitHub App</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">System Changelog</a></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#0A0A0A] text-xs uppercase tracking-wider font-mono">
              Company
            </h4>
            <ul className="space-y-2 text-[#6B7280]">
              <li><Link href="/#about" className="hover:text-[#0A0A0A] transition-colors">About SkillForge</Link></li>
              <li><Link href="/#team" className="hover:text-[#0A0A0A] transition-colors flex items-center gap-1.5"><span>Careers</span><span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#635BFF]/10 text-[#635BFF] font-semibold">Hiring</span></Link></li>
              <li><Link href="/#press" className="hover:text-[#0A0A0A] transition-colors">Press & Media</Link></li>
              <li><Link href="/#security" className="hover:text-[#0A0A0A] transition-colors">Security Center</Link></li>
              <li><Link href="/#contact" className="hover:text-[#0A0A0A] transition-colors">Contact Sales</Link></li>
              <li><Link href="/#partners" className="hover:text-[#0A0A0A] transition-colors">Accredited Partners</Link></li>
            </ul>
          </div>

          {/* Column 6: Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#0A0A0A] text-xs uppercase tracking-wider font-mono">
              Legal
            </h4>
            <ul className="space-y-2 text-[#6B7280]">
              <li><Link href="/#terms" className="hover:text-[#0A0A0A] transition-colors">Terms of Service</Link></li>
              <li><Link href="/#privacy" className="hover:text-[#0A0A0A] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/#dpa" className="hover:text-[#0A0A0A] transition-colors">Data Processing Addendum</Link></li>
              <li><Link href="/#subprocessors" className="hover:text-[#0A0A0A] transition-colors">Subprocessors</Link></li>
              <li><Link href="/#cookies" className="hover:text-[#0A0A0A] transition-colors">Cookie Preferences</Link></li>
              <li><Link href="/#compliance" className="hover:text-[#0A0A0A] transition-colors">SOC2 Type II Certified</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6B7280]">
          <p>© {new Date().getFullYear()} SkillForge Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with calm confidence.</span>
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
