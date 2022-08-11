<script lang="ts">
	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';

	import '../app.css';
</script>

<Nav />

<main>
	{#if supabaseClient}
	<SupaAuthHelper {supabaseClient} {session}>
		<slot />
	</SupaAuthHelper>
	{:else}
	<slot />
	{/if}
</main>

<Footer />
