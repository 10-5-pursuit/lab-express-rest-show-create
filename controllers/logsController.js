const express = require("express");
const captains = express.Router();
const captainsArray = require("../models/sampleData");

// INDEX
captains.get("/", (req, res) => {
    let sortedCaptains = [];
    if (req.query.order === "asc"){
        sortedCaptains = captainsArray.sort((x, y) => { 
            x = x.captainName.toLowerCase();
            y = y.captainName.toLowerCase();
            if(x > y) return 1;
            else return -1;
        })
    } else if (req.query.order === "desc"){
        sortedCaptains = captainsArray.sort((x, y) => { 
            x = x.captainName.toLowerCase()
            y = y.captainName.toLowerCase();
            if(x < y) return 1;
            else return -1;
        })
    }
    res.json(sortedCaptains);
})

module.exports = captains;