let day = 1;

let fetchInput = async () => {
  let resp = await fetch(`https://adventofcode.com/2022/day/${day}/input`);
  return resp.text();
}

let input = await fetchInput();

let parse = (i) => {
  return data.split("\n");
}
