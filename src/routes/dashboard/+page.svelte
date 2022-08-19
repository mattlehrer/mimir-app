<script lang="ts">
	import type { analytics_v3 } from 'googleapis';
	import ViewTable from './ViewTable.svelte';

	export let data: {
		analyticsViews: Array<
			analytics_v3.Schema$Profile & { account: { id: string; name: string; email: string } }
		>;
		activeViews: Array<{ id: string; view_id: string; active: boolean; uses_report: string }>;
	};
</script>

<!-- <div>
	{JSON.stringify(data.analyticsViews, null, 2)}
</div> -->

<ViewTable {...data} />
