let input = process.env.AOC_INPUT;

class Digger {
    constructor() {
        // Initialize starting position and storage for trench coordinates and perimeter
        this.x = 0;
        this.y = 0;
        this.coords = []; // Store trench path as coordinates
        this.perimeter = 0; // Count steps to calculate perimeter
        this.addCoord(); // Add initial position
    }

    addCoord() {
        // Store the current coordinate in the path
        this.coords.push([this.x, this.y]);
    }

    move(direction, distance) {
        // Move the digger in the specified direction and distance
        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case 'U': this.y++; break; // Up
                case 'D': this.y--; break; // Down
                case 'L': this.x--; break; // Left
                case 'R': this.x++; break; // Right
                default: throw new Error('Invalid direction');
            }
            this.perimeter++; // Increment the perimeter count
        }
        this.addCoord(); // Add new position after movement
    }

    calculatePolygonArea() {
        // Calculate the area of the polygon (trench path) using the Shoelace theorem
        let area = 0;
        for (let i = 0; i < this.coords.length; i++) {
            let j = (i + 1) % this.coords.length; // Next vertex index (wrap around)
            area += this.coords[i][0] * this.coords[j][1];
            area -= this.coords[j][0] * this.coords[i][1];
        }
        return Math.abs(area / 2); // Absolute value of half the computed area
    }

    calculateArea() {
        // Calculate the total area including the adjustment for the border
        const area = this.calculatePolygonArea();
        return area + ((this.perimeter / 2) + 1); // Add adjustment for half-square-wide border
    }
}

function executeDigPlan(plan) {
    // Parse the input plan and execute it using a Digger instance
    const digger = new Digger();
    plan.split('\n').forEach(line => {
        // Extract distance and direction from each line's hex code
        const hexCode = line.match(/\(#([0-9a-fA-F]{6})\)/)[1];
        const distance = parseInt(hexCode.slice(0, 5), 16); // First 5 digits: distance
        const directionCode = parseInt(hexCode.charAt(5), 16); // Last digit: direction

        // Convert direction code to a direction string
        let direction;
        switch (directionCode) {
            case 0: direction = 'R'; break; // Right
            case 1: direction = 'D'; break; // Down
            case 2: direction = 'L'; break; // Left
            case 3: direction = 'U'; break; // Up
            default: throw new Error('Invalid direction code');
        }

        digger.move(direction, distance); // Move the digger accordingly
    });

    // Calculate and output the total area
    const area = digger.calculateArea();
    console.log("Calculated area:", area);
}

// Part 2
executeDigPlan(input);
