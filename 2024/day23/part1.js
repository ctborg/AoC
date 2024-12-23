const rawInput = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

const input = rawInput.split('\n');

// 1. Build adjacency list
const adjacencyList = new Map();

const addConnection = (a, b) => {
  if (!adjacencyList.has(a)) adjacencyList.set(a, new Set());
  if (!adjacencyList.has(b)) adjacencyList.set(b, new Set());
  adjacencyList.get(a).add(b);
  adjacencyList.get(b).add(a);
};

for (const line of input) {
  const [compA, compB] = line.split('-');
  addConnection(compA, compB);
}

// 2. Find all triangles (sets of 3 where each is connected to the other two)
const triangles = new Set();

const computers = [...adjacencyList.keys()].sort();

for (let i = 0; i < computers.length; i++) {
  for (let j = i + 1; j < computers.length; j++) {
    for (let k = j + 1; k < computers.length; k++) {
      const a = computers[i];
      const b = computers[j];
      const c = computers[k];

      // Check if a, b, c form a complete triangle
      if (
        adjacencyList.get(a).has(b) &&
        adjacencyList.get(b).has(c) &&
        adjacencyList.get(a).has(c)
      ) {
        // Store as a sorted tuple-like string to avoid duplicates
        const sortedTriple = [a, b, c].sort().join(',');
        triangles.add(sortedTriple);
      }
    }
  }
}

// 3. Filter to find sets containing at least one computer starting with 't'
const trianglesWithT = [...triangles].filter(triple => {
  const parts = triple.split(',');
  return parts.some(name => name.startsWith('t'));
});

console.log(`Number of 3 connected computers starting with 't': ${trianglesWithT.length}`);
