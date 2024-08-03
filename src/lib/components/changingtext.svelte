<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { cardsStatus } from '../../stores/cardstatus';

	const texts = [
		"Hi, I'm Jian\n",
		'  My career started as a  software engineer at HP. I have held positions at various IT and high tech companies, including Cisco, Commscope and Corning. My most recent role was as the founder and CEO  of a company with an year revenue of 2 million CAD before I moved to Canada.',
		'  I recently graduated   from the Data Science and Machine Learning program at Red River College and my GPA is 4.46/4.5.',
		'  I was the only student that bypassed three major courses through the RPL (Recognition of Prior    Learning) test. I have   self-taught web dev and  cloud computing through  both personal projects & volunteer works.',
		'  My tech stack includes Python, Deep Learning,   Unsupervised Learning,   TypeScript, React, Svelte, Next.js, Express, Git, CI/CD, SQL, Azure, GCP,   and more...'
	];

	let displayText = '';
	$: displayText;

	const linesize = 25;

	const textLength = texts.length;
	let prevText = '';
	let currentText = '';
	let index = 0;
	let charIndex = 0;
	let finalizing = true;
	let drafting = false;
	let deleting = false;
	export let textRef: HTMLElement | null = null;

	function resetText() {
		prevText = '';
		currentText = '';
		index = 0;
		charIndex = 0;
		finalizing = true;
		drafting = false;
		deleting = false;
	}

	function adjustTextBreakingPoint() {
		if (!textRef) {
			return;
		}
		const width = get(cardsStatus).width;
		const height = get(cardsStatus).height;
		if (width > 0 && height > 0) {
			textRef.classList.remove('hidden');
		}
		const textsize = Math.floor((width / linesize) * 1.3);
		textRef.style.fontSize = `${textsize}px`;
	}

	function addNewLine(index: number, text: string) {
		if (index % linesize === 0) {
			return text + '\n';
		} else return text;
	}
	function addNewCharacter(text: string, currentChar: string) {
		const textLength = text.length;
		if (textLength === 0) {
			return currentChar;
		}

		if (text[ textLength - 1 ] === '\n' && currentChar === ' ') {
			return text;
		}
		else {
			return text + currentChar;
		}
	}

	function updateText() {
		if (index >= textLength) {
			return;
		}

		if (finalizing) {
			if (charIndex < texts[index].length) {
				currentText = addNewCharacter(currentText, texts[index][charIndex]);
				charIndex++;
				// check if need to add a '\n' to start a new line
				currentText = addNewLine(charIndex, currentText);
			} else {
				if (prevText.length > 0) {
					prevText = prevText + currentText + '\n';
				} else {
					prevText = currentText + '\n';
				}
				index++;
				if (index >= textLength) {
					return;
				}
				charIndex = 0;
				currentText = '';
				finalizing = false;
				drafting = true;
			}
		} else if (drafting) {
			if (charIndex < texts[index].length) {
				currentText = addNewCharacter(currentText, texts[index][charIndex]);
				charIndex++;
				currentText = addNewLine(charIndex, currentText);
			} else {
				drafting = false;
				deleting = true;
			}
		} else if (deleting) {
			if (charIndex > 0) {
				currentText = currentText.substring(0, charIndex - 1);
				charIndex--;
			} else {
				deleting = false;
				finalizing = true;
				index++;
				currentText = '';
				charIndex = 0;
				if (index >= textLength) {
					return;
				}
			}
		}
		displayText = prevText + currentText;

		setTimeout(updateText, deleting ? 50 : 100);
	}

	onMount(() => {
		updateText();
		if (window) {
			window.addEventListener('resize', () => {
				resetText();
				updateText();
			});
		}

		const unsubscribeWidth = cardsStatus.subscribe((value) => {
			adjustTextBreakingPoint();
		});

		return () => {
			unsubscribeWidth();
		};
	});
</script>

<div class="width-full relative left-10 top-10 flex justify-start overflow-hidden">
	<pre
		bind:this={textRef}
		class=" changing-text text-bold hidden text-[1.5rem] text-white">{displayText}</pre>
</div>
