const joi = require('joi');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    }



const pool = mysql.createPool(config);

module.exports.deleteCountry = (req, res) => {
    const schema = joi.object({
      kod: joi.string().alphanum().min(0).max(6).required(),
      Namn: joi
        .string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(50)
        .required(),
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
        return;
      } else {
              const {Namn} = value;
        pool.execute('DELETE FROM; Land WHERE amn = ?', [Namn], (err, results) => {
            if(err) {
              return;
             }
          })
      }
      })
    }
  
 
