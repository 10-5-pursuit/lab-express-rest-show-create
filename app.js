// DEPENDENCIES
const express = require("express");
const logsController = require("./controllers/logsController");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (req, res) => {
    res.send("WELCOME TO THE CAPTAIN'S LOG");
});

app.use("/logs", logsController);

// 404 PAGE 
app.get("*", (req, res) => {
    res.status(404).json("Page not found");
});

// EXPORT
module.exports = app;