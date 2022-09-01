import type { View } from '$lib/types';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user || !locals.accessToken) {
		throw redirect(303, '/login');
	}
	const view = await request.json();
	const { data, error } = await supabaseServerClient(locals.accessToken)
		.from<View>('views')
		.upsert({ user_id: locals.user.id, ...view }, { onConflict: 'user_id, view_id' });
	console.log({ data, error });
	if (!error) return new Response(undefined, { status: 200 });
	return new Response(JSON.stringify(error, null, 2), { status: 500 });
};

export const PUT: RequestHandler = async ({ locals, request }) => {
	if (!locals.user || !locals.accessToken) {
		throw error(303, 'Not logged in');
	}

	const view = await request.json();
	console.log(JSON.stringify(view, null, 2));
	if (!view.id) {
		throw error(400, 'Missing view id');
	}
	const { data, error: err } = await supabaseServerClient(locals.accessToken).from<View>('views').update({
		user_id: locals.user.id,
		id: view.id,
		is_bounce_rate_a_goal: view.isBounceRateGoal,
		landing_page_category: view.landingPageCategory,
	});
	console.log({ data, err });
	if (!err) return new Response(undefined, { status: 200 });
	return new Response(JSON.stringify(err, null, 2), { status: 500 });
};
