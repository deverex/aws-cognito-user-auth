"use strict";

const router = (module.exports = require("express").Router());

const { register, login } = require("../actions/auth");

router.post("/register", async (req, res, next) => {
  const { body } = req;
  register(body, (err, response) => {
    if (err) return res.send(err);
    res.send(response);
  });
});

router.post("/login", async (req, res, next) => {
  const { body } = req;
  login(body, (err, response) => {
    if (err) return res.send(err);
    res.send(response);
  });
});
