let input = process.env.AOC_INPUT;

function parseInput(input) {
    let sequences = [];
    let lines = input.split('\n');

    for (let line of lines) {
        let numbers = line.split(' ').map(num => parseInt(num));
        sequences.push(numbers);
    }

    return sequences;
}

// Function to calculate the first extrapolated number of a sequence
function firstNumber(sequence) {
    let currentSeq = sequence;
    let diffSequences = [];

    // Create sequences of differences until all elements are zeroes
    while (!allZeroes(currentSeq) && currentSeq.length > 1) {
        let newSeq = [];
        // Calculate the difference between consecutive elements
        for (let i = 1; i < currentSeq.length; i++) {
            newSeq.push(currentSeq[i] - currentSeq[i - 1]);
        }
        // Unshift adds the new sequence at the beginning of the array
        diffSequences.unshift(newSeq);
        currentSeq = newSeq;
    }
    
    // Add the original sequence to the array of difference sequences
    diffSequences.push(sequence);
    
    // Backtrack to calculate the first value
    let firstValue = diffSequences[0][0];
    // Iterate through the difference sequences
    for (let i = 1; i < diffSequences.length; i++) {
        // Use the first element of each sequence to extrapolate backwards
        firstValue = (firstValue * -1) + diffSequences[i][0];
    }
    
    return firstValue;
}

function nextNumber(sequence) {
    let diffSequences = [sequence];

    // Create sequences of differences
    while (!allZeroes(diffSequences[diffSequences.length - 1])) {
        let currentSeq = diffSequences[diffSequences.length - 1];
        let newSeq = [];
        for (let i = 1; i < currentSeq.length; i++) {
            newSeq.push(currentSeq[i] - currentSeq[i - 1]);
        }
        diffSequences.push(newSeq);
    }
    
    // Backtrack to calculate the next value
    let nextValue = sequence[sequence.length - 1];
    let returnvalue = [];

    for (let i = diffSequences.length - 2; i >= 0; i--) {
        nextValue += diffSequences[i][diffSequences[i].length - 1];
        returnvalue.push(nextValue)
    }
    
    return returnvalue[returnvalue.length - 2];
}

function sumExtrapolatedValues(sequences) {
    let sum = 0;
    sequences.forEach(seq => {
        sum += nextNumber(seq);
    });
    return sum;
}

function allZeroes(arr) {
    return arr.every(num => num === 0);
}

function sumOfFirstNumbers(sequences) {
    return sequences.reduce((sum, seq) => sum + firstNumber(seq), 0);
}

// Test the function with provided sequences
let sequences = parseInput(input)

// Part 1

console.log(`Sum of next extrapolated numbers: ${sumExtrapolatedValues(sequences)}`);

// Part 2
console.log(`Sum of first extrapolated numbers: ${sumOfFirstNumbers(sequences)}`);
