const express = require('express')
const logs = express.Router();
//needed for us to utilize express
const logarr = require('../models/captinlog');

logs.get('/',(req,res)=>{
    res.json(logarr)
})

logs.get('/:arrayIndex', (req, res)=>{
    const{ arrayIndex } =req.params

if(logarr[arrayIndex]){
    res.json(logarr[arrayIndex])
}else{
    res.status(404).json({ error: "Log Unfound" });
}
})

logs.post('/',(req, res)=>{
    logarr.push(req.body);

    res.status(201).json(logarr[logarr.length - 1])
});



module.exports = logs;