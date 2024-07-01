const express = require('express');
const captains = express.Router();
const captainsArray = require('../models/captains');

captains.get('/', (req, res) => {
    res.json(captainsArray);
});

captains.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if(captainsArray[arrayIndex]) {
        res.status(200).json(captainsArray[arrayIndex]);
    } else {
        res.redirect('/*');
    };
});

captains.post('/', (req, res) => {
    captainsArray.push(req.body)
    res.json(captainsArray[captainsArray.length - 1]);
});

captains.delete('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if(captainsArray[arrayIndex]) {
        const deletedCaptain = captainsArray.splice(arrayIndex, 1);
        res.json(deletedCaptain[0]);
    } else {
        res.redirect('/*');
    };
});

captains.put('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    captainsArray[arrayIndex] = req.body;
    res.status(200).json(captainsArray[arrayIndex]);
});

module.exports = captains;