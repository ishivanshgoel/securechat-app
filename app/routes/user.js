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

// get friend request list
user.get("/friendRequestList", auth, async (req, res, next) => {
    try {
      const { userId } = req.payload;
  
      let response = await controller.friendRequestList(userId);
  
      if (response.error) {
        throw response;
      } else {
        res.json(response);
      }
    } catch (err) {
      next(err);
    }
});

// to accept friend request
user.post("/acceptFriendRequest", auth, async (req, res, next) => {
    try {
      const { userId } = req.payload;
      const { of } = req.body;
  
      let response = await controller.acceptFriendRequest(userId, of);
  
      if (response.error) {
        throw response;
      } else {
        res.json(response);
      }
    } catch (err) {
      next(err);
    }
});

// fetch friends
user.get("/friends", auth, async (req, res, next) => {
    try {
      const { userId } = req.payload;
      console.log('USER ID ', userId)
  
      let response = await controller.friendList(userId);
  
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