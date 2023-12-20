const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const user_controller = require('./app')
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const express = require("express");

const router = express();
router.use(express.json());

router.use("/user",user_controller);

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});