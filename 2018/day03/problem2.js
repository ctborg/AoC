//fabric from problem1

inputs.forEach((input,c) => {
  let dims = parseDims(input);
  for (var i = 0; i < dims.xarea; i++) {
    for (var k = 0; k < dims.yarea; k++) {
      if (fabric[dims.xdim + i][dims.ydim + k] > 1) {
        dims.id = null;
        break;
      }
    }
    if(!dims.id){break;}
  }
  if (dims.id) {
    winner = dims.id;
  }
})
