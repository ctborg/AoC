let input = process.env.AOC_INPUT

// Splitting the input into separate lines for each workflow.
input = input.split('\n');

// WorkflowProcessor class to handle the workflows and counting logic.
class WorkflowProcessor {
    constructor(workflows) {
        this.workflows = new Map();
        this.parseWorkflows(workflows);
    }

    // Parses the workflow rules and stores them in a map for easy access.
    parseWorkflows(workflows) {
        for (let i = 0; i < workflows.length; i++) {
            const line = workflows[i].match(/(\w+)\{(.+)\}/);
            const rules = line[2].split(",").map(x => x.split(":"));
            this.workflows.set(line[1], rules);
        }
    }

    // Initiates the counting process to determine the number of accepted combinations.
    countAcceptedCombinations() {
        return this.count('in', { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] });
    }

    // Recursive function to count accepted combinations based on the current rule and part state.
    count(rule, part) {
        // If the rule is 'A', calculate the product of the ranges.
        if (rule === "A") {
            return (part.x[1] - part.x[0] + 1) * (part.m[1] - part.m[0] + 1) * (part.a[1] - part.a[0] + 1) * (part.s[1] - part.s[0] + 1);
        } else if (rule === "R") {
            // If the rule is 'R', return 0 as the combination is rejected.
            return 0;
        }

        // Fetch the set of rules for the current workflow.
        let rules = this.workflows.get(rule);
        let count = 0;
        for (const dd of rules) {
            // Handle the case where the rule leads directly to another workflow or an outcome.
            if (dd.length === 1) {
                count += this.count(dd[0], part);
            } else {
                // Splitting the range based on the condition in the rule.
                let n = parseInt(dd[0].substring(2));
                let ra = part[dd[0][0]];
                let left, right;

                // Adjusting the range based on the condition (less than or greater than).
                if (dd[0][1] === "<") {
                    left = ra[0];
                    right = n - 1;
                    part[dd[0][0]][0] = n;
                } else {
                    left = n + 1;
                    right = ra[1];
                    part[dd[0][0]][1] = n;
                }

                // Creating a new part state with updated ranges.
                let newPart = { x: part.x.slice(), m: part.m.slice(), a: part.a.slice(), s: part.s.slice() };
                newPart[dd[0][0]] = [left, right];
                count += this.count(dd[1], newPart);
            }
        }
        return count;
    }
}

// Create an instance of WorkflowProcessor and calculate the total number of accepted combinations.
const processor = new WorkflowProcessor(input);
console.log(`Total Accepted Combinations: ${processor.countAcceptedCombinations()}`);
