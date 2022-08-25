<script lang="ts">
	const onboardingData = {
		isBounceRateGoal: false,
		landingPageCategory: '',
	};

	export let id: string;

	export let siteName = 'your site';

	const handleSubmit = async () => {
		console.log({ onboardingData });
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

<div class="py-8 md:py-0 px-8 md:px-16">
	<p class="text-3xl text-accent-500 font-extralight">
		Tell us about {siteName} so we can customize your recommendations.
	</p>
	<form class="mt-8 text-accent-500 space-y-8 text-lg" on:submit|preventDefault={handleSubmit}>
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
				class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent-800 bg-accent-100 hover:bg-accent-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
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
