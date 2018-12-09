class Graph {
    // defining vertex array and adjacent list
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.adjList = new Map();
        this.preReqs = new Map();
    }
  
    rootNode() {
      return this.preReqs.keys().next().value
    }
    
    addVertex(v) {
        // initialize the adjacent list with a null array
        this.adjList.set(v, []);
        this.preReqs.set(v, []);
    }
  
    addEdge(v, w) {
        // get the list for vertex v and put the vertex w denoting edge betweeen v and w
        this.adjList.get(v).push(w);
        // set preReqs
        this.preReqs.get(w).push(v);
    }
    
    bfs(startingNode) {
      // shallow breadth first search, only adjacent nodes
      return {
        children: this.adjList.get(startingNode),
        prereq: this.preReqs.get(startingNode),
      }
    }
}

class Queue
{
    // Array is used to implement a Queue
    constructor() {
        this.items = [];
    }

    enqueue(i) {
        // adding element to the queue
        typeof i === 'object' ? this.items.push(...i) : this.items.push(i)
    }
    
    insert(i){
      typeof i === 'object' ? this.items.unshift(...i) : this.items.unshift(i)
    }
    
    dequeue() {
        // removing element from the queue returns underflow if empty
        return this.isEmpty() ? new Error("underflow") : this.items.shift()
    }
    

    front() {
        // returns the Front element of the queue without removing it.
        return this.isEmpty() ? new Error("empty queue") : this.items[0]
    }
    
    isEmpty() {
        // return true if the queue is empty.
        return !Boolean(this.items.length);
    }
 
}


input = ["Step C must be finished before step A can begin.","Step C must be finished before step F can begin.","Step A must be finished before step B can begin.","Step A must be finished before step D can begin.","Step B must be finished before step E can begin.","Step D must be finished before step E can begin.","Step F must be finished before step E can begin."]

parseInput = (i) => i.match(/(Step \w)|step \w/g).map(i=>i.replace(/(step| )/gi,''))

holdArray = [];
input.forEach(i=>holdArray.push(parseInput(i)))

vertices = new Set(holdArray.flat());

g = new Graph(vertices.size);

vertices.forEach(i => g.addVertex(i) );

input.forEach(i=>g.addEdge(...parseInput(i)))

answer = new Set();
queue = new Queue();

//find nodes with no prereqs
noReqs=[]
holdArray.forEach(i=>{
  if(!g.bfs(i[0]).prereq.length){
    noReqs.push(i[0])
  }
});

queue.enqueue(new Set(noReqs));

nextNode = queue.front();

while(!queue.isEmpty()) {
  // go to first child,
  result = g.bfs(nextNode);
  prereqs = result.prereq;
  missingPreReqs=[]

  // if prereqs not comleted, remove from queue
  prereqs.forEach(i => {
    if (!answer.has(i)){
      missingPreReqs.push(true)
    };
  })
 
  if(missingPreReqs.length){
    queue.dequeue();
    nextNode = queue.front();
  } else {
    answer.add(queue.dequeue());
    // get children, add to queue, sort
    queue.insert(result.children);
    queue.items.sort();
    nextNode = queue.front();
  }
  
}

console.log([...answer].join(''));
