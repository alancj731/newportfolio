<script lang="ts">
	import { onMount } from 'svelte';
	$: bgText = '';
	$: fontSize = '4vw';
    $: topPos = '40%';

	function updateText() {
		try {
			const smallDisplay: boolean = window.matchMedia('(max-width: 1280px)').matches;

			bgText = smallDisplay
				? '        Code never lies,\ncomments sometimes do.'
				: 'Code never lies, comments sometimes do.';

			fontSize = smallDisplay ? '5vw' : '4vw';

            topPos = smallDisplay ? '38%' : '40%';

		} catch (error) {
			console.error('Error in updateText', error);
		}
	}

	onMount(() => {
		updateText();
		try {
			window.addEventListener('resize', updateText);
		} catch (error) {
			console.error('Error in backgroundtext.svelte onMount', error);
		}
	});
</script>

<pre
	class="background-text playwrite-ar-bg leading-loose text-white"
	style="font-size: {fontSize}; top: {topPos}">{bgText}
</pre>

<style>
	.background-text {
		/* font-size: 4vw; */
		position: absolute;
		/* top: 40%; */
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
</style>
