const input = await Deno.readTextFile("input.txt");
const grid = input.split("\n").map((row) => row.split(""));

const iStart = grid.findIndex((row) => row.includes("^"));
const jStart = grid[iStart].findIndex((cell) => cell === "^");

let validPlacements = 0;

function move() {
  let i = iStart;
  let j = jStart;

  type Direction = "^" | ">" | "v" | "<";
  let direction: Direction = "^";

  const visited = new Set<string>();

  while (i > -1 && i < grid.length && j > -1 && j < grid[0].length) {
    const state = `${i},${j},${direction}`;

    if (visited.has(state)) {
      validPlacements++;
      break;
    }

    visited.add(state);

    if (direction === "^") {
      if (grid[i - 1]?.[j] === ".") {
        direction = "^";
        i--;
      } else if (grid[i - 1]?.[j] === "#") {
        direction = ">";
      } else {
        i--;
      }
    } else if (direction === ">") {
      if (grid[i][j + 1] === ".") {
        direction = ">";
        j++;
      } else if (grid[i][j + 1] === "#") {
        direction = "v";
      } else {
        j++;
      }
    } else if (direction === "v") {
      if (grid[i + 1]?.[j] === ".") {
        direction = "v";
        i++;
      } else if (grid[i + 1]?.[j] === "#") {
        direction = "<";
      } else {
        i++;
      }
    } else if (direction === "<") {
      if (grid[i][j - 1] === ".") {
        direction = "<";
        j--;
      } else if (grid[i][j - 1] === "#") {
        direction = "^";
      } else {
        j--;
      }
    }
  }
}

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] !== ".") continue;
    grid[i][j] = "#";
    move();
    grid[i][j] = ".";
  }
}

console.log(validPlacements);
