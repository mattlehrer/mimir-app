<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toastStore } from '@brainandbones/skeleton';
	import ViewTable from './ViewTable.svelte';

	const { data } = $page;

	function addCommasAndAnd(list: string[]): string {
		if (list.length < 3) {
			return list.join(' and ');
		}

		return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`;
	}

	if (data.deauthorizedGoogleAccounts.length) {
		// TODO: this is annoying if user doesn't want to reauthorize.
		// Build a way to remove from the db if it no longer should be authed
		toastStore.trigger({
			message: `Authorization for ${addCommasAndAnd(data.deauthorizedGoogleAccounts)} has expired or been removed.`,
			autohide: false,
			button: {
				label: `Add ${data.deauthorizedGoogleAccounts.length > 1 ? 'them' : 'it'} back`,
				action: () => {
					goto('/api/oauth/google');
				},
			},
		});
	}
</script>

<ViewTable analyticsViews={data.analyticsViews} />
