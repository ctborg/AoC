const input = process.env.AOC_INPUT;

// Function to calculate a custom hash for a given string
function hashString(inputString) {
    let currentValue = 0;
    for (let i = 0; i < inputString.length; i++) {
        let asciiValue = inputString.charCodeAt(i);
        currentValue += asciiValue;
        currentValue *= 17;
        currentValue %= 256;
    }
    return currentValue;
}

// Function to manage the lenses in the boxes based on the input data
function manageLenses(inputData) {
    // Initialize 256 boxes, each represented as an array
    const boxes = new Array(256).fill(null).map(() => []);

    // Internal function to update a box based on the instruction
    const updateBox = (label, operation, focalLength = null) => {
        // Determine the box index using the hash function
        const boxIndex = hashString(label);
        // Find if the lens already exists in the box
        const lensIndex = boxes[boxIndex].findIndex(lens => lens.label === label);

        // Handle the remove operation ('-')
        if (operation === '-') {
            if (lensIndex !== -1) {
                boxes[boxIndex].splice(lensIndex, 1);
            }
        } 
        // Handle the add or replace operation ('=')
        else if (operation === '=') {
            if (lensIndex !== -1) {
                // Replace the existing lens with the new focal length
                boxes[boxIndex][lensIndex].focalLength = focalLength;
            } else {
                // Add a new lens to the box
                boxes[boxIndex].push({ label, focalLength });
            }
        }
    };

    // Split the input data into individual instructions and process each
    inputData.split(',').forEach(instruction => {
        let label, operation, focalLength = null;

        // Check if the instruction is an add/replace operation
        if (instruction.includes('=')) {
            [label, focalLength] = instruction.split('=');
            operation = '=';
            focalLength = parseInt(focalLength, 10);
        } else {
            // Otherwise, it's a remove operation
            label = instruction.slice(0, -1);
            operation = instruction.slice(-1);
        }

        // Update the boxes based on the parsed instruction
        updateBox(label, operation, focalLength);
    });

    return boxes;
}

// Function to calculate the total focusing power of all lenses in all boxes
function calculateFocusingPower(boxes) {
    let totalFocusingPower = 0;
    // Iterate through each box
    boxes.forEach((box, boxIndex) => {
        // Iterate through each lens in the box
        box.forEach((lens, slotIndex) => {
            // Calculate the focusing power for each lens
            const power = (boxIndex + 1) * (slotIndex + 1) * lens.focalLength;
            // Add to the total focusing power
            totalFocusingPower += power;
        });
    });
    return totalFocusingPower;
}

function parseAndHash(inputData) {
    const items = inputData.split(',');
    let sumOfHashes = 0;
    for (let item of items) {
        sumOfHashes += hashString(item);
    }
    return sumOfHashes;
}

// Part 1
console.log(parseAndHash(input));

// Part 2
const boxesAfterManagement = manageLenses(input);
const totalFocusingPower = calculateFocusingPower(boxesAfterManagement);
console.log(totalFocusingPower); 
