import { NextResponse } from 'next/server';
import { syncSkillsToSupabase, fetchCandidateFromSupabase } from '@/lib/supabaseService';
import { INITIAL_CANDIDATE } from '@/lib/mockData';

export async function POST(req: Request) {
  try {
    let skills = INITIAL_CANDIDATE.skills;
    try {
      const body = await req.json();
      if (body.skills && Array.isArray(body.skills)) {
        skills = body.skills;
      }
    } catch {
      // Use initial skills if body is empty
    }

    const { profile } = await fetchCandidateFromSupabase('alex');
    const profileId = profile?.id || '02b9cab1-d24d-4c9d-9f55-db7954a2cc90';

    const synced = await syncSkillsToSupabase(profileId, skills);

    return NextResponse.json({
      success: true,
      synced,
      profileId,
      syncedSkillsCount: skills.length,
      message: 'Candidate skills and 5-tier verification telemetry synced with Supabase PostgreSQL.',
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Sync failed',
      },
      { status: 500 }
    );
  }
}
