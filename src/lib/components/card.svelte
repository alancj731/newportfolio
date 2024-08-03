<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { cardsStatus, indexRanking, getZIndex, bringTargetToTop } from '../../stores/cardstatus';
	let cardRef: HTMLElement | null = null;
	export let topInitOffset: string;
	export let leftInitOffset: string;
	export let topFinalOffset: string;
	export let leftFinalOffset: string;
	export let bg: string;
	export let index: string;

	let pathoffset: string;

	// for handle drag drop
	// Initial mouse down position
	let initialMouseDownX: number;
	let initialMouseDownY: number;

	// Initial element position for mouse down
	let initialLeft: number;
	let initialTop: number;

	$: cardWidth = 0;
	$: cardHeight = 0;
	$: cardTop = 0;
	$: cardLeft = 0;
	$: pathoffset = '';

	function updateCardContainerSizeAndPosition() {
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

		if (get(cardsStatus).width !== cardWidth || get(cardsStatus).height !== cardHeight) {
			// update value in store so that some other components can change it daynamicly
			cardsStatus.set({ width: cardWidth, height: cardHeight });
		}
	}

	function rerunAnimation() {
		if (!cardRef) {
			return;
		}
		cardRef.style.animation = 'none';
		cardRef.offsetHeight; /* trigger reflow */
		cardRef.style.animation = '';
	}

	function handleDragStart(event: MouseEvent | TouchEvent) {
		if (!cardRef) {
			console.error('cardRef is null');
			return false;
		}

		cardRef.draggable = true;
		event.preventDefault();

		// Initial mouse position
		if (event instanceof TouchEvent) {
			const touchEvent = event as TouchEvent;
			initialMouseDownX = touchEvent.touches[0].clientX;
			initialMouseDownY = touchEvent.touches[0].clientY;
		} else {
			const mouseEvent = event as MouseEvent;
			initialMouseDownX = mouseEvent.clientX;
			initialMouseDownY = mouseEvent.clientY;
		}

		// Initial element position
		initialLeft = cardRef.offsetLeft;
		initialTop = cardRef.offsetTop;

		// update zIndexStartPos		
		bringTargetToTop(Number(index));
		return true;
	}

	function enableDraggability() {
		if (!cardRef) {
			console.error('cardRef is null');
			return;
		}
		cardRef.draggable = false;

		// prepare drag and drop for laptop
		cardRef.addEventListener('mousedown', (event) => {
			if (!handleDragStart(event)) {
				return;
			}

			// Add event listeners for mouse movement and release
			cardRef!.addEventListener('mousemove', moveElement);
			cardRef!.addEventListener('mouseup', stopMoving);
		});

		// prepare drag and drop for mobile
		cardRef.addEventListener('touchstart', (event) => {
			if (!handleDragStart(event)) {
				return;
			}

			// Add event listeners for mouse movement and release
			cardRef!.addEventListener('touchmove', moveElement);
			cardRef!.addEventListener('touchend', stopMoving);
		});
	}
	function moveElement(event: MouseEvent | TouchEvent) {
		if (!cardRef) {
			return;
		}
		if (cardRef.draggable === false) {
			return;
		}
		let newX: number;
		let newY: number;
		// Calculate new position
		if (event instanceof TouchEvent) {
			const touchEvent = event as TouchEvent;
			newX = initialLeft + touchEvent.touches[0].clientX - initialMouseDownX;
			newY = initialTop + touchEvent.touches[0].clientY - initialMouseDownY;
		} else {
			const mouseEvent = event as MouseEvent;
			newX = initialLeft + mouseEvent.clientX - initialMouseDownX;
			newY = initialTop + mouseEvent.clientY - initialMouseDownY;
		}

		// Update element position
		cardRef.style.left = newX + 'px';
		cardRef.style.top = newY + 'px';
	}

	function stopMoving(event: MouseEvent | TouchEvent) {
		if (!cardRef) {
			console.error('cardRef is null');
			return;
		}
		cardRef.draggable = false;
		// Remove event listeners
		if (event instanceof TouchEvent) {
			cardRef.removeEventListener('touchmove', moveElement);
			cardRef.removeEventListener('touchend', stopMoving);
		} else {
			cardRef.removeEventListener('mousemove', moveElement);
			cardRef.removeEventListener('mouseup', stopMoving);
		}
	}


	onMount(() => {
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

		const unsubscribindexRanking = indexRanking.subscribe((value) => {

			if (!cardRef) {
				return;
			}	
			cardRef.style.zIndex = getZIndex(Number(index));
		});

		return () => {
			unsubscribindexRanking();
		};

});
</script>

<div
	class="card-container hidden rounded-[35px] {bg}"
	style="width: {cardWidth}px; height:{cardHeight}px; top: {cardTop}px; left:{cardLeft}px ; 
	 offset-path: {pathoffset};
	 z-index: {getZIndex(Number(index))};"
	bind:this={cardRef}
>	
	<slot></slot>
	<div
		class="ellipsis bg-white"
		style="
		width:{`${Math.floor(cardWidth * 0.1)}px`};
		height:{`${Math.floor(cardWidth * 0.07)}px`};
		left: {`${Math.floor(cardWidth * 0.08)}px`};
		bottom: {`${Math.floor(cardWidth * 0.1)}px`}"
	>
		<div
			class="index relative rotate-[39deg] transform font-bold text-black"
			style="font-size: {`${Math.floor(cardWidth * 0.04)}px`};
		left: {`${Math.floor(cardWidth * 0)}px`};
		bottom: {`${Math.floor(cardWidth * 0.004)}px`}"
		>
			{Number(index)+1}
		</div>
	</div>
	{#if index === '0'}
		<div
			class="drag-sign absolute italic text-white"
			style="font-size: {`${Math.floor(cardWidth * 0.04)}px`};
			right: {`${Math.floor(cardWidth * 0.08)}px`};
			bottom: {`${Math.floor(cardWidth * 0.1)}px`};"
		>
			Drag ⟶
		</div>
	{/if}
</div>

<style>
	.ellipsis {
		position: absolute;
		/* background-color: #073169; */
		opacity: 80%;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
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
		animation: moveContainer 1.8s cubic-bezier(0.3, 0.25, 0.8, 0.6) forwards;
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
</style>
