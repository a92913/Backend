const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
const connect = require('../config/connectMYSQL');
var exports = module.exports = {};

exports.signup = function(req, res) {
    res.status(jsonMessages.user.duplicate.status).send(jsonMessages.user.duplicate);
};
exports.signupSuccess = function(req, res) {
    res.status(jsonMessages.user.signupSuccess.status).send(jsonMessages.user.signupSuccess);
};

exports.signin = function(req, res) {
    res.status(jsonMessages.user.invalid.status).send(jsonMessages.user.invalid);
};

exports.signinSuccess = function(req, res) {
    const id = global.sessData.passport.user;
    const post = { id: id };
    console.log(id);
    const query = connect.con.query('SELECT id, email, password, profile FROM users where ? ', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {

                var msgFinal = {
                    MSG: req.user,
                    msg: "Success",
                    message: {
                        eng: "Login with sucess",
                        pt: "Login com sucesso"
                    },
                    status: 200,
                    success: true
                }
                console.log(msgFinal);
                res.send(msgFinal);

            }
        }
        else
            res.status(400).send({
                "msg": err.code
            });

    });


};


exports.logout = function(req, res, err) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            res.status(jsonMessages.user.logoutError.status).send(jsonMessages.user.logoutError);
        }
        res.status(jsonMessages.user.logoutSuccess.status).send(jsonMessages.user.logoutSuccess);
    });
};
