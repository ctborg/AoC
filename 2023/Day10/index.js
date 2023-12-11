const input = process.env.AOC_INPUT;

// Convert the grid into a two-dimensional array.
const gridArray = input.split('\n').filter(Boolean).map(line => line.split(''));

// Define the possible directions for each type of pipe.
const pipeDirections = {
  '|': 'ns', // north-south
  '-': 'ew', // east-west
  'L': 'ne', // north-east
  'J': 'nw', // north-west
  '7': 'sw', // south-west
  'F': 'se', // south-east
  '.': null, // empty space
  'S': '??' // start, direction to be determined
};

// Opposite direction mappings for easy navigation.
const oppositeDirections = {
  n: 's',
  s: 'n',
  e: 'w',
  w: 'e'
};

// Map the grid to the corresponding directions of each pipe.
const directionsMap = gridArray.map(row => row.map(pipe => pipeDirections[pipe]));

// Locate the starting position ('S').
let startY = gridArray.findIndex(row => row.includes('S'));
let startX = gridArray[startY].indexOf('S');

// Determine the direction of the start pipe 'S' based on adjacent pipes.
let startDirection = '';
if (directionsMap[startY - 1]?.[startX]?.includes('s')) startDirection += 'n';
if (directionsMap[startY + 1]?.[startX]?.includes('n')) startDirection += 's';
if (directionsMap[startY][startX - 1]?.includes('e')) startDirection += 'w';
if (directionsMap[startY][startX + 1]?.includes('w')) startDirection += 'e';
directionsMap[startY][startX] = startDirection; // Update 'S' direction.

let currentDirection = startDirection[0]; // Initial direction of movement.
let steps = 0; // Initialize step count.

do {
  // Determine the next direction of movement.
  const exitDirection = directionsMap[startY][startX].replace(currentDirection, '');
  // Move in the grid based on the exit direction.
  switch (exitDirection) {
    case 'n': startY--; break;
    case 's': startY++; break;
    case 'w': startX--; break;
    case 'e': startX++; break;
  }
  // Update the entering direction for the next pipe.
  currentDirection = oppositeDirections[exitDirection];
  steps++; // Increment the step count.
} while (gridArray[startY][startX] !== 'S'); // Continue until returning to 'S'.

console.log(steps / 2); // Half the steps as each pipe is counted twice.
