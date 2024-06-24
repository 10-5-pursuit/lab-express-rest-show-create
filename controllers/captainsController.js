const express = require('express');
const captains = express.Router();
const captainsArray = require('../models/captains');

captains.get('/', (req, res) => {
    res.json(captainsArray);
});

captains.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if(captainsArray[arrayIndex]){
        res.status(200).json(captainsArray[arrayIndex])
    } else {
        res.status(404).json( {error: `Doesn't exist`});
    }
})

captains.post('/', (req, res) => {
    captainsArray.push(req.body)
    res.json(captainsArray[captainsArray.length - 1]);
})

module.exports = captains;