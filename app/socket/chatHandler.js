const Message = require('../models/message')

function chatHandler(io, socket, activeConnections){

    const chatMessage = async(data)=>{

        // active connections
        console.log("Active Connections ", activeConnections)

        // save message to databse and send to receiver
        data = JSON.parse(data)

        console.log("New Chat Message")
        console.log(`From: ${data.from} To ${data.to} Message ${data.message}`)

        // save to database
        let message = new Message({ from: data.from , to: data.to, message: data.message })
        await message.save()

        let receiverId = activeConnections[data.to] // get socket id of receiver
        io.to(receiverId).emit('chat:receive', data)
    }

    socket.on("chat:send", chatMessage)
}

module.exports = chatHandler