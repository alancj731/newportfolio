import { writable } from 'svelte/store';


// export const cardsWidth = writable<number>(0);
// export const cardsHeight = writable<number>(0);
export const cardsStatus = writable<{width: number, height: number}>({width: 0, height: 0});