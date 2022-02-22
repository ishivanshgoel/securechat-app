const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @param {String} email unique email of user
 * @param {String} password password of user
 * @param {String} key public key of user 
 * @param {String} displayName name displayed in the chats
 */

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  key: {type: String, required: true}
});

module.exports = mongoose.model("User", userSchema);
