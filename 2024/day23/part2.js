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

// 1. Build adjacency list (using a Map of computerName -> Set of neighbors)
const adjacencyList = new Map();

const addConnection = (a, b) => {
  adjacencyList.set(a, adjacencyList.get(a) ?? new Set()).get(a).add(b);
  adjacencyList.set(b, adjacencyList.get(b) ?? new Set()).get(b).add(a);
};

input.forEach(line => {
  const [compA, compB] = line.split("-");
  addConnection(compA, compB);
});

// Convert the adjacencyList keys into a sorted array so we always have a consistent order
const allComputers = Array.from(adjacencyList.keys()).sort();

// 2. Bron–Kerbosch algorithm to find maximum clique
let maxClique = [];
let maxCliqueSize = 0;

const bronKerbosch = (R, P, X) => {
  if (P.size === 0 && X.size === 0) {
    if (R.size > maxCliqueSize) {
      maxCliqueSize = R.size;
      maxClique = Array.from(R).sort();
    }
    return;
  }

  const pivot = [...P, ...X][0]; // Choose a pivot (first from P or X)
  const pivotNeighbors = adjacencyList.get(pivot) || new Set();

  [...P].filter(v => !pivotNeighbors.has(v)).forEach(v => {
    const neighborsV = adjacencyList.get(v) || new Set();

    bronKerbosch(
      new Set([...R, v]),
      new Set([...P].filter(n => neighborsV.has(n))),
      new Set([...X].filter(n => neighborsV.has(n)))
    );

    P.delete(v);
    X.add(v);
  });
};

// 3. Run Bron–Kerbosch to get the maximum clique
bronKerbosch(new Set(), new Set(allComputers), new Set());

// 4. The LAN party “password” is the names in the maximum clique, sorted and joined by commas
const password = maxClique.join(",");
console.log("Welcome to the LAN party:", password);
