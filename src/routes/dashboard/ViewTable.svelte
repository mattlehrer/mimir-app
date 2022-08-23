<script lang="ts">
	import type { View } from '$lib/View';
	import type { analytics_v3 } from 'googleapis';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { ActiveView } from './activeViews';

	export let analyticsViews: Array<
		analytics_v3.Schema$Profile & { account: { id: string; name: string; email: string } }
	> = [];

	const active = getContext<Writable<{ [id: View['id']]: ActiveView }>>('activeViews');

	async function handleChange(id: string) {
		const response = await fetch('/api/db/views', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ ...$active[id] }),
		});
		if (!response.ok) {
			console.error(response);
			return;
		}
	}
</script>

<div class="mt-4 mb-16 px-4 sm:px-6 md:mt-0 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-2xl font-bold text-accent-600 md:text-4xl">Select Properties to Monitor</h1>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<a
				href="/api/oauth/google"
				class="btn inline-flex place-content-center rounded-md border border-transparent bg-accent-300 px-4 py-2 text-center text-sm font-medium text-primary-500 shadow-sm hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="-ml-1 mr-2 h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
						clip-rule="evenodd"
					/>
				</svg>
				Add a Google Account</a
			>
		</div>
	</div>
	<div class="mt-8 flex flex-col">
		<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<table class="min-w-full divide-y divide-surface-300">
						<thead class="bg-surface-50">
							<tr>
								<th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
									<!-- <input
										type="checkbox"
										bind:checked={toggleAll}
										class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-primary-300 text-accent-600 focus:ring-accent-500 sm:left-6"
									/> -->
								</th>
								<th scope="col" class=" py-3.5 px-3 text-left text-sm font-bold text-surface-900">
									<span class="block">Site</span>
									<span class="block font-medium text-surface-500 md:hidden">
										View Name in Google Analytics
									</span>
								</th>
								<th
									scope="col"
									class="hidden px-3 py-3.5 text-left text-sm font-semibold text-surface-900 md:table-cell"
									>View Name in Google Analytics</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-surface-900"
									>GA Account</th
								>
							</tr>
						</thead>
						<tbody class="divide-y divide-surface-200 bg-white">
							{#each Object.values(analyticsViews) as view}
								<tr class:bg-accent-100={view.id && $active[view.id].active}>
									<td class="relative w-12 px-6 sm:w-16 sm:px-8">
										<!-- Selected row marker, only show when row is selected. -->
										{#if view.id}
											{#if $active[view.id]?.active}
												<div class="absolute inset-y-0 left-0 w-1 bg-accent-600" />
											{/if}
											<label>
												<span  class="sr-only">Enable/disable {view.websiteUrl}'s {view.name}</span>
												<input
													type="checkbox"
													bind:checked={$active[view.id].active}
													on:change={() => view.id && handleChange(view.id)}
													class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-primary-300 text-accent-600 focus:ring-accent-500 sm:left-6"
												/>
											</label>
										{/if}
									</td>
									<td class=" whitespace-nowrap px-3 py-4 text-sm font-bold text-surface-900">
										<div>
											{view.websiteUrl}
										</div>
										<div
											class="font-normal text-surface-500 md:hidden"
											title={`View id: ${view.id}`}
										>
											{view.name}
										</div>
									</td>
									<td
										class="hidden h-full whitespace-nowrap py-4 px-3 text-sm text-surface-700 md:table-cell"
										title={`View id: ${view.id}`}
									>
										{view.name}
									</td>
									<td class="whitespace-nowrap py-4 px-3 text-sm">
										<div class="">
											<div class="font-medium text-surface-700">{view.account.name}</div>
											<div class="font-light text-surface-500">{view.account.email}</div>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
