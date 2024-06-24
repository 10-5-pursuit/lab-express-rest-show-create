const express = require('express')
//Creates an instance of the Router that will "serve" our server to route appropriately
const logs = express.Router()

const logsArray = require('../models/log')

//Index Route
//represents localhost:4006/logs/
logs.get('/', (req, res) => {
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

//Create Route

module.exports = logs