const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
var bCrypt = require('bcrypt-nodejs');

//ler por email
function readEmail(req, res) {
    const email = req.param('email');
    const post = { email: email };
    const query = connect.con.query('SELECT id, email, profile FROM users WHERE ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

//ler utilizadores por id
function readUserID(req, res) {
    const id = req.param('id');
    const post = { id: id };
    const query = connect.con.query('SELECT id, email, password, profile FROM users where ? ', post, function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

//alterar dados
function updateUser(req, res) {
    const id = req.sanitize('id').escape();
    const email = req.sanitize('email').escape();

    req.check("email", "Insira um email válido.").isEmail();

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        console.log(errors);
        return;
    }
    else {
        if (id != "NULL" && typeof(id) != 'undefined' && typeof(email) != 'undefined') {
            const update = [email, id];
            console.log(update);
            const query = connect.con.query('UPDATE users SET email =? WHERE id=?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
            });
        }
        else
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

//apagar utilizador
function deleteUser(req, res) {
    const idUser = req.param('id');
    const query = connect.con.query('DELETE FROM users WHERE id=?', idUser, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}

//alterar pass
function alt(password) {
    console.log(password);

    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}

function updatePassword(req, res) {
    const id = req.sanitize('id').escape();
    const password = req.sanitize('password').escape();
    const errors = req.validationErrors();


    var userPassword = alt(password);
    if (errors) {
        res.send(errors);
        console.log(errors);
        return;
    }
    else {
        if (id != "NULL" && typeof(id) != 'undefined' && typeof(password) != 'undefined') {
            const update = [userPassword, id];
            console.log(update);
            const query = connect.con.query('UPDATE users SET password =? WHERE id=?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
            });
        }
        else
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

module.exports = {
    readEmail: readEmail,
    readUserID: readUserID,
    updateUser: updateUser,
    deleteUser: deleteUser,
    updatePassword: updatePassword,
};
