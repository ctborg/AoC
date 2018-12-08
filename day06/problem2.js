input = [[1, 1],
[1, 6],
[8, 3],
[3, 4],
[5, 5],
[8, 9]]

mdist = (x1,y1,x2,y2) =>
{
    return Math.abs(x2-x1) + Math.abs(y2-y1);
}

dist = (cord1, cord2) => {
  return mdist(...cord1, ...cord2)
}

compare = (a1,a2) => JSON.stringify(a1) === JSON.stringify(a2);

moneyNumber = 10000;

//Set Max dist
maxDim = Math.max(...input.flat()) + 1;

//Fill array.
aMap = new Array(maxDim).fill('.');
aMap.forEach((i,j)=>{aMap[j] = new Array(maxDim).fill('.')})

// plot co-ords
input.forEach((i,j) => {
  aMap[i[0]][i[1]] = String.fromCharCode(65 + j);
})

holdArray=[];
holdCount=0
// forEach spot on ArrayMap calculate dist for each coord
aMap.forEach((i,j) => {
  i.forEach((k,l) => {
    holdMap = [];
    
    input.forEach((m,n) => {
      holdMap.push( dist([j,l],m));
    });
    
  
    if (holdMap.reduce((total, curr)=>total+curr) < moneyNumber) {
      // add count
      holdCount += 1;
    }
    
  })
})

console.log(holdCount);
