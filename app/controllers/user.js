const Friend = require("../models/friend");
const Request = require("../models/friendRequest");
const UserModel= require("../models/user");
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


    /**
     * @property {Function} sendFriendRequest - sends friend request to a user
     * @returns status code 200 if sent else error
     */

    static async sendFriendRequest(from, to){
        try{

            if (!from || !to)
                return {
                    error: true,
                    message: "Bad Request!",
                    code: 400,
                };
            
            // if same email id as of user
            if (from == to)
                return {
                    error: true,
                    message: "You cannot add yourself as friend ;)",
                    code: 400,
                };

            // if user does not exist
            // check if user exists
            let user = await UserModel.findOne({ email: to.trim() }).exec();

            if (!user)
                return {
                    error: true,
                    message: "User does not exist",
                    code: 404,
                };


            // send friend request
            let request = new Request({
                from: from,
                to: to,
            });
        
            await request.save();

            return {
                error: false,
                code: 200,
            };

        } catch(err){
            logger.log(err.message, 2);
            return {
                error: true,
                message: err.message,
                code: 500,
            };
        }
    }

    /**
     * @property {Function} friendRequestList - friendRequest list
     * @returns list of friend requests
     */

     static async friendRequestList(email){
        try{

            if (!email)
                return {
                    error: true,
                    message: "Bad Request!",
                    code: 400,
                };

            // find requests list
            let friendRequest = await Request.findOne({ to: email }).exec();

            return {
                data: friendRequest,
                error: false,
                code: 200,
            };

        } catch(err){
            logger.log(err.message, 2);
            return {
                error: true,
                message: err.message,
                code: 500,
            };
        }
    }

    /**
     * @property {Function} acceptFriendRequest - accepts friend request to a user
     * @returns true if sent else error
     */

    // email is of user who got the friend request
    // of is email id of user who sent the request
     static async acceptFriendRequest(email, of){
        try{

            if (!email || !of)
                return {
                    error: true,
                    message: "Bad Request!",
                    code: 400,
                };

            // find request
            let friendRequest = await Request.findOne({ from: of, to: email }).exec();
        
            if(!friendRequest) throw new Error("Friend Request does not exist");

            // add to friend list of user who is accepting the request
            let friendList = await Friend.findOneAndUpdate( { email : email }, {"$push": { "friends": of } }).exec();
            friendRequest.status = true; // accept the request
            await friendRequest.save();

            return {
                data: friendList,
                error: false,
                code: 200,
            };

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
