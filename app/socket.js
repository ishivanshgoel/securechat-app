const logger = require("../logger/logger");
const { Server } = require("socket.io");
const chatHandler = require("./socket/chatHandler")
const userController = require("../app/controllers/user")

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
  let socketId = {};
  let onlineStatus = {};


  // check if the user is authorised
  io.use((socket, next) => {
    let token = socket.handshake.auth.token;
    if(userController.verifyUser(token).status == true){
      console.log('TOKEN ', token)
      next();
    } else {
      const err = new Error("Unauthorized!!");
      next(err);
    }
  });

  io.on("connection", (socket) => {

    logger.log("NEW SOCKET CONNECTION", 0);

    // register userId in active connections
    socket.on("register", (data) => {
      logger.log("Data Received " + data, 0);
      
      socketId[data.userId] = socket.id; // socket id of connected user (required for emitting events)
      onlineStatus[socket.id] = true; // mark user as online

      logger.log("New User Connected.." + socketId, 0);
    });

    // register chat handler events
    chatHandler(io, socket, socketId, onlineStatus);

    // remove user from active connections list on disconnect 
    socket.on("disconnect", () => {
      console.log('SOCKET ID ' + socket.id + ' is now offline');
      onlineStatus[socket.id] = false;
    });

  });
}

module.exports = socket;
