<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fade, fly, slide } from 'svelte/transition';

	import { clickOutside, trimUrl } from '$lib/utils';
	import type { View } from '$lib/View';
	import logoDark from 'assets/logo-dark.png';
	import type { LayoutData } from './$types';
	interface ActiveView extends Partial<View> {
		active: boolean;
	}

	let isMobileMenuOpen = false;

	export let data: LayoutData;
	setContext('activeViews', writable<{ [id: View['id']]: ActiveView }>(data.activeViews));
	const activeViews = getContext<Writable<{ [id: View['id']]: ActiveView }>>('activeViews');
</script>

<!-- based on https://tailwindui.com/components/application-ui/page-examples/settings-screens#component-3e81b8353a7c0ffd711ce35c6b949289 -->
<div>
	{#if isMobileMenuOpen}
		<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
		<div class="relative z-40 md:hidden" role="dialog" aria-modal={isMobileMenuOpen}>
			<div class="fixed inset-0 bg-surface-500 bg-opacity-75" transition:fade={{ duration: 300 }} />

			<div class="fixed inset-0 z-40 flex">
				<div
					class="relative flex w-full max-w-xs flex-1 flex-col bg-surface-100"
					transition:fly={{ x: -400, duration: 300, opacity: 1 }}
					use:clickOutside={{ enabled: isMobileMenuOpen, cb: () => (isMobileMenuOpen = false) }}
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
								aria-hidden={isMobileMenuOpen}
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
						<nav id="mobile-sidebar" class="mt-5 space-y-1 px-2">
							<div>
								<!-- Current: "bg-accent-200 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
								<a
									href="/dashboard"
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
							<div class="space-y-0.5">
								<!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
								<div
									type="button"
									class="flex w-full items-center bg-surface-100 py-2 pl-2 pr-1 text-left text-sm font-medium text-gray-600"
									aria-controls="sub-menu-1"
									aria-expanded="false"
								>
									<!-- Heroicon name: outline/collection -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
										/>
									</svg>
									<span class="flex-1"> GA Views / Sites </span>
								</div>
								<div class="space-y-1 pl-0.5" id="sub-menu-1">
									{#each Object.values($activeViews).filter((v) => v.active) as view (view)}
										<a
											href={`/dashboard/view/${view.id}`}
											class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
											transition:slide|local
										>
											<div class="">
												<div class="font-medium text-surface-800">
													{trimUrl(data.analyticsViews[view.view_id].websiteUrl)}
												</div>
												<div class="font-light text-surface-600">
													{data.analyticsViews[view.view_id].name}
												</div>
											</div>
										</a>
									{/each}
								</div>
							</div>
						</nav>
					</div>
					<nav class="mt-auto space-y-1 pt-10 pb-4">
						<!-- <a
							href="/settings"
							class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
						>
							Heroicon name: outline/cog
							<svg class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
							Settings
						</a> -->

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
		<div class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-surface-100 pt-4 pb-4">
			<div class="flex flex-shrink-0 items-center px-4">
				<img class="h-16 w-auto" src={logoDark} alt="Mimir" />
			</div>
			<div class="mt-5 flex flex-grow flex-col">
				<nav id="sidebar" class="flex-1 space-y-2 bg-surface-100 px-2" aria-label="Sidebar">
					<div>
						<!-- Current: "bg-accent-200 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<a
							href="/dashboard"
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

					<div class="space-y-0.5">
						<!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<div
							type="button"
							class="flex w-full items-center bg-surface-100 py-2 pl-2 pr-1 text-left text-sm font-medium text-gray-600"
							aria-controls="sub-menu-1"
							aria-expanded="false"
						>
							<!-- Heroicon name: outline/collection -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
								/>
							</svg>
							<span class="flex-1"> GA Views / Sites </span>
						</div>
						{#if $activeViews && typeof $activeViews === 'object'}
							<div class="space-y-1 pl-0.5" id="sub-menu-1">
								{#each Object.values($activeViews).filter((v) => v.active) as view (view)}
									<a
										href={`/dashboard/view/${view.id}`}
										class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
										transition:slide
									>
										<div class="">
											<div class="font-medium text-surface-800">
												{trimUrl(data.analyticsViews[view.view_id].websiteUrl)}
											</div>
											<div class="font-light text-surface-600">
												{data.analyticsViews[view.view_id].name}
											</div>
										</div>
									</a>
								{/each}
							</div>
						{/if}
					</div>

					<div class="space-y-1">
						<!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
						<button
							type="button"
							class="group flex w-full items-center rounded-md bg-surface-100 py-2 pl-2 pr-1 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							aria-controls="sub-menu-3"
							aria-expanded="false"
						>
							<!-- Heroicon name: outline/clipboard-list -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
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
						<div class="space-y-1" id="sub-menu-4">
							<a
								href="/"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Overview
							</a>

							<a
								href="/"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Members
							</a>

							<a
								href="/"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Calendar
							</a>

							<a
								href="/"
								class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Settings
							</a>
						</div>
					</div>
				</nav>
				<div class="mt-auto">
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
				</div>
			</div>
		</div>
	</div>

	<!-- Content area -->
	<div class="md:pl-64">
		<div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0 text-accent-500">
			<div
				class="sticky top-0 z-20 flex h-16 flex-shrink-0 border-b border-accent-200/30 bg-primary-500 md:static md:z-auto md:mt-8 md:border-none"
			>
				<button
					type="button"
					class="border-r border-accent-200/30 px-4 text-accent-200/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
					on:click|stopPropagation={() => (isMobileMenuOpen = true)}
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
						aria-hidden={!isMobileMenuOpen}
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
					</svg>
				</button>
			</div>

			<slot />
		</div>
	</div>
</div>
