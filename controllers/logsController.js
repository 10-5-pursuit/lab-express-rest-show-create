const express = require('express')

const logs = express.Router()

const logsArray = require('../models/log')


const { validateQueryOption } = require('../validations/logsValidations')


logs.get('/', (req, res) => {
    const option = req.query;
    if(Object.keys(option).length===0){
        res.json(logsArray)
    }else{
        const result = validateQueryOption(option,logsArray)
        res.json(result)
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

logs.put("/:idx", (req, res) => {
    const { idx } = req.params
    logsArray[idx] = req.body
    res.status(200).json(logsArray[idx])
})

logs.delete('/:idx', (req,res)=>{
    const { idx } = req.params;
    if(logsArray[idx]){
        logsArray.splice(idx,1)
        res.redirect("/logs")
    }else{
        res.status(404).json({error: "Invalid Index"})
    }
    
})




module.exports = logs