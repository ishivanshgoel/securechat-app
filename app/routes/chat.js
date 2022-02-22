const express = require("express");
const chat = express.Router();
const controller = require("../controllers/chat");

chat.get("/chatlist", async (req, res, next) => {
  try {
    let { userId } = req.query;
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

chat.get("/chatmessages", async (req, res, next) => {
  try {
    let { userId, friendId } = req.body;
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
