const input = await Deno.readTextFile("input.txt");

const blocks = generateBlocks(input);
fragment(blocks);

const checksum = generateChecksum(blocks);
console.log(checksum);

function generateBlocks(input: string) {
  const blocks: (number | string)[] = [];
  let fileId = 0;

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      blocks.push(...new Array<number>(Number(input[i])).fill(fileId));
      fileId++;
    } else {
      blocks.push(...new Array<string>(Number(input[i])).fill("."));
    }
  }

  return blocks;
}

function countDots(blocks: (number | string)[]) {
  let count = 0;

  for (const block of blocks) {
    if (block === ".") {
      count++;
    }
  }

  return count;
}

function findLastIndex(blocks: (number | string)[]) {
  let lastIndex = -1;

  for (let i = blocks.length - 1; i > -1; i--) {
    if (Number.isInteger(blocks[i])) {
      lastIndex = i;
      break;
    }
  }

  return lastIndex;
}

function fragment(blocks: (number | string)[]) {
  const dotCount = countDots(blocks);

  let index = blocks.indexOf(".");
  let lastIndex = findLastIndex(blocks);

  while (blocks.slice(-dotCount).some((block => block !== "."))) {
    [blocks[index], blocks[lastIndex]] = [blocks[lastIndex], blocks[index]];
    index = blocks.indexOf(".");
    lastIndex = findLastIndex(blocks);
  }

  return blocks;
}

function generateChecksum(blocks: (number | string)[]) {
  let checksum = 0;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === ".") {
      break;
    }

    checksum += i * (blocks[i] as number);
  }

  return checksum;
}
