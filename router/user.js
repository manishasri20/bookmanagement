var express = require("express");

var app = express.Router();

var usercontroller = require('../controller/user')

const auth = require("../middleware/auth");



app.post("/user_register", usercontroller.register)

app.post("/login", usercontroller.login)

app.post("/user_req_book", auth, usercontroller.user_req_book)

module.exports = app;