import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	if (id) {
		return { id };
	}

	throw error(404, 'Not found');
};
