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

logs.delete('/:index', (req, res)=>{
    const { index } = req.params

    if(logsArray[index]) {
        logsArray.splice(index, 1)
        res.status(200).json({message: 'Successfully removed Captains Log'})
    } else {
        res.status(404).json({error: "Captain Log Not Found!"})
    }

})

module.exports = logs