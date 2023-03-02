const express = require("express");
const server = express();
const cors = require("cors");

const { PublicRoute } = require("./Routes/PublicRoute");
const { adminRoute } = require('./Routes/AdminRoute');

server.use(express.json());
server.use(cors());
server.use("/api", PublicRoute);
server.use("/admin", adminRoute)

server.get("/", (req, res) => {
  res.send("Hello World");
});



server.listen(5050);
