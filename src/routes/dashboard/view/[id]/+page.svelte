<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { View } from '$lib/View';
	import type { Writable } from 'svelte/store';
	import type { ActiveView } from '../../activeViews';
	import type { PageData } from './$types';
	import Onboarding from './Onboarding.svelte';

	export let data: PageData;
	const activeViews = getContext<Writable<{ [id: View['id']]: ActiveView }>>('activeViews');

	const view = Object.values($activeViews).find(({ id }) => Number(id) === Number(data.id));
	const siteName = view?.view_id && $page.data.analyticsViews[view.view_id].name;
</script>

<Onboarding id={data.id} {siteName} />
