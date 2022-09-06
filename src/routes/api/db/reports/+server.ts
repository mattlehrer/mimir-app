import { google } from 'googleapis';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, error as kitError } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createOauth2Client } from '$lib/google';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user || !locals.accessToken) {
		throw redirect(303, '/login');
	}
	const json = await request.json();
	console.log({ json });
	const { data, error } = await supabaseServerClient(locals.accessToken)
		.from<{ id: number; access_token: string; refresh_token: string }>('google_tokens')
		.select('id, access_token, refresh_token')
		.eq('id', json.tokensId);

	if (!data || !data[0]) {
		throw kitError(500, 'No access token. Reauthorize your account.');
	}

	const oauth2Client = createOauth2Client();
	oauth2Client.setCredentials(data[0]);
	const analyticsreporting = google.analyticsreporting({ version: 'v4', auth: oauth2Client });
	const res = await analyticsreporting.reports.batchGet({
		requestBody: {
			reportRequests: [
				{
					viewId: json.gaViewId,
					dateRanges: [
						{
							startDate: '2022-08-23',
							endDate: '2022-08-29',
							// startDate: '14daysAgo',
							// endDate: '7daysAgo',
						},
						{
							startDate: '2022-08-30',
							endDate: '2022-09-05',
							// startDate: '7daysAgo',
							// endDate: '0daysAgo',
						},
					],
					metrics: [
						{
							expression: 'ga:sessions',
						},
					],
				},
			],
		},
	});
	// console.log('ga response: ', JSON.stringify(res, null, 2));

	if (!error)
		return new Response(
			JSON.stringify({ request: res.config.data.reportRequests, reports: res.data.reports }, null, 2),
			{
				status: 200,
			},
		);
	return new Response(JSON.stringify(error, null, 2), { status: 500 });
};
