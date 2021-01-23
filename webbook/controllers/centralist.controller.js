const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

var LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = LocalStorage('./scratch');

//read centralists
function readCentralist(req, res) {
    const query = connect.con.query('SELECT id_centralist, name, adress, phone_num, cc, pay_per_hour, entry_date, date_birth, id_login FROM centralist order by id_login ', function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
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

//read centralists by id
function readCentralistID(req, res) {
    const idCentralist = req.param('id');
    const post = { id_centralist: idCentralist };
    const query = connect.con.query('SELECT id_centralist, name, cc, phone_num, adress, pay_per_hour, entry_date, date_birth, id_login FROM centralist where ? ', post, function(err, rows, fields) {
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

//read centralists by id_login
function readCentralistIDLogin(req, res) {
    const idlogin = req.param('id');
    const post = { id_login: idlogin };
    const query = connect.con.query('SELECT id_login, name, cc, phone_num, adress, pay_per_hour, entry_date, date_birth, id_centralist  FROM centralist where ? ', post, function(err, rows, fields) {
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

//insert centralists
function saveCentralist(req, res) {

    const idCentralist = req.sanitize('id_centralist').escape();
    const nameCentralist = req.sanitize('name').escape();
    const birthDate = req.sanitize('birth_date').escape();
    const ccCentralist = req.sanitize('cc').escape();
    const phoneNumberCentralist = req.sanitize('phone_number').escape();
    const adressCentralist = req.sanitize('adress').escape();
    const salaryCentralist = req.sanitize('pay_per_hour').escape();
    const entrydateCentralist = req.sanitize('entry_date').escape();
    //checks
    req.checkBody("cc", "Insira um número de cartão válido.").isNumeric();
    req.checkBody("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
    req.checkBody("name", "Insira apenas texto.").matches(/^[a-z ]+$/i);
    req.checkBody("pay_per_hour", "Insira um pagamento válido.").isNumeric();

    let post = [
        idCentralist, nameCentralist, birthDate, ccCentralist, phoneNumberCentralist, adressCentralist, localStorage.getItem("idlogin"), salaryCentralist, entrydateCentralist
    ];

    const query = connect.con.query('insert into centralist (id_centralist, name, date_birth, cc, phone_num, adress, id_login, pay_per_hour, entry_date) VALUES (?,?,?,?,?,?,?,?,?)', post,
        function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
            }
            else {
                console.log(err);
                if (err.code == "ER_DUP_ENTRY") {
                    res.status(jsonMessages.db.duplicateData.status).send(jsonMessages.db.duplicateData);
                }
                else
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            }
        });
}

//delete centralists
function deleteCentralist(req, res) {
    const idCentralist = req.param('id');
    const query = connect.con.query('DELETE FROM centralist WHERE id_centralist=?', idCentralist, function(err, rows, fields) {
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

//alterar dados dos centralistas
function updateCentralist(req, res) {
    const idCentralist = req.param('id');
    const adressCentralist = req.sanitize('adress').escape();
    const phoneNumberCentralist = req.sanitize('phone_num').escape();
    const paymentCentralist = req.sanitize('pay_per_hour').escape();
    //checks
    req.checkBody("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
    req.checkBody("pay_per_hour", "Insira apenas números.").isNumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idCentralist != "NULL" && typeof(idCentralist) != 'undefined' && typeof(adressCentralist) != 'undefined' &&
            typeof(phoneNumberCentralist) != 'undefined' && typeof(paymentCentralist) != 'undefined') {
            const update = [adressCentralist, phoneNumberCentralist, paymentCentralist, idCentralist];
            const query = connect.con.query('UPDATE centralist SET adress =?, phone_num =?, pay_per_hour =? WHERE id_centralist=?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

//ler os centralistas pelo número de telefone
function readCentralistPhone(req, res) {
    const phone_num = req.param('phone');
    const post = { phone_num: phone_num };
    const query = connect.con.query('SELECT phone_num FROM centralist WHERE ?', post, function(err, rows, fields) {
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
    }   );
}

//ler os centralistas pelo cc
function readCentralistCc(req, res) {
    const cc = req.param('cc');
    const post = { cc: cc };
    const query = connect.con.query('SELECT cc FROM centralist WHERE ?', post, function(err, rows, fields) {
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

//contar o número de centralistas
function numberCentralist(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM centralist', function(err, rows, fields) {
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

//número de centralistas por data de entrada
function numberTotalPerDate(req, res) {
    const date = req.param("date");
    const post = [date];
    const query = connect.con.query('SELECT COUNT(*) FROM centralist WHERE entry_date <?', post, function(err, rows, fields) {
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

module.exports = {
    readCentralist: readCentralist,
    readCentralistID: readCentralistID,
    readCentralistIDLogin:readCentralistIDLogin,
    saveCentralist: saveCentralist,
    deleteCentralist: deleteCentralist,
    updateCentralist: updateCentralist,
    readCentralistPhone: readCentralistPhone,
    readCentralistCc: readCentralistCc,
    numberCentralist: numberCentralist,
    numberTotalPerDate: numberTotalPerDate,
};
