//CHATGPT prompted code

function extractAndSumCalibrationValues(lines) {
    const digitMap = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    };

    function replaceSpelledNumbers(line) {
        let tempLine = "";
        for (let i = 0; i < line.length; i++) {
            let matched = false;
            for (const [spelledDigit, digit] of Object.entries(digitMap)) {
                if (line.startsWith(spelledDigit, i)) {
                    tempLine += digit;
                    i += spelledDigit.length - 1;
                    matched = true;
                    break;
                }
            }
            if (!matched && !isNaN(parseInt(line[i]))) {
                tempLine += line[i];
            }
        }
        return tempLine;
    }

    let totalSum = 0;

    lines.forEach(line => {
        const numericalLine = replaceSpelledNumbers(line);
        const digits = numericalLine.match(/\d/g);

        if (digits && digits.length >= 2) {
            const firstDigit = digits[0];
            const lastDigit = digits[digits.length - 1];
            totalSum += parseInt(firstDigit + lastDigit);
        }
    });

    return totalSum;
}

// Testing with the provided lines
const result1 = extractAndSumCalibrationValues(["4nineeightseven2"]);
const result2 = extractAndSumCalibrationValues(["eightwothree"]);
const result3 = extractAndSumCalibrationValues(["7pqrstsixteen"]);
console.log("4nineeightseven2:", result1);  // Expected output: 42
console.log("eightwothree:", result2);      // Expected output: 83
console.log("7pqrstsixteen:", result3);     // Expected output: 76
