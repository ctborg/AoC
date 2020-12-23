let day = 22;

let fetchInput = async () => {
  let resp = await fetch(`https://adventofcode.com/2020/day/${day}/input`);
  return resp.text();
}

let input = await fetchInput();

let parser = (i, pCards) => {
  i.trim().split('\n\n').forEach( player => {
    let [currentPlayer, cards] = player.split(':');
    pCards[currentPlayer] = [];
    cards.trim().split('\n').map(i => pCards[currentPlayer].push(parseInt(i)));
  });
  
  return pCards;
}

let part1 = input => {
  let pCards = parser(input, {});

  let card1, card2;
  p1cards = pCards['Player 1'];
  p2cards = pCards['Player 2'];

  while (p1cards.length && p2cards.length) {
    card1 = p1cards.shift();
    card2 = p2cards.shift();
    card1 > card2 ?
      p1cards.push(card1, card2) :
      p2cards.push(card2, card1);
  }
  
  let cards = p1cards.length ? p1cards : p2cards;

  return cards.reverse().reduce( (acc, current, index) => {
    return acc + ((index + 1) * current);
  });
}
