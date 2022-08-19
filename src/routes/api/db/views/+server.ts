import type { View } from '$lib/View';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user || !locals.accessToken) {
		throw redirect(303, '/login');
	}
	const view = await request.json();
	// console.log({ view });
	// const r = await supabaseServerClient(locals.accessToken).auth.api.
	// console.log({ r });
	const { data, error } = await supabaseServerClient(locals.accessToken)
		.from<View>('views')
		.upsert({ user_id: locals.user.id, ...view }, { onConflict: 'user_id, view_id' });
	console.log({ data, error });
	if (!error) return new Response(undefined, { status: 200 });
	return new Response(JSON.stringify(error, null, 2), { status: 500 });
};
