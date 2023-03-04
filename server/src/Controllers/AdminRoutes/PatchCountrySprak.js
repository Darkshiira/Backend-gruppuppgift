const joi = require('joi');


const { pool }= require('../../modules/db/pool.js');

module.exports.PatchCountrySprak = (req, res) => {
    const schema = joi.object({
        kod: joi.string().alphanum().min(0).max(6).required(),
        namn: joi
        .string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(50)
        .required(),
       sprak: joi
        .string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(50)
        .required(),

    });
    
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    
    const { kod } = value;
    pool.execute("SELECT * FROM Admins WHERE kod = ?", [kod], (err, results) => {
        if (err) {
        res.status(500).json(err);
        return;
        } if (results.length == 0) {
        res.status(401).json("Fel kod");
        return;
        }
            const {namn} = value;
            const {sprak} = value;
            pool.execute('UPDATE Land SET Sprak = ? WHERE Namn = ?', [sprak, namn], (err, results) => {
                if(err) {
                    res.status(500).json(err);
                    return;
                }
                if (results.length == 0) {
                    res.status(404).json("Ditt land finns inte");
                    return;
                }
                    res.status(200).json("Ditt land är uppdaterat med nytt Språk!");
            })
    });
    }

