import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Candidate, SkillItem, ResumeMatchReport, AssessmentHistoryItem, Team, TeamInvite } from './types';

export interface SupabaseHealthStatus {
  connected: boolean;
  url: string;
  latencyMs?: number;
  tables?: string[];
  error?: string;
}

/**
 * Check if the Supabase backend is reachable and responsive
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealthStatus> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tbqdivavhnzjwddtgkby.supabase.co';
  if (!isSupabaseConfigured) {
    return { connected: false, url, error: 'Missing Supabase credentials' };
  }

  const startTime = Date.now();
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username')
      .limit(1);

    const latencyMs = Date.now() - startTime;

    if (error) {
      return {
        connected: false,
        url,
        latencyMs,
        error: error.message,
      };
    }

    return {
      connected: true,
      url,
      latencyMs,
      tables: ['profiles', 'skills', 'evidence_reports', 'assessment_history', 'teams', 'team_invites'],
    };
  } catch (err: unknown) {
    return {
      connected: false,
      url,
      error: err instanceof Error ? err.message : 'Unknown connection error',
    };
  }
}

/**
 * Authentication: Sign in with Supabase Auth
 */
export async function signInWithSupabase(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { user: null, error: error.message };
    return { user: data.user, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || 'Login failed' };
  }
}

/**
 * Authentication: Sign in or Sign up with Google OAuth
 */
export async function signInWithGoogleOAuth(nextUrl: string = '/dashboard') {
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: origin ? `${origin}/auth/callback?next=${encodeURIComponent(nextUrl)}` : undefined,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'Google OAuth failed' };
  }
}

/**
 * Authentication: Sign up with Supabase Auth & auto-provision profile
 */
export async function signUpWithSupabase(
  email: string,
  password: string,
  metadata: {
    username: string;
    fullName: string;
    role: string;
  }
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: metadata.username,
          full_name: metadata.fullName,
          role: metadata.role,
        },
      },
    });

    if (error) return { user: null, error: error.message };

    // Also ensure profile row is present
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        username: metadata.username,
        full_name: metadata.fullName,
        email,
        role: metadata.role,
        overall_trust_score: 75,
        verification_level: 'Level 1 — Self Claimed',
      });
    }

    return { user: data.user, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || 'Signup failed' };
  }
}

/**
 * Authentication: Sign out from Supabase
 */
export async function signOutFromSupabase() {
  await supabase.auth.signOut();
}

/**
 * Fetch candidate profile, their skills, and assessment history from Supabase
 */
export async function fetchCandidateFromSupabase(username: string = 'alex'): Promise<{
  profile: any | null;
  skills: any[];
  assessmentHistory: any[];
}> {
  try {
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (profileErr || !profile) {
      return { profile: null, skills: [], assessmentHistory: [] };
    }

    const { data: skills } = await supabase
      .from('skills')
      .select('*')
      .eq('profile_id', profile.id)
      .order('trust_score', { ascending: false });

    const { data: assessments } = await supabase
      .from('assessment_history')
      .select('*')
      .eq('profile_id', profile.id)
      .order('completed_at', { ascending: false });

    return {
      profile,
      skills: skills || [],
      assessmentHistory: assessments || [],
    };
  } catch (err) {
    console.error('Error fetching candidate from Supabase:', err);
    return { profile: null, skills: [], assessmentHistory: [] };
  }
}

/**
 * Synchronize candidate skills and Resume-Match audit scores to Supabase
 */
