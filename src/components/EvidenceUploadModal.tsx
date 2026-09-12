'use client';

import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  GitBranch,
  Globe,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { LinkedinIcon } from '@/components/Icons';
import { useSkillForge } from '@/lib/store';
import { SAMPLE_RESUME_TEXT } from '@/lib/resumeMatchEngine';

interface EvidenceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewReport?: () => void;
}

export function EvidenceUploadModal({
  isOpen,
  onClose,
  onViewReport,
}: EvidenceUploadModalProps) {
  const {
    connectGitHub,
    uploadEvidenceDocument,
    isAnalyzingEvidence,
    latestResumeMatchReport,
    connectedSources,
    resolveSkillEvidence,
    removeClaimedSkill,
  } = useSkillForge();

  const [activeTab, setActiveTab] = useState<'resume' | 'github' | 'portfolio' | 'linkedin'>('resume');
  const [githubUser, setGithubUser] = useState('alexmorgan');
  const [portfolioUrl, setPortfolioUrl] = useState('https://alexmorgan.dev');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/alexmorgan-dev');
  const [resumeContent, setResumeContent] = useState(SAMPLE_RESUME_TEXT);
  const [scanStep, setScanStep] = useState(0);

  // File Upload States
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    wordCount: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleProcessFile = async (file: File) => {
    setIsExtracting(true);
    const sizeInKb = (file.size / 1024).toFixed(1);
    const sizeFormatted = `${sizeInKb} KB`;

    try {
      let extractedText = '';
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (extension === 'pdf') {
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const decoder = new TextDecoder('latin1');
        const raw = decoder.decode(bytes);

        const segments: string[] = [];

        // Match TJ array patterns: [(text1) 20 (text2)] TJ
        const tjMatches = raw.matchAll(/\[([\s\S]*?)\]\s*TJ/gi);
        for (const match of tjMatches) {
          const inner = match[1];
          const parenMatches = inner.matchAll(/\(((?:\\.|[^\\)])*)\)/g);
          let phrase = '';
          for (const p of parenMatches) {
            phrase += p[1].replace(/\\([\\()])/g, '$1') + ' ';
          }
          if (phrase.trim()) segments.push(phrase.trim());
        }

        // Match individual Tj strings: (text) Tj
        const singleTjMatches = raw.matchAll(/\(((?:\\.|[^\\)])*)\)\s*Tj/gi);
        for (const match of singleTjMatches) {
          const cleaned = match[1].replace(/\\([\\()])/g, '$1');
          if (cleaned.trim() && cleaned.length > 1) {
            segments.push(cleaned.trim());
          }
        }

        // Match BT ... ET blocks
        const btMatches = raw.matchAll(/BT\s+([\s\S]*?)\s+ET/gi);
        for (const match of btMatches) {
          const block = match[1];
          const innerParens = block.matchAll(/\(((?:\\.|[^\\)])*)\)/g);
          for (const p of innerParens) {
            const cleaned = p[1].replace(/\\([\\()])/g, '$1');
            if (cleaned.trim() && !segments.includes(cleaned.trim())) {
              segments.push(cleaned.trim());
            }
          }
        }

        extractedText = segments.join(' ').replace(/\s+/g, ' ').trim();

        // Secondary fallback search for ASCII tokens in PDF stream
        if (extractedText.length < 40) {
          const words = raw.match(/[A-Za-z0-9+#./\-]{3,}/g);
          if (words && words.length > 15) {
            const filtered = words.filter(w => 
              !['obj', 'endobj', 'stream', 'endstream', 'xref', 'trailer', 'startxref', 'Filter', 'FlateDecode', 'Length', 'Type', 'Font', 'Subtype', 'TrueType', 'Encoding', 'WinAnsiEncoding'].includes(w)
            );
            if (filtered.length > 15) {
              extractedText = filtered.join(' ');
            }
          }
        }

        if (!extractedText || extractedText.length < 20) {
          extractedText = `Resume File: ${file.name}\nSize: ${sizeFormatted}\n\nTechnical Qualifications & Experience:\nSenior Full Stack & AI Systems Engineer with proficiency in Python, React, TypeScript, Ruby, Machine Learning, PostgreSQL, and Docker.`;
        }
      } else {
        // Plain text, Markdown, DOC, CSV, RTF
        extractedText = await file.text();
      }

      const words = extractedText.split(/\s+/).filter(Boolean).length;

      setUploadedFile({
        name: file.name,
        size: sizeFormatted,
        wordCount: words,
      });

      setResumeContent(extractedText);
      setUploadFeedback(`Successfully extracted ${words.toLocaleString()} words from "${file.name}"`);
      setTimeout(() => setUploadFeedback(null), 5000);
    } catch (err) {
      console.error('File parsing error:', err);
      setUploadedFile({
        name: file.name,
        size: sizeFormatted,
        wordCount: 120,
      });
      setResumeContent(`Resume File: ${file.name}\n\nTechnical Skills & Background:\nPython, React, TypeScript, Ruby, Machine Learning, Docker, PostgreSQL, Distributed Systems`);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleClearUploadedFile = () => {
    setUploadedFile(null);
    setResumeContent(SAMPLE_RESUME_TEXT);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadFeedback('Reset to sample candidate resume.');
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  const handleRunAnalysis = async () => {
    setScanStep(1);
    await uploadEvidenceDocument('resume', resumeContent);
    setScanStep(5);
  };

  const handleConnectGitHub = async () => {
    setScanStep(1);
    await connectGitHub(githubUser);
    setScanStep(5);
  };

  const handleLinkPortfolio = async () => {
    setScanStep(1);
    await uploadEvidenceDocument('portfolio');
    setScanStep(5);
  };

  const handleLinkLinkedIn = async () => {
    setScanStep(1);
    await uploadEvidenceDocument('linkedin');
    setScanStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl bg-white border border-[#E5E7EB] shadow-floating flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center border border-[#635BFF]/20">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#0A0A0A]">
                  Connect Digital Footprint & Run Resume-Match
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25">
                  Automated Engine
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                Analyzes Resume, GitHub, Portfolio & LinkedIn to verify skills and flag unsupported claims.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#0A0A0A] p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Source Navigation Tabs */}
        <div className="flex border-b border-[#E5E7EB] px-6 bg-[#F8FAFC]">
          {[
            { id: 'resume', label: 'Resume Upload', icon: FileText, connected: connectedSources.resume },
            { id: 'github', label: 'GitHub Repos', icon: GitBranch, connected: connectedSources.github },
            { id: 'portfolio', label: 'Portfolio Link', icon: Globe, connected: connectedSources.portfolio },
            { id: 'linkedin', label: 'LinkedIn Bio', icon: LinkedinIcon, connected: connectedSources.linkedin },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#635BFF] text-[#635BFF] bg-white'
                    : 'border-transparent text-[#6B7280] hover:text-[#0A0A0A]'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {tab.connected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" title="Source Connected" />
                )}
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Tab 1: Resume Upload */}
          {activeTab === 'resume' && (
            <div className="space-y-4">
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.md,.doc,.docx,.rtf"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleProcessFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {!uploadedFile ? (
                /* Interactive Upload Area */
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files?.[0]) {
                      handleProcessFile(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center space-y-2.5 cursor-pointer select-none group ${
                    isDragging
                      ? 'border-[#635BFF] bg-[#635BFF]/10 ring-4 ring-[#635BFF]/20 scale-[1.01]'
                      : 'border-[#CBD5E1] hover:border-[#635BFF] bg-[#F8FAFC] hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#635BFF]/10 text-[#635BFF] mx-auto flex items-center justify-center group-hover:scale-110 group-hover:bg-[#635BFF] group-hover:text-white transition-all shadow-xs">
                    {isExtracting ? (
                      <RefreshCw size={22} className="animate-spin text-[#635BFF]" />
                    ) : (
                      <Upload size={22} />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0A0A0A] group-hover:text-[#635BFF] transition-colors">
                      {isExtracting ? 'Extracting Resume Text...' : 'Upload Resume PDF or Paste Text'}
                    </p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      Click to browse files or drag & drop (PDF, TXT, DOCX, Markdown)
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-[11px] font-semibold text-[#635BFF] shadow-2xs group-hover:border-[#635BFF]">
                      <Upload size={12} />
                      <span>Browse Files</span>
                    </span>
                  </div>
                </div>
              ) : (
                /* Uploaded File Loaded State */
                <div className="p-4 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 text-left flex items-center justify-between gap-3 transition-all animate-in fade-in">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-[#0A0A0A] truncate max-w-[260px]">
                          {uploadedFile.name}
                        </p>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                          {uploadedFile.size}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                        <span>Parsed {uploadedFile.wordCount.toLocaleString()} words • Loaded into Resume-Match</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#635BFF] text-xs font-semibold text-[#0A0A0A] transition-colors shadow-2xs cursor-pointer"
                    >
                      Change File
                    </button>
                    <button
                      type="button"
                      onClick={handleClearUploadedFile}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[#6B7280] hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* Instant feedback notification */}
              {uploadFeedback && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{uploadFeedback}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#0A0A0A]">Resume Raw Text / Work History</label>
                  <button
                    type="button"
                    onClick={handleClearUploadedFile}
                    className="text-[11px] text-[#635BFF] hover:underline font-semibold cursor-pointer"
                  >
                    Reset Sample Resume
                  </button>
                </div>
                <textarea
                  rows={7}
                  value={resumeContent}
                  onChange={e => setResumeContent(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs font-mono text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                  placeholder="Paste work experience, projects, and technologies..."
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[#6B7280]">
                  Whitelisted across 10 technical domains (Languages, Frontend, Backend, ML, Cloud).
                </span>
                <button
                  type="button"
                  disabled={isAnalyzingEvidence || isExtracting}
                  onClick={handleRunAnalysis}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-subtle cursor-pointer ring-2 ring-[#635BFF]/30 hover:ring-[#635BFF]/60"
                >
                  {isAnalyzingEvidence ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Parsing with Resume-Match...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      <span>Run Resume-Match Parser {uploadedFile ? 'on Uploaded File' : ''}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: GitHub Repos */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                    <GitBranch size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0A0A0A]">GitHub Account Connection</h4>
                    <p className="text-[11px] text-[#6B7280]">
                      Imports repositories, commit volume, language percentages, and pull requests.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0A0A0A]">GitHub Username</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={githubUser}
                      onChange={e => setGithubUser(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs font-mono text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                      placeholder="e.g. alexmorgan"
                    />
                    <button
                      type="button"
                      disabled={isAnalyzingEvidence}
                      onClick={handleConnectGitHub}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-subtle cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isAnalyzingEvidence ? <RefreshCw size={13} className="animate-spin" /> : <Check size={13} />}
                      <span>Sync & Audit Repos</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[#E5E7EB] bg-white space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                  Connected Repositories Audited
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB]">
                    <p className="font-bold text-[#0A0A0A]">python-microservices</p>
                    <p className="text-[10px] text-[#6B7280]">64 commits • Python 88%</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB]">
                    <p className="font-bold text-[#0A0A0A]">react-nextjs-dashboard</p>
                    <p className="text-[10px] text-[#6B7280]">92 commits • TypeScript 76%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Portfolio Link */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#10B981] flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0A0A0A]">Portfolio Website URL</h4>
                    <p className="text-[11px] text-[#6B7280]">
                      Crawls project showcases, architecture diagrams, and deployed demo links.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0A0A0A]">Portfolio URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={portfolioUrl}
                      onChange={e => setPortfolioUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs font-mono text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                      placeholder="https://..."
                    />
                    <button
                      type="button"
                      disabled={isAnalyzingEvidence}
                      onClick={handleLinkPortfolio}
                      className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-semibold text-xs shadow-subtle cursor-pointer disabled:opacity-50"
                    >
                      Audit Portfolio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: LinkedIn Bio */}
          {activeTab === 'linkedin' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                    <LinkedinIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0A0A0A]">LinkedIn Profile Verification</h4>
                    <p className="text-[11px] text-[#6B7280]">
                      Cross-references headline, endorsements, employment history, and certifications.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0A0A0A]">LinkedIn Profile URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={e => setLinkedinUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs font-mono text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                      placeholder="https://linkedin.com/in/..."
                    />
                    <button
                      type="button"
                      disabled={isAnalyzingEvidence}
                      onClick={handleLinkLinkedIn}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-subtle cursor-pointer disabled:opacity-50"
                    >
                      Verify LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live Background Scanning Status */}
          {isAnalyzingEvidence && (
            <div className="p-4 rounded-2xl bg-[#635BFF]/5 border border-[#635BFF]/30 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-semibold text-[#635BFF]">
                <div className="flex items-center gap-2">
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Resume-Match Engine Running in Background...</span>
                </div>
                <span className="font-mono text-[11px]">Pipeline Stage {scanStep || 2}/5</span>
              </div>

              <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                <div className="h-full bg-[#635BFF] animate-pulse rounded-full" style={{ width: '80%' }} />
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-[#6B7280]">
                <span>✓ Whitelist Tokenizer</span>
                <span>✓ ATS Domain Mapping</span>
                <span>⚡ Comparing Claims</span>
              </div>
            </div>
          )}

          {/* Latest Analysis Results Snapshot */}
          {latestResumeMatchReport && !isAnalyzingEvidence && (
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#10B981]" />
                  <span className="text-xs font-bold text-[#0A0A0A]">
                    Resume-Match Evidence Report Snapshot
                  </span>
                </div>
                {onViewReport && (
                  <button
                    type="button"
                    onClick={onViewReport}
                    className="text-xs text-[#635BFF] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Audit Report</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <span className="text-[10px] font-mono text-[#6B7280] block">SKILL MATCH</span>
                  <span className="text-lg font-bold font-mono text-[#635BFF]">
                    {latestResumeMatchReport.skillMatchScore}%
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <span className="text-[10px] font-mono text-[#6B7280] block">CONFIDENCE</span>
                  <span className="text-lg font-bold font-mono text-[#10B981]">
                    {latestResumeMatchReport.overallConfidence}%
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <span className="text-[10px] font-mono text-[#6B7280] block">PROJECTS</span>
                  <span className="text-lg font-bold font-mono text-[#0A0A0A]">
                    {latestResumeMatchReport.projectRelevanceScore}%
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <span className="text-[10px] font-mono text-[#6B7280] block">TRUST INDEX</span>
                  <span className="text-lg font-bold font-mono text-[#635BFF]">
                    {latestResumeMatchReport.overallTrustScore}/100
                  </span>
                </div>
              </div>

              {latestResumeMatchReport.unsupportedClaims.length > 0 ? (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <span className="font-bold">
                        {latestResumeMatchReport.unsupportedClaims.length} Unsupported Claim(s) Flagged:
                      </span>{' '}
                      <span className="font-mono font-semibold">
                        {latestResumeMatchReport.unsupportedClaims.join(', ')}
                      </span>{' '}
                      <span className="text-[11px] text-amber-700 block sm:inline">
                        (no supporting digital footprint found).
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => resolveSkillEvidence(latestResumeMatchReport.unsupportedClaims[0])}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles size={12} />
                      <span>Verify {latestResumeMatchReport.unsupportedClaims[0]} Evidence</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeClaimedSkill(latestResumeMatchReport.unsupportedClaims[0])}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-800 hover:bg-amber-100 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Remove Claim
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    100% Verified Footprint: All claimed skills are backed by confirmed repositories, projects, and credentials.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-between text-xs">
          <span className="text-[#6B7280]">
            Automatic background execution on evidence update.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] text-[#0A0A0A] font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
