<script lang="ts">
	import { onMount } from 'svelte';
	let cardRef: HTMLElement | null = null;

	$: cardWidth = 0;
	$: cardHeight = 0;
	$: cardTop = 0;
	$: cardLeft = 0;

	function updateCardContainerSizeAndPosition() {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const deviceWidth = screen.width;
		const deviceHeight = screen.height;

		cardWidth =
			windowWidth >= 3800
				? 850
				: windowWidth >= 1900
					? 600
					: windowWidth >= 1024
						? 420
						: windowWidth >= 820
							? 400
							: windowWidth >= 768
								? 360
								: windowWidth >= 400
									? 320
									: 260;
		cardHeight = Math.min(cardWidth * 1.5, Math.floor(windowHeight * 0.9));

		cardTop =
			windowHeight > cardHeight
				? Math.floor((windowHeight - cardHeight) / 2)
				: Math.floor((deviceHeight - cardHeight) / 2);
		cardLeft =
			windowWidth > cardWidth
				? Math.floor((windowWidth - cardWidth) / 2)
				: Math.floor((deviceWidth - cardWidth) / 2);
	}

	onMount(() => {
		console.log('card.svelte onMount');
		if (!cardRef) {
			console.error('cardRef is null');
			return;
		}
		// initialize container size and position
		updateCardContainerSizeAndPosition();
		// set card visible

		// show card container
		cardRef.classList.remove('hidden');

		// add event listener
		window.addEventListener('resize', () => {
			updateCardContainerSizeAndPosition();
		});
	});
</script>

<div
	class="card-container hidden bg-sky-900"
	style="width: {cardWidth}px; height:{cardHeight}px; top: {cardTop}px; left:{cardLeft}px "
	bind:this={cardRef}
>
	<div class="card">
		<slot></slot>
	</div>
</div>

<style>
	.card-container {
		position: absolute;
		opacity: 0.8;
	}
</style>
