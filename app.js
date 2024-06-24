const express = require('express')
const logsController = require('./controllers/logsController')

//Line below initializes the server
const app = express()

//Middleware
app.use(express.json())
app.use('/logs', logsController)


//represents localhost:4006
app.get('/', (req, res) => {
    res.send(`Welcome to the Captain's Log`)
})

module.exports = app

