<script lang="ts">
	import { session } from '$app/stores';
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import { supabaseClient } from '$lib/supabase';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';

	import '../theme.css';
	// force theme.css before app.css
	import '../app.css';
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
