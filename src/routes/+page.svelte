<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/card.svelte';
	import Backgroundtext from '$lib/components/backgroundtext.svelte';
	import Contacts from '$lib/components/contacts.svelte';
	import Changingtext from '$lib/components/changingtext.svelte';

	$: iconSize = '14px';

	function adjustDisplay() {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		iconSize =
			windowWidth >= 3800
				? '58px'
				: windowWidth >= 1900
					? '32px'
					: windowWidth >= 1280
						? '28px'
						: '16px';

		const icons = document.querySelectorAll('.icon');
		if (icons) {
			icons.forEach((item) => {
				const icon = item as HTMLElement;
				icon.style.fontSize = iconSize;
			});
		}
	}

	onMount(() => {
		adjustDisplay();
		window.addEventListener('resize', adjustDisplay);
	});
</script>

<svelte:head>
	<title>Jian's Portfolio</title>
</svelte:head>

<div class="flex h-full w-full flex-col items-center justify-center p-0">
	<Backgroundtext />

	<Card
		title="JWT Demo"
		image="/imgs/jwttoken.gif"
		index="4"
		topFinalOffset="-1"
		leftFinalOffset="0.5"
		topInitOffset="-4"
		leftInitOffset="-10"
		link="https://jwttokendemo.vercel.app/"
		bg="bg-blue-950"
	></Card>
	<Card
		title="Bubble Sort"
		image="/imgs/bubble.gif"
		index="3"
		topFinalOffset="-0.75"
		leftFinalOffset="0.25"
		topInitOffset="-7"
		leftInitOffset="12"
		link="https://sorting-ten.vercel.app"
		bg="bg-blue-900"
	/>
	<Card
		title="Animation Demo"
		image="/imgs/animation.gif"
		index="2"
		topFinalOffset="-0.5"
		leftFinalOffset="0"
		topInitOffset="4"
		leftInitOffset="-13"
		link="https://animation-three-umber.vercel.app/"
		bg="bg-blue-800"
	/>
	<Card
		title="Tetris"
		image="/imgs/tetris.gif"
		index="1"
		topFinalOffset="-0.25"
		leftFinalOffset="-0.25"
		topInitOffset="1"
		leftInitOffset="9"
		link="https://tetris-js-nine-psi.vercel.app/"
		bg="bg-blue-700"
	/>
	<Card
		title=""
		image=""
		index="0"
		topFinalOffset="0"
		leftFinalOffset="-0.5"
		topInitOffset="-2"
		leftInitOffset="0"
		link='mailto:alanchenjian@gmail.com'
		bg="bg-blue-600"
	>
		<Changingtext />
	</Card>
	<Contacts />
</div>

<style>
</style>
