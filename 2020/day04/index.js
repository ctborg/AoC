let day = 4;

let fetchInput = async () => {
  let resp = await fetch(`https://adventofcode.com/2020/day/${day}/input`);
  return resp.text();
}

let input = await fetchInput();


let parser = (input) => {
  // split on blank lines
  let input_array = input.trim().split('\n\n')
  // turn into single line
  return input_array.map(i => i.replace(/\n/g, ' '));
}


let part1 = (input) => {
    return parser(input).filter((i) =>
        i.match('byr:') &&
        i.match('iyr:') &&
        i.match('eyr:') &&
        i.match('hgt:') &&
        i.match('hcl:') &&
        i.match('ecl:') &&
        i.match('pid:')).length
}

console.log(part1(input));

// https://xkcd.com/208/

let part2 = (input) => {
    return parser(input).filter((i) =>
        i.match(/byr:(19[2-9]\d|200[012])(\s|$)/) &&
        i.match(/iyr:(201\d|2020)(\s|$)/) &&
        i.match(/eyr:(202\d|2030)(\s|$)/) &&
        i.match(/hgt:((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)(\s|$)/) &&
        i.match(/hcl:#[0-9a-f]{6}(\s|$)/) &&
        i.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)(\s|$)/) &&
        i.match(/pid:[0-9]{9}(\s|$)/)).length
}


console.log(part2(input));
