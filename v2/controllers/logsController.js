const express = require("express");
const logs = express.Router();
const logsArray = require("../../models/log");

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
  let html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; display: flex; justify-content: center; }
          h1 { color: #333; text-align: center; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 10px 0; }
          a { text-decoration: none; color: #0066cc; }
          a:hover { text-decoration: underline; }
          .log-box { border: 1px solid #ccc; padding: 8px; border-radius: 5px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        </style>
      </head>
      <body>
        <div>
          <h1>Logs</h1>
          <ul>
  `;
  logsArray.forEach((log, index) => {
    html += `<li class="log-box"><a href="/v2/logs/${index}">${log.title}</a></li>`;
  });
  html += `
          </ul>
        </div>
      </body>
    </html>
  `;
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
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; display: flex; justify-content: center; }
          h1 { color: #333; text-align: center; }
          p { color: #555; }
          .log-details { border: 1px solid #ccc; padding: 20px; border-radius: 5px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; max-height:300px;}
          .back { margin-top: 20px; display: inline-block; }
          .back a { text-decoration: none; color: #0066cc; }
          .back a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="log-details">
          <h1>${log.title}</h1>
          <p>${log.post}</p>
          <p><strong>Captain Name:</strong> ${log.captainName}</p>
          <p><strong>Mistakes Were Made Today:</strong> ${log.mistakesWereMadeToday}</p>
          <p><strong>Days Since Last Crisis:</strong> ${log.daysSinceLastCrisis}</p>
          <div class="back"><a href="/v2/logs">Back</a></div>
        </div>
      </body>
    </html>
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
