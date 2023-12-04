//input from problem1.js

almostEqual = (string1, string2) => {
  miss = 0;
  aStr1 = string1.split('');
  aStr1.forEach( (i,j) => {
    console.log(i, j);
    if(i !== string2.charAt(j)) {
      miss++;
      
    }
  })
  return miss > 1 ? false : true;
}


input.forEach((i) => {
  input.forEach((in2) => {
    console.log(almostEqual(i, in2))
  })
})
