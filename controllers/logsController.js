const express = require("express");
const captains = express.Router();
const logsArray = require("../models/log");

// INDEX
captains.get("/", (req, res) => {
    let sortedCaptains = [];
    if(!req.query.order){
        sortedCaptains = logsArray;
    } else if (req.query.order === "asc"){
        sortedCaptains = logsArray.sort((x, y) => { 
            x = x.captainName.toLowerCase();
            y = y.captainName.toLowerCase();
            if(x > y) return 1;
            else return -1;
        })
    } else if (req.query.order === "desc"){
        sortedCaptains = logsArray.sort((x, y) => { 
            x = x.captainName.toLowerCase()
            y = y.captainName.toLowerCase();
            if(x < y) return 1;
            else return -1;
        })
    }
    res.json(sortedCaptains);
})

captains.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
});

module.exports = captains;