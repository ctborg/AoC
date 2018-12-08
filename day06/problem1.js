mdist = (x1,y1,x2,y2) =>
{
    return Math.abs(x2-x1) + Math.abs(y2-y1);
}

dist = (cord1, cord2) => {
  return mdist(...cord1, ...cord2)
}

compare = (a1,a2) => JSON.stringify(a1) === JSON.stringify(a2);



//Set Max dist
maxDim = Math.max(...input.flat()) + 1;

// Create ArrayMap
// find edges of ArrayMap by locating the 4 points that are max
// e.g. lowest x and lowest y
// highest x and lowest y
// lowest x and highest y
// highest y and highest y


aMap = new Array(maxDim).fill('.');
aMap.forEach((i,j)=>{aMap[j] = new Array(maxDim).fill('.')})

// plot co-ords
input.forEach((i,j) => {
  aMap[i[0]][i[1]] = String.fromCharCode(65 + j);
})

holdArray=[];

// forEach spot on ArrayMap calculate dist for each coord
aMap.forEach((i,j) => {
  i.forEach((k,l) => {
    holdMap = [];
    
    input.forEach((m,n) => {
      holdMap.push( [dist([j,l],m),String.fromCharCode(65 + n)]);
    });
    
    // if dist is lowest, plot IDist of spot
    holdMap.sort((a,b) => a[0] - b[0]);

    if (holdMap[0][0] > 0) {
      // if dist is tied, plot '.', otherwise plot ID
      aMap[j][l] = holdMap[0][0] == holdMap[1][0] ? '.' : holdMap[0][1];
    }
    
  })
})
maxX = aMap[0].length - 1
maxY = aMap.length - 1

// four corners at the elements that need to be removed.
lX = aMap[0][0];
gX = aMap[maxX][0];
lY = aMap[0][maxX];
gY = aMap[maxX][maxX];

// count plots that are not one of the 4 corners
re = new RegExp(`${lX}|${gX}|${lY}|${gY}|[.]`);
countMap = {}

aMap.forEach((i,j) => {
  i.forEach((k,l) => {
    if (!aMap[j][l].match(re)) {
      
      countMap[aMap[j][l]] = countMap[aMap[j][l]] ? countMap[aMap[j][l]] + 1 : 1;
    }
  })
})
// Find remaining highest dist.
console.log(Math.max(...Object.values(countMap)))
