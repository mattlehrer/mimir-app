<script lang="ts">
	import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';
	import growth_opportunity from 'assets/growth_opportunity.png';
	import { onMount } from 'svelte';
	import { bounceOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import Arc from './Arc.svelte';
	import Needle from './Needle.svelte';
	import { writable, type Writable } from 'svelte/store';
	let storeAccordion: Writable<number[]> = writable([0]);

	export let results = {
		icon: 'blob:https://www.canva.com/619f4971-c97a-4703-8e99-9a246e67abcc',
		recommendation: 'Write a shorter <span class="font-mono font-extrabold text-accent-600">/about</span> page',
		why: 'It is important to share to your customers who you are and what you are about, it can build trust and a more personal connection between your customers and your brand.',
		data: 'We found that customers spend a very short time on your about page, which is not enough time for them to actually read about who you are. Therefore we suggest that you write a shorter text for the about page.',
		help: 'Need some help with that? We have a partner who is an expert copywriter who can help with making text concise and to the point.',
		partner: { name: 'lemonscentedtea', website: 'https://lemonscentedtea.com' },
		gauge: {
			percentage: 0.1,
			label: 'Average time spent on about page: 0 minutes and 8 seconds',
		},
	};

	let gaugeAngle = tweened(0, {
		duration: 1000,
		easing: bounceOut,
	});

	onMount(() => {
		setTimeout(() => {
			$gaugeAngle = results.gauge.percentage * 180;
		}, 300);
	});
</script>

<article class="relative mx-auto mt-4 mb-16 flex max-w-lg flex-col justify-center px-4 md:mt-0">
	<div class="absolute top-0 hidden items-start md:block">
		<img src={growth_opportunity} class="z-0 opacity-20 lg:opacity-50" alt="growth opportunity" />
	</div>
	<div class="z-10 flex flex-col space-y-6 text-lg text-accent-300">
		<h1 class="text-4xl font-semibold">{@html results.recommendation}</h1>
		<div class="w-full">
			<AccordionGroup classes="font-extralight" selected={storeAccordion} spacing="space-y-4" multiple>
				<AccordionItem class="-space-y-1" value={0}>
					<h2 slot="title">Why?</h2>
					<svelte:fragment slot="description">
						{results.why}
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem class="-space-y-1" value={1}>
					<h2 slot="title">The Data</h2>
					<p slot="description">
						{results.data}
					</p>
				</AccordionItem>
				<AccordionItem class="-space-y-1" value={2}>
					<h2 slot="title">Help</h2>
					<div slot="description">
						<p>
							{results.help}
						</p>
						<p>
							Reach out to <a class=" text-accent-800" href={results.partner.website}>{results.partner.name}</a>
						</p>
					</div>
				</AccordionItem>
				<div class="flex justify-center py-4">
					<figure class="relative flex flex-col items-center space-y-6">
						<Arc />
						<div
							id="needle"
							style="--tw-rotate: {`${-90 + $gaugeAngle}deg`};"
							class="absolute bottom-0 h-48 w-auto pt-2 text-accent-600"
						>
							<Needle />
						</div>
						<figcaption class="max-w-xs px-8 pt-2 text-center">{results.gauge.label}</figcaption>
					</figure>
				</div>
			</AccordionGroup>
		</div>
	</div>
</article>

<style>
	h2 {
		@apply font-semibold underline;
	}

	p {
		@apply mt-0;
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
		transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
			skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
		transform-origin: 50% 85%;
	}
</style>
