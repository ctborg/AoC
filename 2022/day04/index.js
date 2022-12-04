let input = document.querySelector('pre').innerHTML;
input = input.trim().split('\n');

const parsedInput = input
    .map((item) =>
      item
        .split(",")
        .map((item) => item.split("-").map((item) => Number(item)))
    );

//part 1

const fullOverlap =
    parsedInput
    .filter(
      ([[firstStart, firstEnd], [secondStart, secondEnd]]) =>
        (firstStart <= secondStart && firstEnd >= secondEnd) ||
        (firstStart >= secondStart && firstEnd <= secondEnd)
    ).length;

console.log(fullOverlap);

//part 2

const partialOverlap =
    parsedInput
    .filter(
      ([[firstStart, firstEnd], [secondStart, secondEnd]]) =>
        (secondStart >= firstStart && secondStart <= firstEnd) ||
        (secondEnd >= firstStart && secondEnd <= firstEnd) ||
        (firstStart >= secondStart && firstStart <= secondEnd) ||
        (firstEnd >= secondStart && firstEnd <= secondEnd)
    ).length;

console.log(partialOverlap);
