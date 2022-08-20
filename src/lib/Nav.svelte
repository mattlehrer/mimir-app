<script lang="ts">
	import type { Session } from '@supabase/auth-helpers-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import logoWhite from 'assets/logo-white.png';

	const session = getContext<Writable<Session>>('session');
</script>

<nav class="bg-primary-600">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="flex flex-1 items-center justify-start">
				<div class="flex flex-shrink-0 items-center">
					<a
						class="logo rounded-md focus:outline-none focus:ring-2 focus:ring-accent-200 focus:ring-offset-2"
						href="/"
					>
						<img class="block h-12 w-auto" src={logoWhite} alt="Mimir" />
					</a>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				{#if $session?.user}
					<a
						href="/api/auth/logout"
						class="inline-flex items-center rounded-md border border-transparent bg-accent-500 px-4 py-2 text-sm font-medium text-primary-500 shadow-sm hover:bg-accent-500	 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:ring-offset-2"
						>Sign out</a
					>
				{:else}
					<a
						href="/signup"
						class="inline-flex items-center rounded-md border border-transparent bg-accent-500 px-4 py-2 text-sm font-medium text-primary-600 shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-accent-200 focus:ring-offset-2"
						>Sign Up</a
					>
					<a
						href="/signin"
						class="inline-flex items-center rounded-md border border-accent-500 bg-accent-200 px-4 py-2 text-sm font-medium text-primary-600 shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-accent-200 focus:ring-offset-2"
						>Sign In</a
					>
				{/if}
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
</nav>
