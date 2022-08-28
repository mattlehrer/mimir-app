import { analytics_v3, google } from 'googleapis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createOauth2Client } from '$lib/google';

export const load: PageServerLoad = async ({ params, parent, locals }) => {
	const paramId = Number(params.id);
	// TODO: avoid calling parent somehow. move google calls out of layout.server?
	console.log({ locals });
	const { activeViews } = await parent();
	// const activeViews = locals.data.activeViews;
	const view = Object.values(activeViews).find(({ id }) => id === paramId);
	const gaViewId = view?.view_id;

	if (gaViewId) {
		return gaViewId;
	}

	throw error(404, 'Not found');
};
