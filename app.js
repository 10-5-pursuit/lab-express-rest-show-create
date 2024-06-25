const express = require('express');
const app = express()
const logsController = require('./controllers/logsController');
app.use(express.json());

app.use('/logs', logsController)

app.get('/', (req, res)=>{
    res.send ("Ahoy maytee Welcome to the captain's log");
});


module.exports = app;