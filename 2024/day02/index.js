function countSafeReports(data) {
    // Helper function to check if the levels are all increasing or decreasing
    function isSafeReport(levels) {
        let increasing = true;
        let decreasing = true;

        for (let i = 1; i < levels.length; i++) {
            let difference = levels[i] - levels[i - 1];
            if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
                return false; // Difference not within 1 to 3
            }
            if (difference > 0) {
                decreasing = false; // Not decreasing
            } else if (difference < 0) {
                increasing = false; // Not increasing
            }
        }

        return increasing || decreasing; // Must be strictly increasing or decreasing
    }

    let safeCount = 0;

    // Process each report
    for (const report of data) {
        const levels = report.split(" ").map(Number); // Convert to numbers
        if (isSafeReport(levels)) {
            safeCount++;
        }
    }

    return safeCount;
}

let input = fetchInputByDay(2);

const exampleData = input.split('\n');

// Analyze the data
const safeReportsPart1 = countSafeReports(exampleData);
console.log(`Number of safe reports: ${safeReportsPart1}`);

function countSafeReportsWithDampener(data) {
    // Helper function to check if the levels are all increasing or decreasing
    function isSafeReport(levels) {
        let increasing = true;
        let decreasing = true;

        for (let i = 1; i < levels.length; i++) {
            let difference = levels[i] - levels[i - 1];
            if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
                return false; // Difference not within 1 to 3
            }
            if (difference > 0) {
                decreasing = false; // Not decreasing
            } else if (difference < 0) {
                increasing = false; // Not increasing
            }
        }

        return increasing || decreasing; // Must be strictly increasing or decreasing
    }

    // Helper function to check if the report can be made safe by removing one level
    function canBeMadeSafe(levels) {
        for (let i = 0; i < levels.length; i++) {
            const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1)); // Remove one level
            if (isSafeReport(modifiedLevels)) {
                return true; // Found a way to make it safe
            }
        }
        return false; // Cannot make it safe
    }

    let safeCount = 0;

    // Process each report
    for (const report of data) {
        const levels = report.split(" ").map(Number); // Convert to numbers
        if (isSafeReport(levels) || canBeMadeSafe(levels)) {
            safeCount++;
        }
    }

    return safeCount;
}

// Analyze the data with the Problem Dampener
const safeReportsPart2 = countSafeReportsWithDampener(exampleData);
console.log(`Number of safe reports with Problem Dampener: ${safeReportsPart2}`);
