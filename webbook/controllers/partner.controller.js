const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");



//read partnerss
function readPartner(req, res) {
    const query = connect.con.query('SELECT num_partner, name, cc, phone_num, adress, donation, registration_date, date_bith mail, id_station FROM partner WHERE checkout_date is NULL order by num_partner ', function(err, rows, fields) {
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

//read partners by id
function readPartnerID(req, res) {
    const idPartner = req.param('id');
    const post = { num_partner: idPartner };
    const query = connect.con.query('SELECT num_partner, name, registration_date, date_bith, mail, phone_num, cc, adress, donation, id_station FROM partner where ? ', post, function(err, rows, fields) {
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

function savePartner(req, res) {
    //receber os dados do formulário que são enviados por post
    const idPartner = req.sanitize('num_partner').escape();
    const namePartner = req.sanitize('name').escape();
    const registrationDate = req.sanitize('registration_date').escape();
    const dateBirth = req.sanitize('date_bith').escape();
    const email = req.sanitize('mail').escape();
    const phoneNum = req.sanitize('phone_num').escape();
    const ccPartner = req.sanitize('cc').escape();
    const adressPartner = req.sanitize('adress').escape();
    const donationPartner = req.sanitize('donation').escape();
    const idStation = req.sanitize('id_station').escape();
    req.checkBody("mail", "Insira um email válido.").isEmail;
    req.checkBody("mail", "Insira o seu email.").notEmpty;
    req.checkBody("dateBirth").optional({ checkFalsy: true });
    req.checkBody("adressPartner").optional({ checkFalsy: true });
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    /* if (idPartner != "NULL" && namePartner != "NULL" && registrationDate != "NULL" && email != "NULL" && phoneNum != "NULL" && ccPartner != "NULL" &&
         donationPartner != "NULL" && idStation != "NULL" && typeof(idPartner) != 'undefined' && typeof(namePartner) != 'undefined' &&
         typeof(registrationDate) != 'undefined' && typeof(email) != 'undefined' && typeof(phoneNum) != 'undefined' &&
         typeof(ccPartner) != 'undefined' && typeof(donationPartner) != 'undefined' && typeof(idStation) != 'undefined') {*/
    const post = {
        num_partner: idPartner,
        name: namePartner,
        registration_date: registrationDate,
        date_bith: dateBirth,
        mail: email,
        phone_num: phoneNum,
        cc: ccPartner,
        adress: adressPartner,
        donation: donationPartner,
        id_station: idStation
    }

    //criar e executar a query de gravação na BD para inserir os dados presentes no post
    const query = connect.con.query('INSERT INTO partner SET ?', post, function(err, rows, fields) {
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
/*else {
    res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);*/



function deletePartner(req, res) {
    const idPartner = req.param('id');
    const query = connect.con.query('DELETE FROM partner WHERE num_partner=?', idPartner, function(err, rows, fields) {
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

function updatePartner(req, res) {
    const idPartner = req.sanitize('num_partner').escape();
    const phoneNum = req.sanitize('phone_num').escape();
    const adressPartner = req.sanitize('adress').escape();
    const donationPartner = req.sanitize('donation').escape();
    const mail = req.sanitize('mail').escape();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idPartner != "NULL" && donationPartner != "NULL" && typeof(idPartner) != 'undefined' && typeof(donationPartner) != 'undefined' && typeof(phoneNum) != 'undefined' && typeof(adressPartner) != 'undefined') {
            const update = [phoneNum, adressPartner, donationPartner, mail, idPartner];
            const query = connect.con.query('UPDATE partner SET phone_num =?, adress =?, donation=?, mail=? WHERE num_partner=?', update, function(err, rows, fields) {
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

function numberPartner(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM partner WHERE checkout_date is NULL', function(err, rows, fields) {
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

function checkOutPartner(req, res) {
    const idPartner = req.param('id');
    const today = new Date().toISOString().slice(0, 10);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idPartner != "NULL" && typeof(idPartner) != 'undefined') {
            const update = [today, idPartner];
            const query = connect.con.query('UPDATE partner SET checkout_date=? WHERE num_partner=?', update, function(err, rows, fields) {
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

function numberTotalPerDate(req, res) {
    const date = req.param("date");
        const post = [date, date];
        const query = connect.con.query('SELECT COUNT(*) FROM partner WHERE (checkout_date is NULL or checkout_date > ?) AND registration_date <?', post, function(err, rows, fields) {
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

//exportar as funções
module.exports = {
    readPartner: readPartner,
    readPartnerID: readPartnerID,
    savePartner: savePartner,
    deletePartner: deletePartner,
    updatePartner: updatePartner,
    numberPartner: numberPartner,
    checkOutPartner: checkOutPartner,
    numberTotalPerDate: numberTotalPerDate,
};
