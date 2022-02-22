const express = require("express");
const app = express();

const connection = require("./config/db");
const logger = require("../logger/logger");

// database connection
connection();

// controllers and middlewares
const auth = require("./controllers/auth.controller");
const chat = require("./controllers/chat.controller");

const user = require("./routes/user")

// global middlewares
app.use(express.json());

app.use((req, res, next) => {
  logger.log(`PATH: ${req.path}`, 0);
  next();
});

// app routes
app.use("/auth", auth);
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
