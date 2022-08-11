<script lang="ts">
	import { supabaseClient } from '$lib/db';

	let loading = false;

	const handleLogin = async () => {
		if (!supabaseClient) return;
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signIn(
				{
					provider: 'google',
				},
				{
					scopes:
						'email https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly',
				},
			);
			if (error) throw error;
		} catch (error: unknown) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<form class="row flex-center flex" on:submit|preventDefault={handleLogin}>
	<div class="col-6 form-widget">
		<h1 class="header">Mimir</h1>
		<div>
			<input
				type="submit"
				class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				value={loading ? 'Loading' : 'Sign in with Google'}
				disabled={loading}
			/>
		</div>
	</div>
</form>
