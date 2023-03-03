const joi = require('joi');


const { pool }= require('../../modules/db/pool.js');

module.exports.PatchCountryBefolkning = (req, res) => {
    const schema = joi.object({
        kod: joi.string().alphanum().min(0).max(6).required(),
        Namn: joi
        .string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(50)
        .required(),
        Befolkning: joi
        .number()
        .integer()
        .min(0)
        .max(200000000)
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
        } else {
            const {Namn} = value;
            const {Befolkning} = value;
            pool.execute('UPDATE Land SET Befolkning = ? WHERE Namn = ?', [Befolkning, Namn], (err, results) => {
                if(err) {
                    res.status(500).json(err);
                    return;
                }
                if (results.length == 0) {
                    res.status(404).json("Ditt land finns inte");
                    return;
                }
                else {
                    res.status(200).json("Ditt land är uppdaterat med nytt Befolkningsantal!");
                }
            })
        }
    });
    }

