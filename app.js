const express = require('express')

const ShippingController = require('./controllers/shippingController')

const app = express()

app.get('/', ( req,res )=> {
    res.send('Welcome to REST SHOW and Create!')

})

app.use('/logs', ShippingController)



app.use((req, res) => {

    res.status(404).send('<h1> No appropriate Directory Found! </h1>')

})



module.exports = app