function solvePuzzle(rawInput) {
  // 1) Split the entire input into blocks of 7 lines each.
  //    split on blank lines, then each block is exactly 7 lines.
  const blocks = rawInput
    .trim()
    .split(/\n\s*\n/)        // split on blank lines
    .map(chunk => chunk.split('\n')); // each chunk → array of 7 strings

  // 2) Separate blocks into locks vs. keys.
  const locks = [];
  const keys = [];

  for (const block of blocks) {
    // We expect exactly 7 lines in each block
    const top    = block[0];
    const bottom = block[6];

    // Identify whether it's a lock or a key:
    // Locks have top row = "#####" and bottom row = "....."
    // Keys  have top row = "....." and bottom row = "#####"
    if (top === '#####' && bottom === '.....') {
      locks.push(block);
    } else if (top === '.....' && bottom === '#####') {
      keys.push(block);
    } else {
      console.log('¯\_(ツ)_/¯');
    }
  }

  // 3) Convert each lock block into pin heights.
  function getLockPinHeights(lockBlock) {
    // We only look at rows 1..5 and columns 0..4,
    // counting consecutive '#' from the top down each column.
    const heights = [];
    for (let col = 0; col < 5; col++) {
      let height = 0;
      for (let row = 1; row <= 5; row++) {
        if (lockBlock[row][col] === '#') {
          height++;
        } else {
          break;
        }
      }
      heights.push(height);
    }
    return heights;
  }

  // 4) Convert each key block into key heights.
  function getKeyHeights(keyBlock) {
    // We only look at rows 1..5 and columns 0..4,
    // counting consecutive '#' from the bottom up each column.
    const heights = [];
    for (let col = 0; col < 5; col++) {
      let height = 0;
      for (let row = 5; row >= 1; row--) {
        if (keyBlock[row][col] === '#') {
          height++;
        } else {
          break;
        }
      }
      heights.push(height);
    }
    return heights;
  }

  // 5) Check if a given lock and key fit (no overlap).
  //    We have 7 total rows, but effectively 5 “middle” rows
  //    for lock pins + key shape. If pin + key >= 6, they collide.
  function doTheyFit(lockHeights, keyHeights) {
    for (let i = 0; i < 5; i++) {
      if (lockHeights[i] + keyHeights[i] >= 6) {
        return false;
      }
    }
    return true;
  }

  // Convert all locks/keys into numeric height arrays.
  const lockHeightsList = locks.map(getLockPinHeights);
  const keyHeightsList  = keys.map(getKeyHeights);

  // 6) Brute force every lock against every key.
  let fitsCount = 0;
  for (const lockHeights of lockHeightsList) {
    for (const keyHeights of keyHeightsList) {
      if (doTheyFit(lockHeights, keyHeights)) {
        fitsCount++;
      }
    }
  }

  return fitsCount;
}

const rawInput = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

const answer = solvePuzzle(rawInput);
console.log("Number of lock/key pairs that fit:", answer);
