<script lang="ts">
	import { session } from '$app/stores';
	import SignUp from '$lib/SignUp.svelte';
	import '../app.css';

	async function getReport() {
		const res = await fetch('/api/report', {
			credentials: 'include',
		});
		const json = await res.json();
		console.log({ json });
	}
</script>

<div class="mt-16 flex min-h-full w-full flex-col place-content-center">
	{#if !$session?.user}
		<SignUp />
	{:else}
		<div class="w-full text-center text-2xl">
			Hi, {$session.user.email}
			{JSON.stringify($session.user, null, 2)}
		</div>
		<div class="mt-8 flex w-full justify-center">
			<div class="flex flex-col gap-8">
				<a
					href="/api/oauth/google"
					class="inline-flex place-content-center rounded-md border border-transparent bg-[#C5A87A] px-4 py-2 text-center text-sm font-medium text-[#1C3E4F] shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-[#e8dcca] focus:ring-offset-2"
					>Add a Google Analytics account</a
				>
				<button
					class="inline-flex place-content-center rounded-md border border-transparent bg-[#C5A87A] px-4 py-2 text-sm font-medium text-[#1C3E4F] shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-[#e8dcca] focus:ring-offset-2"
					on:click={getReport}
				>
					Get Report
				</button>
			</div>
		</div>
	{/if}
</div>
