<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import { onMount } from 'svelte';

	function adjustCardSize() {
		// const cards = document.querySelectorAll('.animated-container');
		// if (!cards) return;
		// cards.forEach((item) => {
		// 	const card = item as HTMLElement;
		// 	if (deviceWidth > 768 || deviceHeight > 768) {
		// 		card.style.width = '240px';
		// 		card.style.height = '360px';
		// 	} else if (deviceWidth > 768 || deviceHeight > 600) {
		// 		card.style.width = '120px';
		// 		card.style.height = '180px';
		// 	} else if (deviceWidth > 480 || deviceHeight > 320) {
		// 		card.style.width = '60px';
		// 		card.style.height = '90px';
		// 	} else {
		// 		card.style.width = '120px';
		// 		card.style.height = '180px';
		// 	}
		// });
	}

	$: cardWidth = 0;
	$: cardHeight = 0;
	$: cardTop = 0;
	$: cardLeft = 0;
	$: bgText;
	$: iconSize = '14px';

	export let bgText = '';

	// function showCards() {
	// 	const cards = document.querySelectorAll('.animated-container');
	// 	if (!cards) return;
	// 	cards.forEach((item) => {
	// 		const card = item as HTMLElement;
	// 		card.style.visibility = 'visible';
	// 	});
	// }

	function adjustDisplay() {
		const smallDisplay: boolean = window.matchMedia('(max-width: 1280px)').matches;

		bgText = smallDisplay
			? '        Code never lies,\ncomments sometimes do.'
			: 'Code never lies, comments sometimes do.';
		// console.log('small display', smallDisplay, bgText);

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
	<pre class="background-text playwrite-ar-bg leading-loose text-white">{bgText}</pre>

	<Card />

	<div class="icons-container flex flex-row justify-center space-x-[5rem]">
		<div class="icon-container" draggable="true">
			<a href="https://www.linkedin.com/in/alanchenjian/">
				<i class="icon fa-brands fa-linkedin-in invert"></i>
			</a>
		</div>
		<div class="icon-container">
			<a href="https://github.com/alancj731"><i class="icon fa-brands fa-github invert"></i></a>
		</div>
	</div>
</div>

<style>
	@keyframes fadeout {
		0% {
			opacity: 1;
			filter: blur(0px);
		}
		100% {
			opacity: 0.4;
		}
	}

	.background-text {
		font-size: 7vw;
		position: absolute;
		top: 36%;
		animation: fadeout 3s linear forwards;
		transition: all 1s linear;
	}
	.background-text:hover {
		animation: none;
		color: black;
		opacity: 1;
		transform: scale(1.02);
		transition: all 1s linear;
	}
	.icons-container {
		position: absolute;
		top: 88%;
	}
	.icon {
		transition: all 0.5s linear;
	}
	.icon:hover {
		filter: none;
		scale: 1.3;
		transition: all 0.5s linear;
	}

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

	@media screen and (min-width: 400px) {
		.background-text {
			top: 38%;
			font-size: 6vw;
		}
	}
	@media screen and (min-width: 768px) {
		.background-text {
			top: 36%;
			font-size: 5.5vw;
		}
	}
	@media screen and (min-width: 1024px) {
		.background-text {
			top: 40%;
			font-size: 3.6vw;
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
