"use strict";

const router = (module.exports = require("express").Router());

const { getLogs } = require("../actions/logs");

router.get("/", async (req, res, next) => {
  try {
    const query = req.query;
    getLogs(query, (err, response) => {
      if (err) return res.send(err);
      res.send(response);
    });
  } catch (error) {
    return error;
  }
});
