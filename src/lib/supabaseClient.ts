import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ubnzmurgbmwmkokroxdt.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVibnptdXJnYm13bWtva3JveGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MDAyNTgsImV4cCI6MjEwMDQ3NjI1OH0.tC6dWVgcubWzTH130M90AOtPnbV1DxMGNeHNAXNwzzY';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

