import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Use placeholders during build if env vars are missing (e.g. Netlify build before vars are set)
// Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Netlify for production
const url = supabaseUrl || "https://placeholder.supabase.co";
const key = supabaseAnonKey || "placeholder-key";

export const supabase: SupabaseClient = createClient(url, key);

/** True if real Supabase credentials are configured */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
