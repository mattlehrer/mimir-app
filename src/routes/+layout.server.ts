// import type { LayoutServerLoad } from './$types';

export const load = async ({ locals }: { locals: App.Locals }) => {
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
