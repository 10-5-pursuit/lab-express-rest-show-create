const express = require('express');
const personelController = require('./controllers/shipPersonelController');
const logsController = require('./v2/controllers/logsControllers');

const app = express();

app.use(express.json());

app.use('/personel', personelController);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Captain Log\'s App!');
});

app.get('*', (req, res) => {
    res.status(404).json({ error: "Data does not exist" });
});

module.exports = app;