import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user || !locals.accessToken) {
		throw redirect(303, '/login');
	}
	console.log(await request.json());
	return new Response(undefined, { status: 200 });
};
