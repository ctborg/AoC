let day = 20;

let fetchInput = async () => {
  let resp = await fetch(`https://adventofcode.com/2020/day/${day}/input`);
  return resp.text();
}

let input = await fetchInput();

let Tile = {
    id: 0,
    imageData: [],
    neighbours: [],
    borders: function () {
      let list = [];
      // top
      list.push(this.imageData[0]);
      // bottom
      list.push(this.imageData[this.imageData.length - 1]);
      // left side
      list.push(this.imageData.map(i=>i[0]).join(''));
      // right side
      list.push(this.imageData.map(i=>i[i.length-1]).join(''));
      return list;
    },
    
    allPossibleBorders: function () {
      let list = [];
      list.push(...this.borders());
      list.push(...this.borders().map(i => i.split('').reverse().join('')));
      return list;
    }
}

let parser = (i, allTiles) => {
    i.trim().split('\n\n').map(j => {
      let [tileId, imageData] = j.split(':');
      let tileObj = Object.create(Tile);
      
      tileObj.id = tileId.replace('Tile ', '');
      tileObj.imageData = imageData.trim().split('\n');
      tileObj.neighbours = [];
      allTiles.push(tileObj);
    });

    return allTiles;
};

let countBordersMatched = (tile, allTiles) => {
  let matchingBorders = [];

  let borders = tile.borders();
  borders.forEach(border => {
    allTiles.forEach(i => {
      if (tile.id != i.id) {
        if (i.allPossibleBorders().includes(border) ) {
          matchingBorders.push(i.id);
        }
      }
    });
  });

  return matchingBorders;
}

let part1 = input => {
  let allTiles = parser(input, []);
  let tiles = [];

  allTiles.forEach(i => {
    let borderedTiles = countBordersMatched(i, allTiles);
    if (borderedTiles.length == 2) {
      tiles.push(i.id);
    }
    i.neighbours = [...borderedTiles];
  });

  return tiles.reduce((i,j) => i * j);
}


let part2;
// iterator as above
// find corners first (store tiles with 2 neighbours and alignment)
// remove from allTitles
// iterate on tiles with only 2 neighbours, and store
// repeat until allTitles empty
// concat in one large 12x12 array
// store rotations and inverses
// sticky pattern match /#[.#]{4}##[.#]{4}##[.#]{4}###/gy
// from sticky index pattern match /.*?\n[.#](#[.#]{2}){5}[.#]{3}/
// count '#' minus 15 for each pattern match.
