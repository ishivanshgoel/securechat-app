const User = require("../models/user");
const { signAcessToken } = require("../utils/jwt");
const Friend = require("../models/friend");
const logger = require("../../logger/logger");
const { verifyAccessToken } = require("../utils/jwt");
const rsa = require("../utils/crypt/rsa");

/**
 * @User class provides methods for operations related to user entity
 */

class Auth {
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

      // if (user.password != password.trim())
      //   return {
      //     error: true,
      //     message: "Invalid Username/ Password",
      //     code: 401,
      //   };

      return {
        error: false,
        email: user.email,
        accessToken: signAcessToken(user.email),
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


      // create new friends schema (to hold friends list)
      let newFriendSchema = new Friend({
        email: email.trim()
      })

      await newFriendSchema.save();

      return {
        error: false,
        email: newUser.email,
        accessToken: signAcessToken(newUser.email),
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
      let res = verifyAccessToken(token);

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

  /**
   * @property {Function} getPublicKey - get public key if user
   * @returns public key of user else error object
   */
  static async getPublicKey(email) {
    try {

      if (!email)
        return {
          error: true,
          message: "Invalid Request!",
          code: 404,
        };

      // check if user exists
      let user = await User.findOne({ email: email.trim() }).exec();

      if (!user)
        return {
          error: true,
          message: "User does not exist",
          code: 404,
        };

      return {
        error: false,
        key: user.key,
        code: 200,
      };
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

module.exports = Auth;
