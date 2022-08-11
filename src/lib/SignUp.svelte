<script lang="ts">
	import logoDark from '$lib/../assets/logo-dark.png';
	import { supabaseClient } from './db';

	let email: string;
	let password: string;

	async function signup() {
		console.log('signup', { email, password });
		if (!supabaseClient) throw new Error('supabaseClient is not defined');
		const { user, error } = await supabaseClient.auth.signUp(
			{
				email,
				password,
			},
			{ redirectTo: '/' },
		);
		if (error) throw error;
		console.log({ user });
	}
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<img class="mx-auto h-24 w-auto" src={logoDark} alt="Workflow" />
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
		</div>
		<form class="mt-8 space-y-6" action="#" method="POST">
			<input type="hidden" name="remember" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="email-address" class="sr-only">Email address</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						bind:value={email}
						required
						class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						bind:value={password}
						required
						class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Password"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					on:click={signup}
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-[#C5A87A] px-4 py-2 text-sm font-medium text-[#1C3E4F] shadow-sm hover:bg-[#d8c5a6] focus:outline-none focus:ring-2 focus:ring-[#e8dcca] focus:ring-offset-2"
				>
					<span class="absolute inset-y-0 left-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 text-[#e8dcca] group-hover:text-[#e8dcca]"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					Sign up
				</button>
			</div>
		</form>
	</div>
</div>
