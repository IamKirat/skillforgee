'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Save,
  RotateCcw,
  Check,
  ShieldCheck,
  Plus,
  Trash2,
  ExternalLink,
  Globe,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { useSkillForge } from '@/lib/store';
import { DashboardLayout } from '@/components/DashboardLayout';
import { SkillBadge } from '@/components/SkillBadge';
import { SkillItem } from '@/lib/types';

export default function ProfilePage() {
  const { candidate, updateProfile, resetToDefault, claimSkill } = useSkillForge();

  const [name, setName] = useState(candidate.name);
  const [role, setRole] = useState(candidate.role);
  const [university, setUniversity] = useState(candidate.university);
  const [bio, setBio] = useState(candidate.bio);
  const [location, setLocation] = useState(candidate.location);
  const [githubUrl, setGithubUrl] = useState(candidate.githubUrl);
  const [portfolioUrl, setPortfolioUrl] = useState(candidate.portfolioUrl);
  const [lookingForTeam, setLookingForTeam] = useState(candidate.lookingForTeam);
  const [newSkill, setNewSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      role,
      university,
      bio,
      location,
      githubUrl,
      portfolioUrl,
      lookingForTeam,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    claimSkill(newSkill.trim(), 'frontend');
    setNewSkill('');
  };

  const handleRemoveSkill = (skillId: string) => {
    const updatedSkills = candidate.skills.filter(s => s.id !== skillId);
    updateProfile({ skills: updatedSkills });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Edit Candidate Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Update your public hacker identity, portfolio links, and claimed competencies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Reset mock data to default"
            >
              <RotateCcw size={13} />
              <span>Reset to Default</span>
            </button>

            <Link
              href={`/passport/${candidate.username}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              <span>View Passport</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/40 animate-in fade-in slide-in-from-top-2 duration-200">
            <Check size={16} className="text-emerald-400" />
            <span>Profile successfully updated and synchronized across all passport views!</span>
          </div>
        )}

        {/* Profile Avatar & Quick Info Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-xl"
            />
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 ring-2 ring-slate-900">
              <ShieldCheck size={14} className="text-slate-950" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{name}</h2>
              <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                @{candidate.username}
              </span>
            </div>
            <p className="text-xs text-slate-300">{role}</p>
            <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <GraduationCap size={13} />
              {university} • Passport ID: {candidate.passportId}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Personal & Academic Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Primary Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  University / Institution
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Location / Availability
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Bio (Featured on Discovery & Passport)
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <GithubIcon size={13} />
                  <span>GitHub Profile</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Globe size={13} />
                  <span>Portfolio URL</span>
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={e => setPortfolioUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Hackathon Availability Settings */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Hackathon Team Matching Preferences
            </h3>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div>
                <p className="text-xs font-semibold text-white">
                  Available for HackGenesis '26 Team Formation
                </p>
                <p className="text-[11px] text-slate-400">
                  When enabled, your profile appears on the Discover page for recruiters.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLookingForTeam(!lookingForTeam)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  lookingForTeam ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    lookingForTeam ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Skills Management */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Manage Claimed Skills
                </h3>
                <p className="text-xs text-slate-400">
                  Verified skills have cryptographic proof; unverified skills can be tested anytime.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {candidate.skills.map(skill => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                >
                  <span className="font-medium text-white">{skill.name}</span>
                  {skill.status === 'VERIFIED' ? (
                    <span className="text-[10px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/15">
                      {skill.confidenceScore}%
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
                      {skill.status}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-slate-500 hover:text-rose-400 p-0.5 ml-1 transition-colors cursor-pointer"
                    title="Remove skill"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Claim another skill (e.g. Next.js, Docker, FastAPI)..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Save size={14} />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
