-- Migration: 20260913000002_skillforge_auth_and_squads.sql
-- Description: Assessments, Hackathon Teams, Invites, and Supabase Auth Trigger

CREATE TABLE IF NOT EXISTS public.assessment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_slug TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  score INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Passed',
  confidence_score INT,
  certificate_id TEXT,
  verification_hash TEXT,
  evaluation JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  hackathon TEXT DEFAULT 'HackGenesis 2026',
  avatar TEXT,
  looking_for JSONB DEFAULT '[]'::jsonb,
  members JSONB DEFAULT '[]'::jsonb,
  skill_coverage JSONB DEFAULT '[]'::jsonb,
  open_spots INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.team_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id TEXT NOT NULL,
  team_name TEXT NOT NULL,
  team_avatar TEXT,
  invited_candidate_username TEXT NOT NULL,
  role TEXT NOT NULL,
  hackathon TEXT NOT NULL DEFAULT 'HackGenesis 2026',
  status TEXT DEFAULT 'pending',
  message TEXT,
  sent_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE public.assessment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read assessment_history" ON public.assessment_history FOR SELECT USING (true);
CREATE POLICY "Public write assessment_history" ON public.assessment_history FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Public write teams" ON public.teams FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read team_invites" ON public.team_invites FOR SELECT USING (true);
CREATE POLICY "Public write team_invites" ON public.team_invites FOR ALL USING (true) WITH CHECK (true);

-- Auth Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, email, role, avatar_url, overall_trust_score, verification_level)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'Candidate'),
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
    80,
    'Level 2 — Git Verified'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
