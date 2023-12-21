
require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const { Validator} = require('node-input-validator')
const app = express();

app.use(express.json());

const encrypt2 = require("../helpers/encrypt")
const User = require('../model/user')
const Book = require('../model/book')
const Book_req = require('../model/book_req')
const auth = require("../middleware/auth");


exports.register = async (req, res) => {
	try {
	
		
		const { username, email, password } = req.body;
		if (!(email && password && username)) {
			res.json({ status: false, messag: "All input is required" });
		}

		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.json({ status: false, message: "User Already Exist. Please Login" })
		}


		encryptedPassword = encrypt2.aesEncrypt(password)
		const user = await User.create({
			username,
			email: email,
			password: encryptedPassword,
		});
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		);
		user.token = token;

		res.json({ status: true, message: "User registerd successfully...Kindly proceed login!" })
			
	
	} catch (err) {
		console.log(err);
	}
}

// Login
exports.login = async (req, res) => {

	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			res.json({ status: false, messag: "All input is required" });
		}

		encryptedPassword = encrypt2.aesEncrypt(password)
		const user = await User.findOne({ email: email, password: encryptedPassword });
		if (user) {

			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);

			res.json({ status: true, message: "Login successfull!", data: token })
		}else{
		res.json({ status: false, message: "Invalid Credentials" })
		}
	} catch (err) {
		console.log(err);
	}
}


exports.user_list_books = async (req,res) =>{
	try{

		
        let reqData = req.body
        let page = reqData.page
        let pageSize = reqData.pageSize


        const books = await Book.aggregate([
            {
                $project:{
                    book_name:1,
                    tittle:1,
                    status:1,
                    created_at:1
                }
            },
            {
                $sort:{
                    _id:-1
                }
            },
            {
                $facet:{
                    pagination:[{$count:"total"},{$addFields:{page:page}}],
                    data:[{$skip:(page-1)*pageSize},{$limit:pageSize}]
                }
            },
            {
                $project:{data:1,pagination:{$arrayElemAt:["$pagination",0]}}
            }
        ])

        res.json({status:true,data:books})

	}catch(e){
		console.log(e)
	}
}

exports.user_req_book = async (req,res) =>{
	try{


		let find_user = await User.findOne({_id:req.user.user_id})

		if(find_user){
		let obj = {
			book_id:req.body.book_id,
			book_name:req.body.book_name,
			user_id:req.user.user_id,
			username:find_user.username,
			email:find_user.email,
			status:0
		}
		let create_req = await Book_req.create(obj)

		if(create_req){
			res.json({status:true,message:"Request send to admin successfully!!!"})
		}else{
			res.json({status:false,message:"Sonmething went wrong"})
		}

		}else{
			rea.json({status:false,message:"User not found!!!"})
		}

	}catch(e){
		console.log(e)
	}
}
app.post("/welcome", auth, (req, res) => {
	res.json({ status: true })
});


