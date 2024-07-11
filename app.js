// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const logsController = require('./controllers/logsController');
const logsV2Controller = require('./controllers/v2/logsController'); 

// Enable CORS for all origins (for development)
app.use(cors()); 

// Middleware
app.use(express.json());
app.use('/logs', logsController.router);
app.use('/v2/logs', logsV2Controller.router); // Set up v2 route

// Routes
app.get('/', (req, res) => {
  res.send("Welcome to the Captain's Log");
});

// 404 Route
app.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;
