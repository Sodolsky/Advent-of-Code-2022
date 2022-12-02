const fs = require("fs");
const readline = require("readline");
const calculatePoints = (moves) => {
  const newMoves = moves
    .map((x) => {
      const enemyMove = x[0];
      const outcome = x[1];
      let score = outcome === "X" ? 0 : outcome === "Y" ? 3 : 6;
      score += calculateMovePoints(enemyMove, outcome);
      return score;
    })
    .reduce((acc, a) => (acc += a), 0);
  return newMoves;
};
// A - ROCK 1POINT
// B - PAPER 2POINTS
// C - SCRISORS 3POINTS
//X - LOSE
// Y - DRAW
// Z - WIN
const calculateMovePoints = (enemyMove, outcome) => {
  let points = 0;
  switch (outcome) {
    case "X": {
      enemyMove === "A"
        ? (points = 3)
        : enemyMove === "B"
        ? (points = 1)
        : (points = 2);
      break;
    }
    case "Y": {
      enemyMove === "A"
        ? (points = 1)
        : enemyMove === "B"
        ? (points = 2)
        : (points = 3);
      break;
    }
    case "Z": {
      enemyMove === "A"
        ? (points = 2)
        : enemyMove === "B"
        ? (points = 3)
        : (points = 1);
      break;
    }
  }
  return points;
};

async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc2.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const moves = [];
  for await (const line of rl) {
    const splittedLine = line.split(" ");
    moves.push([splittedLine[0], splittedLine[1]]);
  }
  console.log(calculatePoints(moves));
}

processLineByLine();
