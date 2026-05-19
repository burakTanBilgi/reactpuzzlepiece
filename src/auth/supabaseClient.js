import { createClient } from '@supabase/supabase-js';

// Supabase singleton. When the env vars are missing, both exports
// fall back to safe sentinels so the rest of the app can keep
// working in localStorage-only mode without any conditional imports.
const url     = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = !!(url && anonKey);

export const supabase = supabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
