<script lang="ts">
	import { onMount } from 'svelte';
	let cardRef: HTMLElement | null = null;
	export let topInitOffset: string;
	export let leftInitOffset: string;
	export let topFinalOffset: string;
	export let leftFinalOffset: string;
	export let bg: string;
	export let index: string;

	let pathoffset: string;

	$: cardWidth = 0;
	$: cardHeight = 0;
	$: cardTop = 0;
	$: cardLeft = 0;
	$: pathoffset = '';

	function updateCardContainerSizeAndPosition() {
		console.log('updateCardContainerSizeAndPosition topInitOffset:', topInitOffset);
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const deviceWidth = screen.width;
		const deviceHeight = screen.height;
		const topOffsetUnit = Math.floor(windowHeight * 0.01);
		const leftOffsetUnit = Math.floor(windowWidth * 0.01);
		const initTopOffset = Number(topInitOffset) * topOffsetUnit;
		const initLeftOffset = Number(leftInitOffset) * leftOffsetUnit;
		const finalTopOffset = Number(topFinalOffset) * topOffsetUnit;
		const finalLeftOffset = Number(leftFinalOffset) * leftOffsetUnit;

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
		cardHeight = Math.min(cardWidth * 1.618, Math.floor(windowHeight * 0.9));

		cardTop =
			windowHeight > cardHeight
				? Math.floor((windowHeight - cardHeight) / 2)
				: Math.floor((deviceHeight - cardHeight) / 2);
		cardTop += initTopOffset + finalTopOffset;

		cardLeft =
			windowWidth > cardWidth
				? Math.floor((windowWidth - cardWidth) / 2)
				: Math.floor((deviceWidth - cardWidth) / 2);

		cardLeft = cardLeft + initLeftOffset + finalLeftOffset;

		pathoffset = `path('M 0 0 L ${-initLeftOffset} ${-initTopOffset}')`;
		console.log('pathoffset:', pathoffset);
	}

	function rerunAnimation() {
		if (!cardRef) {
			console.error('cardRef is null');
			return;
		}
		cardRef.style.animation = 'none';
		cardRef.offsetHeight; /* trigger reflow */
		cardRef.style.animation = '';
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
			rerunAnimation();
		});

		// enable draggability
		enableDraggability();
	});
</script>

<div
	class="card-container hidden rounded-[55px]"
	style="width: {cardWidth}px; height:{cardHeight}px; top: {cardTop}px; left:{cardLeft}px ; 
	offset-path: {pathoffset};
	background-color: {bg};"
	bind:this={cardRef}
>
	<div class="ellipsis bg-bgellipsis">
		<div class="index text-indexcolor relative rotate-[39deg] transform text-[0.9vw] font-bold">
			{index}
		</div>

	</div>
	{#if index === '1'}
	<div class="drag-sign text-indexcolor text-[0.9vw] italic">Drag ⟶</div>
	{/if}
	
</div>

<style>
	.ellipsis {
		position: absolute;
		bottom: 3vh;
		left: 2vw;
		width: 2.4vw;
		height: 3.6vh;
		/* background-color: #073169; */
		opacity: 90%;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 10px;
		transform: rotate(-40deg);
	}

	.card-container:hover {
		cursor: grab;
	}

	.card-container {
		position: absolute;
		opacity: 1;
		z-index: 300;
		offset-anchor: top left;
		offset-distance: 0%;
		offset-rotate: 0deg;
		animation: moveContainer 1s cubic-bezier(0, 0, 0.5, 0.5) forwards;
		animation-delay: 0.6s;
	}
	@keyframes moveContainer {
		0% {
			offset-distance: 0%;
		}
		100% {
			offset-distance: 100%;
		}
	}

	.drag-sign {
		position: absolute;
		width: 4vw;
		bottom: 3vh;
		right: 2vw;
	}
</style>
