<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import axios, { AxiosError } from 'axios';
	import { page } from '$app/stores';
	import { readable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import type { ActiveView, DashboardQueryResponse } from '$lib/types';
	import { trimUrl } from '$lib/utils';
	import Onboarding from './Onboarding.svelte';

	const dashQueryResult = browser
		? useQuery<DashboardQueryResponse, Error>('dashboard', async () => {
				try {
					const { data } = await axios.get('/api/dashboard');
					return data;
				} catch (err: unknown) {
					if (err instanceof AxiosError && err.response?.status === 401) {
						goto('/signin');
					} else {
						throw err;
					}
				}
		  })
		: readable({ data: undefined, isError: false, error: undefined });

	$: paramId = Number($page.params.id);
	let view: ActiveView | undefined;
	$: view = $dashQueryResult.data?.activeViews
		? Object.values($dashQueryResult.data.activeViews).find(({ id }) => id === paramId)
		: undefined;
	$: siteName = view?.view_id && trimUrl($dashQueryResult.data?.analyticsViews[view.view_id].websiteUrl);
	$: isConfigOpen = !view?.landing_page_category;
</script>

{#key paramId}
	<div class="flex flex-col px-4 md:px-0">
		<div class="z-10 mr-4 mt-8 flex justify-end md:mt-0">
			<button on:click={() => (isConfigOpen = !isConfigOpen)}>
				{#if !isConfigOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-10 w-10"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-10 w-10 text-accent-700"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
					</svg>
				{/if}
			</button>
		</div>
		{#if isConfigOpen}
			<div class="-mt-16 rounded-xl bg-primary-600 px-4 py-8 shadow-xl" transition:slide>
				<Onboarding id={paramId} {siteName} {view} />
			</div>
		{/if}
	</div>
{/key}
