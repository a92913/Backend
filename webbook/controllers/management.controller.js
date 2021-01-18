const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

//ler os membros da direção
function readManagement(req, res) {
    const query = connect.con.query('SELECT id_management, name, cc, date_birth, phone_number, adress, id_login FROM management order by id_management ', function(err, rows, fields) {
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

//ler os diretores pelo ID
function readManagementID(req, res) {
    const idManagement = req.param('id');
    const post = { id_management: idManagement };
    const query = connect.con.query('SELECT id_management, name, date_birth, cc, phone_number, adress, id_login FROM management where ? ', post, function(err, rows, fields) {
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

function updateManagement(req, res) {
    const idManagement = req.param('id');
    const adressManagement = req.sanitize('adress').escape();
    const phoneNumberManagement = req.sanitize('phone_number').escape();
    //checks
    //req.checkBody("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idManagement != "NULL" && typeof(idManagement) != 'undefined' && typeof(adressManagement) != 'undefined' &&
            typeof(phoneNumberManagement) != 'undefined') {
            const update = [adressManagement, phoneNumberManagement, idManagement];
            const query = connect.con.query('UPDATE management SET adress =?, phone_number =? WHERE id_management=?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
                else {
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

function saveManagement(req, res) {
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const profile = req.sanitize('profile').escape();

    const idManagement = req.sanitize('id_management').escape();
    const nameManagement = req.sanitize('name').escape();
    const birthDate = req.sanitize('date_birth').escape();
    const ccManagement = req.sanitize('cc').escape();
    const phoneNumberManagement = req.sanitize('phone_number').escape();
    const adressManagement = req.sanitize('adress').escape();
    const loginManagement = req.sanitize('id_login').escape();

    let post1 = [
        loginManagement, email, password, profile
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
                        idManagement, nameManagement, birthDate, ccManagement, phoneNumberManagement, adressManagement, rows.insertId
                    ],
                    query = connect.con.query('insert into management (id_management, name, date_birth, cc, phone_number, adress, id_login) VALUES (?,?,?,?,?,?,?)', post2,
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

function deleteManagement(req, res) {
    const idManagement = req.param('id');
    const query = connect.con.query('DELETE FROM management WHERE id_management=?', idManagement, function(err, rows, fields) {
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

function readManagementPhone(req, res) {
    const phone_number = req.param('phone');
    const post = { phone_number: phone_number };
    const query = connect.con.query('SELECT phone_number FROM management WHERE ?',post, function(err, rows, fields) {
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

function readManagementCc(req, res) {
    const cc = req.param('cc');
    const post = { cc: cc };
    const query = connect.con.query('SELECT cc FROM management WHERE ?',post, function(err, rows, fields) {
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


function updatePassword(req, res) {
    const idManagement = req.param('id');
    const passwordManagement = req.sanitize('password').escape();
    //checks
    //req.checkBody("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idManagement != "NULL" && typeof(idManagement) != 'undefined' && typeof(passwordManagement) != 'undefined' &&
            typeof(passwordManagement) != 'undefined') {
            const update = [passwordManagement, idManagement];
            const query = connect.con.query('UPDATE management SET adress =?, phone_number =? WHERE id_management=?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
                else {
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

module.exports = {
    readManagement: readManagement,
    readManagementID: readManagementID,
    updateManagement: updateManagement,
    saveManagement:saveManagement,
    deleteManagement:deleteManagement,
    readManagementPhone:readManagementPhone,
    readManagementCc:readManagementCc,
    updatePassword:updatePassword,
};
