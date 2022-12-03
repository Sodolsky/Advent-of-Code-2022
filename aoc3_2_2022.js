const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc3.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const lines = [];
  let buffer = [];
  let counter = 0;
  for await (const line of rl) {
    buffer.push(line);
    counter += 1;
    if (counter === 3) {
      lines.push(buffer);
      buffer = [];
      counter = 0;
    }
  }
  const value = lines
    .map((x) => {
      let char = "";
      for (const a of x[0]) {
        for (const b of x[1]) {
          for (const c of x[2]) {
            if (a === b && b === c) {
              char = c;
              break;
            }
          }
          if (char !== "") break;
        }
        if (char !== "") break;
      }
      const isUpperCase = char === char.toUpperCase();
      const value = isUpperCase
        ? alphabet.indexOf(char.toLowerCase()) + 27
        : alphabet.indexOf(char.toLowerCase()) + 1;
      return value;
    })
    .reduce((acc, a) => (acc += a));
  console.log(value);
}

processLineByLine();
