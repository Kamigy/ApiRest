const express = require("express");
const authService = require("../services/authenticator");
const User = require("../models/User");

module.exports = function (app) {
  const authRouter = express.Router();

  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const authenticatedUser = await authService.authenticate(email, password);
      res.send(authenticatedUser);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  authRouter.post("/register", async (req, res) => {
    try {
      const newUser = await authService.create(req.body);
      const authenticatedUser = await authService.authenticate(newUser.email, req.body.password);
      res.send(authenticatedUser);
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  });

  app.use("/auth", authRouter);
};
