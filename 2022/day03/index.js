const input = document.querySelector('pre').innerHTML;
const rucksacks = input.trim().split('\n');
const abc = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// part 1

const duplicates = rucksacks
  .map(sack => {
    const h1 = sack.slice(0, sack.length / 2).split('');
    const h2 = sack.slice(-sack.length / 2).split('');
    return h1.find(l => h2.includes(l));
  })
  .reduce((acc, i) => acc + abc.indexOf(i), 0);

console.log(duplicates);

// part 2

const groups = [];
for (let i = 0; i < rucksacks.length; i += 3) {
  groups.push(rucksacks.slice(i, i + 3));
}

const badges = groups
  .map(sack => {
    const r1 = sack[0].split('');
    const r2 = sack[1].split('');
    const r3 = sack[2].split('');
    return r1
      .filter(i => r2.includes(i))
      .filter(i => r3.includes(i))[0];
  })
  .reduce((acc, i) => acc + abc.indexOf(i), 0);

console.log(badges);
