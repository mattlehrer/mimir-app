import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return locals.user
		? {
				session: {
					user: locals.user,
					accessToken: locals.accessToken,
					error: locals.error,
				},
		  }
		: {};
};
