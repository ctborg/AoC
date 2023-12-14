// Function to check if two matrices are equal
function isMatrixEqual(matrix1, matrix2) {
  // Check if the number of rows is the same
  if (matrix1.length !== matrix2.length) return false;

  // Iterate through each row
  for (let i = 0; i < matrix1.length; i++) {
    // Check if the number of columns in each row is the same
    if (matrix1[i].length !== matrix2[i].length) return false;
    // Iterate through each column
    for (let j = 0; j < matrix1[i].length; j++) {
      // Check if individual elements are equal
      if (matrix1[i][j] !== matrix2[i][j]) return false;
    }
  }
  return true;
}

// Function to perform one cycle of tilts in all four directions
function performCycle(matrix, directions) {
  // Apply each tilt direction to the matrix
  directions.forEach(direction => {
    direction(matrix);
  });
}

// Function to simulate the tilting process for a specified number of cycles
function simulate(input, cycles) {
  // Convert the input string into a 2D array (matrix)
  let matrix = input.split('\n').map(row => row.split(''));
  // Variable to store the matrix state from the previous cycle
  let previousMatrix = [];
  // Array of functions for each tilt direction
  let directions = [tiltNorth, tiltWest, tiltSouth, tiltEast];

  // Iterate for the specified number of cycles
  for (let cycle = 0; cycle < cycles; cycle++) {
    // Perform a cycle of tilts
    performCycle(matrix, directions);
    
    // Check if the current state is the same as the previous state
    if (isMatrixEqual(matrix, previousMatrix)) {
      console.log("Steady state reached at cycle: " + cycle);
      break; // Exit the loop if a steady state is reached
    }

    // Update the previous matrix state for the next cycle
    previousMatrix = matrix.map(row => [...row]);
  }

  // Output the final state and total load after simulation
  console.log("Final Platform State after " + cycles + " cycles:");
  console.log(matrix.map(row => row.join('')).join('\n'));
  console.log("Total Load: " + calculateLoad(matrix));
}

// Define input platform state
const input = process.env.AOC_INPUT;

// Call the simulate function with the input and one thousand cycles
simulate(input, 1000);
