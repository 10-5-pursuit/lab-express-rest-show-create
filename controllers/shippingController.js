const express = require('express')

const shippingInfoArray = require('../models/shippingInfo.model')

const logs = express.Router()

logs.get('/', ( req, res ) => {
    res.json(shippingInfoArray)
})

logs.get('/:index', (req, res) => {

    const { index } = req.params

    if(parseInt(index) && parseInt(index) <= shippingInfoArray.length) {
        res.json(shippingInfoArray[index])
    } else {
        res.status(404).json({error: "No Shipping Information Found!"})
    }

})

module.exports = logs