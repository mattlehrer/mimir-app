<script>
	import { page } from '$app/stores';
</script>

<div class="mt-16 flex h-full w-full flex-col items-center justify-center gap-4">
	<h1 class="text-4xl">{$page.status}</h1>
	<p class="text-3xl">{$page.error.message}</p>
	<a
		href="/"
		class="btn mt-6 inline-flex place-content-center rounded-md border border-transparent bg-accent-300 px-4 py-2 text-center text-sm font-medium text-primary-500 shadow-sm hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2"
		>Go home</a
	>
</div>
