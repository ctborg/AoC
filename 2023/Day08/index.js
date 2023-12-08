let input = process.env.AOC_INPUT;

function parseMappings(input) {
  const mappings = {};
  
  const lines = input.split('\n'); // Split the input by newline

  const instructions = lines.shift();
  //drop newline
  lines.shift()

  lines.forEach(line => {
    const parts = line.split(' = ');
    if (parts.length === 2) {
      const key = parts[0].trim();
      const values = parts[1].replace(/[()]/g, '').split(', ').map(item => item.trim());
      mappings[key] = values;
    }
  });

  return {instructions, mappings};
}

const parsedInput = parseMappings(input);

function navigateAndCountSteps(instructions, mappings, startNode, targetNode) {
  let currentNode = startNode;
  let stepCount = 0;
  let i = 0;

  while (currentNode !== targetNode) {
    const [left, right] = mappings[currentNode];
    currentNode = instructions[i] === 'L' ? left : right;
    stepCount++;
    i = (i + 1) % instructions.length; // Loop back to start if we reach the end of instructions
  }

  return stepCount;
}


// Function to compute the greatest common divisor (GCD) of a set of numbers
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

//Computes the least common multiple of two numbers.
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

// Function to compute the least common multiple (LCM) of a set of numbers
function lcmOfSet(...numbers) {
  return numbers.reduce((acc, num) => lcm(acc, num), 1);
}

function navigateAndCountStepsOptimized(instructions, mappings) {
  // Filter out all keys ending with 'A' as starting points    
  let current = Object.keys(mappings).filter((key) => key.endsWith('A'));
  let i = 0;
  
  // Initialize an array to store the loop lengths for each path.
  // The length of loopLengths array is the same as the number of paths in 'current'.
  const loopLengths = new Array(current.length).fill(null);
  
  while (!loopLengths.every(Boolean)) {
    for (let j = 0; j < current.length; j++) {
      if (loopLengths[j]) continue;

      const key = current[j];
      // If current node ends with 'Z', store the loop length
      if (key.endsWith('Z')) {
        loopLengths[j] = i;
        continue;
      }

      // Determine the current instruction (Left or Right) by cycling through the instructions array
      const instructionIndex = i % instructions.length;
      // 0 for Left, 1 for Right
      const direction = instructions[instructionIndex]; 
    
      // Update the current path based on the direction of the instruction
      const nextKey = mappings[key][direction];
      current[j] = nextKey;
    }
    i++;
  }
  
  // Compute least common multiple of all loop lengths
  return lcmOfSet(...loopLengths);
}

// Part 1
console.log("Steps to steps for Part 1: ", navigateAndCountSteps(parsedInput.instructions, parsedInput.mappings, 'AAA', 'ZZZ'));

// Part 2
console.log("Number of steps for Part 2: ", navigateAndCountStepsOptimized(parsedInput.instructions, parsedInput.mappings));
