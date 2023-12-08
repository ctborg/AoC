let input = process.env.AOC_INPUT;

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


// Part 1
const steps = navigateAndCountSteps(parsedInput.instructions, parsedInput.mappings, 'AAA', 'ZZZ');
console.log(`Steps to reach ZZZ: ${steps}`);
