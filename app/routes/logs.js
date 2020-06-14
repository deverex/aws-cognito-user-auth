"use strict";

const router = (module.exports = require("express").Router());

const NginxParser = require("nginxparser");

const parser = new NginxParser(
  "$remote_addr - $remote_user [$time_local] " +
    '"$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"'
);

// const ACCESS_LOGS_PATH =
//   "/home/devesh/Desktop/aws-cognito-user-auth/access.log";
const ACCESS_LOGS_PATH = "/var/log/nginx/access.log";

const logs = [];

router.get("/", async (req, res, next) => {
  try {
    parser.read(
      ACCESS_LOGS_PATH,
      function (row) {
        logs.push(row);
      },
      function (err) {
        if (err) throw err;
        console.log("Done!");
        res.send(logs);
      }
    );
    // const { body } = req;
    // const response = await register(body);
    // res.send(response);
  } catch (error) {
    return error;
  }
});
