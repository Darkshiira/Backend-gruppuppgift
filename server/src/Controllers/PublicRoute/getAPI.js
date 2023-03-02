const joi = require('joi');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

/* const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    }



const pool = mysql.createPool(config); */

const { pool }= require('../../modules/db/pool.js');


module.exports.getAPI = (req, res) => {
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
}