const express = require('express');
const personelData = require('../models/shipPersonel');

const personel = express.Router();

personel.get('/', (req, res) => {
    if (personelData) {
        res.status(200).json(personelData);
    } else {
        res.status(400).json({ error: "Data not found" });
    }
});

personel.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if (personelData[arrayIndex]) {
        res.status(200).json(personelData[arrayIndex]);
    } else {
        res.status(404).json({ error: "Data not found" });
    }
});

personel.post('/', (req, res) => {
    if (
        'captainName' in req.body && typeof req.body.captainName !== 'string' ||
        'title' in req.body && typeof req.body.title !== 'string' ||
        'post' in req.body && typeof req.body.post !== 'string' ||
        'mistakesWereMadeToday' in req.body && typeof req.body.mistakesWereMadeToday !== 'boolean' ||
        'daysSinceLastCrisis' in req.body && typeof req.body.daysSinceLastCrisis !== 'number'
    ) {
        res.status(400).json({ error: 'Data type is not valid' });
    } else {
        personelData.push(req.body);
        res.status(200).json(personelData[personelData.length - 1]);
    }
});

module.exports = personel;