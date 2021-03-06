const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const connection = require("./config/db");
const logger = require("../logger/logger");

// database connection
connection();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    logger.log('Connected to database!!', 0)
});
db.on('disconnected', ()=>{
    logger.log('Mongoose connection is disconnected', 1)
})

process.on('SIGINT', async ()=>{
    await db.close()
    process.exit(0)
})

// global middlewares
app.use(cors())
app.use(express.json());

// controllers
const chat = require("./routes/chat");
const auth = require("./routes/auth");
const user = require("./routes/user");

app.use((req, res, next) => {
  logger.log(`PATH: ${req.path}`, 0);
  next();
});

// app routes
app.use("/chat", chat);
app.use("/auth", auth);
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
