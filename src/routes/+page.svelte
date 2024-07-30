<script lang="ts">
	import { onMount } from 'svelte';
	export let bgText = '';
	onMount(() => {
		const smallDisplay: boolean = window.matchMedia('(max-width: 600px)').matches;

		bgText = smallDisplay
			? '        Code never lies,\ncomments sometimes do.'
			: 'Code never lies, comments sometimes do.';
		console.log('small display', smallDisplay, bgText);
	});
</script>

<div class="grid h-full w-full items-center justify-center p-0">
	<pre class="background-text playwrite-ar-bg leading-loose text-white">{bgText}</pre>
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
		animation: fadeout 3s linear forwards;
		transition:
			all 0.8s linear;
	}
	.background-text:hover {
		animation: none;
		opacity: 1;
		transform: scale(1.05);
        transition: 
            all 0.5s linear;
	}

	@media screen and (max-width: 768px) {
		.background-text {
			font-size: 4.3vw;
		}
	}
	@media screen and (min-width: 769px) {
		.background-text {
			font-size: 4.3vw;
		}
	}
</style>
