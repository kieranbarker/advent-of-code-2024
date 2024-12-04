const input = await Deno.readTextFile("input.txt");
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = input.matchAll(regex);

let total = 0;

for (const [, x, y] of matches) {
  total += Number(x) * Number(y);
}

console.log(total);
