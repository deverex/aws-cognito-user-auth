"use strict";

const router = (module.exports = require("express").Router());

var authMiddleware = require("../middlewares/authMiddleware");

router.use("/api/auth", require("./auth"));
router.use("/api/logs", authMiddleware, require("./logs"));

router.use("*", (req, res, next) => {
  res.send("Not Found");
});
