const express = require("express");
const account = express.Router();
//const cors = require("cors");
const db = require("../database/config");
//const csrf = require('csurf');
//const config = require('../database/config.json');

//const security = require('../database/security');

account.post('/add', (req, res) => {
    db.sequelize.query("CALL sp_user_add(:name, :student_id, :department, :year_lvl, :address, :username, :password)", {
        replacements: {
            name: req.body.name,
            student_id: req.body.student_id,
            department: req.body.department,
            year_lvl: req.body.year_lvl,
            address: req.body.address,
            username: req.body.username,
            password: req.body.password,
        }
    }).then(data => {
        ret = data[0]["_ret"];
        if (ret === "add_successfully") {
            res.send({error: false, message: 'account_added_successfully'});
        } 
        else {
            res.send({error: false, message: 'Unknown Error.'});
        }
    }).catch(err => {
        res.send({ error: true, message: `Error 767: ${err}` });
    });
});

module.exports = account;