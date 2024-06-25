const express = require('express')

//controllers

const logsController = require('./controllers/logsController')

//instance
const app = express()

//Middleware
app.use(express.json())

app.use('/logs', logsController)


// Home Route
app.get('/', (req, res) => {
    res.send("Welcome to the captain's log!")
})

app.get('*', (req, res) =>{
    res.status(404).json({ error: "404 Page Not Found" })
})



module.exports = app