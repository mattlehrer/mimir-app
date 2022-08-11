<script lang="ts">
	import { session } from '$app/stores';
	import SignUp from '$lib/SignUp.svelte';
	import '../app.css';
</script>

<div class="mt-16 min-h-full w-full">
	{#if !$session?.user}
		<SignUp />
	{:else}
		<div class="w-full text-center text-2xl">
			Hi, {$session.user.email}
		</div>
	{/if}
</div>
