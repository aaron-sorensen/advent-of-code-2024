import fs from'fs'

const main = () => {
    let leftList = [], rightList = []
    fs.readFileSync('./src/day-1.txt').toString().split("\n").forEach(line => {
        leftList.push(parseInt(line.split('   ')[0]))
        rightList.push(parseInt(line.split('   ')[1]))
    });
    leftList.sort()
    rightList.sort()

    let total = 0;

    for(let i = 0; i< leftList.length; i++){
        const numberToCount = leftList[i]
        let count = 0;
        for(let j = 0; j< leftList.length; j++){
            if(rightList[j] === numberToCount){
                count++
            }
         }
         total += count * numberToCount

    }

    console.log(total)
}

main()


export default main