const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

const leftHandSide: number[] = [];
const rightHandSide: number[] = [];

for (const line of lines) {
  const [left, right] = line.split(/ {3}/);
  leftHandSide.push(Number(left));
  rightHandSide.push(Number(right));
}

const frequencies = new Map<number, number>();

for (const locationId of rightHandSide) {
  let frequency = frequencies.get(locationId) ?? 0;
  frequency++;
  frequencies.set(locationId, frequency);
}

let total = 0;

for (const locationId of leftHandSide) {
  const frequency = frequencies.get(locationId) ?? 0;
  const similarityScore = locationId * frequency;
  total += similarityScore;
}

console.log(total);
