import { NextResponse } from 'next/server';
import { checkSupabaseHealth, fetchCandidateFromSupabase } from '@/lib/supabaseService';

export async function GET() {
  try {
    const health = await checkSupabaseHealth();
    const candidateData = await fetchCandidateFromSupabase('alex');

    return NextResponse.json({
      status: health.connected ? 'connected' : 'error',
      supabaseUrl: health.url,
      latencyMs: health.latencyMs,
      tables: health.tables,
      error: health.error,
      databaseSample: {
        profileFound: Boolean(candidateData.profile),
        username: candidateData.profile?.username,
        skillsCount: candidateData.skills?.length || 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        status: 'error',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
