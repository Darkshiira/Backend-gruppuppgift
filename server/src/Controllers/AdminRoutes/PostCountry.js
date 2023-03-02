const joi = require('joi');
// const mysql = require('mysql2');
// const dotenv = require('dotenv').config();

// const config = {
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     }



// const pool = mysql.createPool(config);

const { pool }= require('../../modules/db/pool.js');

module.exports.PostCountry = (req, res) => {
    const schema = joi.object({
      kod: joi.string().alphanum().min(0).max(6).required(),
      Namn: joi
        .string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(50)
        .required(),
      Befolkning: joi.number().integer().min(0).max(2000000000).required(),
      Huvudstad: joi.string().alphanum().min(3).max(50).required(),
    });
  
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const { kod } = value;
    pool.execute("SELECT * FROM Admins WHERE kod = ?", [kod], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      } else if (results.length == 0) {
        res.status(401).send("Fel lösenord");
        return;
      } else {
        const { Namn, Befolkning, Huvudstad } = value;
        pool.execute(
          "INSERT INTO Land (Namn, Befolkning, Huvudstad) VALUES (?, ?, ?)",
          [Namn, Befolkning, Huvudstad],
          (err, results) => {
            if (err) {
              res.status(500).send(err);
              return;
            } else {
              res.status(201).send("Ditt land är registrerat");
            }
          }
        );
      }
    });
  }