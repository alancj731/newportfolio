<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/card.svelte';
	import Backgroundtext from '$lib/components/backgroundtext.svelte';
	import Contacts from '$lib/components/contacts.svelte';

	$: iconSize = '14px';

	function adjustDisplay() {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		const deviceWidth = screen.width;
		const deviceHeight = screen.height;

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
	<Card index="5" topFinalOffset="-1" leftFinalOffset="1" topInitOffset="-10" leftInitOffset="-10"  bg="#225CFB" />
	<Card index="4" topFinalOffset="-0.75" leftFinalOffset="0.75" topInitOffset="-10" leftInitOffset="10" bg="#3572EF" />
	<Card index="3" topFinalOffset="-0.5" leftFinalOffset="0.5" topInitOffset="-5" leftInitOffset="-5" bg="#0D24CA" />
	<Card index="2" topFinalOffset="-0.25" leftFinalOffset="0.25" topInitOffset="-5" leftInitOffset="5" bg="#376CE7" />
	<Card index="1" topFinalOffset="0" leftFinalOffset="0" topInitOffset="-1" leftInitOffset="0" bg="#050CEC" />

	<Contacts />
</div>

<style>
</style>
