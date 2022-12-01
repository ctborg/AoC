let input = document.querySelector('pre').innerHTML;

input = input.split('\n\n').map(i => i.split('\n'));

let calories = input.map((i) => {
  return i.reduce((j, k) => Number(j) + Number(k));
})

// part 1
console.log(Math.max(...calories));

//part 2
console.log(
  calories
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((j, k) => Number(j) + Number(k));
)
