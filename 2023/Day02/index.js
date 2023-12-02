function parseInputToGames(input) {
    const colorMap = { "red": "red", "green": "green", "blue": "blue" };
    
    // Split the input by "Game" and filter out any empty strings
    const gameStrings = input.split("Game ").filter(str => str.trim() !== "");

    return gameStrings.map(gameStr => {
        // Extract the game ID and the sets
        const [gameID, setsStr] = gameStr.split(":").map(str => str.trim());
        const sets = setsStr.split(";").map(set => {
            const cubeCounts = set.trim().split(",").map(cube => {
                const [count, color] = cube.trim().split(" ");
                return { [colorMap[color]]: parseInt(count) };
            });

            // Merge cube count objects for each set
            return Object.assign({}, ...cubeCounts);
        });

        return { id: parseInt(gameID), sets: sets };
    });
}


function sumOfGameIDsForPossibleGames(games, availableCubes) {
    let possibleGameSumID = 0;

    games.forEach((game, gameID) => {
        let isGamePossible = true;
        const currentCubes = { ...availableCubes };

        for (const set of game.sets) {
            Object.keys(set).forEach(color => {
                
                if (set[color] > currentCubes[color]) {
                    isGamePossible = false;
                }
            });
            
            if (!isGamePossible) {
                break;
            }
        }

        if (isGamePossible) {
            
            possibleGameSumID += game.id;
        }
    });

    return possibleGameSumID;
}

// Example input
const input = process.env.GAME_INPUT;

function calculateAndSumPowerOfCubes(games) {
    let totalPowerOfCubes = 0;

    games.forEach(game => {
        const minCubes = { red: 0, green: 0, blue: 0 };

        game.sets.forEach(set => {
            Object.keys(set).forEach(color => {
                minCubes[color] = Math.max(minCubes[color], set[color]);
            });
        });

        // Calculate the PowerOfCubes for this game
        const powerOfCubes = Object.values(minCubes).reduce((acc, val) => acc * val, 1);
        totalPowerOfCubes += powerOfCubes;
    });

    return totalPowerOfCubes;
}

// Parse the games from the input string
const games = parseInputToGames(input);

// Calculate and sum the PowerOfCubes
const totalPowerOfCubes = calculateAndSumPowerOfCubes(games);
console.log("Total Power of Cubes:", totalPowerOfCubes);


const gameIDSum = sumOfGameIDsForPossibleGames(games, availableCubes);
console.log("Sum of IDs for possible games:", gameIDSum);
