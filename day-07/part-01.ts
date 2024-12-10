const input = await Deno.readTextFile("input.txt");
const equations = new Map<number, number[]>();

for (const equation of input.split("\n")) {
  const [x, nums] = equation.split(": ");
  equations.set(Number(x), nums.split(" ").map(Number));
}

function calculateResults(nums: number[], current: number, index: number) {
  if (index === nums.length) return new Set([current]);

  const next = nums[index];
  const results = new Set<number>();

  for (const result of calculateResults(nums, current + next, index + 1)) {
    results.add(result);
  }

  for (const result of calculateResults(nums, current * next, index + 1)) {
    results.add(result);
  }

  return results;
}

let total = 0;

for (const [target, nums] of equations) {
  const results = calculateResults(nums, nums[0], 1);

  if (results.has(target)) {
    total += target;
  }
}

console.log(total);
