const jwt = require("jsonwebtoken");
const logger = require("../../logger/logger");

module.exports = {
  signAcessToken: (userId) => {
    let payload = {
      userId: userId,
    };

    let options = {
      expiresIn: "365d",
    };

    const token = jwt.sign(payload, process.env.TOKEN_KEY, options);

    logger.log("Token " + token, 1);

    return token;
  },

  verifyAccessToken: (token) => {
    let payload = jwt.verify(token, process.env.TOKEN_KEY);
    return payload;
  },
};
