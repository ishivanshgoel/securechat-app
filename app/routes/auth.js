const express = require("express");
const auth = express.Router();
const controller = require("../controllers/auth");

auth.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let response = await controller.signin(email, password);

    if (response.error) {
      throw response;
    } else {
      res.json(response);
    }
  } catch (err) {
    next(err);
  }
});

auth.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let response = await controller.signup(email, password);

    if (response.error) {
      throw response;
    } else {
      res.json(response);
    }
  } catch (err) {
    next(err);
  }
});

auth.post("/verify", async (req, res, next) => {
  try {
    const { token } = req.body;

    let response = await controller.verifyUser(token);

    if (response.error) {
      throw response;
    } else {
      res.json(response);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = auth;
