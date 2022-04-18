const express = require("express");
const user = express.Router();
const controller = require("../controllers/user");
const auth = require("../middlewares/auth");

// send friend request to intended user
user.post("/sendRequest", auth, async (req, res, next) => {
    try {
      const { to } = req.body;
      const { userId } = req.payload;
  
      let response = await controller.sendFriendRequest(userId, to);
  
      if (response.error) {
        throw response;
      } else {
        res.json(response);
      }
    } catch (err) {
      next(err);
    }
});


module.exports = user;