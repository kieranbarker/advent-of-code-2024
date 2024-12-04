const input = await Deno.readTextFile("input.txt");
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

let match: ReturnType<RegExp["exec"]>;

let index = 0;
let isEnabled = true;

let total = 0;

while ((match = regex.exec(input)) !== null) {
  const slice = input.slice(index, regex.lastIndex);

  if (slice.includes("don't()")) {
    isEnabled = false;
  }

  if (slice.includes("do()")) {
    isEnabled = true;
  }

  if (isEnabled) {
    const [, x, y] = match;
    total += Number(x) * Number(y);
  }

  index = regex.lastIndex;
}

console.log(total);
