const getPressSequencesCache = new Map();

const _getPressSequencesBase = (startPos, endPos) => {
  const diffRow = startPos[0] - endPos[0];
  const diffCol = startPos[1] - endPos[1];

  // No movement
  if (diffRow === 0 && diffCol === 0) {
    return [];
  }

  const horizontalChar = diffRow > 0 ? '<' : '>';
  const verticalChar = diffCol > 0 ? '^' : 'v';

  const horizontalMoves = Array(Math.abs(diffRow)).fill(horizontalChar);
  const verticalMoves = Array(Math.abs(diffCol)).fill(verticalChar);

  // Only horizontal or only vertical
  if (diffCol === 0) return [horizontalMoves];
  if (diffRow === 0) return [verticalMoves];

  const potentialPos1 = [endPos[0], startPos[1]];
  const potentialPos2 = [startPos[0], endPos[1]];
  const invalidPos = [-2, 0];

  // If the intermediate position is invalid, we must go in a specific order
  if (
    potentialPos1[0] === invalidPos[0] &&
    potentialPos1[1] === invalidPos[1]
  ) {
    return [verticalMoves.concat(horizontalMoves)];
  }
  if (
    potentialPos2[0] === invalidPos[0] &&
    potentialPos2[1] === invalidPos[1]
  ) {
    return [horizontalMoves.concat(verticalMoves)];
  }

  // Otherwise, both orderings are possible
  return [
    verticalMoves.concat(horizontalMoves),
    horizontalMoves.concat(verticalMoves),
  ];
};

/**
 * Cache-aware wrapper around _getPressSequencesBase.
 */
const getPressSequences = (startPos, endPos) => {
  const key = `${startPos.join(',')}-${endPos.join(',')}`;
  if (getPressSequencesCache.has(key)) {
    return getPressSequencesCache.get(key);
  }
  const result = _getPressSequencesBase(startPos, endPos);
  getPressSequencesCache.set(key, result);
  return result;
};

// Joins an array of characters into a string
const joinCharacters = (chars) => chars.join('');

// Checks if a character is a digit
const isNumeric = (ch) => /[0-9]/.test(ch);

/**
 * Generates all movement paths needed to move from each character (by lookup in `map`)
 * to the next character in `chars`.
 */
const generateMovementPaths = (map, chars) => {
  let paths = [[]];

  for (let i = 0; i < chars.length - 1; i++) {
    const currentPos = map[chars[i]];
    const nextPos = map[chars[i + 1]];

    // Use the cached version of getPressSequences
    const possiblePresses = getPressSequences(currentPos, nextPos);

    const newPaths = [];
    if (possiblePresses.length === 0) {
      // No movement needed, only press 'A'
      for (const path of paths) {
        newPaths.push([...path, 'A']);
      }
    } else {
      for (const path of paths) {
        for (const pressSet of possiblePresses) {
          newPaths.push([...path, ...pressSet, 'A']);
        }
      }
    }
    paths = newPaths;
  }

  return paths;
};

/**
 * Computes an optimal sequence of moves for `sequence` given a depth limit,
 * using memoization (cache).
 */
const calculateOptimalMoves = (cache, map, sequence, depth, currentPos) => {
  if (sequence.length === 0) {
    return 0;
  }

  const cacheKey = JSON.stringify([sequence, currentPos, depth]);
  if (cache[cacheKey] !== undefined) {
    return cache[cacheKey];
  }

  const [next, ...rest] = sequence;
  const nextPos = map[next];
  const pressSequences = getPressSequences(currentPos, nextPos);

  let minValue;
  if (depth === 0) {
    // No depth remains, just count immediate moves
    minValue = Math.min(...pressSequences.map((x) => x.length), Infinity);
    if (minValue === Infinity) {
      minValue = 0;
    }
    // +1 for 'A' press
    minValue += 1;
  } else {
    // Try each possible route and recursively compute cost
    let candidates = [];
    if (pressSequences.length === 0) {
      candidates.push(1); // Only 'A'
    } else {
      for (const pressSet of pressSequences) {
        const extended = [...pressSet, 'A'];
        candidates.push(
          calculateOptimalMoves(cache, map, extended, depth - 1, [0, 0])
        );
      }
    }
    if (candidates.length === 0) {
      candidates = [1];
    }
    minValue = Math.min(...candidates);
  }

  const nextValue = calculateOptimalMoves(cache, map, rest, depth, nextPos);
  const result = minValue + nextValue;

  cache[cacheKey] = result;
  return result;
};

