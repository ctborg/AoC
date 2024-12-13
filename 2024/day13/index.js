function parseInput(input) {
    const machines = [];
    const blocks = input.trim().split("\n\n");

    for (const block of blocks) {
        const lines = block.split("\n");
        const [ax, ay] = lines[0].match(/X\+(\d+), Y\+(\d+)/).slice(1, 3).map(Number);
        const [bx, by] = lines[1].match(/X\+(\d+), Y\+(\d+)/).slice(1, 3).map(Number);
        const [px, py] = lines[2].match(/X=(\d+), Y=(\d+)/).slice(1, 3).map(Number);
        machines.push({ a: [ax, ay], b: [bx, by], p: [px, py] });
    }

    return machines;
}

function solveEquation(a, b, g, offset = 0) {
    g[0] += offset;
    g[1] += offset;

    const determinant = (a[0] * b[1]) - (b[0] * a[1]);
    const acnt = (b[1] * g[0]) - (b[0] * g[1]);
    const bcnt = (a[0] * g[1]) - (a[1] * g[0]);

    if (determinant === 0 || acnt % determinant !== 0 || bcnt % determinant !== 0) {
        return 0; // No valid solution
    }

    const acntSol = acnt / determinant;
    const bcntSol = bcnt / determinant;

    if (acntSol < 0 || bcntSol < 0) {
        return 0; // Negative solutions are not valid
    }

    return 3 * acntSol + bcntSol;
}

function solvePart(machines, offset = 0) {
    return machines.reduce((totalCost, machine) => {
        return totalCost + solveEquation(machine.a, machine.b, machine.p, offset);
    }, 0);
}

// Input as a string
const input = `
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`;

// Parse the input
const machines = parseInput(input);

// Calculate results
const part1 = solvePart(machines, 0); // No offset for part 1
const part2 = solvePart(machines, 10000000000000); // Large offset for part 2

console.log("Part 1:", part1);
console.log("Part 2:", part2);
