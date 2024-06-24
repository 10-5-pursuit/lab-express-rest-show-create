const express = require('express')

let logsArray = require('../models/log')

const logs = express.Router()

logs.get('/', ( req, res ) => {
    res.json(logsArray)
})

logs.get('/:index', (req, res) => {

    const { index } = req.params

    if(parseInt(index) && parseInt(index) <= logsArray.length) {
        res.json(logsArray[index])
    } else {
        res.redirect('/logs')
    }})

logs.post('/',( req,res ) => {

    logsArray.push(req.body)

    res.status(201).json(logsArray[ logsArray.length - 1 ])

})

module.exports = logs