import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tbqdivavhnzjwddtgkby.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRicWRpdmF2aG56andkZHRna2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyNDExMzYsImV4cCI6MjEwNDgxNzEzNn0.d8c2tmflOqb6pSbIixFCPyyOgNbh-WZJ6TMxRlGvFu4';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

