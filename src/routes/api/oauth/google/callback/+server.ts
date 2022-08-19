import { oauth2Client } from '$lib/google';
import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import jwt_decode from 'jwt-decode';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function ({ url, locals }) {
	console.log('searchParams:', url.searchParams.toString());
	const code = url.searchParams.get('code');
	if (!code) {
		return new Response('Missing code', { status: 400 });
	}
	let tokens: any;
	try {
		({ tokens } = await oauth2Client.getToken(code));
		// const data = await oauth2Client.getToken(code);
		// console.log('getToken response:', JSON.stringify(data, null, 2));
		// ({ tokens } = data);
	} catch (err) {
		console.error('Google Oauth error: ', JSON.stringify(error, null, 2));
		if (err instanceof Error) {
			throw error(500, err.message);
			// return new Response(error.message, { status: 500 });
		} else {
			throw error(500, JSON.stringify(err, null, 2));
		}
	}

	return await withApiAuth(
		{
			redirectTo: '/',
			user: locals.user,
		},
		async () => {
			if (!locals.accessToken) throw error(401, 'Unauthorized');
			const decodedGoogleJWT = tokens.id_token && (jwt_decode(tokens.id_token) as any);
			const { error: err } = await supabaseServerClient(locals.accessToken)
				.from<GoogleTokensTable>('google_tokens')
				.upsert(
					{
						user_id: locals.user.id,
						email: decodedGoogleJWT?.email ?? null,
						...tokens,
					},
					{ onConflict: 'user_id, email' },
				);
			if (err) console.error(err);

			return new Response(undefined, { status: 303, headers: { location: '/dashboard' } });
		},
	);
};

interface GoogleTokensTable {
	id: string;
	user_id: string;
	email: string;
	access_token: string;
	refresh_token: string;
	scope: string;
	token_type: string;
	id_token: string;
	expiry_date: number;
}
