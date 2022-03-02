const chatController = require("../controllers/chat")

function chatHandler(io, socket, socketId, onlineStatus) {

  const chatMessage = async (data) => {

    // active connections
    console.log("Active Connections ", socketId);
    console.log(`From: ${data.from} To ${data.to} Message ${data.message}`);

    // save to database (async)
    chatController.saveNewMessage(data.from, data.to, data.message);

    let receiverId = socketId[data.to]; // get socket id of receiver

    // if the user is online then emit the chat:receive event to the recipient
    if(onlineStatus[receiverId] == true){
      io.to(receiverId).emit("chat:receive", data);
    }
    
  };

  // send message event
  socket.on("chat:send", chatMessage);
}

module.exports = chatHandler;
