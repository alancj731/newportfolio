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
	<Card topInitOffset='-10' leftInitOffset='-10' bg="#9195F6"/>
	<Card topInitOffset='-10' leftInitOffset='10'bg="#7FA1C3"/>
	<Card topInitOffset='-5' leftInitOffset='-5' bg="#1D24CA"/>
	<Card topInitOffset='-5' leftInitOffset='5'bg="#0B60B0"/>
	<Card topInitOffset='-1' leftInitOffset='0' bg="#050C9C"/>
	
	<Contacts />
</div>

<style>
	
</style>
