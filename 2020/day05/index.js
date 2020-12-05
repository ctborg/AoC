let day = 5;

let fetchInput = async () => {
  let resp = await fetch(`https://adventofcode.com/2020/day/${day}/input`);
  return resp.text();
}

let input = await fetchInput();

// Swap seats to binary string.  Treats F and L as 0, B,R as 1;
input = input.replace(/[FL]/g, '0').replace(/[BR]/g, '1');

// Convert binary string to binary number
let parser = i => i.trim().split('\n').map(j => parseInt(j, 2));

// grab max val in array
let part1 = i => Math.max(...parser(i));

console.log(part1(input));

let part2 = i => {
    // sort seats
    let sortedSeats = parser(i).sort((a, b) => a - b);
    // find missing seats. Assume next seat should increment by one (full airplane), if not it's empty.
    let missingSeats = sortedSeats.filter((seat, j) => seat + 1 != sortedSeats[j + 1]);
    // grab the first missing seat.
    return missingSeats[0] + 1;
}

console.log(part2(input));
