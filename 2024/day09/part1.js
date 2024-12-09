const diskMap = "2333133121414131402"; 

// STEP 1: Parse the disk map to construct the initial disk layout.
// The disk map is a sequence of digits where the digits alternate between:
// - length of a file segment
// - length of free space segment
//
// The sequence always starts with a file length. So the pattern is:
// file_length, free_length, file_length, free_length, ...
//
// Files are assigned IDs incrementally as they appear. 
// File 0 is the first file segment, file 1 is the second, etc.
//
// Example: For "12345":
// '1' file block (ID 0), '2' free blocks, '3' file blocks (ID 1), '4' free blocks, '5' file blocks (ID 2)
// Resulting layout: 0 (file ID 0), '.' '.' (free), 1 1 1 (file ID 1), '.' '.' '.' '.' (free), 2 2 2 2 2 (file ID 2)

// Parse the diskMap into a sequence of {length, type} entries
// type: 'file' or 'free'
function parseDiskMap(mapStr) {
  let segments = [];
  for (let i = 0; i < mapStr.length; i++) {
    let length = Number(mapStr[i]);
    let type = (i % 2 === 0) ? 'file' : 'free';
    segments.push({ length, type });
  }
  return segments;
}

const segments = parseDiskMap(diskMap);

// Build the disk array
let disk = [];
let currentFileId = 0;
for (let i = 0; i < segments.length; i++) {
  const { length, type } = segments[i];
  if (type === 'file') {
    // Add 'length' blocks with currentFileId, if length > 0
    for (let b = 0; b < length; b++) {
      disk.push(currentFileId);
    }
    // Increment file ID for the next file segment
    currentFileId++;
  } else {
    // 'free' space: add '.' length times
    for (let b = 0; b < length; b++) {
      disk.push('.');
    }
  }
}

// STEP 2: Compact the disk.
// The rule: Move one file block at a time from the RIGHTMOST file block to the LEFTMOST free space
// Keep doing this until no gaps remain between file blocks (i.e., all free spaces are at the end).

function isCompacted(d) {
  // The disk is compacted if all '.' appear after all file blocks.
  // In other words, once we hit a '.', we should not see any file ID after that.
  let seenDot = false;
  for (let i = 0; i < d.length; i++) {
    if (d[i] === '.') {
      seenDot = true;
    } else {
      // If we see a file block after we've seen a '.', it's not compacted
      if (seenDot) return false;
    }
  }
  return true;
}

while (!isCompacted(disk)) {
  // Find the leftmost free space
  const leftmostFreeIndex = disk.indexOf('.');
  // Find the rightmost file block
  let rightmostFileIndex = -1;
  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] !== '.') {
      rightmostFileIndex = i;
      break;
    }
  }

  // Move the block from rightmostFileIndex to leftmostFreeIndex
  disk[leftmostFreeIndex] = disk[rightmostFileIndex];
  disk[rightmostFileIndex] = '.';
}

// STEP 3: Compute the checksum.
// Checksum = sum over (position * fileID) for every file block
// Skip free spaces.

let checksum = 0;
for (let pos = 0; pos < disk.length; pos++) {
  if (disk[pos] !== '.') {
    // disk[pos] is a file ID number
    checksum += pos * disk[pos];
  }
}

console.log("Checksum:", checksum);
