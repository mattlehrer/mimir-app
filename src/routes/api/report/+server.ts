// try to get *any* data from UA API

import { createOauth2Client } from '$lib/google';
import { supabaseClient } from '$lib/supabase';
import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';

export const GET: RequestHandler = async ({ locals }) => {
	if (!supabaseClient) return new Response('Missing supabaseClient', { status: 500 });
	return new Response(
		undefined,
		await withApiAuth({ user: locals.user }, async () => {
			// console.log({ user: locals.user });
			const data = await supabaseServerClient(locals.accessToken ?? '')
				.from('google_tokens')
				.select('access_token, refresh_token')
				.eq('user', locals.user.id);

			// console.log('data', JSON.stringify(data, null, 2));
			// const gtoken = data.data?.[0]?.access_token;
			// if (!gtoken) return { status: 500, body: 'No access token' };
			const oauth2Client = createOauth2Client();
			oauth2Client.setCredentials(data.data?.[0]);
			const analyticsreporting = google.analyticsreporting({ version: 'v4', auth: oauth2Client });
			const admin = google.analytics({ version: 'v3', auth: oauth2Client });
			// const res = await admin.management.profiles.list({
			// 	accountId: '~all',
			// 	webPropertyId: '~all',
			// });
			const accounts = await admin.management.accounts.list();

			console.log('admin', JSON.stringify(accounts, null, 2));

			// res = await analyticsreporting.reports.batchGet({
			// 	requestBody: {
			// 		reportRequests: [
			// 			{
			// 				viewId: '7729781',
			// 				dateRanges: [
			// 					{
			// 						startDate: '14daysAgo',
			// 						endDate: '7daysAgo',
			// 					},
			// 					{
			// 						startDate: '7daysAgo',
			// 						endDate: '0daysAgo',
			// 					},
			// 				],
			// 				metrics: [
			// 					{
			// 						expression: 'ga:users',
			// 					},
			// 				],
			// 			},
			// 		],
			// 	},
			// });
			// console.log('ga response: ', JSON.stringify(res, null, 2));

			return {};
		}),
	);
};
