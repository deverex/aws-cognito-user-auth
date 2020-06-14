"use strict";

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const PORT = process.env.PORT || 8080;
const route = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
