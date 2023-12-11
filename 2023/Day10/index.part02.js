const inputGrid = process.env.AOC_INPUT;

// Split the input into a 2D array representing the grid.
const gridLines = inputGrid.split('\n').filter(Boolean);
const grid = gridLines.map(line => line.split(''));

// Define the directional characteristics of each pipe type.
const pipeDirections = {
  '|': 'ns',
  '-': 'ew',
  'L': 'ne',
  'J': 'nw',
  '7': 'sw',
  'F': 'se',
  '.': null, // empty space
  'S': '??' // start, to be determined based on adjacent pipes
};

// Mapping for the opposite direction (used for tracking traversal direction).
const oppositeDirections = {
  n: 's',
  s: 'n',
  e: 'w',
  w: 'e'
};

// Convert the grid into directions for each pipe type.
const directionGrid = grid.map(row => row.map(pipe => pipeDirections[pipe]));

// Locate the starting position ('S').
let currentY = gridLines.findIndex(line => line.includes('S'));
let currentX = grid[currentY].indexOf('S');
let startDirection = '';

// Determine the direction of the start pipe 'S' based on adjacent pipes.
if (directionGrid[currentY - 1]?.[currentX]?.includes('s')) startDirection += 'n';
if (directionGrid[currentY + 1]?.[currentX]?.includes('n')) startDirection += 's';
if (directionGrid[currentY][currentX - 1]?.includes('e')) startDirection += 'w';
if (directionGrid[currentY][currentX + 1]?.includes('w')) startDirection += 'e';
directionGrid[currentY][currentX] = startDirection; // Update the direction for 'S'.

// Variables to track the direction of entering a pipe.
let enteringFrom = startDirection[0];
const pathMarks = grid.map(row => row.map(() => null)); // Track the path of the loop.

// Trace the loop in the grid.
do {
  pathMarks[currentY][currentX] = 'P'; // Mark the current position as part of the path.
  const leavingTo = directionGrid[currentY][currentX].replace(enteringFrom, '');

  // Move to the next pipe based on the exit direction.
  switch(leavingTo) {
    case 'n': currentY--; break;
    case 's': currentY++; break;
    case 'w': currentX--; break;
    case 'e': currentX++; break;
  }
  enteringFrom = oppositeDirections[leavingTo]; // Update entering direction for the next pipe.
} while (grid[currentY][currentX] !== 'S');

// Mark inside ('I') and outside ('O') areas of the grid.
for (let y = 0; y < directionGrid.length; y++) {
  const pathRow = pathMarks[y];
  const directionRow = directionGrid[y];
  let areaType = 'O'; // Start with outside area.

  for (let x = 0; x < directionRow.length; x++) {
    if (pathRow[x]) {
      // Toggle area type when encountering a pipe with a north direction.
      if (directionRow[x].includes('n')) {
        areaType = areaType === 'O' ? 'I' : 'O';
      }
    } else {
      pathRow[x] = areaType; // Mark the area type (inside or outside).
    }
  }
}

// Count the number of inside spaces.
const insideCount = pathMarks.flat().filter(value => value === 'I').length;

console.log(insideCount); // Output the count of enclosed area spaces.
