const express = require("express");
const occupation = express.Router();
//const cors = require("cors");
const db = require("../database/config");
//const csrf = require('csurf');
//const config = require('../database/config.json');

//const security = require('../database/security');

occupation.post('/save', (req, res) => {
    db.sequelize.query("CALL sp_user_add(:fullnames, :address, :contact, :age)", {
        replacements: {
         
            fullnames: req.body.fullnames,
            address: req.body.address,
            contact: req.body.contact,
            age: req.body.age,
        }
    }).then(data => {
        ret = data[0]["_ret"];
        if (ret === "add_successfully") {
            res.send({error: false, message: 'user_add_successfully'});
        } 
        else if (ret === "edit_successfully") {
            res.send({error: false, message: 'user_updated_successfully'});
        } else if (ret === "invalid_user_duplicate") {
            res.send({error: false, message: 'invalid_user_duplicate'});
        }
        else {
            res.send({error: false, message: 'user_added_successfully.'});
        }
    }).catch(err => {
        res.send({ error: true, message: `Error 767: ${err}` });
    });
});

occupation.get('/get_all', (req, res) => {
    db.sequelize.query('CALL sp_occupation_get_all()', {
        type: db.sequelize.QueryTypes.SELECT
    }).then((data) => {
        const data_ret = db.MultiQueryResult(data).result0;
        if (data_ret) {
            res.send(data_ret);
        } else {
            res.send(`no_data`);
        }
    }).catch(err => {
        res.send(`Error: ${err}`);
    });
});


module.exports = occupation;