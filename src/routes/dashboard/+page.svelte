<script lang="ts">
	import { page } from '$app/stores';
	import ViewTable from './ViewTable.svelte';

	const { data } = $page;
</script>

<ViewTable analyticsViews={data.analyticsViews} />
