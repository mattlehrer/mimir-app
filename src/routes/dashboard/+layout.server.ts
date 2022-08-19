import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import { analytics_v3, google } from 'googleapis';
import type { LayoutServerLoad } from './$types';

import { oauth2Client } from '$lib/google';
import { supabaseClient } from '$lib/supabase';
import type { View } from './View';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!supabaseClient) {
		throw error(500, 'Missing supabaseClient');
	}
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	return await withApiAuth({ user: locals.user }, async () => {
		// console.log({ user: locals.user });
		const tokens = await supabaseServerClient(locals.accessToken ?? '')
			.from('google_tokens')
			.select('email, access_token, refresh_token');
		// .eq('user_id', locals.user?.id); // unnecessary with RLS

		const googleAccounts = tokens.data;
		const analyticsViews: analytics_v3.Schema$Profile[] = [];
		if (!googleAccounts?.length) {
			return { analyticsViews: [] };
		}
		for (const googleAccount of googleAccounts) {
			try {
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

		const views = await supabaseServerClient(locals.accessToken ?? '')
			.from('views')
			.select('*');

		if (views?.error) console.error(views.error);
		const activeViews: { [id: View['id']]: Partial<View> } = views.error
			? {}
			: views.data.reduce((o, v) => (o[v.id] = v), {});
		analyticsViews.forEach((view) => {
			if (!view.id) return;
			if (!activeViews[view.id]) {
				activeViews[view.id] = {
					view_id: view.id,
					active: false,
				};
			}
		});

		return {
			analyticsViews,
			activeViews,
		};
	});
};
