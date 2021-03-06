export default {
    getContestTimeType(type, totalTime) {
        if (type == 1 || type == 3) {
            let time = totalTime/1000
            let h = Math.floor(time/3600)
            let m = Math.floor(time/60)
            return '限时'+h+'时'+m+'分'
        } else {
            return '到比赛结束'
        }
    },
    getContestType(type) {
        if (type == 0 || type == 1) {
            return '普通比赛'
        } else {
            return 'ACM比赛'
        }
    },
    convertProblemStatus(text) {
        switch(text) {
            case 'AC':
                return 'Accepted'
            case 'WA':
                return 'Wrong Answer'
            case 'RTE':
                return 'Runtime Error'
            case 'TLE':
                return 'Time Limit Excceed'
            case 'CE':
                return 'Compile Error'
            default:
                return 'Server Error'
        }
    },
    getProblemStatusColor(text) {
        switch(text) {
            case 'AC':
                return '#4bc0c0'
            case 'WA':
                return '#ff6384'
            case 'RTE':
                return '#ffcd56'
            case 'TLE':
                return '#36a2eb'
            case 'CE':
                return '#ff9f40'
            default:
                return '#ed3f14'
        }
    },
    getACRate(ACTimes, totalTimes) {
        if (totalTimes == 0) {
            return '0.00%'
        } else {
            totalTimes = parseFloat(totalTimes)
            ACTimes = parseFloat(ACTimes)
            return ((ACTimes/totalTimes)*100).toFixed(2)+'%'
        }
    }
}