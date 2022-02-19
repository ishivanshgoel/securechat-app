const User = require("../models/user");
const { signAcessToken } = require("../utils/jwt");
const logger = require("../../logger/logger");

/**
 * @User class provides methods for operations related to user entity
 */

class User {
  /**
   * @property {Function} signin - user signin/ login
   * @returns access token and email on suceess and error object otherwise
   */

  static async signin(email, password) {
    try {
      if (!email || !password)
        return {
          error: true,
          message: "Bad Request!",
          code: 400,
        };

      // check if user exists
      let user = await User.findOne({ email: email.trim() }).exec();

      if (!user)
        return {
          error: true,
          message: "User does not exist",
          code: 404,
        };

      if (user.password != password.trim())
        return {
          error: true,
          message: "Invalid Username/ Password",
          code: 401,
        };

      return {
        error: false,
        email: user.email,
        accessToken: signAcessToken(user._id),
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
   * @property {Function} signup - user signup/ register
   * @returns access token and email on suceess and error object otherwise
   */

  static async signup(email, password) {
    try {
      if (!email || !password)
        return {
          error: true,
          message: "Bad Request!",
          code: 400,
        };

      // if the user exists
      let user = await User.findOne({ email: email.trim() }).exec();
      if (user)
        return {
          error: true,
          message: "User already exists!",
          code: 409,
        };

      let newUser = new User({
        email: email.trim(),
        password: password.trim(),
      });

      await newUser.save();

      return {
        error: false,
        email: newUser.email,
        accessToken: signAcessToken(newUser._id),
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

module.exports = User;
