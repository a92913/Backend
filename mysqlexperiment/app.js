let http = require('http');
const express = require('express');
const exp = express();
const mysql = require('mysql');
const port = process.env.PORT || 8080;
let numRows = 0;
let result;
let server = http.createServer(function(request, response) {
            if (request.url == "/") {
                let obj, dbParam, xmlhttp, myObj, x, txt = "";
                connection.connect.query('SELECT * from partner where adress is "Braga"', function(err,
                    rows, fields) {
                    if (!err) {
                        numRows = rows.length;
                        result = rows;
                    }
                    else
                        console.log('Error while performing Query.', err);
                });
                txt += "<table class='table' style='width:50%' border='1'>";
                txt += "<tr><td>Id</td><td>Nome</td><td>Email</td><td>Data de registro</td><td>Data de nascimento</td><td>Morada</td>td><td>Contacto</td><td>nif</td><td>Donação</td></tr>";

                for (x = 0; x < numRows; x++) {
                    txt += "<tr><td style='text-align:right'>" + result[x].id_partner + "</td><td>" + result[x].name + "</td><td>" + +result[x].mail + "</td><td>" +
                        result[x].registration_date +
                        "</td><td>" + result[x].date_bith + "</td><td>" + result[x].adress + "</td><td>" + result[x].phone_number + "</td><td>" +
                        result[x].cc + "</td></tr>" + result[x].donation + "</td><td>";
                }
                txt += "</table>";

                response.writeHead(200, { "Content-Type": "text/html" });
                response.write('<html><title> DataBase</title> <meta charset"utf-8"> <meta name="viewport" content = "width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> <body>');
response.write(txt);
response.write("</body></html>");
        response.end();
    }
});
server.listen(port, function() {
    console.log('Servidor Node.js em execucao');
});
const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'SKMj4aTpc9',
    password: 'djKHE1y1Pg',
    database: 'SKMj4aTpc9'
});


connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

exp.get("/", (req, res) => {
    connection.query('SELECT * from partner where adress="Braga"', (err, rows) => {
        if (err) throw err;
        console.log('The data from partner table are: \n', rows);
        connection.end();
    });
});

exp.listen(port, () => {
    console.log('Server is running at port 3000');
});

function queryRow() {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery, ["partner", "adress", "Braga"]);
    // query = SELECT * FROM `todo` where `user` = 'shahid'
    connection.query(query, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log();
    });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
    // call the function
    // select rows
    queryRow();
}, 2000);
