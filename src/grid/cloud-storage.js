import { supabase } from '../auth/supabaseClient.js';

// Cloud persistence for projects. Schema:
//   public.hakoniwa_projects (
//     id uuid PK default gen_random_uuid(),
//     user_id uuid references auth.users,
//     name text,
//     payload jsonb,
//     updated_at timestamptz)
//
// RLS: USING/WITH CHECK (auth.uid() = user_id). Every call here goes
// through Supabase as the signed-in user; the policy filters rows
// belonging to other accounts automatically.
//
// All functions are no-ops when Supabase isn't configured — the app
// falls back to its localStorage-only mode upstream.

const TABLE = 'hakoniwa_projects';

export async function cloudLoadProjects(userId) {
  if (!supabase || !userId) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, name, payload, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: true });
  if (error) throw error;
  return (data || []).map((row) => {
    const payload = row.payload || {};
    return {
      ...payload,
      id: row.id,
      name: row.name ?? payload.name ?? 'Untitled',
      updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : (payload.updatedAt || Date.now()),
    };
  });
}

export async function cloudSaveProject(userId, project) {
  if (!supabase || !userId || !project) return project;
  const updatedAtMs = project.updatedAt || Date.now();
  const row = {
    id: project.id,
    user_id: userId,
    name: project.name,
    payload: project,
    updated_at: new Date(updatedAtMs).toISOString(),
  };
  const { error } = await supabase
    .from(TABLE)
    .upsert(row, { onConflict: 'id' });
  if (error) throw error;
  return project;
}

export async function cloudDeleteProject(userId, id) {
  if (!supabase || !userId || !id) return;
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('user_id', userId)
    .eq('id', id);
  if (error) throw error;
}
