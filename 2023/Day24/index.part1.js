const input = process.env.AOC_INPUT;

class Hailstone {
    constructor(px, py, vx, vy) {
        this.px = px;
        this.py = py;
        this.vx = vx;
        this.vy = vy;
    }
}

function parseInput(input) {
    return input.split('\n').map(line => {
        const parts = line.split(' @ ');
        const position = parts[0].split(', ').map(Number);
        const velocity = parts[1].split(', ').map(Number);
        return new Hailstone(position[0], position[1], velocity[0], velocity[1]);
    });
}

function isInTestArea(x, y) {
    const minBound = 200000000000000;
    const maxBound = 400000000000000;
    return x >= minBound && x <= maxBound && y >= minBound && y <= maxBound;
}

function findIntersection(h1, h2) {
    const denominator = (h1.vx * h2.vy - h1.vy * h2.vx);

    if (denominator === 0) {
        return false; // Parallel paths, no intersection
    }

    const t = ((h2.px - h1.px) * h2.vy - (h2.py - h1.py) * h2.vx) / denominator;
    const s = ((h1.px - h2.px) * h1.vy - (h1.py - h2.py) * h1.vx) / denominator;

    if (t >= 0 && s >= 0) {
        const intersectX = h1.px + t * h1.vx;
        const intersectY = h1.py + t * h1.vy;

        if (isInTestArea(intersectX, intersectY)) {
            return true;
        }
    }

    return false;
}

function countIntersectingPaths(input) {
    const hailstones = parseInput(input);
    let count = 0;

    for (let i = 0; i < hailstones.length; i++) {
        for (let j = i + 1; j < hailstones.length; j++) {
            if (findIntersection(hailstones[i], hailstones[j])) {
                count++;
            }
        }
    }

    return count;
}

console.log(countIntersectingPaths(input));
