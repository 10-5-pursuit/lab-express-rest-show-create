// server.js
const app = require('./app');

// loads in environment variables from .env
require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
