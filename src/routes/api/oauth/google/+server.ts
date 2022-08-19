import { createOauth2Client } from '$lib/google';
import type { RequestHandler } from './$types';

const scopes = [
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/analytics',
	// 'https://www.googleapis.com/auth/analytics.readonly',
];

export const GET: RequestHandler = async () => {
	const oauth2Client = createOauth2Client();
	const url = oauth2Client.generateAuthUrl({
		// 'online' (default) or 'offline' (gets refresh_token)
		access_type: 'offline',

		// If you only need one scope you can pass it as a string
		scope: scopes,

		prompt: 'select_account',
	});
	return new Response(undefined, { status: 303, headers: { location: url } });
};
