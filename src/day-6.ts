import fs from "fs";

const main = () => {
  // const logicRegex = /do\(\)([\s\S]*?)don't\(\)/g
  // const regex = /mul\([0-9]+,[0-9]+\)/g
  let map = fs
    .readFileSync("./src/day-6.txt")
    .toString()
    .split("\n")
    .map((row) => row.split(""));
  // .map(x => parseInt(x)))
  // .match(logicRegex)

  let loopCount = 0;

  // let count = Object.keys(positions).reduce((acc, key) => {
  //   acc += positions[key].size;
  //   return acc;
  // }, 0);

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#" || map[y][x] === "^") {
        continue;
      } 
      let obstacleMap = JSON.parse(JSON.stringify(map));
      obstacleMap[y][x] = "#";
      // console.log(obstacleMap)
      // obstacleMap.forEach(element => {
      //   console.log(element.join(''))
      // });
      if (isLoop(obstacleMap)) {
        loopCount++;
      }
    }
  }

  console.log(loopCount);
};

const isLoop = (map) => {
  let positions = {};
  let currentPosition = findGuard(map);
  let finished = false;
  let isLoop = false;
  let direction = "up";
  // addPosition(positions, currentPosition, direction);
  positions[`${currentPosition[0]}:${currentPosition[1]}`] = direction;

  const tryMove = (desiredPosition) => {
    let canMoveResult = canMove(map, desiredPosition);
    if (canMoveResult === 1) {
      currentPosition = desiredPosition;
      if (
        positions[`${currentPosition[0]}:${currentPosition[1]}`] === direction
      ) {
        console.log("Loop detected", currentPosition, direction);
        isLoop = true;
        finished = true;
      } else {
        positions[`${currentPosition[0]}:${currentPosition[1]}`] = direction;
      }
    } else if (canMoveResult === 0) {
      // Blocked by wall, turn right
      switch (direction) {
        case "up":
          direction = "right";
          break;
        case "down":
          direction = "left";
          break;
        case "left":
          direction = "up";
          break;
        case "right":
          direction = "down";
          break;
      }
    } else {
      console.log("Ended movement", currentPosition, direction);
      finished = true;
    }
  };

  while (!finished) {
    // console.log(currentPosition);
    switch (direction) {
      case "up":
        tryMove([currentPosition[0], currentPosition[1] - 1]);
        break;
      case "down":
        tryMove([currentPosition[0], currentPosition[1] + 1]);
        break;
      case "left":
        tryMove([currentPosition[0] - 1, currentPosition[1]]);
        break;
      case "right":
        tryMove([currentPosition[0] + 1, currentPosition[1]]);
        break;
    }
  }
  return isLoop;
};

// const tryMove = (
//   map,
//   currentPosition,
//   desiredPosition,
//   positions,
//   direction,
//   finished
// ) => {
//   let canMoveResult = canMove(map, desiredPosition);
//   if (canMoveResult === 1) {
//     console.log("Can move, moving to", desiredPosition);
//     currentPosition = desiredPosition;
//     addPosition(positions, currentPosition);
//   } else if (canMoveResult === 0) {
//     // Blocked by wall, turn right
//     switch (direction) {
//       case "up":
//         direction = "right";
//         break;
//       case "down":
//         direction = "left";
//         break;
//       case "left":
//         direction = "up";
//         break;
//       case "right":
//         direction = "down";
//         break;
//     }
//   } else {
//     console.log("Ended movement", currentPosition, direction);
//     finished = true;
//   }
// };

const canMove = (map, desiredPosition) => {
  if (
    desiredPosition[1] < 0 ||
    desiredPosition[1] >= map.length ||
    desiredPosition[0] < 0 ||
    desiredPosition[0] >= map[0].length
  ) {
    return -1; // out of bounds
  } else if (map[desiredPosition[1]][desiredPosition[0]] === "#") {
    return 0; // hit a wall
  } else {
    return 1; // can move
  }
};

// const addPosition = (positions, currentPosition, direction) => {
//   if (positions[currentPosition[0]]) {
//     positions[currentPosition[0]].add(currentPosition[1]);
//   } else {
//     positions[currentPosition[0]] = new Set([currentPosition[1]]);
//   }
// };

const findGuard = (map) => {
  let yPos = map.findIndex((row) => row.includes("^"));
  let xPos = map[yPos].findIndex((col) => col === "^");
  return [xPos, yPos];
};

main();

export default main;
