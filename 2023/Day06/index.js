// Part 1

function calculateWaysToWin(races) {
    let totalWays = 1;

    for (let i = 0; i < races.length; i++) {
        let waysToWin = 0;
        const raceTime = races[i].time;
        const recordDistance = races[i].distance;

        for (let holdTime = 1; holdTime < raceTime; holdTime++) {
            let speed = holdTime; // Speed increases by 1 mm/ms for each ms button is held
            let travelTime = raceTime - holdTime; // Remaining time after button release
            let distance = speed * travelTime; // Distance = Speed * Time

            if (distance > recordDistance) {
                waysToWin++;
            }
        }

        totalWays *= waysToWin;
    }

    return totalWays;
}

// Example usage, I changed this to use my input.
let races = [
    { time: 7, distance: 9 },
    { time: 15, distance: 40 }
];

console.log(calculateWaysToWin(races)); // This will output 288

// part 2

function calculateWaysToWinOptimized(races) {
    let totalWays = 1;

    for (let race of races) {
        let minHoldTime = 1;
        let maxHoldTime = race.time - 1;
        let waysToWin = 0;

        // Find the minimum hold time that beats the record
        while (minHoldTime < maxHoldTime && minHoldTime * (race.time - minHoldTime) <= race.distance) {
            minHoldTime++;
        }

        // Find the maximum hold time that beats the record
        while (maxHoldTime > minHoldTime && maxHoldTime * (race.time - maxHoldTime) <= race.distance) {
            maxHoldTime--;
        }

        if (minHoldTime < maxHoldTime) {
            waysToWin = maxHoldTime - minHoldTime + 1;
        }

        totalWays *= waysToWin;
    }

    return totalWays;
}

// Example usage with large numbers
const races = [
    { time: env.process.AOC_INPUT.time, distance: env.process.AOC_INPUT.distance }
];

console.log(calculateWaysToWinOptimized(races));
