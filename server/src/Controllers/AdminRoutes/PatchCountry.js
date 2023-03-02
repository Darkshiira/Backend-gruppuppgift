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

module.exports.PatchCountry= (req, res) => {
  const schema = joi.object({
    kod: joi.string().alphanum().min(0).max(6).required(),
    Namn: joi
      .string()
      .regex(/^[A-Za-z]+$/)
      .min(3)
      .max(50)
      .required(),
    Befolkning: joi.number().integer().min(0).max(2000000000),
    Huvudstad: joi.string().alphanum().min(3).max(50),
  });

  const { error, value } = schema.validate(req.body);
  const { kod } = value;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

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
        "SELECT * FROM Land WHERE Namn=?",
        [Namn],
        (err, results) => {
          if (err) {
            res.status(500).send(err);
            return;
          } else if (results.length == 0) {
            res
              .status(400)
              .send("Ditt land finns inte, skulle du registrera ett nytt?");
            return;
          } else {
            let msg = "";
            if (Befolkning && Huvudstad) {
              pool.execute(
                "UPDATE Land SET Befolkning=?, Huvudstad=? WHERE Namn=?",
                [Befolkning, Huvudstad, Namn],
                (err, results) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.status(200).send("Befolkning och Huvudstad uppdaterad.");
                  }
                }
              );
            }
            if (Befolkning && !Huvudstad) {
              pool.execute(
                "UPDATE Land SET Befolkning=? WHERE Namn=?",
                [Befolkning, Namn],
                (err, results) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.status(200).send("Befolkning uppdaterad.");
                  }
                }
              );
            }
            if (Huvudstad && !Befolkning) {
              pool.execute(
                "UPDATE Land SET Huvudstad=? WHERE Namn=?",
                [Huvudstad, Namn],
                (err, results) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.status(200).send("Huvudstad uppdaterad.")
                  }
                }
              );
            }
          }
        }
      );
    }
  });
}