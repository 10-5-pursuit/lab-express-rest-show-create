function validateQueryOption(obj, logsArray){
    if(obj.order){
        if (obj.order=='asc'){
            const sortLogs = logsArray.toSorted((a,b)=>a.title.localeCompare(b.title))
            return sortLogs
        }else if (obj.order=='desc'){
            const sortLogs = logsArray.toSorted((a,b)=>a.title.localeCompare(b.title))
            return sortLogs.reverse()
        }else{
            return {error: "Invalid Value"}
        }  
    }else if(obj.mistakes){
        if (obj.mistakes== 'true'){
            const sortLogs = logsArray.filter(log => log.mistakesWereMadeToday==true)
            return sortLogs
        }else if (obj.mistakes== 'false'){
            const sortLogs = logsArray.filter(log => log.mistakesWereMadeToday==false)
            return sortLogs.reverse()
        }else{
            return {error: "Invalid Value"}
        }

    }else if(obj.lastCrisis){
        // const word1 = obj.lastCrisis.slice(0,2)
        
        // if(word1 == 'gt' || word1 == 'lt'){
        //     const word2 = obj.lastCrisis.slice(0,3)
        //     if(word1 == 'gte' || word1 == 'lte'){
        //         const num = Number(obj.lastCrisis.slice(3))
        //     }
        // }else{
        //     return {error: "Invalid Value"}
        // }

        if (obj.lastCrisis== 'gt10'){
            const sortLogs = logsArray.filter(log => log.daysSinceLastCrisis>10)
            return sortLogs
        }else if (obj.lastCrisis== 'gte20'){
            const sortLogs = logsArray.filter(log => log.daysSinceLastCrisis>=20)
            return sortLogs.reverse()
        }else if (obj.lastCrisis== 'lte5'){
            const sortLogs = logsArray.filter(log => log.daysSinceLastCrisis<=5)
            return sortLogs.reverse()
        }
        else{
            return {error: "Invalid Value"}
        }

    }else {
        return {error: "Invalid Key"}
    }
}

module.exports = { validateQueryOption }