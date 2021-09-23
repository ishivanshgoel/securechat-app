const Message = require('../../models/message')
const express = require('express')
const chat = express.Router()

chat.get('/chatlist', async (req, res, next) => {
    try {

        const { userId }  = req.query

        if (!userId) throw new Error('Bad Request!!')

        let messages = await Message.distinct('to', { from: userId }).exec()

        res.json({
            data: messages,
            message: "success"
        })

    } catch (err) {
        next(err)
    }
})

chat.get('/chatMessages', async (req, res, next) => {
    try {

        const { userId, friendId } = req.body

        if (!userId || !friendId) throw new Error('Bad Request!!')

        let messages = await Message.find({ $or: [{ from: userId, to: friendId }, { from: friendId, to: userId }] }).exec()

        res.json({
            data: messages,
            message: "success"
        })

    } catch (err) {
        next(err)
    }
})

module.exports = chat