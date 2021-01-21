const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;
const express = require('express');
const app = express();

app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

//carregar bibliotecas globais
const cors = require("cors");
app.use(cors());
app.use(cors({
    exposedHeaders: ['Location'],
}));

app.listen(port, function(err) {
    if (!err) {
        console.log('Your app is listening on ' + host + ' and port ' + port);
    }
    else {
        console.log(err);
    }
});

module.exports = app;
require('./loader.js');

//cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//basic route for homepage 
app.get('/', (req, res) => {
    res.send('welcome');
});

//JSON object to be added to cookie 
let users = {
    name: "Ritik",
    Age: "18"
}

//Route for adding cookie 
app.get('/setuser', (req, res) => {
    res.cookie("userData", users);
    res.send('user data added to cookie');
});

//Iterate users data from cookie 
app.get('/getuser', (req, res) => {
    //shows all the cookies 
    res.send(req.cookies);
});

//Route for destroying cookie 
app.get('/logout', (req, res) => {
    //it will clear the userData cookie 
    res.clearCookie('userData');
    res.send('user logout successfully');
});
