const app = require('./app')

//Load in environment varioables: process.env
require('dotenv').config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})