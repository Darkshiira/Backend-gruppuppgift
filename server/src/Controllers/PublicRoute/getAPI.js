const joi = require('joi');



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
            if(results.length> 0) {
            res.status(200).send(results);
            }
            
        }
    })
}