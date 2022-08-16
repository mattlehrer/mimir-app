import { oauth2Client } from '$lib/google';
import { supabaseClient } from '$lib/supabase';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';
import jwt_decode from 'jwt-decode';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async function ({ request, url }) {
	console.log('searchParams:', url.searchParams.toString());
	const code = url.searchParams.get('code');
	if (!code) {
		return new Response('Missing code', { status: 400 });
	}
	let tokens;
	try {
		// ({ tokens } = await oauth2Client.getToken(code));
		const data = await oauth2Client.getToken(code);
		console.log('getToken response:', JSON.stringify(data, null, 2));
		({ tokens } = data);
	} catch (error) {
		console.error('Google Oauth error: ', JSON.stringify(error, null, 2));
		if (error instanceof Error) {
			return new Response(error.message, { status: 500 });
		} else {
			return new Response(JSON.stringify(error), { status: 500 });
		}
	}
	// console.log(JSON.stringify(tokens, null, 2));
	if (!supabaseClient) return new Response('Missing supabaseClient', { status: 500 });
	const cookies = cookie.parse(request.headers.get('cookie') ?? '');
	const jwt = cookies['sb-access-token'] ?? '';
	const uid = (await supabaseClient.auth.api.getUser(jwt))?.user?.id;
	if (!uid) return new Response('No user', { status: 500 });
	const decodedGoogleJWT = tokens.id_token && (jwt_decode(tokens.id_token) as any);
	const data = await supabaseClient.from('google_tokens').upsert(
		{
			user: uid,
			email: decodedGoogleJWT?.email ?? null,
			...tokens,
		},
		{ onConflict: 'user, email' },
	);
	console.log(JSON.stringify(data, null, 2));

	return new Response(undefined, {
		status: 303,
		headers: {
			location: '/',
		},
	});
};
