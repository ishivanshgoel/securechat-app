const Message = require("../../models/message");
const logger = require("../../../logger/logger");

/**
 * @Chat class provides methods for chat functionality
 */

class Chat {
  /**
   * @property {Function} getChatList - fetches 1:1 chat list for the user
   * @returns an array of of chat list and error object otherwise
   */

  static async getChatList(userId) {
    try {
      if (!userId)
        return {
          error: true,
          message: "Bad Request!",
          code: 400,
        };

      let list = await Message.distinct("to", { from: userId }).exec();

      return {
        data: list,
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
   * @property {Function} getChatMessages - fetches 1:1 chat messages between 2 users
   * @returns an array of of chat messages and error object otherwise
   */

  static async getChatMessages(userId, friendId) {
    try {
      if (!userId || !friendId)
        return {
          error: true,
          message: "Bad Request!",
          code: 400,
        };

      let messages = await Message.find({
        $or: [
          { from: userId, to: friendId },
          { from: friendId, to: userId },
        ],
      }).exec();

      return {
        data: messages,
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
}

module.exports = Chat;
