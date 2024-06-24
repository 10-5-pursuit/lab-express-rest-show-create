const express = require('express');
const captainsController = require('./controllers/captainsController')

const app = express();



app.get('/', (req, res) => {
    res.send(`Welcome to the captain's log`);
});

app.use(express.json());
app.use('/captains', captainsController)

app.get('*', (req, res) => {
    res.status(404).send(' error: Route cannot be found')
})

module.exports = app;