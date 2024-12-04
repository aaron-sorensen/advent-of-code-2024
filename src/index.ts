import fs from'fs'

const main = () => {

    // const logicRegex = /do\(\)([\s\S]*?)don't\(\)/g
    // const regex = /mul\([0-9]+,[0-9]+\)/g
    let rows = fs.readFileSync('./src/day-4.txt')
    .toString()
    .split("\n")
    // .map((report) => report.split(' ')
    // .map(x => parseInt(x)))
    // .match(logicRegex)

    const wordSearch = rows.map((row) => row.split(''))

    // console.log(wordSearch)

    const map = {}
    let count = 0

    for(let x = 0; x < wordSearch[0].length; x++) {
        for(let y = 0; y < wordSearch.length; y++) {
            if(checkXMas(wordSearch, x, y)){
                count += 1
            }
        }
    }

    // console.log(map['XMAS'] + map['SAMX'])
    console.log(count)
}

const addToMap = (map, key) => {
    if (map[key]) {
        map[key]++
    } else {
        map[key] = 1
    }
}

const nSearch = (map, wordSearch, x, y) => { 
    if(y < 3) {return}
    addToMap(map, wordSearch[y][x] + wordSearch[y-1][x] + wordSearch[y-2][x] + wordSearch[y-3][x])
}

const nwSearch = (map, wordSearch, x, y) => { 
    if(y < 3 || x < 3) {return}
    addToMap(map, wordSearch[y][x] + wordSearch[y-1][x-1] + wordSearch[y-2][x-2] + wordSearch[y-3][x-3])
}

const swSearch = (map, wordSearch, x, y) => { 
    if(y > wordSearch.length - 4 || x < 3) {return}
    addToMap(map, wordSearch[y][x] + wordSearch[y+1][x-1] + wordSearch[y+2][x-2] + wordSearch[y+3][x-3])
}

const wSearch = (map, wordSearch, x, y) => { 
    if(x < 3) {return}
    addToMap(map, wordSearch[y][x] + wordSearch[y][x-1] + wordSearch[y][x-2] + wordSearch[y][x-3])
}

const checkXMas = (wordSearch, x, y) => { 
    if(x < 1 || x > wordSearch[0].length - 2 || y < 1 || y > wordSearch.length - 2) {return}
    if(wordSearch[y][x] === 'A') {
        let left = wordSearch[y-1][x-1] + wordSearch[y][x] + wordSearch[y+1][x+1]
        let right = wordSearch[y+1][x-1] + wordSearch[y][x] + wordSearch[y-1][x+1]
        if(isXMas(left) && isXMas(right)) {
            return true
        }
    }
}

const isXMas = (word) => { 
    return word === 'MAS' || word === 'SAM'
}

// const sSearch = (map, wordSearch, x, y) => { 
//     if(y > wordSearch.length - 4) {return}
//     addToMap(map, wordSearch[y][x] + wordSearch[y+1][x] + wordSearch[y+2][x] + wordSearch[y+3][x])
// }

// const eSearch = (map, wordSearch, x, y) => { 
//     if(x > wordSearch[0].length - 4) {return}
//     addToMap(map, wordSearch[y][x] + wordSearch[y][x+1] + wordSearch[y][x+2] + wordSearch[y][x+3])
// }


main()


export default main