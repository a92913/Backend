const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

//read operationals
function readOperational(req, res) {
    const query = connect.con.query('SELECT id_operational, name, cc, phone_number, adress, pay_per_hour, birth_date, entry_date, operational_type, speciality, id_login FROM operational order by id_operational ', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT id_operational, name, birth_date, adress, entry_date, cc, phone_number, pay_per_hour, operational_type, speciality, id_login FROM operational where ? ', post, function(err, rows, fields) {
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

//insert operationals
/*function saveOperational(req, res) {
    //receiving the database from the form that are send by post
    const email = req.sanitize("email").escape();
    const ps = req.sanitize("password").escape();
    const profile = req.sanitize("profile").escape();

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
    const loginOperational = req.sanitize('id_login').escape();
    //checks
    req.checkBody("cc", "Insira um número de cartão válido.").isNumeric();
    req.checkBody("phone_number", "Insira um contacto válido.").isMobilePhone('pt-PT');
    req.checkBody("name", "Insira apenas texto.").matches(/^[a-z ]+$/i);
    req.checkBody("operational_type", "Insira apenas texto.").matches(/^[a-z ]+$/i);
    req.checkBody("speciality", "Insira apenas texto.").matches(/^[a-z ]+$/i);

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else if (nameOperational != "NULL" && birthDate != "NULL" && adressOperational != "NULL" && entryDate != "NULL" &&
        ccOperational != "NULL" && phoneNumberOperational != "NULL" && paymentOperational != "NULL" && operationalType != "NULL" &&
        specialityOperational != "NULL" && loginOperational != "NULL" && typeof(nameOperational) != 'undefined' &&
        typeof(birthDate) != 'undefined' && typeof(adressOperational) != 'undefined' && typeof(entryDate) != 'undefined' &&
        typeof(ccOperational) != 'undefined' && typeof(phoneNumberOperational) != 'undefined' && typeof(paymentOperational) != 'undefined' &&
        typeof(operationalType) != 'undefined' && typeof(specialityOperational) != 'undefined' && typeof(loginOperational) != 'undefined') {
        const post = {
            id_operational: idOperational,
            name: nameOperational,
            birth_date: birthDate,
            adress: adressOperational,
            entry_date: entryDate,
            cc: ccOperational,
            phone_number: phoneNumberOperational,
            pay_per_hour: paymentOperational,
            operational_type: operationalType,
            speciality: specialityOperational,
            id_login: loginOperational
        };
        // create the insert query and execute in the bd to insert the data present in the post
        const query = connect.con.query('INSERT INTO operational SET ?', post, function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
            }
            else {
                console.log(err);
                if (err.code == "ER_DUP_ENTRY") {
                    res.status(jsonMessages.db.duplicateData.status).send(jsonMessages.db.duplicateData);
                }
                else {
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            }
        });
    }
    else {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}*/

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

function saveOperational(req, res) {
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const profile = req.sanitize('profile').escape();

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
    const loginOperational = req.sanitize('id_login').escape();

    let post1 = [ loginOperational, email, password, profile ];
    let query = "";
    console.log(post1);
    query = connect.con.query('INSERT INTO login (id_login, email, password, profile) values (?,?,?,?);', post1,
        function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {

                res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
                console.log(rows.insertId);
                let post2 = [
                        idOperational, nameOperational, birthDate, adressOperational, entryDate, ccOperational, phoneNumberOperational, paymentOperational, operationalType, specialityOperational, rows.insertId
                    ],
                    query = connect.con.query('insert into operational (id_operational, name, birth_date, adress, entry_date, cc, phone_number, pay_per_hour, operational_type, speciality, id_login) VALUES (?,?,?,?,?,?,?,?,?,?,?)', post2,
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

    //req.checkBody("phone_number", "Insira um contacto válido.").isMobilePhone('pt-PT');
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

function readOperationalPhone(req, res) {
    const phone_number = req.param('phone');
    const post = { phone_number: phone_number };
    const query = connect.con.query('SELECT phone_number FROM operational WHERE ?',post, function(err, rows, fields) {
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

function readOperationalCc(req, res) {
    const cc = req.param('cc');
    const post = { cc: cc };
    const query = connect.con.query('SELECT cc FROM operational WHERE ?',post, function(err, rows, fields) {
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


module.exports = {
    saveOperational: saveOperational,
    readOperationalID: readOperationalID,
    readOperational: readOperational,
    deleteOperational: deleteOperational,
    updateOperational: updateOperational,
    readOperationalPhone:readOperationalPhone,
    readOperationalCc: readOperationalCc,
    numberOperationals:numberOperationals,
};
