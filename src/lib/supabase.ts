import { env as publicEnv } from '$env/dynamic/public';
import { createSupabaseClient } from '@supabase/auth-helpers-sveltekit';

const { supabaseClient } = createSupabaseClient(
	publicEnv.PUBLIC_SUPABASE_URL as string,
	publicEnv.PUBLIC_SUPABASE_ANON_KEY as string,
);

export { supabaseClient };
