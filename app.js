require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();
app.use(express.json());

const User = require("./router/user");
const Admin = require("./router/admin")
app.use(express.json());

app.use("/user", User);

app.use('/admin', Admin)

module.exports = app;