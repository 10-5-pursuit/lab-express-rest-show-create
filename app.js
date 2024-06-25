const express = require('express');
const app = express();
const logsController = require('./controllers/logsController');

app.use(express.json());

// Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to the Captain\'s Log');
});

// Logs Routes
app.use('/logs', logsController);

// 404 Route
app.get('*', (req, res) => {
    res.status(404).send('404: Page Not Found');
});

module.exports = app;
