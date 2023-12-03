function calculatePartSum(input) {
    // Split the input into a 2D array
    const grid = input.split('\n').map(row => row.split(''));
    let partSum = 0;
    const visited = new Set();

    // Function to check and add an integer at a given position
    function addIntegerIfValid(x, y) {
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[x].length || visited.has(`${x},${y}`)) {
            return;
        }

        const value = grid[x][y];
        if (!isNaN(value) && value !== '.') {
            // Find the full integer
            let fullValue = value;
            visited.add(`${x},${y}`);
            
            // Check horizontally
            let nx = x, ny = y - 1;
            while (ny >= 0 && !isNaN(grid[nx][ny]) && grid[nx][ny] !== '.') {
                fullValue = grid[nx][ny] + fullValue;
                visited.add(`${nx},${ny}`);
                ny--;
            }

            ny = y + 1;
            while (ny < grid[nx].length && !isNaN(grid[nx][ny]) && grid[nx][ny] !== '.') {
                fullValue += grid[nx][ny];
                visited.add(`${nx},${ny}`);
                ny++;
            }

            // Add to part sum
            partSum += parseInt(fullValue);
        }
    }

    // Function to add adjacent numbers to part sum
    function addAdjacentNumbers(x, y) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                addIntegerIfValid(x + dx, y + dy);
            }
        }
    }

     // Iterate over the grid to find symbols and add adjacent numbers
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (!isNaN(grid[x][y]) || grid[x][y] === '.') {
                // Do nothing if it's a number or a period
            } else {
                // Treat as a symbol and add adjacent numbers
                addAdjacentNumbers(x, y);
            }
        }
    }

    return partSum;
}

// Test with the provided input
const input = process.env.AOC_INPUT;

console.log(calculatePartSum(input));
