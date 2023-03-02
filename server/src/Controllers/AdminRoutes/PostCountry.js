const joi = require('joi');


const { pool }= require('../../modules/db/pool.js');

module.exports.PostCountry = function (req, res) {
  //res.send('PostCountry');
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
      res.status(400).json(error.details[0].message);
      return;
    }
    const { kod } = value;
    pool.execute("SELECT * FROM Admins WHERE kod = ?", [kod], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      } else if (results.length == 0) {
        res.status(401).json("Fel lösenord");
        return;
      } else {
        const { Namn, Befolkning, Huvudstad } = value;
        pool.execute(
          "INSERT INTO Land (Namn, Befolkning, Huvudstad) VALUES (?, ?, ?)",
          [Namn, Befolkning, Huvudstad],
          (err, results) => {
            if (err) {
              if (err.sqlMessage.includes("Duplicate entry")) {
                res.status(400).json("Ditt land finns redan");
                return;
              } else {
              res.status(500).send(err);
              return;
            } 
          } else {
              res.status(201).json("Ditt land är registrerat");
            }
          }
        );
      }
    });
  }