const connect = require('../config/connectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

//read an occurence with an especific ID
function readOccurrenceID(req, res) {
    const idOccurrence = req.param('id');
    const post = { id_occurrence: idOccurrence };
    const query = connect.con.query('SELECT id_occurrence, local, distance, occurrence_type, status, arrival, departure, cost, origin, description, victim_number, id_entity, id_request FROM occurrence where ? ', post, function(err, rows, fields) {
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
    //read all the occurences
function readOccurrence(req, res) {
    const query = connect.con.query('SELECT id_occurrence, local, distance, occurrence_type, status, arrival, departure, cost, origin, description, victim_number, id_entity, id_request FROM occurrence order by id_occurrence ', function(err, rows, fields) {
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

    //lê as occorrencias que ainda estão a decorrer
/*function readOccurrenceFinished(req, res) {
    const statusF = req.param('status');
    const post = { status: statusF};
    const query = connect.con.query('SELECT id_occurrence, local, distance, occurrence_type, status, arrival, departure, cost, origin, description, victim_number, id_entity, id_request FROM occurrence where status= "Finalizada" ', post, function(err, rows, fields) {
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
}*/

function readOccurrenceStatus(req, res) {
    const statusF = req.param('status');
    const post = { status: statusF};
    const query = connect.con.query('SELECT id_occurrence, local, occurrence_type, departure, victim_number, description, distance,status, arrival, cost, origin, id_entity, id_request FROM occurrence where ?',post, function(err, rows, fields) {
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

function numberOccAct(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM occurrence WHERE status = "Em curso"', function(err, rows, fields) {
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

function numberOccFin(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM occurrence WHERE status = "Finalizada"', function(err, rows, fields) {
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

function numberOccTotal(req, res) {
    const query = connect.con.query('SELECT COUNT(*) FROM occurrence', function(err, rows, fields) {
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
//export functions
module.exports = {
    readOccurrenceID: readOccurrenceID,
    readOccurrence: readOccurrence,
    readOccurrenceStatus: readOccurrenceStatus,
    numberOccAct:numberOccAct,
    numberOccFin:numberOccFin,
    numberOccTotal:numberOccTotal, 
};