const input = await Deno.readTextFile("input.txt");
const machines = parse(input);

const A_COST = 3, B_COST = 1;

let tokens = 0;

for (const machine of machines) {
  const [a, b] = solve(machine);

  if (a && b) {
    tokens += A_COST * a + B_COST * b;
  }
}

console.log(tokens);

function parse(input: string) {
  const machines = input.split("\n\n");
  const parsed: Map<string, number[]>[] = [];

  for (const machine of machines) {
    const lines = machine.split("\n");
    const map = new Map<string, number[]>();

    for (let i = 0; i <= 2; i++) {
      const [x, y] = lines[i].match(/\d+/g)!;

      let key: "a" | "b" | "prize";

      if (i === 0) {
        key = "a";
      } else if (i === 1) {
        key = "b";
      } else if (i === 2) {
        key = "prize";
      }

      map.set(key!, [Number(x), Number(y)]);
    }

    parsed.push(map);
  }

  return parsed;
}

function solve(machine: Map<string, number[]>) {
  const MAX_PRESSES = 100;

  const buttonA = machine.get("a")!;
  const buttonB = machine.get("b")!;
  const prize = machine.get("prize")!;

  let minPresses = Number.POSITIVE_INFINITY;
  let minA, minB;

  for (let a = 0; a <= MAX_PRESSES; a++) {
    for (let b = 0; b <= MAX_PRESSES; b++) {
      const x = buttonA[0] * a + buttonB[0] * b;
      const y = buttonA[1] * a + buttonB[1] * b;

      if (x === prize[0] && y === prize[1]) {
        const presses = a + b;

        if (presses < minPresses) {
          minPresses = presses;
          minA = a;
          minB = b;
        }
      }
    }
  }

  return [minA, minB];
}
