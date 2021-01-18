const mysql = require('mysql');
module.exports = {
   con : mysql.createConnection({
        host:'remotemysql.com', //webitcloud.net
        user:'SKMj4aTpc9', //webitclo_webbook
        password:'djKHE1y1Pg', //webbookPW#2018
        database:'SKMj4aTpc9', //webitclo_webbook
        port: 3306
    })};
    
    
    