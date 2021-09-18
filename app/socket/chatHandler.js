function chatHandler(io, socket, activeConnections){

    const chatMessage = ({ from, to, message})=>{
        // save message to databse and send to receiver

    }

    socket.on("chat:send", chatMessage)
}

module.exports = chatHandler