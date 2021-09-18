const express = require('express')
const app = express()
const http = require('http')
const socketio = require('socket.io')
const chatHandler = require('./app/socket/chatHandler')
const connection = require('./app/config/db')
require('dotenv').config()

// database connection
connection()

const server = http.createServer(app)
const io = socketio(server)

// global middlewares
app.use(express.json())
app.set('io', io)


// controllers and middlewares
const auth = require('./app/http/controllers/auth.controller')

app.use('/auth', auth)

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
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})

// socket io
// map users to socket id's
let activeConnections = {}

const onConnection = (socket) => {

    socket.on("register", ({userId})=>{
        activeConnections[socket.id] = userId
        console.log('New User Connected..', activeConnections)
    })

    // chat handler
    chatHandler(io, socket, activeConnections);
}

io.on("connection", onConnection)