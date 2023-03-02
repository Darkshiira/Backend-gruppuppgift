const express = require('express');
const server = express();

const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    }

const mysql = require('mysql2');

const pool = mysql.createPool(config);



server.get('/', (req, res) => {
    res.send('Hello World!');
    });

server.listen(5050);
