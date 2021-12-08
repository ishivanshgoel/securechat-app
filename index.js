const express = require('express')
const app = express()
const connection = require('./app/config/db')
require('dotenv').config()

// controllers and middlewares
const auth = require('./app/http/controllers/auth.controller')
const chat = require('./app/http/controllers/chat.controller')
const chatHandler = require('./app/socket/chatHandler')


// database connection
connection()

// global middlewares
app.use(express.json())

app.use((req, res, next)=>{
    console.log(`PATH: ${req.path}`)
    next()
})


// app routes
app.use('/auth', auth)
app.use('/chat', chat)


// error handler
app.use((err, req, res, next)=>{
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
})

// socket io
// map users to socket id's
// use redis instead
let activeConnections = {}

const onConnection = (socket) => {
    console.log("Socket connection up..")

    socket.on("register", (data)=>{
        console.log("Data Received ", data)
        activeConnections[data.userId] = socket.id
        console.log('New User Connected..', activeConnections)
    })

    // chat handler
    chatHandler(io, socket, activeConnections)

}

io.on("connection", onConnection)