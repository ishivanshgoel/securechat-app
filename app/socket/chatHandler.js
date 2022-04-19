const chatController = require("../controllers/chat")

function chatHandler(io, socket, cache) {

  const chatMessage = async (data) => {

    // active connections
    console.log("Active Connections ", cache.onlineStatus);
    console.log(`From: ${data.from} To ${data.to} Message ${data.message}`);

    console.log("Cache received ", cache);

    // save to database (async)
    chatController.saveNewMessage(data.from, data.to, data.message, data.message1);

    let receiverId = cache.socketId[data.to]; // get socket id of receiver

    // if the user is online then emit the chat:receive event to the recipient
    
    console.log("Sending to ", receiverId)
    io.to(receiverId).emit("chat:receive", data);
    
  };

  // send message event
  socket.on("chat:send", chatMessage);
}

module.exports = chatHandler;
