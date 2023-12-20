
require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

app.user_register,async(req,res)=>{
	let obj = {
		username: req.body.username,
		email:req.body.email,
		password:req.body.password
	}
	    const create_user = await User.create(obj);

};

module.exports = app;