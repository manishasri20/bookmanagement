var express = require("express");

var app = express.Router();

let Admin = require('../controller/admin')

const auth = require("../middleware/auth");


app.post("/admin_login", Admin.admin_login)

app.post("/create_book", auth, Admin.create_book)

app.post("/view_books", auth, Admin.view_books)

app.put("/update_books", auth, Admin.update_books)

app.delete("/delete_book", auth, Admin.delete_book)

app.post("/admin_list_book_req", auth, Admin.admin_list_book_req)

app.post("/admin_approve_book_req", auth, Admin.admin_approve_book_req)





module.exports = app;