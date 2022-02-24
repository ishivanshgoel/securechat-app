const { verifyAccessToken } = require("../utils/jwt");
const logger = require('../../logger/logger')

function auth(req, res, next) {
  try {

    console.log('Headers ', req.headers)
    if (!req.headers['authorization']) throw new Error("Unauthorized User");
    const authHeader = req.headers['authorization'];
    const token = authHeader
    
    let tokenValid = verifyAccessToken(token);

    if (tokenValid){
      req.payload = tokenValid
      next();
    }
    else throw new Error("Unauthorized User");
  } catch (err) {
    next(err);
  }
}

module.exports = auth;
