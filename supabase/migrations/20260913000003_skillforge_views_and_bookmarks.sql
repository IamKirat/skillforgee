-- Migration: 20260913000003_skillforge_views_and_bookmarks.sql
-- Description: Recruiter bookmarks, indexes, and analytical leaderboard views

CREATE TABLE IF NOT EXISTS public.recruiter_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_username TEXT NOT NULL,
  candidate_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stage TEXT DEFAULT 'Screened',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.recruiter_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read recruiter_bookmarks" ON public.recruiter_bookmarks FOR SELECT USING (true);
CREATE POLICY "Public write recruiter_bookmarks" ON public.recruiter_bookmarks FOR ALL USING (true) WITH CHECK (true);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_skills_profile_id ON public.skills(profile_id);
CREATE INDEX IF NOT EXISTS idx_skills_trust_score ON public.skills(trust_score);
CREATE INDEX IF NOT EXISTS idx_skills_is_unsupported ON public.skills(is_unsupported);
CREATE INDEX IF NOT EXISTS idx_assessment_history_profile_id ON public.assessment_history(profile_id);
CREATE INDEX IF NOT EXISTS idx_teams_slug ON public.teams(slug);
CREATE INDEX IF NOT EXISTS idx_team_invites_username ON public.team_invites(invited_candidate_username);

-- Analytical View
CREATE OR REPLACE VIEW public.v_verified_leaderboard AS
SELECT 
  p.id,
  p.username,
  p.full_name,
  p.role,
  p.avatar_url,
  p.overall_trust_score,
  p.verification_level,
  COUNT(s.id) AS total_skills,
  COUNT(CASE WHEN s.trust_score >= 80 THEN 1 END) AS high_trust_skills,
  COUNT(CASE WHEN s.is_unsupported = true THEN 1 END) AS unsupported_claims_count
FROM public.profiles p
LEFT JOIN public.skills s ON s.profile_id = p.id
GROUP BY p.id, p.username, p.full_name, p.role, p.avatar_url, p.overall_trust_score, p.verification_level;
