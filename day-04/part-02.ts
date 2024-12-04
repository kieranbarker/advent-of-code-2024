const input = await Deno.readTextFile("input.txt");
const grid = input.split("\n").map((row) => row.split(""));

let matches = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] !== "A") continue;

    if (
      grid[i - 1]?.[j - 1] === "M" &&
      grid[i - 1]?.[j + 1] === "M" &&
      grid[i + 1]?.[j - 1] === "S" &&
      grid[i + 1]?.[j + 1] === "S"
    ) matches++;

    if (
      grid[i - 1]?.[j - 1] === "M" &&
      grid[i - 1]?.[j + 1] === "S" &&
      grid[i + 1]?.[j - 1] === "M" &&
      grid[i + 1]?.[j + 1] === "S"
    ) matches++;

    if (
      grid[i - 1]?.[j - 1] === "S" &&
      grid[i - 1]?.[j + 1] === "M" &&
      grid[i + 1]?.[j - 1] === "S" &&
      grid[i + 1]?.[j + 1] === "M"
    ) matches++;

    if (
      grid[i - 1]?.[j - 1] === "S" &&
      grid[i - 1]?.[j + 1] === "S" &&
      grid[i + 1]?.[j - 1] === "M" &&
      grid[i + 1]?.[j + 1] === "M"
    ) matches++;
  }
}

console.log(matches);
