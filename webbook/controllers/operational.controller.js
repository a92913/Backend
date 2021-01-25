const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

var LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = LocalStorage('./scratch');



//read operationals
function readOperational(req, res) {
    const query = connect.con.query('SELECT id_operational, name, cc, phone_number, adress, pay_per_hour, birth_date, entry_date, operational_type, speciality, id FROM operational order by id_operational ', function(err, rows, fields) {
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

//read a operational with an especific ID
function readOperationalID(req, res) {
    const idOperational = req.param('id');
    const post = { id_operational: idOperational };
    const query = connect.con.query('SELECT id_operational, name, birth_date, adress, entry_date, cc, phone_number, pay_per_hour, operational_type, speciality, id FROM operational where ? ', post, function(err, rows, fields) {
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

//delete operationals
function deleteOperational(req, res) {
    const idOperational = req.param('id');
    const query = connect.con.query('DELETE FROM operational WHERE id_operational=?', idOperational, function(err, rows, fields) {
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

//adicionar um operacional
function saveOperational(req, res) {
    const idOperational = req.sanitize('id_operational').escape();
    const nameOperational = req.sanitize('name').escape();
    const birthDate = req.sanitize('birth_date').escape();
    const adressOperational = req.sanitize('adress').escape();
    const entryDate = req.sanitize('entry_date').escape();
    const ccOperational = req.sanitize('cc').escape();
    const phoneNumberOperational = req.sanitize('phone_number').escape();
    const paymentOperational = req.sanitize('pay_per_hour').escape();
    const operationalType = req.sanitize('operational_type').escape();
    const specialityOperational = req.sanitize('speciality').escape();

    req.checkBody("name", "Insira apenas texto.").matches(/^[a-z ]+$/i);
    req.checkBody("cc", "Insira um número de cartão válido").isNumeric();
    req.checkBody("phone_number", "Insira um contacto válido.").isMobilePhone('pt-PT');
    
    let post = [
        idOperational, nameOperational, birthDate, adressOperational, entryDate, ccOperational, phoneNumberOperational, paymentOperational, operationalType, specialityOperational, localStorage.getItem("idlogin")
    ];
    const query = connect.con.query('insert into operational (id_operational, name, birth_date, adress, entry_date, cc, phone_number, pay_per_hour, operational_type, speciality, id) VALUES (?,?,?,?,?,?,?,?,?,?,?)', post,
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

//Modify data from operationals
function updateOperational(req, res) {
    const idOperational = req.param('id');
    const adressOperational = req.sanitize('adress').escape();
    const phoneNumberOperational = req.sanitize('phone_number').escape();
    const paymentOperational = req.sanitize('pay_per_hour').escape();
    //checks
    req.check("phone_number", "Insira um contacto válido.").isMobilePhone('pt-PT');
    req.check("pay_per_hour", "Insira apenas números.").isNumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idOperational != "NULL" && typeof(idOperational) != 'undefined' && typeof(adressOperational) != 'undefined' &&
            typeof(phoneNumberOperational) != 'undefined' && typeof(paymentOperational) != 'undefined') {
            const update = [adressOperational, phoneNumberOperational, paymentOperational, idOperational];
            const query = connect.con.query('UPDATE operational SET adress =?, phone_number =?, pay_per_hour=? WHERE id_operational=?', update, function(err, rows, fields) {
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

//ler um operacional pelo número de telefone
function readOperationalPhone(req, res) {
    const phone_number = req.param('phone');
    const post = { phone_number: phone_number };
    const query = connect.con.query('SELECT phone_number FROM operational WHERE ?', post, function(err, rows, fields) {
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

//ler operacionais pelo cc
function readOperationalCc(req, res) {
    const cc = req.param('cc');
    const post = { cc: cc };
    const query = connect.con.query('SELECT cc FROM operational WHERE ?', post, function(err, rows, fields) {
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

//número de operacionais
function numberOperationals(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM operational', function(err, rows, fields) {
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

//número de operacionais por data de entrada
function numberTotalPerDate(req, res) {
    const date = req.param("date");
    const post = [date];
    const query = connect.con.query('SELECT COUNT(*) FROM operational WHERE entry_date <?', post, function(err, rows, fields) {
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
    saveOperational: saveOperational,
    readOperationalID: readOperationalID,
    readOperational: readOperational,
    deleteOperational: deleteOperational,
    updateOperational: updateOperational,
    readOperationalPhone: readOperationalPhone,
    readOperationalCc: readOperationalCc,
    numberOperationals: numberOperationals,
    numberTotalPerDate: numberTotalPerDate
};
