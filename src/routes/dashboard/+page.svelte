<script lang="ts">
	let isMobileMenuOpen = false;
</script>

<div class="bg-white">
	{#if isMobileMenuOpen}
		<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
		<div class="relative z-40 md:hidden" role="dialog" aria-modal="true">
			<!--
				Off-canvas menu backdrop, show/hide based on off-canvas menu state.
				
				Entering: "transition-opacity ease-linear duration-300"
				From: "opacity-0"
				To: "opacity-100"
				Leaving: "transition-opacity ease-linear duration-300"
				From: "opacity-100"
				To: "opacity-0"
			-->
			{#if isMobileMenuOpen}
				<div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
			{/if}

			<div class="fixed inset-0 z-40 flex">
				{#if isMobileMenuOpen}
					<!--
						Off-canvas menu, show/hide based on off-canvas menu state.

						Entering: "transition ease-in-out duration-300 transform"
							From: "-translate-x-full"
							To: "translate-x-0"
						Leaving: "transition ease-in-out duration-300 transform"
							From: "translate-x-0"
							To: "-translate-x-full"
					-->
					<div class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
						{#if isMobileMenuOpen}
							<!--
								Close button, show/hide based on off-canvas menu state.

								Entering: "ease-in-out duration-300"
									From: "opacity-0"
									To: "opacity-100"
								Leaving: "ease-in-out duration-300"
									From: "opacity-100"
									To: "opacity-0"
							-->
							<div class="absolute top-0 right-0 -mr-14 p-1">
								<button
									type="button"
									class="flex h-12 w-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none"
									on:click={() => (isMobileMenuOpen = false)}
								>
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
									<span class="sr-only">Close sidebar</span>
								</button>
							</div>
						{/if}
						<div class="flex flex-shrink-0 items-center px-4">
							<img
								class="h-8 w-auto"
								src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
								alt="Easywire"
							/>
						</div>
						<div class="mt-5 h-0 flex-1 overflow-y-auto">
							<nav class="flex h-full flex-col">
								<div class="space-y-1">
									<!-- Current: "bg-purple-50 border-purple-600 text-purple-600", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
									<a
										href="#"
										class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									>
										<!-- Heroicon name: outline/home -->
										<svg
											class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
										Home
									</a>

									<a
										href="#"
										class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									>
										<!-- Heroicon name: outline/briefcase -->
										<svg
											class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
												d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										Jobs
									</a>

									<a
										href="#"
										class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									>
										<!-- Heroicon name: outline/document-search -->
										<svg
											class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
												d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
											/>
										</svg>
										Applications
									</a>

									<a
										href="#"
										class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									>
										<!-- Heroicon name: outline/chat -->
										<svg
											class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
												d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
											/>
										</svg>
										Messages
									</a>

									<a
										href="#"
										class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									>
										<!-- Heroicon name: outline/users -->
										<svg
											class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
										Team
									</a>

									<a
										href="#"
										class="group flex items-center border-l-4 border-purple-600 bg-purple-50 py-2 px-3 text-base font-medium text-purple-600"
										aria-current="page"
									>
										<!-- Heroicon name: outline/cog -->
										<svg
											class="mr-4 h-6 w-6 flex-shrink-0 text-purple-500"
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
												d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
										Settings
									</a>
								</div>
								<div class="mt-auto space-y-1 pt-10">
									<a
										href="#"
										class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									>
										<!-- Heroicon name: outline/question-mark-circle -->
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
									</a>

									<a
										href="#"
										class="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									>
										<!-- Heroicon name: outline/cog -->
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
												d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
										Logout
									</a>
								</div>
							</nav>
						</div>
					</div>

					<div class="w-14 flex-shrink-0" aria-hidden="true">
						<!-- Dummy element to force sidebar to shrink to fit close icon -->
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Static sidebar for desktop -->
	<div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<nav
			class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 pt-5 pb-4"
		>
			<div class="flex flex-shrink-0 items-center px-4">
				<img
					class="h-8 w-auto"
					src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
					alt="Easywire"
				/>
			</div>
			<div class="mt-5 flex-grow">
				<div class="space-y-1">
					<!-- Current: "bg-purple-50 border-purple-600 text-purple-600", Default: "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50" -->
					<a
						href="#"
						class="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
					>
						<!--
              Heroicon name: outline/home

              Current: "text-purple-500", Default: "text-gray-400 group-hover:text-gray-500"
            -->
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
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						Home
					</a>

					<a
						href="#"
						class="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
					>
						<!-- Heroicon name: outline/briefcase -->
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
								d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						Jobs
					</a>

					<a
						href="#"
						class="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
					>
						<!-- Heroicon name: outline/document-search -->
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
								d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
							/>
						</svg>
						Applications
					</a>

					<a
						href="#"
						class="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
					>
						<!-- Heroicon name: outline/chat -->
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
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
						Messages
					</a>

					<a
						href="#"
						class="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
						Team
					</a>

					<a
						href="#"
						class="group flex items-center border-l-4 border-purple-600 bg-purple-50 py-2 px-3 text-sm font-medium text-purple-600"
					>
						<!-- Heroicon name: outline/cog -->
						<svg
							class="mr-3 h-6 w-6 flex-shrink-0 text-purple-500"
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
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						Settings
					</a>
				</div>
			</div>
			<div class="block w-full flex-shrink-0">
				<a
					href="#"
					class="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
				>
					<!-- Heroicon name: outline/question-mark-circle -->
					<svg
						class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
				</a>

				<a
					href="#"
					class="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
				>
					<!-- Heroicon name: outline/cog -->
					<svg
						class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					Logout
				</a>
			</div>
		</nav>
	</div>

	<!-- Content area -->
	<div class="md:pl-64">
		<div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
			<div class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
				<button
					type="button"
					class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
					on:click={()=>isMobileMenuOpen = true}
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

			<main class="flex-1">
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
			</main>
		</div>
	</div>
</div>