// Part 1 computation
const computePart1 = (file) => {
  const numericalMap = {
    A: [0, 0],
    0: [-1, 0],
    1: [-2, -1],
    2: [-1, -1],
    3: [0, -1],
    4: [-2, -2],
    5: [-1, -2],
    6: [0, -2],
    7: [-2, -3],
    8: [-1, -3],
    9: [0, -3],
  };

  const directionalMap = {
    A: [0, 0],
    '^': [-1, 0],
    '>': [0, 1],
    v: [-1, 1],
    '<': [-2, 1],
  };

  const lines = file.split('\n');
  let resultSum = 0;

  for (const line of lines) {
    const characters = [...line];
    const extendedChars = ['A', ...characters];

    // First pass using the numerical map
    const initialPaths = generateMovementPaths(numericalMap, extendedChars);

    // Each resulting path is fed into the directional map twice in succession
    const directionalPaths = [];
    for (const path of initialPaths) {
      const appended = ['A', ...path];
      const subPaths = generateMovementPaths(directionalMap, appended);
      directionalPaths.push(...subPaths);
    }

    const finalFlattened = [];
    for (const path of directionalPaths) {
      const appended = ['A', ...path];
      const subPaths = generateMovementPaths(directionalMap, appended);
      finalFlattened.push(...subPaths);
    }

    // Find the shortest command sequence
    const shortestSequence = finalFlattened.reduce((acc, arr) => {
      return !acc || arr.length < acc.length ? arr : acc;
    }, null);

    const shortestLength = shortestSequence ? shortestSequence.length : 0;
    const digitChars = extendedChars.filter(isNumeric);
    const numValue = parseInt(joinCharacters(digitChars), 10) || 0;

    resultSum += shortestLength * numValue;
  }

  return String(resultSum);
};

// Part 2 computation
const computePart2 = (file) => {
  const numericalMap = {
    A: [0, 0],
    0: [-1, 0],
    1: [-2, -1],
    2: [-1, -1],
    3: [0, -1],
    4: [-2, -2],
    5: [-1, -2],
    6: [0, -2],
    7: [-2, -3],
    8: [-1, -3],
    9: [0, -3],
  };

  const directionalMap = {
    A: [0, 0],
    '^': [-1, 0],
    '>': [0, 1],
    v: [-1, 1],
    '<': [-2, 1],
  };

  const lines = file.split('\n');
  let resultSum = 0;

  for (const line of lines) {
    const characters = [...line];
    const extendedChars = ['A', ...characters];

    // Generate all paths using numerical map
    const initialPaths = generateMovementPaths(numericalMap, extendedChars);

    // Among all resulting paths, find the minimal move count
    let shortestMoves = Number.MAX_SAFE_INTEGER;
    for (const path of initialPaths) {
      const moveCount = calculateOptimalMoves(
        {},
        directionalMap,
        path,
        24,
        [0, 0]
      );
      if (moveCount < shortestMoves) {
        shortestMoves = moveCount;
      }
    }

    const digitChars = extendedChars.filter(isNumeric);
    const numValue = parseInt(joinCharacters(digitChars), 10) || 0;

    resultSum += shortestMoves * numValue;
  }

  return String(resultSum);
};

const solve = () => {
  const input = `029A
980A
179A
456A
379A`;

  const answer1 = computePart1(input);
  console.log('Part 1:', answer1);

  const answer2 = computePart2(input);
  console.log('Part 2:', answer2);
};

solve();


