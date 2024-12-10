const input = await Deno.readTextFile("input.txt");
const equations = new Map<number, number[]>();

for (const equation of input.split("\n")) {
  const [x, nums] = equation.split(": ");
  equations.set(Number(x), nums.split(" ").map(Number));
}

function generateExpressions(nums: number[]) {
  const expressions = new Set<string>();
  expressions.add(String(nums[0]));

  for (let i = 1; i < nums.length; i++) {
    const num = String(nums[i]);
    const newExpressions = new Set<string>();

    for (const expr of expressions) {
      newExpressions.add(`(${expr} + ${num})`);
      newExpressions.add(`(${expr} * ${num})`);
    }

    expressions.clear();

    for (const expr of newExpressions) {
      expressions.add(expr);
    }
  }

  return [...expressions];
}

let total = 0;

for (const [x, nums] of equations) {
  const expressions = generateExpressions(nums);
  const results = expressions.map(eval);
  const isPossible = results.some((result) => result === x);

  if (isPossible) {
    total += x;
  }
}

console.log(total);
