<script lang="ts">
	import { onMount } from 'svelte';

	let contactContainerRef: HTMLElement | null = null;
	$: iconSize = '18px';
	$: spaceBetweenIcons = '5rem';

	function updateIconSizeAndPosition() {
		if (!contactContainerRef) {
			console.error('contactContainerRef is null');
			return;
		}
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
						: '24px';

		spaceBetweenIcons =
			windowWidth >= 3800
				? '6rem'
				: windowWidth > 1900
					? '5rem'
					: windowWidth > 1280
						? '4rem'
						: '2.5rem';

		contactContainerRef.style.fontSize = iconSize;
	}

	onMount(() => {
		updateIconSizeAndPosition();
		window.addEventListener('resize', updateIconSizeAndPosition);
	});
</script>

<div
	bind:this={contactContainerRef}
	class="contact-container flex flex-row justify-center"
	style="gap: {spaceBetweenIcons}"
>
	<div class="icon-container">
		<a href="https://www.linkedin.com/in/alanchenjian/">
			<i class="icon fa-brands fa-linkedin-in invert"></i>
		</a>
	</div>
	<div class="icon-container">
		<a href="https://github.com/alancj731"><i class="icon fa-brands fa-github invert"></i></a>
	</div>
</div>

<style>
	.contact-container {
		position: absolute;
		top: 92%;
	}
	.icon {
		transition: all 0.5s linear;
	}
	.icon:hover {
		filter: none;
		scale: 1.3;
		transition: all 0.5s linear;
	}
</style>
