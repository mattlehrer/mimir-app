<script lang="ts">
	import { session } from '$app/stores';
	import logoWhite from '$lib/../assets/logo-white.png';
</script>

<nav class="bg-gray-800">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="flex flex-1 items-center justify-start">
				<div class="flex flex-shrink-0 items-center">
					<a href="/">
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
						class="inline-flex items-center rounded-md border border-transparent bg-[#C5A87A] px-4 py-2 text-sm font-medium text-[#1C3E4F] shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-[#e8dcca] focus:ring-offset-2"
						>Sign out</a
					>
				{:else}
					<a
						href="/signup"
						class="inline-flex items-center rounded-md border border-transparent bg-[#C5A87A] px-4 py-2 text-sm font-medium text-[#1C3E4F] shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-[#e8dcca] focus:ring-offset-2"
						>Sign Up</a
					>
					<a
						href="/signin"
						class="inline-flex items-center rounded-md border border-[#C5A87A] bg-[#e8dcca] px-4 py-2 text-sm font-medium text-[#1C3E4F] shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-[#e8dcca] focus:ring-offset-2"
						>Sign In</a
					>
				{/if}
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
</nav>
