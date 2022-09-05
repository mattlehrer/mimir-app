import type { View } from '$lib/types';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user || !locals.accessToken) {
		throw redirect(303, '/login');
	}
	const json = await request.json();
	console.log({ json });
	const { data, error } = await supabaseServerClient(locals.accessToken)
		.from<{ id: number; access_token: string; refresh_token: string }>('google_tokens')
		.select('id, access_token, refresh_token')
		.eq('id', json.tokensId);
	console.log({ data });
	if (!error) return new Response(undefined, { status: 200 });
	return new Response(JSON.stringify(error, null, 2), { status: 500 });
};
