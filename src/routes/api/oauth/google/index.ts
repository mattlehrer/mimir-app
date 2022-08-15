import { oauth2Client } from '$lib/google';
import type { RequestHandler } from '@sveltejs/kit';

const scopes = [
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/analytics',
	// 'https://www.googleapis.com/auth/analytics.readonly',
];

const url = oauth2Client.generateAuthUrl({
	// 'online' (default) or 'offline' (gets refresh_token)
	access_type: 'offline',

	// If you only need one scope you can pass it as a string
	scope: scopes,

	prompt: 'select_account',
});

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async () => {
	return {
		status: 303,
		headers: { location: url },
	};
};
