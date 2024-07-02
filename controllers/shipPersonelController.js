const express = require('express');
const personelData = require('../models/shipPersonel');
const { invalidIndex, validation } = require('../helpers/helpers');

const personel = express.Router();

personel.get('/', (req, res) => {
    if (personelData) {
        res.status(200).json(personelData);
    } else {
        res.status(400).json({ error: "Data not found" });
    }
});

personel.get('/:arrayIndex', invalidIndex, (req, res) => {
    const { arrayIndex } = req.params;
    if (personelData[arrayIndex]) {
        res.status(200).json(personelData[arrayIndex]);
    } else {
        res.status(404).json({ error: "Index to get, not found" });
    }
});

personel.post('/', validation, (req, res) => {
    if (personelData) {
        personelData.push(req.body);
        res.status(201).json(personelData[personelData.length - 1]);
    } else {
        res.status(400).json({ error: 'Nothin to post into. Data not found' });
    }
});

personel.delete('/:arrayIndex', invalidIndex, (req, res) => {
    const { arrayIndex } = req.params;

    if (personelData[arrayIndex]) {
        const deletedPerson = personelData.splice(arrayIndex, 1);
        res.status(200).json(deletedPerson);
    } else {
        res.status(400).json({ error: 'Index to delete, not found' });
    }
});

personel.put('/:arrayIndex', invalidIndex, validation, (req, res) => {
    const { arrayIndex } = req.params;

    if (personelData[arrayIndex]) {
        personelData[arrayIndex] = req.body;
        res.status(200).json(personelData[arrayIndex]);
    } else {
        res.status(400).json({ error: 'Index to update, not found' });
    }
});

module.exports = personel;