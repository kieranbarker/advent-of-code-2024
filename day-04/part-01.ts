const input = await Deno.readTextFile("input.txt");
const grid = input.split("\n").map((row) => row.split(""));

let matches = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] !== "X") continue;

    if (
      grid[i - 1]?.[j] === "M" &&
      grid[i - 2]?.[j] === "A" &&
      grid[i - 3]?.[j] === "S"
    ) matches++;

    if (
      grid[i - 1]?.[j + 1] === "M" &&
      grid[i - 2]?.[j + 2] === "A" &&
      grid[i - 3]?.[j + 3] === "S"
    ) matches++;

    if (
      grid[i][j + 1] === "M" &&
      grid[i][j + 2] === "A" &&
      grid[i][j + 3] === "S"
    ) matches++;

    if (
      grid[i + 1]?.[j + 1] === "M" &&
      grid[i + 2]?.[j + 2] === "A" &&
      grid[i + 3]?.[j + 3] === "S"
    ) matches++;

    if (
      grid[i + 1]?.[j] === "M" &&
      grid[i + 2]?.[j] === "A" &&
      grid[i + 3]?.[j] === "S"
    ) matches++;

    if (
      grid[i + 1]?.[j - 1] === "M" &&
      grid[i + 2]?.[j - 2] === "A" &&
      grid[i + 3]?.[j - 3] === "S"
    ) matches++;

    if (
      grid[i][j - 1] === "M" &&
      grid[i][j - 2] === "A" &&
      grid[i][j - 3] === "S"
    ) matches++;

    if (
      grid[i - 1]?.[j - 1] === "M" &&
      grid[i - 2]?.[j - 2] === "A" &&
      grid[i - 3]?.[j - 3] === "S"
    ) matches++;
  }
}

console.log(matches);
