const express = require('express')

const logController = require('./controllers/logsController')

const app = express()

app.use(express.json())

app.get('/', ( req,res )=> {
    res.send("welcome to the captain's log!")

})

app.use('/logs', logController)



app.use((req, res) => {

    res.status(404).send('<h1> No appropriate Directory Found! </h1>')

})



module.exports = app