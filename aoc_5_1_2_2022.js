const fs = require('fs');
const readline = require('readline');
const part1 = (commandValues,stack) =>{
      commandValues.forEach((x)=>{
    const [numbOfItems,from,to] = x;
    for (let i=0;i<numbOfItems;i++) {
        const removedItem = stack[from].shift();
        stack[to].unshift(removedItem)
    }
  })
  return stack.map((x)=>{
    return x[0];
  }).join('');
}
const part2 = (commandValues,stack) =>{
    commandValues.forEach((x)=>{
    const [numbOfItems,from,to] = x;
        const slicedItems = stack[from].splice(0,numbOfItems);
        stack[to].unshift(...slicedItems);
  })
  return stack.map((x)=>{
    return x[0];
  }).join('');
}
async function processLineByLine() {
  const fileStream = fs.createReadStream('aoc5.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const stack1 = ['S','L','F','Z','D','B','R','H'];
  const stack2 = ['R','Z','M','B','T'];
  const stack3 = ['S','N','H','C','L','Z'];
  const stack4 = ['J','F','C','S'];
  const stack5 = ['B','Z','R','W','H','G','P'];
  const stack6 = ['T','M','N','D','G','Z','J','V'];
  const stack7 = ['Q','P','S','F','W','N','L','G'];
  const stack8 = ['R','Z','M'];
  const stack9 = ['T','R','V','G','L','C','M'];
  const stack = [stack1,stack2,stack3,stack4,stack5,stack6,stack7,stack8,stack9];
  const commandValues =[];
  let readValues = false;
  for await (const line of rl) {
    if(line==="") readValues=true;
    if(readValues&&line!==""){
        const splittedLine = line.split(' ');
        commandValues.push([splittedLine[1],splittedLine[3]-1,splittedLine[5]-1])
    }
    }
    console.log(part1(commandValues,JSON.parse(JSON.stringify(stack))))
    console.log(part2(commandValues,JSON.parse(JSON.stringify(stack))))
}

processLineByLine();