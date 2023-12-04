
// Test the function with the given example
let input = process.env.AOC_INPUT;
input = input.split('\n');
input = input.map((i) => {return i.split(': ')[1]});

// part 1
function calculateTotalCards1(cards) {
    let cardCopies = Array(cards.length).fill(1); // Start with one copy of each card

    function calculateMatches(card) {
        let [winningNumbers, yourNumbers] = card.split(" | ").map(list => 
            list.split(" ")
                .map(Number)
                .filter(number => number)
        );

        let matches = 0;
        yourNumbers.forEach(number => {
            if (winningNumbers.includes(number)) {
                matches++;
            }
        });

        return matches;
    }

    for (let i = 0; i < cards.length; i++) {
        let matches = calculateMatches(cards[i]);
        for (let j = 1; j <= matches && (i + j) < cards.length; j++) {
            cardCopies[i + j] += cardCopies[i];
        }
    }

    // Sum all copies to get the total number of scratchcards
    return cardCopies.reduce((acc, val) => acc + val, 0);
}

console.log("Total Scratchcards: ", calculateTotalCards1(input));

// Part 2

function calculateTotalCards2(cards) {
    let cardCopies = Array(cards.length).fill(1); // Start with one copy of each card

    function calculateMatches(card) {
        let [winningNumbers, yourNumbers] = card.split(" | ").map(list => 
            list.split(" ")
                .map(Number)
                .filter(number => number)
        );

        let matches = 0;
        yourNumbers.forEach(number => {
            if (winningNumbers.includes(number)) {
                matches++;
            }
        });

        return matches;
    }

    for (let i = 0; i < cards.length; i++) {
        let matches = calculateMatches(cards[i]);
        for (let j = 1; j <= matches && (i + j) < cards.length; j++) {
            cardCopies[i + j] += cardCopies[i];
        }
    }

    // Sum all copies to get the total number of scratchcards
    return cardCopies.reduce((acc, val) => acc + val, 0);
}


console.log("Total Scratchcards: ", calculateTotalCards2(input));