export async function syncSkillsToSupabase(profileId: string, skills: SkillItem[]) {
  try {
    const skillsToInsert = skills.map((s) => ({
      profile_id: profileId,
      name: s.name,
      category: s.category || 'general',
      level: `Level ${s.verificationLevel} — ${s.level || 'Evidence Verified'}`,
      trust_score: s.trustScore ?? 0,
      evidence_confidence: s.evidenceConfidence ?? s.confidenceScore ?? 70,
      projects_found: s.projectsFound ?? 1,
      repositories_found: s.repositoriesFound ?? 1,
      evidence_count: s.evidenceCounts?.projects || 1,
      is_unsupported: Boolean(s.isUnsupported),
      unsupported_reason: s.unsupportedReason || null,
      project_relevance_score: s.projectRelevanceScore ?? 75,
      experience_depth_score: s.experienceDepthScore ?? 75,
      last_verified: new Date().toISOString(),
    }));

    await supabase.from('skills').delete().eq('profile_id', profileId);
    const { error } = await supabase.from('skills').insert(skillsToInsert);

    if (error) {
      console.error('Failed to sync skills to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error syncing skills to Supabase:', err);
    return false;
  }
}

/**
 * Store a newly passed assessment in the assessment_history table
 */
export async function recordAssessmentInSupabase(profileId: string, assessment: AssessmentHistoryItem) {
  try {
    const { error } = await supabase.from('assessment_history').insert({
      profile_id: profileId,
      skill_slug: assessment.slug,
      skill_name: assessment.skillName,
      score: assessment.score,
      status: assessment.status,
      confidence_score: assessment.confidenceScore,
      certificate_id: assessment.certificateId,
      verification_hash: assessment.verificationHash,
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Fetch all teams from Supabase
 */
export async function fetchTeamsFromSupabase(): Promise<Team[]> {
  try {
    const { data, error } = await supabase.from('teams').select('*');
    if (error || !data || data.length === 0) return [];
    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      tagline: t.tagline || '',
      description: t.description || '',
      hackathon: t.hackathon || 'HackGenesis 2026',
      avatar: t.avatar || '',
      lookingFor: t.looking_for || [],
      members: t.members || [],
      skillCoverage: t.skill_coverage || [],
      openSpots: t.open_spots || 2,
    }));
  } catch {
    return [];
  }
}

/**
 * Record a team invite in Supabase
 */
export async function createTeamInviteInSupabase(invite: TeamInvite) {
  try {
    const { error } = await supabase.from('team_invites').insert({
      team_id: invite.teamId,
      team_name: invite.teamName,
      team_avatar: invite.teamAvatar,
      invited_candidate_username: invite.invitedCandidateUsername,
      role: invite.role,
      hackathon: invite.hackathon,
      status: invite.status,
      message: invite.message,
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Fetch team invites for candidate
 */
export async function fetchTeamInvitesFromSupabase(username: string): Promise<TeamInvite[]> {
  try {
    const { data, error } = await supabase
      .from('team_invites')
      .select('*')
      .eq('invited_candidate_username', username);
    if (error || !data) return [];
    return data.map((inv: any) => ({
      id: inv.id,
      teamId: inv.team_id,
      teamName: inv.team_name,
      teamAvatar: inv.team_avatar,
      invitedCandidateUsername: inv.invited_candidate_username,
      role: inv.role,
      hackathon: inv.hackathon,
      status: inv.status,
      sentAt: inv.sent_at,
      message: inv.message,
    }));
  } catch {
    return [];
  }
}

/**
 * Store a Resume-Match audit report in the evidence_reports table
 */
export async function saveEvidenceReportToSupabase(
  profileId: string,
  report: ResumeMatchReport,
  rawEvidenceText?: string
) {
  try {
    const { error } = await supabase.from('evidence_reports').insert({
      profile_id: profileId,
      skill_match_score: report.skillMatchScore,
      evidence_confidence: report.overallConfidence,
      project_relevance_score: report.projectRelevanceScore,
      experience_depth_score: report.experienceDepthScore,
      extracted_technologies: report.technologyExtraction,
      unsupported_claims: report.unsupportedClaims,
      comparison_table: report.claimedVsDetected,
      raw_evidence: {
        timestamp: report.timestamp,
        totalClaimedSkills: report.totalClaimedSkills,
        totalDetectedSkills: report.totalDetectedSkills,
        snippet: rawEvidenceText ? rawEvidenceText.slice(0, 500) : null,
      },
    });

    return !error;
  } catch (err) {
    console.error('Error saving evidence report to Supabase:', err);
    return false;
  }
}

/**
 * Fetch past Resume-Match evidence reports
 */
export async function fetchEvidenceReportsFromSupabase(profileId: string) {
  try {
    const { data, error } = await supabase
      .from('evidence_reports')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}
