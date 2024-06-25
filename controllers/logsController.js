const express = require('express')

const logs = express.Router()

const logsArray = require('../models/log')


function validateQueryOption(obj){

}

logs.get('/', (req, res) => {
    const option = req.query;
    if(Object.keys(option).length===0){
        res.json(logsArray)
    }else{
        const result = validateQueryOption(option)
        res.send(option)
    }
})


logs.get('/:idx', (req,res) =>{
    const { idx } = req.params;
    if(logsArray[idx]){
        res.status(200).json(logsArray[idx]);
    }else{
        res.redirect('/error')
    }
})


logs.post('/',(req,res) =>{
    logsArray.push(req.body)
    res.json(logsArray[logsArray.length-1])
})




module.exports = logs