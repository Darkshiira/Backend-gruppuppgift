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

const joi = require('joi')

const schema = joi.object({
    Namn: joi.string().alphanum().min(3).max(50).required(),
    Befolkning:joi.number().integer().min(0).max(2000000000).required(),
    Huvudstad: joi.string().alphanum().min(3).max(50).required()

})
server.get('/', (req, res) => {
    res.send('Hello World!');
    });

server.post('/api/countries', (req, res) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const {Namn} = value;
    pool.execute('SELECT * FROM Land WHERE Namn = ?', [Namn], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        else {
            res.status(200).send(results);
        }
    })
})


server.listen(5050);
