<script lang="ts">
	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/supabase';
	import { Toast } from '@brainandbones/skeleton';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';

	import '../theme.css';
	// force theme.css before app.css
	import '../app.css';
</script>

<Toast background="bg-accent-500" position="b" variant="filled" duration={1000} />
<!-- <Nav /> -->

<main class="min-h-full">
	{#if supabaseClient}
		<SupaAuthHelper {supabaseClient} {session}>
			<slot />
		</SupaAuthHelper>
	{:else}
		<slot />
	{/if}
</main>

<!-- <Footer /> -->
