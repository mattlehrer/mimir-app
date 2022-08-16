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
		return {
			status: 400,
			body: 'Missing code',
		};
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

	return {
		status: 303,
		headers: {
			location: '/',
		},
	};
};
