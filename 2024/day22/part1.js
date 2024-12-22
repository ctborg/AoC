/**
 * Returns the next secret number (24-bit mod) after applying the
 * 3-step process to the given secret number s.
 *
 * Process per step:
 *   (a) compute some derived value (multiply or floor-div)
 *   (b) prune that derived value mod 2^24
 *   (c) XOR with s (which is also kept mod 2^24)
 *   (d) prune again
 *
 * We use BigInt to avoid overflow when multiplying by 2048.
 */
function getNextSecretNumber(s) {
  // Work in BigInt (but keep s as a regular number at the function's end).
  // Convert back/forth as needed.
  const MOD = 16777216n; // 2^24
  let sbig = BigInt(s);

  // --- Step 1 ---
  {
    // Multiply by 64, then prune
    let derived = (sbig * 64n) % MOD;
    // XOR (sbig is still < 2^24, so it's safe to XOR in BigInt)
    sbig = sbig ^ derived;
    // Prune again
    sbig = sbig % MOD;
  }

  // --- Step 2 ---
  {
    // floor-divide by 32
    let derived = sbig / 32n; // integer division
    // derived is already less than 2^24, but let's ensure mod anyway
    derived = derived % MOD;
    sbig = sbig ^ derived;
    sbig = sbig % MOD;
  }

  // --- Step 3 ---
  {
    // Multiply by 2048, then prune
    let derived = (sbig * 2048n) % MOD;
    sbig = sbig ^ derived;
    sbig = sbig % MOD;
  }

  // Convert back to a normal Number (safe because it’s < 2^24)
  return Number(sbig);
}

/**
 * Generate the 2000th secret number (i.e., apply the transformation
 * 2000 times) starting from the initial secret.
 */
function generate2000thSecret(initialSecret) {
  let s = initialSecret;
  for (let i = 0; i < 2000; i++) {
    s = getNextSecretNumber(s);
  }
  return s;
}

// ---------------------------------------
// Example puzzle input:
const input = `1
10
100
2024`

const initialSecrets = input.split('\n').map(Number);

let sumOf2000th = 0;
for (const start of initialSecrets) {
  sumOf2000th += generate2000thSecret(start);
}

console.log("Sum of the 2000th secret number for each buyer:", sumOf2000th);
