<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabase';
	import { Toast } from '@brainandbones/skeleton';
	import { SupaAuthHelper, type Session } from '@supabase/auth-helpers-svelte';
	import { writable } from 'svelte/store';

	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';

	import '../theme.css';
	// force theme.css before app.css
	import { setContext } from 'svelte';
	import '../app.css';

	const session = writable<Session>();
	$: {
		$session = $page.data.session;
		setContext('session', session);
	}
</script>

<Toast background="bg-accent-500" position="b" variant="filled" duration={1000} />
{#if !$page.url.pathname.startsWith('/dashboard')}
	<div class="flex min-h-full flex-col">
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
	</div>
{:else}
	<main class="min-h-full bg-white">
		{#if supabaseClient}
			<SupaAuthHelper {supabaseClient} {session}>
				<slot />
			</SupaAuthHelper>
		{:else}
			<slot />
		{/if}
	</main>
{/if}
