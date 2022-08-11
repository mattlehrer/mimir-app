<script lang="ts">
	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';

	import '../app.css';

	console.log('layout', JSON.stringify($session, null, 2));
</script>

<Nav />

<main class="min-h-full">
	{#if supabaseClient}
		<SupaAuthHelper {supabaseClient} {session}>
			<slot />
		</SupaAuthHelper>
	{:else}
		<slot />
	{/if}
</main>

<Footer />
