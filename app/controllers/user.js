const User = require("../models/user");
const { signAcessToken } = require("../utils/jwt");
const logger = require("../../logger/logger");
const { verifyAccessToken } = require("../utils/jwt");
const rsa = require("../utils/crypt/rsa");

/**
 * @User class provides methods for operations related to user entity
 */

class UserController {
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

      // generate a pair of public and private key for user
      let keys = rsa.generateKeys();

      logger.log(`Keys: ${keys.publicKey}`, 2);

      // save public key only
      let newUser = new User({
        email: email.trim(),
        password: password.trim(),
        key: keys.publicKey,
      });

      await newUser.save();

      return {
        error: false,
        email: newUser.email,
        accessToken: signAcessToken(newUser._id),
        keys: keys,
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
   * @property {Function} verifyUser - user verification
   * @returns true if verified else false
   */
  static verifyUser(token) {
    try {
      logger.log("token " + token, 1);
      let res = JSON.stringify(verifyAccessToken(token));
      if (res.userId) {
        return {
          error: false,
          status: true,
          code: 200,
        };
      } else {
        return {
          error: false,
          status: false,
          code: 400,
        };
      }
    } catch (err) {
      return {
        error: true,
        message: err.message,
        code: 500,
        status: false,
      };
    }
  }
}

module.exports = UserController;
