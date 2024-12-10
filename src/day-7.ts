import fs from "fs";

let operators = ['+', '*', '||']
const getPermutations = (count) => {
  // get all permutations of operators for count
  let permutations = []
  for (let i = 0; i < operators.length ** count; i++) {
    let permutation = []
    let num = i
    for (let j = 0; j < count; j++) {
      permutation.push(operators[num % operators.length])
      num = Math.floor(num / operators.length)
    }
    permutations.push(permutation)
  }
  return permutations
}

const main = async () => {
  const regex = /[0-9]+/g
  let input = fs
    .readFileSync("./src/day-7.txt")
    .toString()
    .split("\n")
    .map((row) => row.match(regex).map((num) => parseInt(num)))

    console.log(input)

    let totalCount = 0

    for(let i=0; i<input.length; i++) {
      let match = false
      let total = input[i][0]
      let nums = input[i].slice(1)
      let permutations = getPermutations(input[i].length - 2)
      for(let j=0; j<permutations.length; j++) {
        let permutation = permutations[j]
        let result = nums[0]
        for(let k=0; k<permutation.length; k++) {
          if(permutation[k] === '+') {
            result += nums[k+1]
          } else if(permutation[k] === '*') {
            result *= nums[k+1]
          } else {
            result = parseInt(`${result}${nums[k+1]}`)
          }
        }
        if(result === total && !match) {
          match = true
          console.log('match found', total)
          totalCount += total
        }
      }
    }

    console.log(totalCount)
};



main();

export default main;
