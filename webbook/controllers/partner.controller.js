const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

//read partners
function readPartner(req, res) {
    const query = connect.con.query('SELECT num_partner, name, cc, phone_num, adress, donation, registration_date, date_bith mail, id_station FROM partner WHERE checkout_date = "1111-01-01" order by num_partner ', function(err, rows, fields) {
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

//read partners by cc
function readPartnerCC(req, res) {
    const cc = req.param('cc');
    const post = { cc: cc };
    const query = connect.con.query('SELECT num_partner, name, registration_date, date_bith, mail, phone_num, cc, adress, donation, id_station, checkout_date FROM partner where ? ', post, function(err, rows, fields) {
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

//adicionar um sócio
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
    const checkOut = "1111/1/1";
    req.checkBody("mail", "Insira um email válido.").isEmail;
    req.checkBody("mail", "Insira o seu email.").notEmpty;
    req.checkBody("dateBirth").optional({ checkFalsy: true });
    req.checkBody("adressPartner").optional({ checkFalsy: true });
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
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
        id_station: idStation,
        checkout_date:checkOut
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

//apagar um sócio
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

//alterar dados dos sócios na reinscrição
function updatePartnerResc(req, res) {
    const idPartner = req.sanitize('num_partner').escape();
    const phoneNum = req.sanitize('phone_num').escape();
    const adressPartner = req.sanitize('adress').escape();
    const donationPartner = req.sanitize('donation').escape();
    const mail = req.sanitize('mail').escape();
    const checkout_date = "1/1/1";
    const errors = req.validationErrors();
    req.check("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
    req.check("donation", "Insira apenas números.").isNumeric();
    req.check("mail", "Insira um email válido.").isEmail();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idPartner != "NULL" && donationPartner != "NULL" && typeof(idPartner) != 'undefined' && typeof(donationPartner) != 'undefined' && typeof(phoneNum) != 'undefined' && typeof(adressPartner) != 'undefined') {
            const update = [phoneNum, adressPartner, donationPartner, mail, checkout_date, idPartner];
            console.log(update);
            const query = connect.con.query('UPDATE partner SET phone_num =?, adress =?, donation=?, mail=?, checkout_date=? WHERE num_partner=?', update, function(err, rows, fields) {
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

//alterar dados dos sócios
function updatePartner(req, res) {
    const idPartner = req.sanitize('num_partner').escape();
    const phoneNum = req.sanitize('phone_num').escape();
    const adressPartner = req.sanitize('adress').escape();
    const donationPartner = req.sanitize('donation').escape();
    const mail = req.sanitize('mail').escape();
    const errors = req.validationErrors();
    req.check("phone_num", "Insira um contacto válido.").isMobilePhone('pt-PT');
    req.check("donation", "Insira apenas números.").isNumeric();
    req.check("mail", "Insira um email válido.").isEmail();
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

//número de sócios
function numberPartner(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM partner WHERE checkout_date = "1111-01-01"', function(err, rows, fields) {
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

//modificar a data de saída
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

//numero de sócios por dada de entrada
function numberTotalPerDate(req, res) {
    const date = req.param("date");
    const post = [date, date];
    const query = connect.con.query('SELECT COUNT(*) FROM partner WHERE (checkout_date = "1111-01-01" or checkout_date > ?) AND registration_date <?', post, function(err, rows, fields) {
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
    updatePartnerResc:updatePartnerResc,
    updatePartner: updatePartner,
    numberPartner: numberPartner,
    checkOutPartner: checkOutPartner,
    numberTotalPerDate: numberTotalPerDate,
    readPartnerCC: readPartnerCC,
};
