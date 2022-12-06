const input = document.querySelector('pre').innerHTML;

function findSignalPacket(length) {
	for (let i = 0; i < input.length; i++) {
		const packet = Array(length)
			.fill(0)
			.map((_, j) => input[i + j]);
		if (new Set(packet).size === length) {
		  return i + length;
		}
	}
}

//part 1
console.log(findSignalPacket(4));

//part 2
console.log(findSignalPacket(14));
