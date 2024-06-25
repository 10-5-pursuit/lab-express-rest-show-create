const express = require('express');
const router = express.Router();
let logs = require('../models/logs');

// Index Route
router.get('/', (req, res) => {
    res.json(logs);
});

// Show Route
router.get('/:id', (req, res) => {
    const logIndex = req.params.id;
    if (logs[logIndex]) {
        res.json(logs[logIndex]);
    } else {
        res.redirect('/404');
    }
});

// Create Route
router.post('/', (req, res) => {
    const newLog = req.body;
    logs.push(newLog);
    res.status(303).location('/logs').json(newLog);
});

module.exports = router;
