import fs from'fs'

const main = () => {

    const logicRegex = /do\(\)([\s\S]*?)don't\(\)/g
    const regex = /mul\([0-9]+,[0-9]+\)/g
    let calls = fs.readFileSync('./src/day-3.txt')
    .toString()
    // .split("\n")
    // .map((report) => report.split(' ')
    // .map(x => parseInt(x)))
    .match(logicRegex)

    calls.push('<,:[*where()%mul(53,612)!^}&mul(3,518)??$~select()>??]mul(245,515),why()who()*@from()(where(242,190)mul(817,764)^select(),+who(851,301)where())from(){;mul(431,780)mul(110,982)what()what()]mul(441,829)??where()mul(269,112)>when()?who()<mul(131,147))}]what()^~)mul(186,137)when()\'when(443,998)when()+-^what(770,821)?mul(742,949)>$**#!@mul(343,569),;what()from(){(;}mul(486,404)why()]#~when()%@')

    console.log(calls.length)

    let parsed = calls.reduce((acc, curr) => {
        return [...acc, ...curr.match(regex)]
    }, [])

    console.log(parsed[parsed.length-2])

    let total = 0;
    for(let i =0; i<parsed.length; i++) {
        let numbers = parsed[i].split(/mul\(|\)|,/g).reduce((acc, curr) => {
            if(curr !== '') {
                acc.push(parseInt(curr))
            }
            return acc
        }, [])
        total += numbers[0] * numbers[1]
    }
    console.log(total)
}


main()


export default main