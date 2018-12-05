count = 0;
fabric = new Array(1000).fill(0)
fabric.forEach((i, j)=>{fabric[j] = new Array(1000).fill(0)})

const parseDims = (input) => {
  x = input.split(' ');
  dims = x[2].split(',');
  area = x[3].split('x');

  return {
    xdim: parseInt(dims[0], 10),
    ydim: parseInt(dims[1], 10),
    xarea: parseInt(area[0], 10),
    yarea: parseInt(area[1], 10)
  }
}

inputs.forEach((input,c) => {
  let dims = parseDims(input);
  for (var i = 0; i < dims.xarea; i++) {
    for (var k = 0; k < dims.yarea; k++) {
      if (fabric[dims.xdim + i][dims.ydim + k]) {
        fabric[dims.xdim + i][dims.ydim + k] = fabric[dims.xdim + i][dims.ydim + k] + 1;
      } else {
        fabric[dims.xdim + i][dims.ydim + k] = 1
      }
    }
  }
});

// Could move this to the above loop.
fabric.forEach(f => {
  f.forEach(k=>{
    if (k > 1) {
      count = count + 1;
    }
  })
});
