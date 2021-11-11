import { Prando } from './prando';

export const shuffleArray = <T>(arr:T[], seed?:number|string):T[] => {

	const rng = new Prando(seed);

    const array = arr.slice(); // shallow copy
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
		randomIndex = rng.nextInt(0, currentIndex-1);
        // randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

