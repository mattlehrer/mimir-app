<script lang="ts">
	import { page } from '$app/stores';
	import logoDark from 'assets/logo-dark.png';
	import { fade,fly } from 'svelte/transition';

	let isMobileMenuOpen = true;
	let views = [];

	/** @type {import('./$types').PageData} */
  export let data;
</script>

<!-- based on https://tailwindui.com/components/application-ui/page-examples/settings-screens#component-3e81b8353a7c0ffd711ce35c6b949289 -->
<div class="bg-white">
	{#if isMobileMenuOpen}
		<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
		<div class="relative z-40 md:hidden" role="dialog" aria-modal="true">
			<div class="fixed inset-0 bg-surface-500 bg-opacity-75" transition:fade={{ duration: 300 }} />

			<div class="fixed inset-0 z-40 flex">
				<div
					class="relative flex w-full max-w-xs flex-1 flex-col bg-surface-100"
					transition:fly={{ x: -400, duration: 300, opacity: 1 }}
				>
					<div class="absolute top-0 right-0 -mr-12 pt-2">
						<button
							type="button"
							class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							on:click={() => (isMobileMenuOpen = false)}
						>
							<span class="sr-only">Close sidebar</span>
							<!-- Heroicon name: outline/x -->
							<svg
								class="h-6 w-6 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
						<div class="flex flex-shrink-0 items-center px-4">
							<a href="/" class="text-3xl font-black text-emerald-600">
								<img class="h-16 w-auto" src={logoDark} alt="Mimir" />
							</a>
						</div>
						<nav class="mt-5 space-y-1 px-2">
							{#each views as view}
								<a
									href={`/views/${view.id}`}
									class="{$page.url.pathname.endsWith(view.id)
										? 'bg-gray-900 text-white'
										: 'text-gray-300 hover:bg-gray-700 hover:text-white'}
										group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
								>
									<img
										src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
										alt=""
										class="w-16 rounded-2xl"
									/>
									<span class="px-4">{view.name}</span>
								</a>
							{/each}
						</nav>
					</div>
					<nav class="mt-auto space-y-1 pt-10 pb-4">
						<!-- <a
							href="/help"
							class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
						>
							Heroicon name: outline/question-mark-circle
							<svg
								class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Help
						</a> -->

						<a
							href="/api/auth/logout"
							class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
						>
							<!-- Heroicon name: outline/logout -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>

							Logout
						</a>
					</nav>
				</div>

				<div class="w-14 flex-shrink-0">
					<!-- Force sidebar to shrink to fit close icon -->
				</div>
			</div>
		</div>
	{/if}

	<!-- Static sidebar for desktop -->
	<div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
		<!-- based on https://tailwindui.com/components/application-ui/navigation/sidebar-navigation#component-ea27fcb96a81748146d26ffa281c3f6d -->
		<div
			class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-surface-100 pt-5 pb-4"
		>
			<div class="flex flex-shrink-0 items-center px-4">
				<img class="h-16 w-auto" src={logoDark} alt="Mimir" />
			</div>
			<div class="mt-5 flex flex-grow flex-col">
				<nav class="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
					<div>
						<!-- Current: "bg-accent-200 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<a
							href="#"
							class="group flex w-full items-center rounded-md bg-accent-200 py-2 pl-2 text-sm font-medium text-gray-900"
						>
							<!--
            Heroicon name: outline/home

            Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500"
          -->
							<svg
								class="mr-3 h-6 w-6 flex-shrink-0 text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
							Dashboard
						</a>
					</div>

					<div class="space-y-1">
						<!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<button
							type="button"
							class="group flex w-full items-center rounded-md bg-white py-2 pl-2 pr-1 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							aria-controls="sub-menu-1"
							aria-expanded="false"
						>
							<!-- Heroicon name: outline/users -->
							<svg
								class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
							<span class="flex-1"> Team </span>
							<!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
							<svg
								class="ml-3 h-5 w-5 flex-shrink-0 transform text-gray-300 transition-colors duration-150 ease-in-out group-hover:text-gray-400"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
							</svg>
						</button>
						<!-- Expandable link section, show/hide based on state. -->
						<div class="space-y-1" id="sub-menu-1">
							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Overview
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Members
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Calendar
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Settings
							</a>
						</div>
					</div>

					<div class="space-y-1">
						<!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<button
							type="button"
							class="group flex w-full items-center rounded-md bg-white py-2 pl-2 pr-1 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							aria-controls="sub-menu-2"
							aria-expanded="false"
						>
							<!-- Heroicon name: outline/folder -->
							<svg
								class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
								/>
							</svg>
							<span class="flex-1"> Projects </span>
							<!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
							<svg
								class="ml-3 h-5 w-5 flex-shrink-0 transform text-gray-300 transition-colors duration-150 ease-in-out group-hover:text-gray-400"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
							</svg>
						</button>
						<!-- Expandable link section, show/hide based on state. -->
						<div class="space-y-1" id="sub-menu-2">
							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Overview
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Members
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Calendar
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Settings
							</a>
						</div>
					</div>

					<div class="space-y-1">
						<!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<button
							type="button"
							class="group flex w-full items-center rounded-md bg-white py-2 pl-2 pr-1 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							aria-controls="sub-menu-3"
							aria-expanded="false"
						>
							<!-- Heroicon name: outline/calendar -->
							<svg
								class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<span class="flex-1"> Calendar </span>
							<!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
							<svg
								class="ml-3 h-5 w-5 flex-shrink-0 transform text-gray-300 transition-colors duration-150 ease-in-out group-hover:text-gray-400"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
							</svg>
						</button>
						<!-- Expandable link section, show/hide based on state. -->
						<div class="space-y-1" id="sub-menu-3">
							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Overview
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Members
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Calendar
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Settings
							</a>
						</div>
					</div>

					<div class="space-y-1">
						<!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<button
							type="button"
							class="group flex w-full items-center rounded-md bg-white py-2 pl-2 pr-1 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							aria-controls="sub-menu-4"
							aria-expanded="false"
						>
							<!-- Heroicon name: outline/inbox -->
							<svg
								class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
								/>
							</svg>
							<span class="flex-1"> Documents </span>
							<!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
							<svg
								class="ml-3 h-5 w-5 flex-shrink-0 transform text-gray-300 transition-colors duration-150 ease-in-out group-hover:text-gray-400"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
							</svg>
						</button>
						<!-- Expandable link section, show/hide based on state. -->
						<div class="space-y-1" id="sub-menu-4">
							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Overview
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Members
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Calendar
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Settings
							</a>
						</div>
					</div>

					<div class="space-y-1">
						<!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<button
							type="button"
							class="group flex w-full items-center rounded-md bg-white py-2 pl-2 pr-1 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							aria-controls="sub-menu-5"
							aria-expanded="false"
						>
							<!-- Heroicon name: outline/chart-bar -->
							<svg
								class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
							<span class="flex-1"> Reports </span>
							<!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
							<svg
								class="ml-3 h-5 w-5 flex-shrink-0 transform text-gray-300 transition-colors duration-150 ease-in-out group-hover:text-gray-400"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
							</svg>
						</button>
						<!-- Expandable link section, show/hide based on state. -->
						<div class="space-y-1" id="sub-menu-5">
							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Overview
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Members
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Calendar
							</a>

							<a
								href="#"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Settings
							</a>
						</div>
					</div>
				</nav>
			</div>
		</div>
	</div>

	<!-- Content area -->
	<div class="md:pl-64">
		<div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
			<div class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
				<button
					type="button"
					class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
					on:click={() => (isMobileMenuOpen = true)}
				>
					<span class="sr-only">Open sidebar</span>
					<!-- Heroicon name: outline/menu-alt-2 -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
					</svg>
				</button>
			</div>

			<article class="flex-1">
				<div class="relative mx-auto max-w-4xl md:px-8 xl:px-0">
					<div class="pt-10 pb-16">
						<div class="px-4 sm:px-6 md:px-0">
							<h1 class="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
						</div>
						<div class="px-4 sm:px-6 md:px-0">
							<div class="py-6">
								<!-- Tabs -->
								<div class="lg:hidden">
									<label for="selected-tab" class="sr-only">Select a tab</label>
									<select
										id="selected-tab"
										name="selected-tab"
										class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
									>
										<option selected>General</option>

										<option>Password</option>

										<option>Notifications</option>

										<option>Plan</option>

										<option>Billing</option>

										<option>Team Members</option>
									</select>
								</div>
								<div class="hidden lg:block">
									<div class="border-b border-gray-200">
										<nav class="-mb-px flex space-x-8">
											<!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
											<a
												href="#"
												class="whitespace-nowrap border-b-2 border-purple-500 py-4 px-1 text-sm font-medium text-purple-600"
											>
												General
											</a>

											<a
												href="#"
												class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
											>
												Password
											</a>

											<a
												href="#"
												class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
											>
												Notifications
											</a>

											<a
												href="#"
												class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
											>
												Plan
											</a>

											<a
												href="#"
												class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
											>
												Billing
											</a>

											<a
												href="#"
												class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
											>
												Team Members
											</a>
										</nav>
									</div>
								</div>

								<!-- Description list with inline editing -->
								<div class="mt-10 divide-y divide-gray-200">
									<div class="space-y-1">
										<h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
										<p class="max-w-2xl text-sm text-gray-500">
											This information will be displayed publicly so be careful what you share.
										</p>
									</div>
									<div class="mt-6">
										<dl class="divide-y divide-gray-200">
											<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
												<dt class="text-sm font-medium text-gray-500">Name</dt>
												<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
													<span class="flex-grow">Chelsea Hagon</span>
													<span class="ml-4 flex-shrink-0">
														<button
															type="button"
															class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
															>Update</button
														>
													</span>
												</dd>
											</div>
											<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
												<dt class="text-sm font-medium text-gray-500">Photo</dt>
												<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
													<span class="flex-grow">
														<img
															class="h-8 w-8 rounded-full"
															src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
															alt=""
														/>
													</span>
													<span class="ml-4 flex flex-shrink-0 items-start space-x-4">
														<button
															type="button"
															class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
															>Update</button
														>
														<span class="text-gray-300" aria-hidden="true">|</span>
														<button
															type="button"
															class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
															>Remove</button
														>
													</span>
												</dd>
											</div>
											<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
												<dt class="text-sm font-medium text-gray-500">Email</dt>
												<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
													<span class="flex-grow">chelsea.hagon@example.com</span>
													<span class="ml-4 flex-shrink-0">
														<button
															type="button"
															class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
															>Update</button
														>
													</span>
												</dd>
											</div>
											<div
												class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
											>
												<dt class="text-sm font-medium text-gray-500">Job title</dt>
												<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
													<span class="flex-grow">Human Resources Manager</span>
													<span class="ml-4 flex-shrink-0">
														<button
															type="button"
															class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
															>Update</button
														>
													</span>
												</dd>
											</div>
										</dl>
									</div>
								</div>

								<div class="mt-10 divide-y divide-gray-200">
									<div class="space-y-1">
										<h3 class="text-lg font-medium leading-6 text-gray-900">Account</h3>
										<p class="max-w-2xl text-sm text-gray-500">
											Manage how information is displayed on your account.
										</p>
									</div>
									<div class="mt-6">
										<dl class="divide-y divide-gray-200">
											<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
												<dt class="text-sm font-medium text-gray-500">Language</dt>
												<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
													<span class="flex-grow">English</span>
													<span class="ml-4 flex-shrink-0">
														<button
															type="button"
															class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
															>Update</button
														>
													</span>
												</dd>
											</div>
											<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
												<dt class="text-sm font-medium text-gray-500">Date format</dt>
												<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
													<span class="flex-grow">DD-MM-YYYY</span>
													<span class="ml-4 flex flex-shrink-0 items-start space-x-4">
														<button
															type="button"
															class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
															>Update</button
														>
														<span class="text-gray-300" aria-hidden="true">|</span>
														<button
															type="button"
															class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
															>Remove</button
														>
													</span>
												</dd>
											</div>
											<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
												<dt class="text-sm font-medium text-gray-500" id="timezone-option-label">
													Automatic timezone
												</dt>
												<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
													<!-- Enabled: "bg-purple-600", Not Enabled: "bg-gray-200" -->
													<button
														type="button"
														class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto"
														role="switch"
														aria-checked="true"
														aria-labelledby="timezone-option-label"
													>
														<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
														<span
															aria-hidden="true"
															class="inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
														/>
													</button>
												</dd>
											</div>
											<div
												class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
											>
												<dt class="text-sm font-medium text-gray-500" id="auto-update-option-label">
													Auto-update applicant data
												</dt>
												<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
													<!-- Enabled: "bg-purple-600", Not Enabled: "bg-gray-200" -->
													<button
														type="button"
														class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto"
														role="switch"
														aria-checked="false"
														aria-labelledby="auto-update-option-label"
													>
														<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
														<span
															aria-hidden="true"
															class="inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
														/>
													</button>
												</dd>
											</div>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>
</div>
