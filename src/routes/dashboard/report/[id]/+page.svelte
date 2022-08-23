<script lang="ts">
	import growth_opportunity from 'assets/growth_opportunity.png';
	import Arc from './Arc.svelte';
	import Needle from './Needle.svelte';

	export let results = {
		icon: 'blob:https://www.canva.com/619f4971-c97a-4703-8e99-9a246e67abcc',
		recommendation:
			'Write a shorter <span class="font-mono font-extrabold text-accent-600">/about</span> page',
		why: 'It is important to share to your customers who you are and what your are about, it can build trust and a more personal connection between your customers and your brand.',
		data: 'We found that customers spend a very short time on your about page, which is not enough time for them to actually read about who you are. Therefore we suggest that you write a shorter text for the about page.',
		help: 'Need some help with that? We have a partner who is an expert copywriter who can help with making text concise and to the point.',
		partner: { name: 'lemonscentedtea', website: 'https://lemonscentedtea.com' },
		gauge: {
			degrees: 12,
			label: 'Average time spent on about page: 0 minutes and 8 seconds',
		},
	};
</script>

<article class="relative mx-auto mt-4 mb-16 flex max-w-lg flex-col justify-center px-4 md:mt-0">
	<div class="absolute top-0 hidden items-start md:block">
		<img src={growth_opportunity} class="opacity-20 lg:opacity-50" alt="growth opportunity" />
	</div>
	<div class="flex flex-col space-y-6 text-accent-300">
		<h1 class="text-4xl font-semibold">{@html results.recommendation}</h1>
		<div>
			<h2 class="text-base font-semibold">Why?</h2>
			<p class="text-base">{results.why}</p>
		</div>
		<div>
			<h2 class="text-base font-semibold">The Data</h2>
			<p class="text-base">{results.data}</p>
		</div>
		<div>
			<h2 class="text-base font-semibold">Help</h2>
			<p class="text-base">{results.help}</p>
			<p class="text-base">
				Reach out to <a class=" text-accent-800" href={results.partner.website}
					>{results.partner.name}</a
				>
			</p>
		</div>
		<div class="flex justify-center py-4">
			<figure class="relative flex flex-col items-center space-y-6">
				<Arc />
				<div
					id="needle"
					style="--tw-rotate: {`${-90 + results.gauge.degrees}deg`};"
					class="absolute bottom-0 h-48 w-auto pt-2 text-accent-600"
				>
					<Needle />
				</div>
				<figcaption class="max-w-xs px-8 pt-2 text-center">{results.gauge.label}</figcaption>
			</figure>
		</div>
	</div>
</article>

<style>
	p {
		@apply font-extralight;
	}
	h2,
	p {
		@apply text-lg;
	}
	h2 {
		@apply underline;
	}
	:is(#article, article) a {
		@apply font-normal text-inherit underline decoration-accent-300/75 decoration-dotted underline-offset-4;
	}
	img {
		--height: clamp(2rem, -8rem + 25vw, 15rem);
		height: var(--height);
		width: auto;
		transform: translate(calc(-1 * var(--height) * 9 / 10), calc(-1 * var(--height) / 4));
	}
	#needle {
		--tw-translate-y: -30%;
		transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
			skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
			scaleY(var(--tw-scale-y));
		transform-origin: 50% 85%;
	}
</style>
