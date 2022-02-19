const express = require('express')
const app = express()

const connection = require('./config/db')
const logger = require('../logger/logger')
require('dotenv').config()

// controllers and middlewares
const auth = require('./http/controllers/auth.controller')
const chat = require('./http/controllers/chat.controller')
const chatHandler = require('./socket/chatHandler')


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

module.exports = app