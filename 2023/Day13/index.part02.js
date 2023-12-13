const input = process.env.AOC_INPUT;

/**
 * Checks if there's a horizontal mirror at a given column index in the map,
 * allowing for one smudge (a single discrepancy).
 * @param {string[]} map - Array of strings representing the map.
 * @param {number} mirrorColumn - Index of the column before the potential mirror line.
 * @returns {boolean} - True if there's a horizontal mirror with at most one smudge.
 */
const isMapRowMirror = (map, mirrorColumn) => {
    const maxCheck = Math.min(mirrorColumn, map[0].length - mirrorColumn);
    let totalError = 0;

    return map.every(row => {
        for (let x = 0; x < maxCheck; x++) {
            if (row[mirrorColumn - x - 1] !== row[mirrorColumn + x]) {
                totalError++;
                if (totalError > 1) return false;
            }
        }
        return true;
    }) && totalError === 1;
};

/**
 * Checks if there's a vertical mirror at a given row index in the map,
 * allowing for one smudge (a single discrepancy).
 * @param {string[]} map - Array of strings representing the map.
 * @param {number} mirrorRow - Index of the row before the potential mirror line.
 * @returns {boolean} - True if there's a vertical mirror with at most one smudge.
 */
const isMapColumnMirror = (map, mirrorRow) => {
    const maxCheck = Math.min(mirrorRow, map.length - mirrorRow);
    let totalError = 0;

    return Array.from({length: maxCheck}).every((_, y) => {
        for (let x = 0; x < map[0].length; x++) {
            if (map[mirrorRow - y - 1][x] !== map[mirrorRow + y][x]) {
                totalError++;
                if (totalError > 1) return false;
            }
        }
        return true;
    }) && totalError === 1;
};

/**
 * Calculates the mirror value (score) of the map based on the position and orientation of the mirror.
 * @param {string[]} map - Array of strings representing the map.
 * @returns {number} - The calculated score of the map.
 */
const getMapMirrorValue = (map) => {
    for (let i = 1; i < map[0].length; i++) {
        if (isMapRowMirror(map, i)) return i;
    }
    for (let i = 1; i < map.length; i++) {
        if (isMapColumnMirror(map, i)) return i * 100;
    }
    console.error("Map error: No mirror found");
    return 0;
};

/**
 * Processes the input and calculates the total score for all map patterns.
 * @param {string} input - The entire string input containing multiple map patterns.
 * @returns {number} - The total score for all map patterns.
 */
const processInput = (input) => {
    const lines = input.split('\n').concat('');
    let currentMap = [];
    return lines.reduce((totalScore, line) => {
        if (line === '') {
            totalScore += getMapMirrorValue(currentMap);
            currentMap = [];
        } else {
            currentMap.push(line);
        }
        return totalScore;
    }, 0);
};

console.log("Sum is:", processInput(input));
