const express = require('express');
const app = express();
const logData = require('./controllers/logsController');


app.use(express.json());
app.use("/logs", logData)

app.get('/', (req, res)=>{
    res.send("welcome to the captain's log.");
});

app.get("*",(req,res)=>{
    res.status(404).json({error: "Page Not Found"});
});

module.exports =  app ;