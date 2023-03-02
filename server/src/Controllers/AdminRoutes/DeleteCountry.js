const joi = require('joi');

const { pool }= require('../../modules/db/pool.js');

module.exports.DeleteCountry = (req, res) => {
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
        res.status(400).send("Fel kod");
        return;
      } else {
              const {Namn} = value;
        pool.execute('DELETE FROM Land WHERE Namn = ?', [Namn], (err, results) => {
            if(err) {
              res.status(500).send(err);
              return;
             }

            else {
                res.status(200).send("Ditt land är borttaget");
            }
          })
      }
      })
    }
  
 
