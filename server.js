// Dependancies
const express = require('express');
const app = require('./app');

require('dotenv').config();
const PORT  = process.env.PORT;

app.listen(PORT, (req, res) => {
    console.log(`Listening to server on port ${PORT}`)
})