<script lang="ts">
	import type { ActiveView } from '$lib/types';

	export let id: number;
	export let siteName = 'your site';
	export let view: ActiveView | undefined;

	const onboardingData = {
		isBounceRateGoal: view?.is_bounce_rate_a_goal ?? false,
		landingPageCategory: view?.landing_page_category,
	};

	const handleSubmit = async () => {
		const response = await fetch('/api/db/views', {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({ id, ...onboardingData }),
		});
		if (!response.ok) {
			console.error(response);
			return;
		}
	};
</script>

<div class="py-8 px-4 md:py-0 md:px-16">
	<p class="text-3xl font-extralight text-accent-500">
		Tell us about <span class="font-normal">{siteName}</span> so we can customize your recommendations.
	</p>
	<form class="mt-8 space-y-8 text-lg text-accent-500" on:submit|preventDefault={handleSubmit}>
		<div class="">
			<label for="bounce-rate"
				><input
					type="checkbox"
					id="bounce-rate"
					name="bounce-rate"
					value="bouncerate"
					bind:checked={onboardingData.isBounceRateGoal}
				/>
				Do you want to monitor bounce rate?</label
			>
		</div>
		<div class=" space-y-2">
			<p>What kind of landing page do you have?</p>
			<label for="landing-page-category-1"
				><input
					type="radio"
					id="landing-page-category-1"
					name="landing-page-category"
					value="short"
					bind:group={onboardingData.landingPageCategory}
				/>
				Short, limited info</label
			>

			<label for="landing-page-category-2"
				><input
					type="radio"
					id="landing-page-category-2"
					name="landing-page-category"
					value="medium"
					bind:group={onboardingData.landingPageCategory}
				/>
				Medium, limit info</label
			>
			<label for="landing-page-category-3">
				<input
					type="radio"
					id="landing-page-category-3"
					name="landing-page-category"
					value="long"
					bind:group={onboardingData.landingPageCategory}
				/>
				Long, all info</label
			>

			<label for="landing-page-category-4">
				<input
					type="radio"
					id="landing-page-category-4"
					name="landing-page-category"
					value="onepager"
					bind:group={onboardingData.landingPageCategory}
				/>
				One pager</label
			>
		</div>
		<div>
			<button
				type="submit"
				class="inline-flex items-center rounded-md border border-transparent bg-accent-100 px-4 py-2 text-sm font-medium text-accent-800 hover:bg-accent-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
				>Save</button
			>
		</div>
	</form>

	<style>
		form p {
			@apply font-bold;
		}

		input[type='radio'],
		input[type='checkbox'] {
			@apply mr-4;
		}
	</style>
</div>
