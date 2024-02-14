export default function railBetweenFinder(ctwA) {
    const railBetweenStandards = [600, 900, 1100, 1650, 2150, 3150];

    for (let i = 0; i < railBetweenStandards.length; i++) {
        if (ctwA + 100 <= railBetweenStandards[i]) {
            return railBetweenStandards[i];
        }
    }

    // If ctwA + 100 is greater than the last value in the array, return the last value
    return railBetweenStandards[railBetweenStandards.length - 1];
}


