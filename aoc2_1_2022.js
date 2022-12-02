const fs = require("fs");
const readline = require("readline");
const calculatePoints = (moves) => {
  const newMoves = moves
    .map((x) => {
      const enemyMove = x[0];
      const myMove = parseMymove(x[1]);
      let score = myMove === "A" ? 1 : myMove === "B" ? 2 : 3;
      score += calculateOutcomePoints(enemyMove, myMove);
      return score;
    })
    .reduce((acc, a) => (acc += a), 0);
  return newMoves;
};
const calculateOutcomePoints = (enemyMove, myMove) => {
  if (enemyMove === myMove) return 3;
  switch (enemyMove) {
    case "A": {
      if (myMove === "B") return 6;
      else return 0;
    }
    case "B": {
      if (myMove === "C") return 6;
      else return 0;
    }
    case "C": {
      if (myMove === "A") return 6;
      else return 0;
    }
  }
};
const parseMymove = (myMove) => {
  let char = "";
  switch (myMove) {
    case "Y":
      char = "B";
      break;
    case "X":
      char = "A";
      break;
    case "Z":
      char = "C";
      break;
  }
  return char;
};
async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc2.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // A-X - ROCK 1POINT
  // B-Y - PAPER 2POINTS
  // C-Z - SCRISORS 3POINTS
  //WIN 6 POINTS DRAW 3 POINTS LOSE 0 POINTS
  const moves = [];
  for await (const line of rl) {
    const splittedLine = line.split(" ");
    moves.push([splittedLine[0], splittedLine[1]]);
  }
  console.log(calculatePoints(moves));
}

processLineByLine();
