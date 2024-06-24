const express = require("express");
const logsController = require("./controllers/logsController");

// Create an instance of the express server
const app = express();

// Middleware
//express.json() tells our app to accept incoming JSON from requests (POST and PUT)
app.use(express.json()); //parse inco

// Whenever the URL starts with: localhost:4001/bookmarks -- hand the request off the bookmarksController to route it appropriately
app.use("/logs", logsController);

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Captains Log");
});

module.exports = app;
