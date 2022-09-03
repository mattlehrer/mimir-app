<script lang="ts">
	import { Toast } from '@brainandbones/skeleton';
	import {
		QueryClient,
		QueryClientProvider,
		persistQueryClient,
		createWebStoragePersistor,
		type Persistor,
	} from '@sveltestack/svelte-query';
	import { SupaAuthHelper, type Session } from '@supabase/auth-helpers-svelte';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { supabaseClient } from '$lib/supabase';
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';

	import '../theme.css';
	// force theme.css before app.css
	import '../app.css';
	import { browser } from '$app/environment';

	setContext('session', writable<Session>($page.data.session));
	const session = getContext<Writable<Session>>('session');

	setContext(
		'queryClient',
		new QueryClient({
			defaultOptions: {
				queries: {
					cacheTime: 1000 * 60 * 60 * 24, // 24 hours
				},
			},
		}),
	);
	const queryClient = getContext<QueryClient>('queryClient');
	let localStoragePersistor: Persistor;
	if (browser) {
		localStoragePersistor = createWebStoragePersistor({
			storage: window.localStorage,
		});

		persistQueryClient({
			queryClient,
			persistor: localStoragePersistor,
			maxAge: 1000 * 60 * 60 * 24,
		});
	}
</script>

<Toast background="bg-accent-400" position="br" variant="filled" duration={1000} />
<QueryClientProvider client={queryClient}>
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
</QueryClientProvider>
