const input = await Deno.readTextFile("input.txt");
const grid = input.split("\n").map((row) => row.split(""));

let matches = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] !== "X") continue;

    // Vertical upwards
    if (
      grid[i - 1]?.[j] === "M" &&
      grid[i - 2]?.[j] === "A" &&
      grid[i - 3]?.[j] === "S"
    ) matches++;

    // Diagonal upwards right
    if (
      grid[i - 1]?.[j + 1] === "M" &&
      grid[i - 2]?.[j + 2] === "A" &&
      grid[i - 3]?.[j + 3] === "S"
    ) matches++;

    // Horizontal right
    if (
      grid[i][j + 1] === "M" &&
      grid[i][j + 2] === "A" &&
      grid[i][j + 3] === "S"
    ) matches++;

    // Diagonal downwards right
    if (
      grid[i + 1]?.[j + 1] === "M" &&
      grid[i + 2]?.[j + 2] === "A" &&
      grid[i + 3]?.[j + 3] === "S"
    ) matches++;

    // Vertical downwards
    if (
      grid[i + 1]?.[j] === "M" &&
      grid[i + 2]?.[j] === "A" &&
      grid[i + 3]?.[j] === "S"
    ) matches++;

    // Diagonal downards left
    if (
      grid[i + 1]?.[j - 1] === "M" &&
      grid[i + 2]?.[j - 2] === "A" &&
      grid[i + 3]?.[j - 3] === "S"
    ) matches++;

    // Horizontal left
    if (
      grid[i][j - 1] === "M" &&
      grid[i][j - 2] === "A" &&
      grid[i][j - 3] === "S"
    ) matches++;

    // Diagonal upwards left
    if (
      grid[i - 1]?.[j - 1] === "M" &&
      grid[i - 2]?.[j - 2] === "A" &&
      grid[i - 3]?.[j - 3] === "S"
    ) matches++;
  }
}

console.log(matches);
