const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

//read requests
function readRequest(req, res) {
    const query = connect.con.query('SELECT r.id_request, r.content, r.description, r.adress, r.mail, r.name, r.date, r.phone_number, r.verification, r.verification_date, rt.typology, rt.difficulty_level FROM request r, request_type rt WHERE r.id_request = rt.id_request ORDER BY id_request', function(err, rows, fields) {
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

function readRequestID(req, res) {
    /*   const idRequest = req.param('id');
       const post = { id_request: idRequest };
       const query = connect.con.query('SELECT r.id_request, r.content, r.adress, r.mail, r.name, r.date, r.phone_number, r.verifycation, r.verifycation_date, r.hour, rt.typology, rt.difficulty_level FROM request r, request_type rt WHERE r.id_request = rt.id_request  ', post, function(err, rows, fields) {
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
       });*/
    const idRequest = req.param('id');
    const post = { id_request: idRequest };
    const query = connect.con.query('SELECT id_request, content, description, adress, mail, name, date, phone_number, verification_date, hour FROM request where ? ', post, function(err, rows, fields) {
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

function readRequestTypeID(req, res) {
    const idRequest = req.param('id');
    const post = { id_request: idRequest };
    const query = connect.con.query('SELECT id_request, typology, difficulty_level FROM request_type where ? ', post, function(err, rows, fields) {
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


function saveRequest(req, res) {

    //receber os dados do formulário que são enviados por post
    const idRequest = req.sanitize('id_request').escape();
    const content = req.sanitize('content').escape();
    const description = req.sanitize('description').escape();
    const adress = req.sanitize('adress').escape();
    const mail = req.sanitize('mail').escape();
    const name = req.sanitize('name').escape();
    const date = req.sanitize('date').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const verification = req.sanitize('verification').escape();
    const verification_date = req.sanitize('verification_date').escape();
    const hour = req.sanitize('hour').escape();


    req.checkBody("mail", "Insira um email válido.").isEmail;
    req.checkBody("phone_number").notEmpty;
    req.checkBody("date").notEmpty;
    req.checkBody("content").notEmpty;
    req.checkBody("name").notEmpty;

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    const post = {
        id_request: idRequest,
        content: content,
        description: description,
        adress: adress,
        mail: mail,
        name: name,
        date: date,
        phone_number: phone_number,
        verification: verification,
        verification_date: verification_date,
        hour: hour
    };

    //criar e executar a query de gravação na BD para inserir os dados presentes no post
    const query = connect.con.query('INSERT INTO request SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
            console.log(rows.insertId);
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

function saveRequestType(req, res) {

    //receber os dados do formulário que são enviados por post
    /*   const idRequest = req.sanitize('id_request').escape();
       const typology = req.sanitize('typology').escape();
       const difficulty_level = req.sanitize('difficulty_level').escape();

       const errors = req.validationErrors();
       if (errors) {
           res.send(errors);
           return;
       }
       
       const post = {
           id_request:idRequest,
           typology: typology,
           difficulty_level: difficulty_level
       }

       //criar e executar a query de gravação na BD para inserir os dados presentes no post
       const query = connect.con.query('INSERT INTO request_type SET ?', post, function(err, rows, fields) {
           console.log(query.sql);
           if (!err) {
               res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
               localStorage.setItem("idreq3", rows.insertId);
               console.log(localStorage.idreq3)
           }
           else {
               console.log(err);
               if (err.code == "ER_DUP_ENTRY") {
                   res.status(jsonMessages.db.duplicateData.status).send(jsonMessages.db.duplicateData);
               }
               else
                   res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
           }
       });*/

    const idRequest = req.sanitize('id_request').escape();
    const content = req.sanitize('content').escape();
    const description = req.sanitize('description').escape();
    const adress = req.sanitize('adress').escape();
    const mail = req.sanitize('mail').escape();
    const name = req.sanitize('name').escape();
    const date = req.sanitize('date').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const verification = req.sanitize('verification').escape();
    const verification_date = req.sanitize('verification_date').escape();
    const hour = req.sanitize('hour').escape();

    const typology = req.sanitize('typology').escape();
    const difficulty_level = req.sanitize('difficulty_level').escape();


    let post1 = [
        idRequest, content, description, adress, mail, name, date, phone_number, verification, verification_date, hour
    ];
    let query = "";

    query = connect.con.query('INSERT INTO request (id_request, content, description, adress, mail, name, date, phone_number, verification, verification_date, hour) values (?,?,?,?,?,?,?,?,?,?,?);', post1,
        function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
                console.log(rows.insertId);
                let post2 = [
                        rows.insertId, typology, difficulty_level
                    ],
                    query = connect.con.query('insert into request_type (id_request, typology, difficulty_level) VALUES (?,?,?)', post2,
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

function readRequestByTypology(req, res) {
    const typology = req.param('typology');
    const post = { typology: typology };
    const query = connect.con.query('SELECT r.id_request, r.content, r.description, r.adress, r.mail, r.name, r.date, r.phone_number, r.verification, r.verification_date, rt.typology, rt.difficulty_level FROM request r, request_type rt WHERE r.id_request = rt.id_request AND r.verification is null AND ? ', post, function(err, rows, fields) {
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

function updateRequest(req, res) {
    const id = req.sanitize('id').escape();
    const phone = req.sanitize('phone_number').escape();

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        console.log(errors);
        return;
    }
    else {
        if (phone != "NULL" && typeof(phone) != 'undefined') {
            const update = [phone, id];
            console.log(update);
            const query = connect.con.query('UPDATE request SET phone_number =? WHERE id_request=?', update, function(err, rows, fields) {
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

function readRequestVerification(req, res) {
    const statusF = req.param('verification');
    const post = { verification: statusF };
    const query = connect.con.query('SELECT id_request, description, adress, date, phone_number, content, mail, name, verification, verification_date, hour FROM request where verification is null ', post, function(err, rows, fields) {
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


function deleteRequest(req, res) {
    const idRequest = req.param('id');
    const query = connect.con.query('DELETE FROM request_type WHERE id_request=?', idRequest, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
            const query = connect.con.query('DELETE FROM request WHERE id_request=?', idRequest, function(err, rows, fields) {
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
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}

function readRequestTrat(req, res) {
    const statusF = req.param('verification');
    const today = new Date().toISOString().slice(0, 10);
    const post = [statusF, today];
    const query = connect.con.query('SELECT id_request, name, mail, content, phone_number, adress, description, verification, verification_date, hour, date  FROM request where verification=? and date > ?', post, function(err, rows, fields) {
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

function numberPendingReq(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM request WHERE verification = "null"', function(err, rows, fields) {
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

function numberTratReq(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM request WHERE verification is not null', function(err, rows, fields) {
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

function numberTotalReq(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM request', function(err, rows, fields) {
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

function numberTotalPerDateReq2019(req, res) {
    const dateinf = "2018-12-31";
    const datesup = "2020-01-01";
    const content = req.param("content");
    const post = [dateinf, datesup, content];
    const query = connect.con.query('SELECT COUNT(*) FROM request WHERE verification = "Aprovado" AND date BETWEEN ? AND  ? and content=?', post, function(err, rows, fields) {
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

function numberTotalPerDateReq2020(req, res) {
    const dateinf = "2019-12-31";
    const datesup = "2021-01-01";
    const content = req.param("content");
    const post = [dateinf, datesup, content];
    const query = connect.con.query('SELECT COUNT(*) FROM request WHERE verification = "Aprovado" AND date BETWEEN ? AND  ? and content=?', post, function(err, rows, fields) {
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

function numberTotalPerDateReq2021(req, res) {
    const dateinf = "2020-12-31";
    const datesup = "2022-01-01";
    const content = req.param("content");
    const post = [dateinf, datesup, content];
    const query = connect.con.query('SELECT COUNT(*) FROM request WHERE verification = "Aprovado" AND date BETWEEN ? AND  ? and content=?', post, function(err, rows, fields) {
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
    readRequest: readRequest,
    readRequestID: readRequestID,
    saveRequest: saveRequest,
    saveRequestType: saveRequestType,
    readRequestByTypology: readRequestByTypology,
    updateRequest: updateRequest,
    readRequestVerification: readRequestVerification,
    deleteRequest: deleteRequest,
    readRequestTypeID: readRequestTypeID,
    readRequestTrat: readRequestTrat,
    numberPendingReq: numberPendingReq,
    numberTratReq: numberTratReq,
    numberTotalReq: numberTotalReq,
    numberTotalPerDateReq2019:numberTotalPerDateReq2019,
    numberTotalPerDateReq2020:numberTotalPerDateReq2020,
    numberTotalPerDateReq2021:numberTotalPerDateReq2021,
};
