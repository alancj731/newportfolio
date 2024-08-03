import { writable, readable, get } from 'svelte/store';


// export const cardsWidth = writable<number>(0);
// export const cardsHeight = writable<number>(0);
export const cardsStatus = writable<{width: number, height: number}>({width: 0, height: 0});

export const zIndex = readable<number []>([304,303,302,301,300]);
export const indexRanking = writable<number[]>([0,1,2,3,4]);

export const bringTargetToTop = (target: number) => {
    const originalIndexRanking = get(indexRanking)
    const targetInRanking = originalIndexRanking.indexOf(target);
    if (targetInRanking === -1) return;

    const newRanking = [...originalIndexRanking]
    newRanking.splice(targetInRanking, 1);
    newRanking.unshift(target);

    indexRanking.set(newRanking);
}

export const getZIndex = (target: number) => {
    return get(zIndex)[get(indexRanking).indexOf(target)].toString();
}