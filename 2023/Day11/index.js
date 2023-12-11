/**
 * Calculates the sum of shortest paths between all pairs of galaxies in a grid,
 * considering an expansion factor for empty rows and columns.
 * @param {string[]} grid - A 2D grid representing the universe, with '.' for empty space and '#' for galaxies.
 * @param {number} expansionFactor - The factor by which empty rows and columns are expanded.
 * @returns {number} The sum of all shortest paths between galaxies considering the expansion.
 */

const input = process.env.AOC_INPUT;

const sumOfShortestPaths = (grid, expansionFactor) => {
    // Function to calculate Modified Manhattan distance considering expansion
    const modifiedManhattanDistance = (x1, y1, x2, y2) => {
        let dx = Math.abs(x1 - x2);
        let dy = Math.abs(y1 - y2);

        // Increase distance for paths crossing expanded rows/columns
        for (let y = Math.min(y1, y2); y < Math.max(y1, y2); y++) {
            if (!hasGalaxyInRow[y]) dy += (expansionFactor - 1);
        }
        for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
            if (!hasGalaxyInColumn[x]) dx += (expansionFactor - 1);
        }

        return dx + dy;
    };

    // Identify rows and columns with galaxies
    const hasGalaxyInRow = grid.map(row => row.includes('#'));
    const hasGalaxyInColumn = Array.from({ length: grid[0].length }, (_, i) => 
        grid.some(row => row[i] === '#'));

    // Parse the grid to find galaxies
    const galaxies = grid.flatMap((row, y) => 
        [...row].map((cell, x) => (cell === '#' ? [x, y] : null)).filter(Boolean));

    // Calculate the sum of shortest paths between every pair of galaxies
    return galaxies.reduce((sum, galaxy1, i) => 
        sum + galaxies.slice(i + 1).reduce((subSum, galaxy2) => 
            subSum + modifiedManhattanDistance(...galaxy1, ...galaxy2), 0), 0);
};

// Example usage
const originalGrid = input.split('\n');

// Part 1
console.log('Sum with Expansion Factor 2:', sumOfShortestPaths(originalGrid, 2));

// Part 2
console.log('Sum with Expansion Factor 1000000:', sumOfShortestPaths(originalGrid, 1000000));
