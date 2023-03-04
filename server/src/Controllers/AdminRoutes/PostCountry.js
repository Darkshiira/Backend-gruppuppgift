const joi = require('joi');


const { pool }= require('../../modules/db/pool.js');

module.exports.PostCountry = function (req, res) {
  //res.send('PostCountry');
    const schema = joi.object({
      kod: joi.string().alphanum().min(0).max(6).required(),
      namn: joi
        .string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(50)
        .required(),
      befolkning: joi.number().integer().min(0).max(2000000000).required(),
      huvudstad: joi.string().alphanum().min(3).max(50).required(),
      sprak: joi.string().alphanum().min(3).max(50).required(),
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
      } if (results.length == 0) {
        res.status(401).json("Fel lösenord");
        return;
      } else {
        const { namn, befolkning, huvudstad, sprak } = value;
        pool.execute(
          "INSERT INTO Land (Namn, Befolkning, Huvudstad, Sprak) VALUES (?, ?, ?, ?)",
          [namn, befolkning, huvudstad, sprak],
          (err, results) => {
            if (err) {
              if (err.sqlMessage.includes("Duplicate entry")) {
                res.status(409).json("Ditt land finns redan");
                return;
              } 
              res.status(500).send(err);
              return;
            
          } 
              res.status(201).json("Ditt land är registrerat");
            
          }
        );
      }
    });
  }