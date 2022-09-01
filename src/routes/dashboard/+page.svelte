<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { toastStore } from '@brainandbones/skeleton';
	import ViewTable from './ViewTable.svelte';
	import { useQuery } from '@sveltestack/svelte-query';
	import { readable } from 'svelte/store';
	import axios, { AxiosError } from 'axios';
	import type { DashboardQueryResponse } from '$lib/types';

	const queryResult = browser
		? useQuery<DashboardQueryResponse, Error>('dashboard', async () => {
				try {
					const { data } = await axios.get('http://localhost:5173/api/dashboard');
					return data;
				} catch (err: unknown) {
					if (err instanceof AxiosError && err.response?.status === 401) {
						goto('/signin');
					} else {
						throw err;
					}
				}
		  })
		: readable({ data: undefined });

	$: deauthorizedGoogleAccounts = $queryResult.data?.deauthorizedGoogleAccounts;

	function addCommasAndAnd(list: string[]): string {
		if (list.length < 3) {
			return list.join(' and ');
		}

		return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`;
	}

	if (deauthorizedGoogleAccounts?.length) {
		// TODO: this is annoying if user doesn't want to reauthorize.
		// Build a way to remove from the db if it no longer should be authed
		toastStore.trigger({
			message: `Authorization for ${addCommasAndAnd(deauthorizedGoogleAccounts)} has expired or been removed.`,
			autohide: false,
			button: {
				label: `Add ${deauthorizedGoogleAccounts.length > 1 ? 'them' : 'it'} back`,
				action: () => {
					goto('/api/oauth/google');
				},
			},
		});
	}
</script>

<ViewTable />
