let day = 6;

let fetchInput = async () => {
  let resp = await fetch(`https://adventofcode.com/2020/day/${day}/input`);
  return resp.text();
}

let input = await fetchInput();

let parser = i => i.trim().split('\n\n');

let part1 = i => {
  let count = 0;

  parser(i).forEach( j => {
   let vals = {};
   // strip out newlines, store in hash
   j.replace(/\n/g,'').split('').forEach(k => vals[k] = null);
   count += Object.keys(vals).length;
  })

  return count;
}

part1(input);

let part2 = i => {
  let count = 0;

  parser(i).forEach( j => {
    let vals = {};
    peeps = j.split('\n').forEach(peep => {
      // store the count of each answer
      peep.split('').forEach(k => vals[k] = vals[k] ? vals[k] + 1 : 1);
    });
    // filter out answers that don't match number of peeps answering.
    count += Object.entries(vals).filter(i => i[1] == peeps.length).length;
  })

  return count;
}

part2(input);
