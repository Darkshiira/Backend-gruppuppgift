const express = require('express');
const server = express();
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    }



const pool = mysql.createPool(config);

const joi = require('joi')

server.post('/admin', (req, res) => {
server.use(express.json());

const schema = joi.object({
    password: joi.string().alphanum().min(0).max(6).required(),
    Namn: joi.string().regex(/^[A-Za-z]+$/).min(3).max(50).required(),
    Befolkning:joi.number().integer().min(0).max(2000000000).required(),
    Huvudstad: joi.string().alphanum().min(3).max(50).required()

})


const { error, value } = schema.validate(req.body);
if (error) {
    res.status(400).send(error.details[0].message);
    return;
}
const {password} = value;
pool.execute('SELECT * FROM Admins WHERE kod = ?', [password], (err, results) => {
    if (err) {
        res.status(500).send(err);
        return;
    }
    else {
        res.status(200).send(results);
    }
})

if (results.length == 0) {
    res.status(400).send('Fel lösenord');
    return;
}

const {Namn, Befolkning, Huvudstad} = value;
pool.execute('INSERT INTO Land (Namn, Befolkning, Huvudstad) VALUES (?, ?, ?)', [Namn, Befolkning, Huvudstad], (err, results) => {
    if (err) {
        res.status(500).send(err);
            return;
    }
    else {
        res.status(200).send(results);
    }

})
})



server.get('/', (req, res) => {
    res.send('Hello World!');
    });

server.post('/api', (req, res) => {
    const schema = joi.object({
        Namn: joi.string().regex(/^[A-Za-z]+$/).min(3).max(50).required()
    })
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
