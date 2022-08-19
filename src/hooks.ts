import { handleAuth } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(
	...handleAuth({
		// logout: { returnTo: '/auth/signin' },
	}),
	// leaving in case of future logging needs
	// async ({ event, resolve }) => {
	// 	console.log(JSON.stringify(event.locals, null, 2));
	// 	return await resolve(event);
	// },
);

// export const getSession: GetSession = async (event) => {
// 	const { user, accessToken, error } = event.locals;
// 	return {
// 		user,
// 		accessToken,
// 		error,
// 	};
// };
