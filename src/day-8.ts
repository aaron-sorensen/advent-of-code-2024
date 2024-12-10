import fs from "fs";

const getAntiNode = (a, b) => {
  return { x: b.x - a.x, y: b.y - a.y};
};

const checkInBounds = (input, x, y) => {
  return x >= 0 && x < input[0].length && y >= 0 && y < input.length;
};

const main = async () => {
  let input = fs
    .readFileSync("./src/day-8.txt")
    .toString()
    .split("\n")
    .map((row) => row.split(""));

  let antennas = {};

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      let element = input[y][x];
      if (element !== ".") {
        if (!antennas[element]) {
          antennas[element] = [{ x, y }];
        } else {
          antennas[element].push({ x, y });
        }
      }
    }
  }

  console.log(antennas);

  let allAntennaCoordinates = {}

  Object.keys(antennas).forEach((key) => { 
    for(let i=0; i<antennas[key].length; i++) {
      let location = antennas[key][i]
      let newKey = `${location.x},${location.y}`
      allAntennaCoordinates[newKey] = true
    }})

  let map = {};

  for (let frequency in antennas) {
    let antennaPositions = antennas[frequency];
    for (let i = 0; i < antennaPositions.length; i++) {
      for (let j = 0; j < antennaPositions.length; j++) {
        if (i === j) {
          continue;
        }
        let antiNode = getAntiNode(antennaPositions[i], antennaPositions[j]);
        let location = {
          x: antennaPositions[i].x,
          y: antennaPositions[i].y
        };

        let inBounds = true;

        while (inBounds) {
          if (checkInBounds(input, location.x, location.y)) {
            console.log('looks good', location)
            if (!map[location.x]) {
              map[location.x] = [location.y];
            } else if(!map[location.x].some((y) => y === location.y)) {
              map[location.x].push(location.y);
            }
          } else {
            inBounds = false
            // console.log('---------------------')
            // console.log("out of bounds", location);
            // console.log('checking', antennaPositions[i])
            // console.log('against', antennaPositions[j])
            // console.log('with anntiNode', antiNode)
            // console.log('---------------------')
          }

          location = {
            x: location.x + antiNode.x,
            y: location.y + antiNode.y,
          };
        }






      }
    }
  }
  let count = 0;
  Object.keys(map).forEach((key) => { 
    count += map[key].length
  })

  console.log("count", count);
};

main();

export default main;
