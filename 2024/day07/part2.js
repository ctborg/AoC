const data = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const input = data.split('\n');

function evaluateExpression(numbers, ops) {
  // Evaluate the expression left-to-right
  let currentVal = numbers[0];
  
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const nextNum = numbers[i + 1];
    if (op === '+') {
      currentVal = currentVal + nextNum;
    } else if (op === '*') {
      currentVal = currentVal * nextNum;
    } else if (op === '||') {
      // Concatenate the numbers as strings, then convert back to number
      currentVal = Number(String(currentVal) + String(nextNum));
    }
  }

  return currentVal;
}

function* generateOperators(count) {
  // Generate all sequences of '+', '*', and '||' of length count
  const ops = ['+', '*', '||'];
  if (count === 0) {
    yield [];
    return;
  }

  for (const first of ops) {
    for (const rest of generateOperators(count - 1)) {
      yield [first, ...rest];
    }
  }
}

let sumOfMatches = 0;

for (const line of input) {
  const [targetPart, numbersPart] = line.split(":");
  const target = parseInt(targetPart.trim(), 10);
  const numbers = numbersPart.trim().split(" ").map(Number);

  const operatorSlots = numbers.length - 1;
  let canMatch = false;

  for (const ops of generateOperators(operatorSlots)) {
    const val = evaluateExpression(numbers, ops);
    if (val === target) {
      canMatch = true;
      break;
    }
  }

  if (canMatch) {
    sumOfMatches += target;
  }
}

console.log(sumOfMatches);
