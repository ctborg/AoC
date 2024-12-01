async function fetchInput(url) {
    try {
        // Fetch the content of the page
        const response = await fetch(url, { credentials: 'include' }); // Include cookies for authentication
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the text content
        const html = await response.text();

        // Create a DOM parser to extract the <pre> content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const preTag = doc.querySelector('pre'); // Select the <pre> tag
        if (!preTag) {
            throw new Error('No <pre> tag found on the page!');
        }

        // Get the text content of the <pre> tag
        const input = preTag.textContent.trim();
        console.log('Fetched Input:', input);

        return input;
    } catch (error) {
        console.error('Error fetching input:', error);
    }
}

// Example usage
const url = 'https://adventofcode.com/2024/day/1/input';
const input = fetchInput(url);

function calculateTotalDistance(leftList, rightList) {
    // Sort both lists in ascending order
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    // Initialize total distance
    let totalDistance = 0;

    // Calculate the distance for each pair
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

function splitIntoArrays(input) {
    // Split the input by newline to separate each pair
    const lines = input.trim().split('\n');
    
    // Initialize arrays for the left and right sides
    const leftArray = [];
    const rightArray = [];
    
    // Iterate over each line and split it into left and right parts
    lines.forEach(line => {
        const [left, right] = line.trim().split(/\s+/); // Split by whitespace
        leftArray.push(parseInt(left, 10));
        rightArray.push(parseInt(right, 10));
    });

    // Return the two arrays
    return { leftArray, rightArray };
}

const inputSplit = splitIntoArrays(input);

const leftList = inputSplit.leftArray;
const rightList = inputSplit.rightArray;

// Calculate the total distance
const result = calculateTotalDistance(leftList, rightList);

// Part 1 solution
console.log("Total Distance:", result);

function calculateSimilarityScore(leftList, rightList) {
    // Create a frequency map for the right list
    const frequencyMap = new Map();

    // Count the occurrences of each number in the right list
    rightList.forEach(num => {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    });

    // Calculate the similarity score
    let similarityScore = 0;
    leftList.forEach(num => {
        const frequency = frequencyMap.get(num) || 0; // Get the frequency or 0 if not found
        similarityScore += num * frequency;
    });

    return similarityScore;
}

// Calculate the similarity score
const result2 = calculateSimilarityScore(leftList, rightList);

// Part 2 solution
console.log("Similarity Score:", result2);






