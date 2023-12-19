const input = process.env.AOC_INPUT;

class PartsSorter {
    constructor(workflows) {
        this.workflows = this.parseWorkflows(workflows);
    }

    parseWorkflows(workflows) {
        let parsed = {};
        workflows.forEach(workflow => {
            const [name, rulesStr] = workflow.split('{');
            const rules = rulesStr.slice(0, -1).split(',').map(rule => {
                const [condition, destination] = rule.includes(':') ? rule.split(':') : [null, rule];
                return { condition, destination };
            });
            parsed[name] = rules;
        });
        return parsed;
    }

    sortPart(part, workflowName) {
        if (!this.workflows[workflowName]) {
            return { status: 'Workflow Not Found', sum: 0 };
        }

        const rules = this.workflows[workflowName];
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            if (!rule.condition || this.evaluateRule(part, rule.condition)) {
                if (rule.destination === 'R') {
                    return { status: 'Rejected', sum: 0 };
                } else if (rule.destination === 'A') {
                    const sum = Object.values(part).reduce((a, b) => a + b, 0);
                    return { status: 'Accepted', sum: sum };
                } else {
                    return this.sortPart(part, rule.destination); // Recursive call for another workflow
                }
            }
        }
        return { status: 'No Matching Rule', sum: 0 };
    }


    evaluateRule(part, condition) {
        if (!condition) return true; // Automatically true for rules without conditions
        const [key, operator, value] = condition.match(/([xmas])([><]=?)(\d+)/).slice(1);
        const partValue = part[key];
        switch (operator) {
            case '>': return partValue > Number(value);
            case '<': return partValue < Number(value);
            case '>=': return partValue >= Number(value);
            case '<=': return partValue <= Number(value);
            default: return false;
        }
    }
}

function parseInput(input) {
    const [workflowsSection, partsSection] = input.split('\n\n');

    // Parse Workflows
    const workflows = workflowsSection.split('\n');
    
    // Parse Parts
    const parts = partsSection.split('\n').map(part => {
        const values = part.match(/\{(.+?)\}/)[1].split(',');
        let parsedPart = {};
        values.forEach(value => {
            const [key, val] = value.split('=');
            parsedPart[key] = parseInt(val);
        });
        return parsedPart;
    });

    return { workflows, parts };
}

const { workflows, parts } = parseInput(input);
const sorter = new PartsSorter(workflows);

let totalSum = 0;
parts.forEach(part => {
    const result = sorter.sortPart(part, 'in');
    if (result.status === 'Accepted') {
        totalSum += result.sum;
    }
});

console.log(`Total Sum of Accepted Parts: ${totalSum}`);
