<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabase';
	import { Toast } from '@brainandbones/skeleton';
	import { SupaAuthHelper, type Session } from '@supabase/auth-helpers-svelte';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';

	import '../theme.css';
	// force theme.css before app.css
	import '../app.css';

	setContext('session', writable<Session>($page.data.session));
	const session = getContext<Writable<Session>>('session');
</script>

<Toast background="bg-accent-400" position="br" variant="filled" duration={1000} />
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
	<main class="min-h-full bg-primary-500 ">
		{#if supabaseClient}
			<SupaAuthHelper {supabaseClient} {session}>
				<slot />
			</SupaAuthHelper>
		{:else}
			<slot />
		{/if}
	</main>
{/if}
