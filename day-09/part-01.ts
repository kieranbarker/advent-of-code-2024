const input = await Deno.readTextFile("input.txt");

let blocks = generateBlocks(input);
blocks = defragment(blocks);

const checksum = generateChecksum(blocks);
console.log(checksum);

function generateBlocks(input: string) {
  let blocks = "";
  let fileId = 0;

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      blocks += String(fileId).repeat(Number(input[i]));
      fileId++;
    } else {
      blocks += ".".repeat(Number(input[i]));
    }
  }

  return blocks;
}

function generateDots(blocks: string) {
  let count = 0;

  for (const char of blocks) {
    if (char === ".") {
      count++;
    }
  }

  return ".".repeat(count);
}

function findLastIndex(str: string, regex: RegExp) {
  let lastIndex: number | undefined;

  for (let i = str.length - 1; i > -1; i--) {
    if (regex.test(str[i])) {
      lastIndex = i;
      break;
    }
  }

  return lastIndex;
}

function defragment(blocks: string) {
  const dots = generateDots(blocks);
  const regex = /\d/;

  let index = blocks.indexOf(".");
  let lastIndex = findLastIndex(blocks, regex)!;

  while (!blocks.endsWith(dots)) {
    blocks = blocks.slice(0, index) + blocks[lastIndex] +
      blocks.slice(index + 1, lastIndex) + "." + blocks.slice(lastIndex + 1);

    index = blocks.indexOf(".");
    lastIndex = findLastIndex(blocks, regex)!;
  }

  return blocks;
}

function generateChecksum(blocks: string) {
  let checksum = 0;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === ".") {
      break;
    }

    checksum += i * Number(blocks[i]);
  }

  return checksum;
}
