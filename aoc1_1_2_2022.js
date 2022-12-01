const fs = require("fs");
const readline = require("readline");
const arr = [];
async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc1.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let buffer = [];
  for await (const line of rl) {
    if (line !== "") {
      buffer.push(parseInt(line));
    } else {
      arr.push(buffer);
      buffer = [];
    }
  }
  const mappedArr = arr
    .map((x) => {
      return x.reduce((acc, a) => (acc += a));
    })
    .sort((a, b) => b - a);
  //Part I
  console.log(mappedArr[0]);
  //Part II
  console.log(mappedArr[0] + mappedArr[1] + mappedArr[2]);
}

processLineByLine();
