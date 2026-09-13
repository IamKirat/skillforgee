import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';

  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data?.session?.user) {
        const user = data.session.user;
        const metadata = user.user_metadata || {};
        const username =
          metadata.user_name ||
          metadata.name?.toLowerCase().replace(/\s+/g, '_') ||
          user.email?.split('@')[0] ||
          'user';
        const fullName =
          metadata.full_name ||
          metadata.name ||
          user.email?.split('@')[0] ||
          'SkillForge User';

        // Auto-provision profile row in Supabase database
        await supabase.from('profiles').upsert(
          {
            id: user.id,
            username,
            full_name: fullName,
            email: user.email || '',
            avatar_url: metadata.avatar_url || metadata.picture || null,
            role: (metadata.role as any) || 'Candidate',
            overall_trust_score: 82,
            verification_level: 'Level 2 — Evidence Supported',
          },
          { onConflict: 'id' }
        );

        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch (err) {
      console.error('Error during Google OAuth callback:', err);
    }
  }

  // Redirect to requested next destination
  return NextResponse.redirect(`${origin}${next}`);
}
