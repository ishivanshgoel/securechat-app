const express = require("express");
const user = express.Router();
const controller = require("../controllers/user");

user.get("/signin", (req, res, next) => {
  try {
    const { email, password } = req.body;

  } catch (err) {
    next(err);
  }
});

user.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let response = await controller.signup(email, password);

    if (response.error) {
      throw response;
    } else {
      res.json(response)
    }
  } catch (err) {
    next(err);
  }
});

module.exports = user;
