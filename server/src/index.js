const express = require("express");
const server = express();
/* const mysql = require("mysql2");
const dotenv = require("dotenv").config(); */
const { PublicRoute } = require("./Routes/PublicRoute");
const { AdminRoute } = require('./Routes/AdminRoute');

/* const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}; */

//const pool = mysql.createPool(config);

//const joi = require("joi");
server.use(express.json());
server.use("/api", PublicRoute);
server.use("/admin", AdminRoute)



server.listen(5050);
