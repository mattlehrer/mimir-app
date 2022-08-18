<script lang="ts">
	import type { analytics_v3 } from 'googleapis';

	export let analyticsViews: Array<
		analytics_v3.Schema$Profile & { account: { id: string; name: string; email: string } }
	> = [];
</script>


<div class="mt-4 mb-16 px-4 sm:px-6 md:mt-0 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-surface-900">
				Which properties do you want to run reports on?
			</h1>
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
									<input
										type="checkbox"
										class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-primary-300 text-accent-600 focus:ring-accent-500 sm:left-6"
									/>
								</th>
								<th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-surface-900"
									>Site</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-surface-900"
									>View Name in Google Analytics</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-surface-900"
									>GA Account</th
								>
							</tr>
						</thead>
						<tbody class="divide-y divide-surface-200 bg-white">
							{#each analyticsViews as view}
								<tr>
									<td class="relative w-12 px-6 sm:w-16 sm:px-8">
										<!-- Selected row marker, only show when row is selected. -->
										<div class="absolute inset-y-0 left-0 w-0.5 bg-accent-600" />

										<input
											type="checkbox"
											class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-primary-300 text-accent-600 focus:ring-accent-500 sm:left-6"
										/>
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm font-bold text-surface-900"
										>{view.websiteUrl}</td
									>
									<td class="whitespace-nowrap py-4 px-3 text-sm text-surface-700">
										<div class="font-medium " title={`View id: ${view.id}`}>{view.name}</div>
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
