// save public key of chats between users
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keySchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    key: { type: String, required: true }
})

module.exports = mongoose.model('PublicKey', keySchema)
