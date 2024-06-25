const express = require("express");

const logs = express.Router();

// Import the logs model
const logsArray = require("../../models/log");

// Validation function
function validateLog(data) {
  const {
    captainName,
    title,
    post,
    mistakesWereMadeToday,
    daysSinceLastCrisis,
  } = data;

  if (typeof captainName !== "string") return "captainName must be a string";
  if (typeof title !== "string") return "title must be a string";
  if (typeof post !== "string") return "post must be a string";
  if (typeof mistakesWereMadeToday !== "boolean")
    return "mistakesWereMadeToday must be a boolean";
  if (typeof daysSinceLastCrisis !== "number")
    return "daysSinceLastCrisis must be a number";

  return null;
}

// HTML response for index
logs.get("/", (req, res) => {
  let html = "<ul>";
  logsArray.forEach((log, index) => {
    html += `<li><a href="/v2/logs/${index}">${log.title}</a></li>`;
  });
  html += "</ul>";
  res.send(html);
});

// HTML response for show
logs.get("/:index", (req, res) => {
  const { index } = req.params;
  const log = logsArray[index];

  if (!log) {
    return res.status(404).send("Log not found");
  }

  let html = `
    <h1>${log.title}</h1>
    <p>${log.post}</p>
    <p><strong>Captain Name:</strong> ${log.captainName}</p>
    <p><strong>Mistakes Were Made Today:</strong> ${log.mistakesWereMadeToday}</p>
    <p><strong>Days Since Last Crisis:</strong> ${log.daysSinceLastCrisis}</p>
    <a href="/v2/logs">Back</a>
  `;
  res.send(html);
});

// POST route to add new log
logs.post("/", (req, res) => {
  const error = validateLog(req.body);

  if (error) {
    return res
      .status(400)
      .send(`<p style="color:red;">${error}</p><a href="/v2/logs">Back</a>`);
  }

  logsArray.push(req.body);
  res
    .status(201)
    .send(
      `<p style="color:green;">Log added successfully!</p><a href="/v2/logs">Back</a>`
    );
});

// PUT Route: updates a log
logs.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const error = validateLog(req.body);

  if (error) {
    return res
      .status(400)
      .send(`<p style="color:red;">${error}</p><a href="/v2/logs">Back</a>`);
  }

  if (logsArray[arrayIndex]) {
    logsArray[arrayIndex] = req.body;
    res.status(200).json(logsArray[arrayIndex]);
  } else {
    res.status(418).json({ error: "Not Found" });
  }
});

module.exports = logs;
