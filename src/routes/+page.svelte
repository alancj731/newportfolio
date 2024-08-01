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
	<Card />
	<Contacts />
</div>

<style>
	



	.animated-container {
		position: absolute;
		visibility: hidden;
		opacity: 0.8;
		/* width: 240px; */
		/* height: 360px; */
		/* left: 120px; */
		/* top: 36px; */
		/* z-index: 307; */
		/* offset-path: path('M 0 0 L 10 -20'); */
		/* offset-rotate: 0deg; */
		/* animation: moveAlongPath 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards ; */
		/* animation: moveAlongPath 1s; */
		/* offset-path: path('M 0 0 L 10 30 Z');
		offset-anchor: top left; */
		/* offset-distance: 0%; */
		/* offset-rotate: 0deg; */
		/* animation: moveDiv 5s cubic-bezier(0.25, 0.1, 0.25, 1); */
		/* transition: offset-distance 2s; */
	}
	@keyframes moveDiv {
		0% {
			offset-distance: 0%;
		}
		100% {
			offset-distance: 100%;
		}
	}

	@keyframes moveAlongPath {
		0% {
			offset-distance: 0%;
		}
		100% {
			offset-distance: 100%;
		}
	}
</style>
