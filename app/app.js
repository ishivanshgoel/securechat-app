const express = require("express");
const app = express();

const connection = require("./config/db");
const logger = require("../logger/logger");

// database connection
connection();

// global middlewares
app.use(express.json());

// controllers
const chat = require("./routes/chat");
const user = require("./routes/user")

app.use((req, res, next) => {
  logger.log(`PATH: ${req.path}`, 0);
  next();
});

// app routes
app.use("/chat", chat);
app.use("/user", user);

// error handler
app.use((err, req, res, next) => {
  logger.log(err.message, 2);

  res.send({
    error: {
      status: err.code || 500,
      message: err.message,
    },
  });
});

module.exports = app;
