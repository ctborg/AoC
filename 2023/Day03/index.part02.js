function calculateProductSum(input) {
    const grid = input.split('\n').map(row => row.split(''));
    let productSum = 0;
    const usedNumbers = new Set();

    // Function to extract the full integer from a given position
    function extractInteger(nx, ny) {
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[nx].length || isNaN(grid[nx][ny]) || grid[nx][ny] === '.' || usedNumbers.has(`${nx},${ny}`)) {
            return null;
        }

        let fullValue = '';
        let nyy = ny;

        // Extend horizontally to the left
        while (nyy >= 0 && !isNaN(grid[nx][nyy]) && grid[nx][nyy] !== '.' && !usedNumbers.has(`${nx},${nyy}`)) {
            fullValue = grid[nx][nyy] + fullValue;
            nyy--;
        }

        // Reset and extend to the right
        nyy = ny + 1;
        while (nyy < grid[nx].length && !isNaN(grid[nx][nyy]) && grid[nx][nyy] !== '.' && !usedNumbers.has(`${nx},${nyy}`)) {
            fullValue += grid[nx][nyy];
            nyy++;
        }

        if (fullValue) {
            for (let i = ny; i <= nyy; i++) {
                usedNumbers.add(`${nx},${i}`);
            }
            return parseInt(fullValue);
        }

        return null;
    }

    // Function to find and process integers adjacent to a given position
    function processAdjacentIntegers(x, y) {
        if (grid[x][y] !== '*') return;

        let adjacentNumbers = [];

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue; // Skip the center position

                const nx = x + dx;
                const ny = y + dy;

                let number = extractInteger(nx, ny);
                if (number !== null) {
                    adjacentNumbers.push(number);
                }
            }
        }

        if (adjacentNumbers.length === 2) {
            console.log('product', adjacentNumbers, x,y)
            productSum += adjacentNumbers[0] * adjacentNumbers[1];
        }
    }

    // Iterate over the grid to find '*' and process adjacent numbers
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            processAdjacentIntegers(x, y);
        }
    }

    return productSum;
}

// Test with the new input
const input = process.env.AOC_INPUT;

console.log(calculateProductSum(input));
