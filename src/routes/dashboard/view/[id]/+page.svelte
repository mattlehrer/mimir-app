<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { View } from '$lib/View';
	import type { Writable } from 'svelte/store';
	import type { ActiveView } from '../../activeViews';
	import Onboarding from './Onboarding.svelte';
	import { trimUrl } from '$lib/utils';
	import { slide } from 'svelte/transition';
	const activeViews = getContext<Writable<{ [id: View['id']]: ActiveView }>>('activeViews');

	$: paramId = Number($page.params.id);
	let view: ActiveView | undefined;
	$: view = Object.values($activeViews).find(({ id }) => id === paramId);
	$: siteName = view?.view_id && trimUrl($page.data.analyticsViews[view.view_id].websiteUrl);
	$: isConfigOpen = !view?.landing_page_category;
</script>

{#key paramId}
	<div class="flex flex-col">
		<div class="flex justify-end mr-8">
			<button on:click={() => (isConfigOpen = !isConfigOpen)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-10 h-10"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
					/>
				</svg>
			</button>
		</div>
		{#if isConfigOpen}
			<div class="mt-8 rounded-xl px-4 py-8 bg-primary-600 shadow-xl" transition:slide>
				<Onboarding id={paramId} {siteName} {view} />
			</div>
		{/if}
	</div>
{/key}
