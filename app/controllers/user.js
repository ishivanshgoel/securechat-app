const Friend = require("../models/friend");
const Request = require("../models/friendRequest")
const logger = require("../../logger/logger");

class User {

    /**
   * @property {Function} friendList - fetches friend list of a user
   * @returns an array of user ids
   */

    static async friendList(id) {
        try {
            if (!userId)
                return {
                error: true,
                message: "Bad Request!",
                code: 400,
                };

            let friendList = await Friend.find({ email: id }).exec();

            return {
                data: friendList,
                error: false,
                code: 200,
            };
        } catch (err) {
            logger.log(err.message, 2);
            return {
                error: true,
                message: err.message,
                code: 500,
            };
        }
    }

    static async sendFriendRequest(from, to){
        try{

            if (!from || !to)
                return {
                    error: true,
                    message: "Bad Request!",
                    code: 400,
                };
            // send friend request


        } catch(err){
            logger.log(err.message, 2);
            return {
                error: true,
                message: err.message,
                code: 500,
            };
        }
    }
}

module.exports = User;
