import { handleAuth } from '@supabase/auth-helpers-sveltekit';
import type { GetSession, Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(
	...handleAuth({
		// logout: { returnTo: '/auth/signin' },
	}),
);

export const getSession: GetSession = async (event) => {
	const { user, accessToken, error } = event.locals;
	// console.log('getSession', { user, accessToken, error });
	return {
		user,
		accessToken,
		error,
	};
};
