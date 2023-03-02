const { pool }= require('../../modules/db/pool.js');



module.exports.HelloWorld = (req, res) => {

    pool.execute('SELECT * FROM Land ', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        else {
                        res.status(200).send(results);
        }
    })
}