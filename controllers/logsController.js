const express = require('express');
const logsArray = require('../models/log');
const logs = express.Router();

logs.get('/', (req, res) => {
    res.json(logsArray)
})

logs.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if(logsArray[arrayIndex]){
        res.json(logsArray[arrayIndex]);
    } else {
        res.status(404).redirect('/error')
    }
});

logs.post('/', (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length -1])
})

module.exports = logs