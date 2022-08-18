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

<div class="flex min-h-full w-full flex-col place-content-center">
	{#if !$session?.user}
		<SignUp />
	{:else}
		<div class="mx-auto mt-16 max-w-3xl">
			<div class="w-full text-center text-2xl">
				Hi, {$session.user.email}
				<p class="my-8">
					{JSON.stringify($session.user, null, 2)}
				</p>
			</div>
			<div class="mt-8 flex w-full justify-center">
				<div class="flex flex-col gap-8">
					<a
						href="/dashboard"
						class="btn inline-flex place-content-center rounded-md border border-transparent bg-accent-300 px-4 py-2 text-center text-sm font-medium text-primary-500 shadow-sm hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2"
						>Go to dashboard</a
					>
				</div>
			</div>
		</div>
	{/if}
</div>
