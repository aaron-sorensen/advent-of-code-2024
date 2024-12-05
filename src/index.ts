import fs from "fs";

const main = () => {
  // const logicRegex = /do\(\)([\s\S]*?)don't\(\)/g
  // const regex = /mul\([0-9]+,[0-9]+\)/g
  let rows = fs.readFileSync("./src/day-5.txt").toString().split("\n");
  // .map((report) => report.split(' ')
  // .map(x => parseInt(x)))
  // .match(logicRegex)

  // Create a map of left number with array of right numbers it needs to come before
  // Start reading the line
  // Check the number in the map and see if there are any numbers in that maps array that have already been read
  // Add the number to the read list
  // If we make it to end of list then we're good and add middle number to the count

  let map = {};
  let printLines = [];
  let readPrintLines = false;

  rows.forEach((row) => {
    if (row === "") {
      readPrintLines = true;
    } else if (readPrintLines) {
      printLines.push(row.split(",").map((x) => parseInt(x)));
    } else {
      let values = row.split("|");
      if (map[values[0]] === undefined) {
        map[values[0]] = [parseInt(values[1])];
      } else {
        map[values[0]].push(parseInt(values[1]));
      }
    }
  });

  let count = 0;

  let incorrectLines = []

  printLines.forEach((printLine) => { 
    let processed: number[] = []
    let valid = true
    printLine.forEach(page => {
        // console.log('processing page', page)
        // console.log('map page', map[page])
        // console.log('processed', processed)
        if(map[page] && processed.some(x => map[page].includes(x))) {
            // console.log('not valid')
            valid = false
        }else {
            processed.push(page)
        }
    })
    if(!valid){
        incorrectLines.push(printLine)
    }
  })

  console.log(incorrectLines);

  incorrectLines.forEach((printLine) => { 
    let processed: number[] = []
    printLine.forEach(page => {
        // console.log('processing page', page)
        // console.log('map page', map[page])
        // console.log('processed', processed)
        if(map[page] && processed.some(x => map[page].includes(x))) {
            // find earliest index in processed that conflicts with map
            let conflictIndex = processed.findIndex(x => map[page].includes(x))
            // place page before that index
            processed.splice(conflictIndex, 0, page);
        }else {
            processed.push(page)
        }
    })
    console.log('processed', processed)
    count += processed[(processed.length - 1) / 2]
  })
  console.log(count)
};

main();

export default main;
