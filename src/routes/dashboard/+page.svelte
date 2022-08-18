<script lang="ts">
import type { analytics_v3 } from 'googleapis';
import { getContext } from 'svelte';

	const analyticsViews: analytics_v3.Schema$Profile[] = getContext('analyticsViews')
</script>

<div>

	{JSON.stringify(analyticsViews, null, 2)}
</div>