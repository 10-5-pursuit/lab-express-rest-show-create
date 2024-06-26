const express = require('express')
//Creates an instance of the Router that will "serve" our server to route appropriately
const logs = express.Router()

const logsArray = require('../models/log')

//Index Route
//represents localhost:4006/logs/
logs.get('/', (req, res) => {
    const { order, mistakes, lastCrisis } = req.query
    console.log(order)
    if(order === "asc"){
    logsArray.sort((a, b) => 
         a.captainName.localeCompare(b.captainName) 
        )
    } else if (order === "desc"){
        logsArray.sort((a,b) => 
        b.captainName.localeCompare(a.captainName)
        )
    }

    if(mistakes === "true"){
        logsArray.filter()
    }
    //console.log(req.query, order)
    res.json(logsArray)
})

//Show Route
logs.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params
    if(logsArray[arrayIndex]){
    res.json(logsArray[arrayIndex])
} else {
    res.redirect("/logs")
}
})

//localhost:4006/logs
logs.post('/', (req, res) => {
    logsArray.push(req.body)
    res.json(logsArray[logsArray.length - 1])
})

//Delete
logs.delete('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params
    if(logsArray[arrayIndex]) {
        const deletedLogs = logsArray.splice(arrayIndex, 1)
        res.json(deletedLogs)
    } else {
        res.json({error:"Log Not Found"})
    }
})

//PUT = UPDATE
logs.put("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params
    logsArray[arrayIndex] = req.body
    res.status(218).json(logsArray[arrayIndex])
})

module.exports = logs