const logger = require("../logger/logger");
const { Server } = require("socket.io");

function socket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  logger.log("Socket initiated", 0);

  // socket io
  // map users to socket id's
  // use redis instead
  let activeConnections = {};

  const onConnection = (socket) => {
    logger.log("Socket connection up..", 0);

    socket.on("register", (data) => {
      logger.log("Data Received " + data, 0);
      activeConnections[data.userId] = socket.id;
      logger.log("New User Connected.." + activeConnections, 0);
    });

    // chat handler
    chatHandler(io, socket, activeConnections);
  };

  io.on("connection", onConnection);
}

module.exports = socket;
