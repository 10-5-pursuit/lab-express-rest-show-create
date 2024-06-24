const express = require("express");
// Create an instance of our express Router that our server can use to route appropriately
const logs = express.Router();

// Import the logs model
const logsArray = require("../models/log");

// Index Routes: gets all of the logs
// localhost:4001/logs/
logs.get("/", (req, res) => {
  res.json(logsArray);
});

//SHOW Route: gets ONE of the logs
logs.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logsArray[arrayIndex]) {
    res.status(200).json(logsArray[arrayIndex]);
  } else {
    res.redirect("/logs");
  }
});

// POST CREATE/Route: creates a new log and adds it to our array
// Uses req.body to get information from the request to create a new log
// localhost:4001/logs

logs.post("/", (req, res) => {
  logsArray.push(req.body);
  res.status(201).json(logsArray[logsArray.length - 1]);
}); // this will always add the item to the end of the array

// PUT Route: updates a log
logs.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logsArray[arrayIndex]) {
    logsArray[arrayIndex] = req.body;
    res.status(200).json(logsArray[arrayIndex]);
  } else {
    res.status(418).json({ error: "Not Found" });
  }
});

// DELETE Route: deletes a log
logs.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logsArray[arrayIndex]) {
    let deletedLog = logsArray.splice(arrayIndex, 1);
    res.status(200).json(deletedLog[0]);
  } else {
    res.status(418).json({ error: "Not Found" });
  }
});

module.exports = logs;
