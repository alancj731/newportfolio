<script lang="ts">
	import { onMount } from 'svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	export let bgText = '';
	onMount(() => {
		const smallDisplay: boolean = window.matchMedia('(max-width: 768px)').matches;

		bgText = smallDisplay
			? '        Code never lies,\ncomments sometimes do.'
			: 'Code never lies, comments sometimes do.';
		console.log('small display', smallDisplay, bgText);
	});
</script>

<svelte:head>
	<title>Jian's Portfolio</title>
</svelte:head>
<div class="flex h-full w-full flex-col items-center justify-center p-0">
	<pre class="background-text playwrite-ar-bg leading-loose text-white">{bgText}</pre>
	<div class="icon-container flex justify-center space-x-6">
		<a href="https://www.linkedin.com/in/alanchenjian/">
			<i class="icon fa-brands fa-linkedin-in invert"></i>
		</a>
		<a href="https://github.com/alancj731"><i class="icon fa-brands fa-github invert"></i></a>
	</div>
</div>

<style>

    .icon {
        transition: all 0.5s linear;
    }
    .icon:hover {
        filter: none;
        scale: 1.1;
        transition: all 0.5s linear;
    }
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
		transition: all 0.8s linear;
	}
	.background-text:hover {
		animation: none;
        color: black;
		opacity: 1;
		transform: scale(1.05);
		transition: all 0.5s linear;
	}
	.icon-container {
		position: absolute;
		top: 88%;
		font-size: 1.5rem;
	}

	/* @media screen and (max-width: 401px) {
		.background-text {
            position: absolute;
            top: 35%;
			font-size: 7vw;
		}
	} */

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
			font-size: 4vw;
		}
	}
</style>
