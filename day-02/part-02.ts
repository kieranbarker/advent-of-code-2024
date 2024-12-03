const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

const reports = lines.map((line) => {
  const report = line.split(" ").map((level) => Number(level));
  return report;
});

function isReportSafe(report: number[]) {
  const slice = report.slice(0, -1);

  const areAllIncreasing = slice.every((level, index) => {
    const nextLevel = report[index + 1];
    return level < nextLevel;
  });

  const areAllDecreasing = slice.every((level, index) => {
    const nextLevel = report[index + 1];
    return level > nextLevel;
  });

  const areAllGradual = slice.every((level, index) => {
    const nextLevel = report[index + 1];
    const difference = Math.abs(level - nextLevel);
    return difference >= 1 && difference <= 3;
  });

  return (areAllIncreasing || areAllDecreasing) && areAllGradual;
}

const safeReports = reports.filter((report) => {
  if (isReportSafe(report)) return true;

  for (let i = 0; i < report.length; i++) {
    const spliced = report.toSpliced(i, 1);
    if (isReportSafe(spliced)) return true;
  }

  return false;
});

console.log(safeReports.length);
