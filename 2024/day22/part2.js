/**
 * We need accurate 24-bit modular arithmetic for generating secret numbers.
 * That means using BigInt so we don't lose bits via JavaScript's 32-bit bitwise ops.
 */
function getNextSecretNumber(s) {
  const MOD = 16777216n; // 2^24
  let sbig = BigInt(s);

  // Step 1: multiply by 64, XOR, prune
  {
    let derived = (sbig * 64n) % MOD;
    sbig = sbig ^ derived;
    sbig = sbig % MOD;
  }

  // Step 2: floor-div by 32, XOR, prune
  {
    let derived = sbig / 32n;
    derived = derived % MOD;
    sbig = sbig ^ derived;
    sbig = sbig % MOD;
  }

  // Step 3: multiply by 2048, XOR, prune
  {
    let derived = (sbig * 2048n) % MOD;
    sbig = sbig ^ derived;
    sbig = sbig % MOD;
  }

  return Number(sbig); // safe since sbig < 2^24
}

/**
 * Returns an array of length (2000 + 1) of the "prices"
 * (the ones digit of each secret).
 *
 * - We start with 'initialSecret' as the 0th secret.
 * - Then generate 2000 more secrets.
 * - Price = secret % 10
 */
function getPriceStream(initialSecret) {
  const PRICE_COUNT = 2000 + 1;
  let prices = [];
  let s = initialSecret;

  // The initial secret's price:
  prices.push(s % 10);

  // Generate next 2000 secrets and store their prices:
  for (let i = 0; i < 2000; i++) {
    s = getNextSecretNumber(s);
    prices.push(s % 10);
  }

  return prices; // array of length 2001
}

/**
 * Given an array of prices, return an array of changes,
 * where changes[i] = prices[i+1] - prices[i].
 *
 * For 2001 prices, you'll get 2000 changes.
 */
function getChangeStream(prices) {
  let changes = [];
  for (let i = 0; i < prices.length - 1; i++) {
    changes.push(prices[i+1] - prices[i]);
  }
  return changes;
}

/**
 * For a single buyer (i.e., for a single sequence of prices & changes),
 * figure out, for every 4-change pattern that appears, the earliest sale price.
 *
 * We store in a Map: patternString -> earliestSalePrice
 *   - patternString is something like "[-2,1,-1,3]"
 *   - earliestSalePrice is the price at the 5th position in that pattern
 */
function getEarliestSalesForBuyer(initialSecret) {
  const prices = getPriceStream(initialSecret);
  const changes = getChangeStream(prices);

  // patternToPrice will map a 4-change pattern (as a string)
  // to the earliest sale price (the "5th price" in that pattern).
  const patternToPrice = new Map();

  for (let i = 0; i + 3 < changes.length; i++) {
    // The 4 consecutive changes
    const patternArr = [
      changes[i],
      changes[i+1],
      changes[i+2],
      changes[i+3],
    ];
    const patternKey = JSON.stringify(patternArr); 
    // Or could do something like patternArr.join(',').

    // The sale price is prices[i+4] (the 5th price in that pattern).
    const salePrice = prices[i+4];

    if (!patternToPrice.has(patternKey)) {
      patternToPrice.set(patternKey, salePrice);
    }
  }

  return patternToPrice;
}

/**
 * Given a list of buyers (by initial secret),
 * 1) Build an array of Maps, each Map = patternToEarliestPrice for that buyer.
 * 2) For every pattern that appears in *any* buyer's Map,
 *    sum up the earliest price across all buyers (0 if it doesn't appear).
 * 3) Track the pattern with the highest total sum.
 */
function findBest4ChangePattern(initialSecrets) {
  // Build array of Maps
  const allBuyersMaps = initialSecrets.map(secret =>
    getEarliestSalesForBuyer(secret)
  );

  // Gather all patterns (keys) that appear in at least one buyer's Map
  const globalPatternSet = new Set();
  for (const buyerMap of allBuyersMaps) {
    for (const patternKey of buyerMap.keys()) {
      globalPatternSet.add(patternKey);
    }
  }

  let bestPattern = null;
  let bestSum = 0;

  // Evaluate each pattern across all buyers
  for (const patternKey of globalPatternSet) {
    let sumPrices = 0;
    for (const buyerMap of allBuyersMaps) {
      if (buyerMap.has(patternKey)) {
        sumPrices += buyerMap.get(patternKey);
      }
    }
    if (sumPrices > bestSum) {
      bestSum = sumPrices;
      bestPattern = patternKey;
    }
  }

  // Convert the best patternKey back to an array
  const bestPatternArr = JSON.parse(bestPattern);
  return { pattern: bestPatternArr, sum: bestSum };
}

const input = `1, 2, 3, 2024`;

const initialSecrets = input.split('\n').map(Number);
const result = findBest4ChangePattern(initialSecrets);

console.log("Best 4-change pattern:", result.pattern);
console.log("Maximum total bananas:", result.sum);
