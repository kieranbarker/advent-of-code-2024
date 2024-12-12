const input = await Deno.readTextFile("input.txt");

const { blocks, maxFileId } = generateBlocks(input);
fragment(blocks, maxFileId);

const checksum = generateChecksum(blocks.flat());
console.log(checksum);

function generateBlocks(input: string) {
  const blocks: (number | string)[][] = [];
  let fileId = 0;

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      blocks.push(new Array<number>(Number(input[i])).fill(fileId));
      fileId++;
    } else if (input[i] !== "0") {
      blocks.push(new Array<string>(Number(input[i])).fill("."));
    }
  }

  return { blocks, maxFileId: fileId - 1 };
}

function findDotIndex(
  file: (number | string)[],
  fileIndex: number,
  blocks: (number | string)[][],
) {
  let index = -1;

  for (let i = 0; i < fileIndex; i++) {
    if (blocks[i][0] === "." && blocks[i].length >= file.length) {
      index = i;
      break;
    }
  }

  return index;
}

function fragment(blocks: (number | string)[][], fileId: number) {
  while (fileId > -1) {
    const file = blocks.find((block) => block[0] === fileId)!;
    const fileIndex = blocks.indexOf(file);
    const dotIndex = findDotIndex(file, fileIndex, blocks);

    if (dotIndex === -1) {
      fileId--;
      continue;
    }

    blocks.splice(dotIndex, 0, [...blocks[fileIndex]]);
    blocks[dotIndex + 1].splice(0, blocks[fileIndex + 1].length);
    blocks[fileIndex + 1].fill(".");

    fileId--;
  }

  return blocks;
}

function generateChecksum(blocks: (number | string)[]) {
  let checksum = 0;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === ".") {
      continue;
    }

    checksum += i * (blocks[i] as number);
  }

  return checksum;
}
