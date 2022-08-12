<script lang="ts">
	import { session } from '$app/stores';
	import SignUp from '$lib/SignUp.svelte';
	import '../app.css';
</script>

<div class="mt-16 flex min-h-full w-full flex-col place-content-center">
	{#if !$session?.user}
		<SignUp />
	{:else}
		<div class="w-full text-center text-2xl">
			Hi, {$session.user.email}
		</div>
		{#if !$session.user.app_metadata.hasGoogleOauth}
		<div class="mt-8 flex w-full justify-center">
			<a
				href="/api/oauth/google"
				class="inline-flex items-center rounded-md border border-transparent bg-[#C5A87A] px-4 py-2 text-sm font-medium text-[#1C3E4F] shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-[#e8dcca] focus:ring-offset-2"
				>Connect to Google Analytics</a
			>
		</div>
		{/if}
	{/if}
</div>
