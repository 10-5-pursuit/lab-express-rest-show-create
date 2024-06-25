const express = require("express");
const captains = express.Router();
const logsArray = require("../models/log");

// SHOW
captains.get("/:arrayIndex", (req, res) => {
    const index = req.params.arrayIndex;
    if (index < 0 || index >= logsArray.length){
        res.redirect("/");
    }
    else {
        res.json(logsArray[index]);
    }
})

// INDEX
captains.get("/", (req, res) => {
    let sortedCaptains = [];
    if(!Object.keys(req.query).length){
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

// POST
captains.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
});

// DELETE
captains.delete("/:index", (req, res) => {
    const { index } = req.params;
    if (logsArray[index]){
      logsArray.splice(index, 1);
      res.redirect("/logs");
    } else {
      res.status(404).json({ error: "Not Found" })
    }
  });

module.exports = captains;