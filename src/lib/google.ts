import { env } from '$env/dynamic/private';
import { google } from 'googleapis';

export const oauth2Client = new google.auth.OAuth2(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	env.GOOGLE_REDIRECT_URL,
);
export { google } from 'googleapis';
