const express = require('express');
const logsController = require('./controllers/logsController');
const app = express();




app.get('/', (req, res) => {
    res.send("welcome to the captain's log")
})

app.use(express.json())

app.use('/logs', logsController);

app.get('*', (req, res) => {
    res.status(404).send('Error invalid route')
})

module.exports = app;