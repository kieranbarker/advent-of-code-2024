const input = await Deno.readTextFile("input.txt");
let stones = parse(input);

for (let i = 1; i <= 75; i++) {
  stones = blink(stones);
}

let total = 0;

for (const count of stones.values()) {
  total += count;
}

console.log(total);

function parse(input: string) {
  const stones = new Map<number, number>();

  for (const str of input.split(" ")) {
    const stone = Number(str);
    stones.set(stone, (stones.get(stone) ?? 0) + 1)
  }

  return stones;
}

function blink(stones: Map<number, number>) {
  const copy = new Map(stones);

  for (const [stone, count] of stones) {
    if (stone === 0) {
      copy.set(1, (copy.get(1) ?? 0) + count);
      copy.set(0, (copy.get(0)!) - count);
      continue;
    }

    const str = String(stone);

    if (str.length % 2 === 0) {
      const halfway = str.length / 2;
      const left = Number(str.slice(0, halfway));
      const right = Number(str.slice(halfway));
      copy.set(left, (copy.get(left) ?? 0) + count);
      copy.set(right, (copy.get(right) ?? 0) + count);
      copy.set(stone, (copy.get(stone)!) - count);
      continue;
    }

    const newStone = stone * 2024;
    copy.set(newStone, (copy.get(newStone) ?? 0) + count);
    copy.set(stone, (copy.get(stone)!) - count);
  }

  return copy;
}
