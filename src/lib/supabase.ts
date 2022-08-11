import { env } from '$env/dynamic/public';
import { createSupabaseClient } from '@supabase/auth-helpers-sveltekit';

const { supabaseClient } = createSupabaseClient(
	env.PUBLIC_SUPABASE_URL as string,
	env.PUBLIC_SUPABASE_ANON_KEY as string,
);

export { supabaseClient };
