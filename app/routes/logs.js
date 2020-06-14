"use strict";

const router = (module.exports = require("express").Router());

router.get("/", async (req, res, next) => {
  try {
    res.send("You got the logs");
    // const { body } = req;
    // const response = await register(body);
    // res.send(response);
  } catch (error) {
    return error;
  }
});
