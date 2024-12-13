const input = await Deno.readTextFile("input.txt");
let stones = input.split(" ").map(Number);

for (let i = 1; i <= 25; i++) {
  stones = blink(stones);
}

console.log(stones.length);

function blink(stones: number[]) {
  const newStones: number[] = [];

  for (const stone of stones) {
    if (stone === 0) {
      newStones.push(1);
      continue;
    }

    const str = String(stone);

    if (str.length % 2 === 0) {
      const halfway = str.length / 2;
      const left = Number(str.slice(0, halfway));
      const right = Number(str.slice(halfway));
      newStones.push(left, right);
      continue;
    }

    newStones.push(stone * 2024);
  }

  return newStones;
}
