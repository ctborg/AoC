const input = process.env.AOC_INPUT;

// Function to parse the input string into a map and find the starting position
function parseMap(input) {
  let startPosition;
  const map = input.split('\n').map((line, row) =>
    line.split('').map((char, col) => {
      if (char === 'S') {
        startPosition = `${row},${col}`;
      }
      return char !== '#'; // True for empty tiles, false for obstacles
    })
  );
  return { map, startPosition };
}

// Directions for moving: North, South, West, East.
const directions = [
  [-1, 0], // North
  [1, 0],  // South
  [0, -1], // West
  [0, 1],  // East
];

// Function to count the number of reachable positions in a given number of steps.
function countReachablePositions(input, steps) {
  // Parse the input map and get the starting position
  const { map, startPosition } = parseMap(input);
  
  // Set to store the current reachable positions
  let currentPositions = new Set([startPosition]);

  // Iterate for the specified number of steps
  for (let step = 0; step < steps; step++) {
    const nextPositions = new Set(); // Set to store the next step's reachable positions

    for (const pos of currentPositions) {

      const [row, col] = pos.split(',').map(Number); // Current position

      for (const [dRow, dCol] of directions) { // Check each direction
        const newRow = row + dRow, newCol = col + dCol;
        // Check if the new position is within the map and not an obstacle
        if (map[newRow]?.[newCol]) {
          nextPositions.add(`${newRow},${newCol}`);
        }
      }
    }
    currentPositions = nextPositions; // Update positions for the next step
  }

  return currentPositions.size; // Return the count of unique reachable positions
}

// Example Usage
const steps = 64; // Number of steps to calculate
// Part 1
console.log(countReachablePositions(input, steps));






