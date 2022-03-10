const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @param {Object} request request schema
 * @param {String} friendId friend email id
 * @param {Boolean} status true means accepted, false means awaiting 
 */

const request = new Schema({
    friendId: String,
    status: Boolean
});

const friendRequestSchema = new Schema({
  email: { type: String, required: true, unique: true },
  friends: [request]
});

module.exports = mongoose.model("Friend", friendRequestSchema);
