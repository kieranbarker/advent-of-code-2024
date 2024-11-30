const input = await Deno.readTextFile("input.txt");
const [rules, updates] = input.split("\n\n");

// Each number is mapped to a set of numbers that must succeed it.
const parsedRules = new Map<number, Set<number>>();

for (const rule of rules.split("\n")) {
  const [a, b] = rule.split("|").map(Number);

  if (!parsedRules.has(a)) {
    parsedRules.set(a, new Set());
  }

  parsedRules.get(a)!.add(b);
}

const parsedUpdates = updates.split("\n").map((update) => {
  const pages = update.split(",");
  return pages.map(Number);
});

const incorrectlyOrderedUpdates = parsedUpdates.filter((update) => {
  for (let i = 0; i < update.length - 1; i++) {
    const a = update[i];
    const b = update[i + 1];
    if (parsedRules.get(b)?.has(a)) return true;
  }

  return false;
});

const sortedUpdates = incorrectlyOrderedUpdates.map((update) => {
  return update.toSorted((a, b) => {
    if (parsedRules.get(a)?.has(b)) return -1;
    if (parsedRules.get(b)?.has(a)) return 1;
    return 0;
  });
});

let total = 0;

for (const update of sortedUpdates) {
  const index = Math.ceil(update.length / 2) - 1;
  const middlePage = update[index];
  total += middlePage;
}

console.log(total);
