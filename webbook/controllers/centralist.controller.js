const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

//read centralists
function readCentralist(req, res) {
    const query = connect.con.query('SELECT id_centralist, name, adress, phone_num, cc, pay_per_hour, entry_date, date_birth, id_login FROM centralist order by id_centralist ', function(err, rows, fields) {
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

//insert centralists
/*function saveCentralist(req, res) {
    //receiving the database from the form that are send by post
    const idCentralist = req.sanitize('id_centralist').escape();
    const nameCentralist = req.sanitize('name').escape();
    const dateBirth = req.sanitize('date_birth').escape();
    const ccCentralist = req.sanitize('cc').escape();
    const phoneNumberCentralist = req.sanitize('phone_num').escape();
    const adressCentralist = req.sanitize('adress').escape();
    const loginCentralist = req.sanitize('id_login').escape();
    //checks
     req.checkBody("cc", "Insira um número de cartão válido.").isNumeric();
     req.checkBody("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
     req.checkBody("name", "Insira apenas texto.").matches(/^[a-z ]+$/i);

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else if ( nameCentralist != "NULL" && dateBirth != "NULL" && ccCentralist != "NULL" && phoneNumberCentralist != "NULL" &&
        adressCentralist != "NULL" && loginCentralist != "NULL"   &&
        typeof(nameCentralist) != 'undefined' &&
        typeof(dateBirth) != 'undefined' && typeof(ccCentralist) != 'undefined' && typeof(phoneNumberCentralist) != 'undefined' &&
        typeof(adressCentralist) != 'undefined' && typeof(loginCentralist) != 'undefined') {
        const post = {
            id_centralist: idCentralist,
            name: nameCentralist,
            date_birth: dateBirth,
            cc: ccCentralist,
            phone_num: phoneNumberCentralist,
            adress: adressCentralist,
            id_login: loginCentralist
        };
        // create the insert query and execute in the bd to insert the data present in the post
        const query = connect.con.query('INSERT INTO centralist SET ?', post, function(err, rows, fields) {
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

function saveCentralist(req, res) {
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const profile = req.sanitize('profile').escape();

    const idCentralist = req.sanitize('id_centralist').escape();
    const nameCentralist = req.sanitize('name').escape();
    const birthDate = req.sanitize('birth_date').escape();
    const ccCentralist = req.sanitize('cc').escape();
    const phoneNumberCentralist = req.sanitize('phone_number').escape();
    const adressCentralist = req.sanitize('adress').escape();
    const loginCentralist = req.sanitize('id_login').escape();
    const salaryCentralist = req.sanitize('pay_per_hour').escape();
    const entrydateCentralist= req.sanitize('entry_date').escape();
    //checks
    req.checkBody("cc", "Insira um número de cartão válido.").isNumeric();
    req.checkBody("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
    req.checkBody("name", "Insira apenas texto.").matches(/^[a-z ]+$/i);

    let post1 = [
        loginCentralist, email, password, profile
    ];
    let query = "";
    console.log(post1);
    query = connect.con.query('INSERT INTO login (id_login, email, password, profile) values (?,?,?,?);', post1,
        function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {

                res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
                console.log(rows.insertId);
                let post2 = [
                        idCentralist, nameCentralist, birthDate, ccCentralist, phoneNumberCentralist, adressCentralist, rows.insertId, salaryCentralist, entrydateCentralist
                    ],
                    query = connect.con.query('insert into centralist (id_centralist, name, date_birth, cc, phone_num, adress, id_login, pay_per_hour, entry_date) VALUES (?,?,?,?,?,?,?,?,?)', post2,
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

function updateCentralist(req, res) {
    const idCentralist = req.param('id');
    const adressCentralist = req.sanitize('adress').escape();
    const phoneNumberCentralist = req.sanitize('phone_num').escape();
    const paymentCentralist = req.sanitize('pay_per_hour').escape();
    //checks
    //req.checkBody("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idCentralist != "NULL" && typeof(idCentralist) != 'undefined' && typeof(adressCentralist) != 'undefined' &&
            typeof(phoneNumberCentralist) != 'undefined' && typeof(paymentCentralist) != 'undefined') {
            const update = [adressCentralist, phoneNumberCentralist,paymentCentralist, idCentralist];
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

function readCentralistPhone(req, res) {
    const phone_num = req.param('phone');
    const post = { phone_num: phone_num };
    const query = connect.con.query('SELECT phone_num FROM centralist WHERE ?',post, function(err, rows, fields) {
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

function readCentralistCc(req, res) {
    const cc = req.param('cc');
    const post = { cc: cc };
    const query = connect.con.query('SELECT cc FROM centralist WHERE ?',post, function(err, rows, fields) {
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

module.exports = {
    readCentralist: readCentralist,
    readCentralistID: readCentralistID,
    saveCentralist: saveCentralist,
    deleteCentralist: deleteCentralist,
    updateCentralist: updateCentralist,
    readCentralistPhone: readCentralistPhone,
    readCentralistCc: readCentralistCc,
    numberCentralist: numberCentralist,
};
