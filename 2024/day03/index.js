// Part 1
function calculateValidMultiplications(corruptedMemory) {
    // Regular expression to find valid mul(X,Y) instructions
    const validMulPattern = /mul\((\d+),(\d+)\)/g;
    let match;
    let totalSum = 0;

    // Iterate over all matches of the pattern
    while ((match = validMulPattern.exec(corruptedMemory)) !== null) {
        const x = parseInt(match[1], 10); // First number in mul(X,Y)
        const y = parseInt(match[2], 10); // Second number in mul(X,Y)
        totalSum += x * y; // Multiply and add to the total sum
    }

    return totalSum;
}

// Example corrupted memory input
const sampleCorruptedMemory = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`;

const total = calculateValidMultiplications(sampleCorruptedMemory);
console.log("Total sum of valid multiplications:", total);

// Part 2
function calculateEnabledMulSum(input) {
  let enabled = true; // Initially, mul instructions are enabled
  let totalSum = 0;

  // Regular expression to match instructions
  const instructionRegex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;
  let match;

  while ((match = instructionRegex.exec(input)) !== null) {
    if (match[0] === "do()") {
      enabled = true; // Enable mul instructions
    } else if (match[0] === "don't()") {
      enabled = false; // Disable mul instructions
    } else if (match[0].startsWith("mul(") && enabled) {
      const operand1 = parseInt(match[1], 10);
      const operand2 = parseInt(match[2], 10);
      totalSum += operand1 * operand2; // Add the product to the total sum
    }
  }

  return totalSum;
}

const result = calculateEnabledMulSum(corruptedMemory);

console.log("Sum of enabled mul instructions:", result);
