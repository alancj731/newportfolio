<script lang="ts">
	import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { cardsStatus } from '../../stores/cardstatus';

	const texts = [
		"Hello, I'm Jian!\n ",
		'I was a senior software engineer in HP many years before. My last job\nwas a founder and CEO of a company has two million CAD revenue before I came to Canada.',
		"I just graduated from Data Science and Machine Learning program from Red River College.\n I got a GPA of 4.46/4.5.\nI'm the only one student that bypassed three major courses by taking the EPL test."
	];

	
	let displayText = '';
	$: displayText;

	const textLength = texts.length;
    let prevText = '';
	let currentText = '';
	let index = 0;
	let charIndex = 0;
	let finalizing = true;
	let drafting = false;
	let deleting = false;
	export let textRef: HTMLElement | null = null;

    function resetText(){
        prevText = '';
        currentText = '';
        index = 0;
        charIndex = 0;
        finalizing = true;
        drafting = false;
        deleting = false;
    }

    function adjustTextBreakingPoint(){
        console.log('adjustTextBreakingPoint:', get(cardsStatus));
    }

	function updateText() {
		if (index >= textLength) {
			return;
		}
		if (finalizing) {
			if (charIndex < texts[index].length) {
				currentText = texts[index].substring(0, charIndex + 1);
				charIndex++;
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
				finalizing = false;
				drafting = true;
			}
		}
		if (drafting) {
			if (charIndex < texts[index].length) {
				currentText = texts[index].substring(0, charIndex + 1);
				charIndex++;
			} else {
				drafting = false;
				deleting = true;
			}
		}
		if (deleting) {
			if (charIndex > 0) {
				currentText = texts[index].substring(0, charIndex - 1);
				charIndex--;
			} else {
				deleting = false;
				finalizing = true;
				index++;
				if (index >= textLength) {
					return;
				}
			}
		} else {
			if (charIndex < texts[index].length) {
				currentText = texts[index].substring(0, charIndex + 1);
				charIndex++;
			} else {
				deleting = true;
			}
		}

		displayText = prevText + currentText;

		setTimeout(updateText, deleting ? 200 : 250);
	}

	onMount(() => {
        console.log('Changingtext onMount');
        updateText();
        if (window) {
            window.addEventListener('resize', () => {
                resetText();
                updateText();
            });
        }
        
        const unsubscribeWidth = cardsStatus.subscribe(value => {
            adjustTextBreakingPoint();
        });

        return () => {
            unsubscribeWidth();
        };

	});
</script>

<div
	bind:this={textRef}
	class=" width-full relative left-10 top-10 flex justify-start overflow-clip"
>
	<pre class="changing-text text-bold text-[1.5rem] text-white">{displayText}</pre>
</div>
