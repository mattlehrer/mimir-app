import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(
	publicEnv.PUBLIC_SUPABASE_URL as string,
	privateEnv.SUPABASE_SERVICE_ROLE_KEY as string,
);

export { supabaseClient as supabaseServer };
