const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @param {String} from email of sender
 * @param {String} to email of receiver
 * @param {String} message text message
 */

const messageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
