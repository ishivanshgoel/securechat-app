const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @param {String} from 
 * @param {String}  to 
 * @param {Boolean} status true if accepted else rejected
 */

const friendRequest = new Schema({
  from: String,
  to: String,
  status: Boolean
})

module.exports = mongoose.model("Friend", friendRequest);
