import fs from'fs'

const main = () => {
    let reports = fs.readFileSync('./src/day-2.txt')
    .toString()
    .split("\n")
    .map((report) => report.split(' ')
    .map(x => parseInt(x)))

    let safeReports = 0;

    for (let i = 0; i < reports.length; i++) {
        if (determineIfSafe(reports[i])) {
            safeReports++
        } else {
            for (let j = 0; j < reports[i].length; j++) {
                // zip through splices of array to determine if safe
                let subReport = [...reports[i]]
                subReport.splice(j, 1)
                if (determineIfSafe(subReport)) {
                    console.log(subReport)
                    console.log(`Report ${i}, is safe with ${reports[i][j]} removed`)
                    safeReports++
                    break
                }
            }
        }
    }
    console.log(safeReports)

}

const determineIfSafe = (report: number[]) => { 
    let direction = 0
    let safe = true
    for (let i =0; i < report.length-1; i++) {
        if (report[i] > report[i+1]) { // decreasing
            if(direction === 0) {
                direction = -1
            } 
            if (direction === 1 || Math.abs(report[i] - report[i+1]) > 3) {
                safe = false
                break
            } 
        } else if (report[i] < report[i+1]) { // increasing
            if(direction === 0) {
                direction = 1
            } 
            if (direction === -1 || Math.abs(report[i] - report[i+1]) > 3) {
                safe = false
                break
            } 
        } else {
            safe = false
        }
    }
    return safe
}

main()


export default main