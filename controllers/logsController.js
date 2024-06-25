// const express = require("express");
// // Create an instance of our express Router that our server can use to route appropriately
// const logs = express.Router();

// // Import the logs model
// const logsArray = require("../models/log");

// // Index Routes: gets all of the logs
// // localhost:4001/logs/
// logs.get("/", (req, res) => {
//   res.json(logsArray);
// });

// //SHOW Route: gets ONE of the logs
// logs.get("/:arrayIndex", (req, res) => {
//   const { arrayIndex } = req.params;
//   if (logsArray[arrayIndex]) {
//     res.status(200).json(logsArray[arrayIndex]);
//   } else {
//     res.redirect("/logs");
//   }
// });

// // POST CREATE/Route: creates a new log and adds it to our array
// // Uses req.body to get information from the request to create a new log
// // localhost:4001/logs

// logs.post("/", (req, res) => {
//   logsArray.push(req.body);
//   res.status(201).json(logsArray[logsArray.length - 1]);
// }); // this will always add the item to the end of the array

// // PUT Route: updates a log
// logs.put("/:arrayIndex", (req, res) => {
//   const { arrayIndex } = req.params;
//   if (logsArray[arrayIndex]) {
//     logsArray[arrayIndex] = req.body;
//     res.status(200).json(logsArray[arrayIndex]);
//   } else {
//     res.status(418).json({ error: "Not Found" });
//   }
// });

// // DELETE Route: deletes a log
// logs.delete("/:arrayIndex", (req, res) => {
//   const { arrayIndex } = req.params;
//   if (logsArray[arrayIndex]) {
//     let deletedLog = logsArray.splice(arrayIndex, 1);
//     res.status(200).json(deletedLog[0]);
//   } else {
//     res.status(418).json({ error: "Not Found" });
//   }
// });

// module.exports = logs;

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

logs.get("/", (req, res) => {
  let filteredLogs = [...logsArray];

  // Handle sorting by order (alphabetical or reverse alphabetical)
  if (req.query.order) {
    if (req.query.order === "asc") {
      filteredLogs.sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        return 0; // If either title is undefined, do not change order
      });
    } else if (req.query.order === "desc") {
      filteredLogs.sort((a, b) => {
        if (a.title && b.title) {
          return b.title.localeCompare(a.title);
        }
        return 0; // If either title is undefined, do not change order
      });
    }
  }

  // Handle mistakes filtering
  if (req.query.mistakes) {
    const mistakesFilter = req.query.mistakes === "true";
    filteredLogs = filteredLogs.filter(
      (log) => log.mistakesWereMadeToday === mistakesFilter
    );
  }

  // Handle daysSinceLastCrisis filtering
  if (req.query.lastCrisis) {
    const filter = req.query.lastCrisis;
    const condition = filter.substring(0, filter.search(/\d/));
    const value = parseInt(filter.substring(filter.search(/\d/)), 10);

    if (condition === "gt10") {
      filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis > 10);
    } else if (condition === "gte20") {
      filteredLogs = filteredLogs.filter(
        (log) => log.daysSinceLastCrisis >= 20
      );
    } else if (condition === "lte5") {
      filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis <= 5);
    }
  }

  res.json(filteredLogs);
});

// SHOW Route: gets ONE of the logs
logs.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logsArray[arrayIndex]) {
    res.status(200).json(logsArray[arrayIndex]);
  } else {
    res.redirect("/logs");
  }
});

// POST CREATE/Route: creates a new log and adds it to our array
logs.post("/", (req, res) => {
  logsArray.push(req.body);
  res.status(201).json(logsArray[logsArray.length - 1]);
});

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
