import { createBrowserClient } from '@supabase/ssr';
import { Provider, SupabaseClient } from '@supabase/supabase-js';

export function createClient(): SupabaseClient<
  any,
  'public',
  'public',
  any,
  any
> {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type { Provider };
