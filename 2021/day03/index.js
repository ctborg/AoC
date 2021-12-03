let day = 3;

let fetchInput = async () => {
  let resp = await fetch(`https://adventofcode.com/2021/day/${day}/input`);
  return resp.text();
}

let input = await fetchInput();

let parse = (i) => {
  return i.trim().split(/\r?\n/);
}

