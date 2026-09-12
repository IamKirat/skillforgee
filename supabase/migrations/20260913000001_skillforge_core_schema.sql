-- Migration: 20260913000001_skillforge_core_schema.sql
-- Description: Core schema for SkillForge Verification Network

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'Candidate',
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  overall_trust_score INT DEFAULT 85,
  bio TEXT,
  location TEXT DEFAULT 'San Francisco, CA (Remote OK)',
  university TEXT DEFAULT 'Tech University',
  hackathon TEXT DEFAULT 'HackGenesis 2026',
  passport_id TEXT DEFAULT 'SF-PASS-8842-X7',
  github_username TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  verification_level TEXT DEFAULT 'Level 3 — Evidence Verified',
  assessment_score INT DEFAULT 92,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'backend',
  level TEXT NOT NULL DEFAULT 'Level 3 — Evidence Verified',
  verification_level INT NOT NULL DEFAULT 3,
  trust_score INT NOT NULL DEFAULT 85,
  evidence_confidence INT DEFAULT 85,
  projects_found INT DEFAULT 1,
  repositories_found INT DEFAULT 1,
  evidence_count INT DEFAULT 1,
  is_unsupported BOOLEAN DEFAULT false,
  unsupported_reason TEXT,
  project_relevance_score INT DEFAULT 75,
  experience_depth_score INT DEFAULT 75,
  skill_maturity TEXT DEFAULT 'Advanced',
  years_of_exposure NUMERIC(3, 1) DEFAULT 2.5,
  last_verified TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.evidence_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_match_score NUMERIC DEFAULT 0,
  evidence_confidence NUMERIC DEFAULT 0,
  project_relevance_score NUMERIC DEFAULT 0,
  experience_depth_score NUMERIC DEFAULT 0,
  extracted_technologies JSONB DEFAULT '{}'::jsonb,
  unsupported_claims JSONB DEFAULT '[]'::jsonb,
  comparison_table JSONB DEFAULT '[]'::jsonb,
  raw_evidence JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public write profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public write skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read evidence_reports" ON public.evidence_reports FOR SELECT USING (true);
CREATE POLICY "Public write evidence_reports" ON public.evidence_reports FOR ALL USING (true) WITH CHECK (true);
