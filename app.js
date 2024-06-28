const express = require('express')

const logController = require('./controllers/logsController')

const app = express()

app.use(express.json())

app.get('/', ( req,res )=> {
    res.send("welcome to the captain's log!")

})

app.use('/logs', logController)



app.get('*', (req, res) => {
    res.status(404).json( { error: "404 Page Not Found" })
})



module.exports = app