import { session } from '$app/stores';
import { oauth2Client } from '$lib/google';
import { supabaseClient } from '$lib/supabase';
import { supabaseServer } from '$lib/supabaseServer';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async function ({ request, url }) {
	const code = url.searchParams.get('code');
	if (!code) {
		return {
			status: 400,
			body: 'Missing code',
		};
	}
	let tokens;
	try {
		({ tokens } = await oauth2Client.getToken(code));
	} catch (error) {
		if (error instanceof Error) {
			return {
				status: 500,
				body: error.message,
			};
		} else {
			return {
				status: 500,
				body: JSON.stringify(error, null, 2),
			};
		}
	}
	// console.log(JSON.stringify(tokens, null, 2));
	if (!supabaseClient)
		return {
			status: 500,
			body: 'Missing supabaseClient',
		};
	const cookies = cookie.parse(request.headers.get('cookie') ?? '');
	const jwt = cookies['sb-access-token'] ?? '';
	const uid = (await supabaseClient.auth.api.getUser(jwt))?.user?.id;
	if (!uid)
		return {
			status: 500,
			body: 'No user',
		};
	const data = await supabaseClient.from('google_tokens').upsert(
		{
			user: uid,
			...tokens,
		},
		{ onConflict: 'user' },
	);
	console.log(JSON.stringify(data, null, 2));
	if (!supabaseServer)
		return {
			status: 500,
			body: 'Missing supabaseServer',
		};
	console.log('Adding metadata to user');
	const { error } = await supabaseServer.auth.api.updateUserById(uid, {
		app_metadata: { hasGoogleOauth: true },
	});
	if (error) console.error(error);
	else session.update((s) => ({ ...s, user: { ...s.user, hasGoogleOauth: true } }));

	return {
		status: 303,
		headers: {
			location: '/',
		},
	};
};
