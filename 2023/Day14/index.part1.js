function calculateNorthLoad(grid) {
  // Split the grid into a 2D array (matrix) for easier manipulation
  let matrix = grid.split('\n').map(row => row.split(''));
  let totalLoad = 0;

  for (let col = 0; col < matrix[0].length; col++) {
    for (let row = 1; row < matrix.length; row++) {
      // Check for a rounded rock, denoted by 'O'
      if (matrix[row][col] === 'O') {
        let currentRow = row;
        // Add the distance from the bottom to the total load
        totalLoad += matrix.length - row;

        // Move the rounded rock upwards until it hits the top or a cube rock
        while (currentRow > 0 && matrix[currentRow - 1][col] === '.') {
          matrix[currentRow - 1][col] = 'O'; // Move rock up
          matrix[currentRow][col] = '.';     // Clear the old position
          currentRow--;
        }
      }
    }
  }
  
 // Return the modified grid and the total load
  return { 
    newGrid: matrix.map(row => row.join('')).join('\n'), 
    totalLoad: totalLoad 
  };
}

// Test with your provided input
const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

const result = calculateNorthLoad(input);
console.log("New Grid:\n" + result.newGrid);
console.log("Total Load on North Support Beams: " + result.totalLoad);
