const express = require("express");
const chat = express.Router();
const controller = require("../controllers/chat");
const auth = require("../middlewares/auth");

chat.get("/chatlist", auth, async (req, res, next) => {
  try {
    let { userId } = req.payload;
    let response = await controller.getChatList(userId);
    if (response.error) {
      throw response;
    } else {
      res.json(response);
    }
  } catch (err) {
    next(err);
  }
});

chat.post("/chatmessages", auth, async (req, res, next) => {
  try {
    let { userId } = req.payload;
    let { friendId } = req.body;
    let response = await controller.getChatMessages(userId, friendId);
    if (response.error) {
      throw response;
    } else {
      res.json(response);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = chat;
