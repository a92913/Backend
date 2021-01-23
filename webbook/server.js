const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;
const express = require('express');
const app = express();



app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

var LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = LocalStorage('./scratch');

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

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        let name = Date.now() + path.extname(file.originalname);
        cb(null, name);
        let nameUpload = "../Backend/webbook/uploads/" + name;
        localStorage.setItem("foto", nameUpload);
        console.log(nameUpload)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    }
    catch (error) {
        console.error(error);
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
