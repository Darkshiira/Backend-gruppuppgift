const express = require("express");
const server = express();
const cors = require("cors");
/* const mysql = require("mysql2");
const dotenv = require("dotenv").config(); */
const { PublicRoute } = require("./Routes/PublicRoute");
const { adminRoute } = require('./Routes/AdminRoute');
const cors=require('cors');

/* const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}; */

//const pool = mysql.createPool(config);

//const joi = require("joi");
server.use(cors());
server.use(express.json());
server.use(cors());
server.use("/api", PublicRoute);
server.use("/admin", adminRoute)

server.get("/", (req, res) => {
  res.send("Hello World");
});



server.listen(5050);
