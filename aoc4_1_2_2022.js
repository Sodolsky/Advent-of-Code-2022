const fs = require("fs");
const readline = require("readline");
const part1 = (pairs) => {
  const containinedPairs = pairs.reduce((acc, x) => {
    const [a, b] = x[0].split("-").map((x) => parseInt(x));
    const [y, z] = x[1].split("-").map((x) => parseInt(x));
    const firstArray = [...Array(b - a + 1).keys()].map((x) => x + a);
    const secondArray = [...Array(z - y + 1).keys()].map((x) => x + y);
    const isFirstRangeBigger = firstArray.length >= secondArray.length;
    return isFirstRangeBigger
      ? secondArray.every((x) => firstArray.includes(x))
        ? (acc += 1)
        : acc
      : firstArray.every((x) => secondArray.includes(x))
      ? (acc += 1)
      : acc;
  }, 0);
  return containinedPairs;
};
const part2 = (pairs) => {
  const overlappingPairs = pairs.reduce((acc, x) => {
    const [a, b] = x[0].split("-").map((x) => parseInt(x));
    const [y, z] = x[1].split("-").map((x) => parseInt(x));
    const firstArray = [...Array(b - a + 1).keys()].map((x) => x + a);
    const secondArray = [...Array(z - y + 1).keys()].map((x) => x + y);
    return firstArray.filter((x) => secondArray.includes(x)).length > 0
      ? (acc += 1)
      : acc;
  }, 0);
  return overlappingPairs;
};
async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc4.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const pairs = [];
  for await (const line of rl) {
    const splittedLine = line.split(",");
    pairs.push(splittedLine);
  }
  console.log(part1(pairs));
  console.log(part2(pairs));
}

processLineByLine();
