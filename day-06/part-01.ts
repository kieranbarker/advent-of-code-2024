const input = await Deno.readTextFile("input.txt");
const grid = input.split("\n").map((row) => row.split(""));

let i = grid.findIndex((row) => row.includes("^"));
let j = grid[i].findIndex((cell) => cell === "^");

type Direction = "^" | ">" | "v" | "<";
let direction: Direction = "^";

while (i > -1 && i < grid.length && j > -1 && j < grid[0].length) {
  if (direction === "^") {
    if (grid[i - 1]?.[j] === "." || grid[i - 1]?.[j] === "X") {
      grid[i][j] = "X";
      grid[i - 1][j] = "^";
      i--;
    } else if (grid[i - 1]?.[j] === "#") {
      direction = ">";
      grid[i][j] = direction;
    } else {
      grid[i][j] = "X";
      i--;
    }
  } else if (direction === ">") {
    if (grid[i][j + 1] === "." || grid[i][j + 1] === "X") {
      grid[i][j] = "X";
      grid[i][j + 1] = ">";
      j++;
    } else if (grid[i][j + 1] === "#") {
      direction = "v";
      grid[i][j] = direction;
    } else {
      grid[i][j] = "X";
      j++;
    }
  } else if (direction === "v") {
    if (grid[i + 1]?.[j] === "." || grid[i + 1]?.[j] === "X") {
      grid[i][j] = "X";
      grid[i + 1][j] = "v";
      i++;
    } else if (grid[i + 1]?.[j] === "#") {
      direction = "<";
      grid[i][j] = direction;
    } else {
      grid[i][j] = "X";
      i++;
    }
  } else if (direction === "<") {
    if (grid[i][j - 1] === "." || grid[i][j - 1] === "X") {
      grid[i][j] = "X";
      grid[i][j - 1] = "<";
      j--;
    } else if (grid[i][j - 1] === "#") {
      direction = "^";
      grid[i][j] = direction;
    } else {
      grid[i][j] = "X";
      j--;
    }
  }
}

const visited = grid.flat().filter((cell) => cell === "X").length;
console.log(visited);
