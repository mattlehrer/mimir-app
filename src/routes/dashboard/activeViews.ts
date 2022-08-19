// import { writable } from 'svelte/store';

import type { View } from './View';

// export const activeViews = writable<{ [id: View['id']]: ActiveView }>({});

export interface ActiveView extends Partial<View> {
	active: boolean;
}
