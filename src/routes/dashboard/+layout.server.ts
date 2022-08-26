import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { analytics_v3, google } from 'googleapis';
import { GaxiosError } from 'gaxios';
import type { LayoutServerLoad } from './$types';

import { createOauth2Client } from '$lib/google';
import type { View, ActiveView } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || !locals.accessToken) throw redirect(303, '/signin');

	const tokens = await supabaseServerClient(locals.accessToken)
		.from('google_tokens')
		.select('email, access_token, refresh_token');
	// .eq('user_id', locals.user?.id); // unnecessary with RLS

	const googleAccounts = tokens.data;
	const activeViews: { [id: string]: ActiveView } = {};
	const analyticsViews: {
		[id: string]: analytics_v3.Schema$Profile & {
			account: {
				id: analytics_v3.Schema$Account['id'];
				name: analytics_v3.Schema$Account['name'];
				email: string;
			};
		};
	} = {};
	if (!googleAccounts?.length) {
		return { analyticsViews, activeViews };
	}
	for (const googleAccount of googleAccounts) {
		try {
			const oauth2Client = createOauth2Client();
			oauth2Client.setCredentials(googleAccount);

			// const analyticsreporting = google.analyticsreporting({ version: 'v4', auth: oauth2Client });
			const admin = google.analytics({ version: 'v3', auth: oauth2Client });

			let analyticsAccounts: Map<analytics_v3.Schema$Account['id'], analytics_v3.Schema$Account['name']>;
			const accounts = await admin.management.accounts.list();
			if (accounts?.data?.items?.length) {
				analyticsAccounts = new Map(
					accounts.data.items.filter((account) => account.id).map((account) => [account.id, account.name]),
				);
			}

			const gaViews = await admin.management.profiles.list({
				accountId: '~all',
				webPropertyId: '~all',
			});
			if (gaViews?.data?.items?.length) {
				gaViews.data.items.forEach((v) => {
					if (v.id)
						analyticsViews[v.id] = {
							id: v.id,
							name: v.name,
							websiteUrl: v.websiteUrl,
							webPropertyId: v.webPropertyId,
							account: {
								id: v.accountId,
								name: v.accountId && analyticsAccounts?.get(v.accountId),
								email: googleAccount.email,
							},
						};
				});
			}
		} catch (error) {
			// probably need to get user to reauthorize account
			console.error(error);
		}
	}

	const views = await supabaseServerClient(locals.accessToken).from<View>('views').select('*');
	if (views?.error) console.error(views.error);

	if (!views.error) views.data.forEach((v) => (activeViews[v.view_id] = v));

	for (const { id: gaViewId } of Object.values(analyticsViews)) {
		if (!gaViewId) continue;
		if (!Object.prototype.hasOwnProperty.call(activeViews, gaViewId)) {
			activeViews[gaViewId] = {
				view_id: gaViewId,
				active: false,
			};
		}
	}

	return {
		analyticsViews,
		activeViews,
	};
};
