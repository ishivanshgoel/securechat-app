const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @param {String} email unique email of user
 * @param {Object} friends array of friend ids
 */

const friendSchema = new Schema({
  email: { type: String, required: true, unique: true },
  friends: { type: Object, default: [] }
});

module.exports = mongoose.model("Friends", friendSchema);
