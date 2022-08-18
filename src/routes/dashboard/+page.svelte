<script lang="ts">
	import type { analytics_v3 } from 'googleapis';
	
	export let data: {analyticsViews: analytics_v3.Schema$Profile[]};
	// const analyticsViews: analytics_v3.Schema$Profile[] = getContext('analyticsViews');
</script>

<div>
	{JSON.stringify(data.analyticsViews, null, 2)}
</div>
