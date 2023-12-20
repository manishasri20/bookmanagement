require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const auth = require("./middleware/auth");

const User = require("./model/user");
const encrypt2 = require("./helpers/encrypt")
// Register
app.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
        if (!(email && password && username)) {
        res.json({status:false,messag:"All input is required"});
      }

      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.json({status:false,message:"User Already Exist. Please Login"})
      }
  

    encryptedPassword = encrypt2.aesEncrypt(password)
      const user = await User.create({
        username,
        email: email.toLowerCase(), 
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
  
      res.json({status:true,message:"User registerd successfully...Kindly proceed login!"})
    } catch (err) {
      console.log(err);
    }
  });
  

// Login
app.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.json({status:false,messag:"All input is required"});
      }
   
      encryptedPassword = encrypt2.aesEncrypt(password)
      const user = await User.findOne({ email:email,password:encryptedPassword });
      if (user) {

        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
res.json({status:true,message:"Login successfull!",data:token})
    }
    res.json({status:false,message:"Invalid Credentials"})
    } catch (err) {
      console.log(err);
    }
  });


app.post("/welcome", auth, (req, res) => {
    res.json({status:true})
});

module.exports = app;