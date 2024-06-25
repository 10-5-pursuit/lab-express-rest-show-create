// const express = require("express");
// const logsController = require("./controllers/logsController");

// // Create an instance of the express server
// const app = express();

// // Middleware
// //express.json() tells our app to accept incoming JSON from requests (POST and PUT)
// app.use(express.json()); //parse inco

// // Whenever the URL starts with: localhost:4001/bookmarks -- hand the request off the bookmarksController to route it appropriately
// app.use("/logs", logsController);

// // Home Route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Captains Log");
// });

// module.exports = app;

const express = require("express");
const logsController = require("./controllers/logsController");
const logsControllerV2 = require("./v2/controllers/logsController");

// Create an instance of the express server
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/logs", logsController);
app.use("/v2/logs", logsControllerV2);

// Home Route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Captains Log");
// });

app.get("/", (req, res) => {
  // Adding HTML with inline CSS for styling
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
          }
          .welcome-message {
            margin-top: 100px;
            font-size: 24px;
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="welcome-message">
          Welcome to the Captain's Log
        </div>
      </body>
    </html>
  `);
});

module.exports = app;
