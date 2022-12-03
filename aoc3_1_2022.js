const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc3.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const lines = [];
  for await (const line of rl) {
    const firstHalf = line.slice(0, line.length / 2);
    const secondHalf = line.slice(line.length / 2);
    lines.push([firstHalf, secondHalf]);
  }
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const value = lines
    .map((x) => {
      const firstHalf = x[0];
      const secondHalf = x[1];
      let char = "";
      for (const i of firstHalf) {
        for (const j of secondHalf) {
          if (i === j) {
            char = i;
            break;
          }
          if (char !== "") break;
        }
      }
      return char;
    })
    .map((x) => {
      const isUpperCase = x === x.toUpperCase();
      const value = isUpperCase
        ? 26 + alphabet.indexOf(x.toLocaleLowerCase()) + 1
        : alphabet.indexOf(x.toLocaleLowerCase()) + 1;
      return value;
    })
    .reduce((acc, a) => (acc += a));
  console.log(value);
}

processLineByLine();
