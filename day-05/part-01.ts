const input = await Deno.readTextFile("input.txt");
const [rules, updates] = input.split("\n\n");

const parsedRules = rules.split("\n").map((rule) => {
  const [a, b] = rule.split("|");
  return [Number(a), Number(b)];
});

const parsedUpdates = updates.split("\n").map((update) => {
  const pages = update.split(",");
  return pages.map((page) => Number(page));
});

const correctlyOrderedUpdates = parsedUpdates.filter((update) => {
  return parsedRules.every((rule) => {
    const a = update.indexOf(rule[0]);
    const b = update.indexOf(rule[1]);
    if (a === -1 || b === -1) return true;
    return a < b;
  });
});

let total = 0;

for (const update of correctlyOrderedUpdates) {
  const index = Math.ceil(update.length / 2) - 1;
  const middlePage = update[index];
  total += middlePage;
}

console.log(total);
