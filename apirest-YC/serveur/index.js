// Setting up dependencies
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");

// Configurations
require("dotenv").config();
require("./src/utils/mongoose");
require("express-async-errors");

// Express app setup
const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(cors());
app.use(express.json()); 

// Router setup
const apiRouter = express.Router();
app.use("/api", apiRouter);
require("./src/controllers")(app, apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(statusCode, message);

  res.status(statusCode).json({
    code: err.code || "SERVER_ERROR",
    message: message,
  });
});

// Server activation
const port = process.env.APP_PORT || 3000; 
server.listen(port, () => {
  console.log(`API is up and running at http://localhost:${port}`);
});
