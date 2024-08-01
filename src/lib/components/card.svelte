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

	function enableDraggability() {
		if (!cardRef) {
			console.error('cardRef is null');
			return;
		}
		cardRef.draggable = true;
		cardRef.addEventListener('mousedown', (event) => {
			if (!cardRef) {
				console.error('cardRef is null');
				return;
			}
			event.preventDefault();

			// Initial mouse position
			let initialX = event.clientX;
			let initialY = event.clientY;

			// Initial element position
			let initialLeft = cardRef.offsetLeft;
			let initialTop = cardRef.offsetTop;

			function moveElement(event: MouseEvent) {
				if (!cardRef) {
					console.error('cardRef is null');
					return;
				}
				// Calculate new position
				let newX = initialLeft + event.clientX - initialX;
				let newY = initialTop + event.clientY - initialY;

				// Update element position
				cardRef.style.left = newX + 'px';
				cardRef.style.top = newY + 'px';
			}

			function stopMoving() {
				if (!cardRef) {
					console.error('cardRef is null');
					return;
				}
				// Remove event listeners
				cardRef.removeEventListener('mousemove', moveElement);
				cardRef.removeEventListener('mouseup', stopMoving);

				// Hide the element by adding a class
				// dragElement.classList.add("dragging");
			}

			// Add event listeners for mouse movement and release
			cardRef.addEventListener('mousemove', moveElement);
			cardRef.addEventListener('mouseup', stopMoving);
		});
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

		// add event listener for window resize
		window.addEventListener('resize', () => {
			updateCardContainerSizeAndPosition();
		});

		// enable draggability
		enableDraggability();
	});
</script>

<div
	class="card-container hidden bg-sky-900"
	style="width: {cardWidth}px; height:{cardHeight}px; top: {cardTop}px; left:{cardLeft}px"
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
