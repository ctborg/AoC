const input = process.env.AOC_INPUT;

// Checks for a horizontal mirror at a given column index
const isHorizontalMirror = (map, mirrorColumn) => {
    const maxCheck = Math.min(mirrorColumn, map[0].length - mirrorColumn);
    return map.every((row, y) => 
        Array.from({length: maxCheck}, (_, x) => row[mirrorColumn - x - 1] === row[mirrorColumn + x]).every(Boolean)
    );
};

// Checks for a vertical mirror at a given row index
const isVerticalMirror = (map, mirrorRow) => {
    const maxCheck = Math.min(mirrorRow, map.length - mirrorRow);
    return Array.from({length: maxCheck}, (_, y) => map[mirrorRow - y - 1] === map[mirrorRow + y]).every(Boolean);
};

// Calculates the score based on the location of the mirror
const getMirrorScore = (map) => {
    for (let i = 1; i < map[0].length; i++) {
        if (isHorizontalMirror(map, i)) return i; // Score for horizontal mirror
    }
    for (let i = 1; i < map.length; i++) {
        if (isVerticalMirror(map, i)) return i * 100; // Score for vertical mirror
    }
    console.error("Map error: No mirror found");
    return 0;
};

// Processes the input and calculates the total score
const processInput = (input) => {
    const lines = input.split('\n');
    lines.push(''); // Signify the end of the last map

    let currentMap = [];
    return lines.reduce((totalScore, line) => {
        if (line === '') {
            const score = getMirrorScore(currentMap);
            currentMap = [];
            return totalScore + score;
        } else {
            currentMap.push(line);
            return totalScore;
        }
    }, 0);
};

console.log("Sum is:", processInput(input));
