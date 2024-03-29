<script lang="ts">
	import { goto } from '$app/navigation';

	import { toastStore } from '@brainandbones/skeleton';
	import type { ToastMessage } from '@brainandbones/skeleton/Notifications/Stores';

	import logoDark from 'assets/logo-dark.png';
	import { supabaseClient } from './supabase';

	let email: string;
	let password: string;

	function addToast({ message, button }: Partial<ToastMessage>) {
		toastStore.trigger({
			message,
			autohide: true,
			timeout: 10000,
			button,
		});
	}

	async function signup() {
		let error, user, session;
		try {
			if (!supabaseClient) throw new Error('supabaseClient is not defined');
			({ error, user, session } = await supabaseClient.auth.signUp(
				{
					email,
					password,
				},
				{ redirectTo: '/dashboard' },
			));
		} catch (error) {
			console.error({ error });
			if (error instanceof Error) {
				addToast({ message: error.message });
			} else {
				addToast({ message: `Something went wrong! ${JSON.stringify(error, null, 2)}` });
			}
		} finally {
			if (error) {
				if (error instanceof Error || (error instanceof Object && Object.hasOwn(error, 'message'))) {
					addToast({ message: error.message });
				} else {
					addToast({ message: `Something went wrong! ${JSON.stringify(error, null, 2)}` });
				}
			} else {
				if (user?.confirmation_sent_at && !session?.access_token) {
					addToast({
						message: 'Please confirm your email and then come back',
					});
				} else {
					addToast({
						message: 'Do you already have an account?',
						button: { label: 'Sign in', action: async () => await goto('/signin') },
					});
				}
			}
		}
	}
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:mt-16 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<img class="mx-auto h-24 w-auto" src={logoDark} alt="Mimir" />
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
		</div>
		<form class="mt-8 space-y-6" method="POST">
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
						class="relative block w-full rounded-none rounded-t-md px-3 py-2 text-gray-900 placeholder-gray-500 sm:text-sm"
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
						class="relative block w-full rounded-none rounded-b-md px-3 py-2 text-gray-900 placeholder-gray-500 sm:text-sm"
						placeholder="Password"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					on:click|preventDefault={signup}
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-accent-500 px-4 py-2 text-sm font-medium text-primary-500 shadow-sm hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2"
				>
					<span class="absolute inset-y-0 left-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 text-accent-200 group-hover:text-accent-200"
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
		<hr />
		<div class="flex items-center justify-center gap-4">
			<p class="text-center text-surface-400">Already have an account?</p>
			<a
				href="/signin"
				class="btn rounded-md border border-accent-200 px-4 py-2 text-sm font-medium text-primary-400 hover:bg-accent-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2"
				>Sign In</a
			>
		</div>
	</div>
</div>
