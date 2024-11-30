const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

const leftHandSide: number[] = [];
const rightHandSide: number[] = [];

for (const line of lines) {
  const [left, right] = line.split(/ {3}/);
  leftHandSide.push(Number(left));
  rightHandSide.push(Number(right));
}

const compareNumbers = (a: number, b: number) => a - b;
leftHandSide.sort(compareNumbers);
rightHandSide.sort(compareNumbers);

let total = 0;

for (let i = 0; i < leftHandSide.length; i++) {
  const difference = Math.abs(leftHandSide[i] - rightHandSide[i]);
  total += difference;
}

console.log(total);
