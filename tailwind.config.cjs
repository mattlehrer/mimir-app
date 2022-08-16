const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}',
	],

	theme: {
		extend: {},
	},

	plugins: [require('@tailwindcss/forms'), require('@brainandbones/skeleton/tailwind.cjs')],
};

module.exports = config;
