let day = 3;

let fetchInput = async () => {
  let resp = await fetch(`https://adventofcode.com/2020/day/${day}/input`);
  return resp.text();
}

let input = await fetchInput();

let parse = (i) => {
  return i.trim().split(/\r?\n/);
}

let checkIfTreeHit = (i, [right, down]) => {
    let x = 0, y = 0, trees = 0;
    let height = i.length;
    let width = i[0].length;
    
    while((y += down) < height) {
        x += right;
        let row = x % width;
        if (i[y].charAt(row) == '#') {
          trees++;
        }
    }

    return trees;
}

let part1 = (i) => {
    return checkIfTreeHit(parse(i), [3, 1])
}

console.log(part1);

let part2 = (i) => {
    let parsedInput = parse(i);
    let slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
    
    return slopes.reduce((total, slope) => {
      return total * checkIfTreeHit(parsedInput, slope);
    }, 1);
}

console.log(part2);
