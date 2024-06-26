const express = require('express');
const logs = express.Router();
const logsData = require('../models/logs');
const {checkForCorrectFormat, checkForinvalidIndex} = require('../validations/logsValidation');

//INDEX
logs.get('/', (req, res) => {
    res.json(logsData);
});


//SHOW
logs.get('/:id', (req, res) => {
    const { id } = req.params;
    if(id > logsData.length-1){
        // res.status(404).json({error: "Page Not Found"});
        res.redirect('/logs');
    }else{
        res.json(logsData[id]);
    }
});


//CREATE
logs.post('/', checkForCorrectFormat, (req, res) => {
    logsData.push(req.body);
    // res.json(logsData);
    res.json(logsData[logsData.length-1]);
});


//UPDATE
logs.put('/:id', checkForinvalidIndex, (req, res) => {
        const { id } = req.params;
        logsData[id] = req.body;
        res.status(200).json(logsData[id]);
        // res.json(logsData);
    });


//DELETE
logs.delete('/:id', checkForinvalidIndex, (req, res) => {
    const { id } = req.params;
    if (logsData[id]) {
        logsData.splice(id, 1);
        // res.json({ message: "Successfully deleted a log" });
        res.json(logsData);
    } else {
        res.json({ error: "Log Not Found" });
    }
});


module.exports = logs;
