import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { analytics_v3, google } from 'googleapis';
import type { LayoutServerLoad } from './$types';

import { createOauth2Client } from '$lib/google';
import type { View } from '$lib/View';

export const load: LayoutServerLoad = async ({ locals }) =>
	withApiAuth({ user: locals.user, redirectTo: '/login' }, async () => {
		// console.log({ user: locals.user });
		if (!locals.accessToken) throw redirect(303, '/login');

		const tokens = await supabaseServerClient(locals.accessToken)
			.from('google_tokens')
			.select('email, access_token, refresh_token');
		// .eq('user_id', locals.user?.id); // unnecessary with RLS

		const googleAccounts = tokens.data;
		const activeViews: { [id: View['id']]: Partial<View> } = {};
		const analyticsViews: analytics_v3.Schema$Profile[] = [];
		if (!googleAccounts?.length) {
			return { analyticsViews, activeViews };
		}
		for (const googleAccount of googleAccounts) {
			try {
				const oauth2Client = createOauth2Client();
				oauth2Client.setCredentials(googleAccount);

				// const analyticsreporting = google.analyticsreporting({ version: 'v4', auth: oauth2Client });
				const admin = google.analytics({ version: 'v3', auth: oauth2Client });

				let analyticsAccounts: Map<
					analytics_v3.Schema$Account['id'],
					analytics_v3.Schema$Account['name']
				>;
				const accounts = await admin.management.accounts.list();
				if (accounts?.data?.items?.length) {
					analyticsAccounts = new Map(
						accounts.data.items
							.filter((account) => account.id)
							.map((account) => [account.id, account.name]),
					);
				}

				const views = await admin.management.profiles.list({
					accountId: '~all',
					webPropertyId: '~all',
				});
				if (views?.data?.items?.length)
					analyticsViews.push(
						...views.data.items.map((view) => ({
							id: view.id,
							name: view.name,
							websiteUrl: view.websiteUrl,
							webPropertyId: view.webPropertyId,
							account: {
								id: view.accountId,
								name: view.accountId && analyticsAccounts?.get(view.accountId),
								email: googleAccount.email,
							},
						})),
					);
			} catch (error) {
				// probably need to get user to reauthorize account
				console.error(error);
			}
		}

		const views = await supabaseServerClient(locals.accessToken).from<View>('views').select('*');
		if (views?.error) console.error(views.error);

		if (!views.error) views.data.forEach((v) => (activeViews[v.view_id] = v));

		for (const gaView of analyticsViews) {
			if (!gaView.id) continue;
			if (!Object.prototype.hasOwnProperty.call(activeViews, gaView.id)) {
				activeViews[gaView.id] = {
					view_id: gaView.id,
					active: false,
				};
			}
		}

		return {
			analyticsViews,
			activeViews,
		};
	});
