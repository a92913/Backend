const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function readHelpRequestTotal(req, res) {
    const query = connect.con.query('SELECT id_request, id_occurrence, reason, num_operationals, num_materials, verification, materials_type FROM help_request ORDER BY id_request', function(err, rows, fields) {
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

function readHelpRequest(req, res) {
    const query = connect.con.query('SELECT id_request, id_occurrence, reason, num_operationals, num_materials, materials_type FROM help_request WHERE verification is null ORDER BY id_request', function(err, rows, fields) {
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
function readHelpRequestID(req, res) {
    const idRequest = req.param('id');
    const post = { id_request: idRequest };
    const query = connect.con.query('SELECT id_request, id_occurrence, reason, num_operationals, num_materials, verification, materials_type FROM help_request where ? ', post, function(err, rows, fields) {
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

function numberHelpRequest(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM help_request WHERE verification is null', function(err, rows, fields) {
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
    readHelpRequestTotal: readHelpRequestTotal,
    readHelpRequest: readHelpRequest,
    readHelpRequestID: readHelpRequestID,
    numberHelpRequest: numberHelpRequest,
    
};