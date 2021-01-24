const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "mail");
const connect = require('../config/connectMYSQL');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
var bCrypt = require('bcrypt-nodejs');


function alt(password) {
 console.log(password);

 return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}


function sendMail(req, res) {
 //const name = req.sanitize('name').escape();
 const email = req.sanitize('email').escape();
 // const subject = req.sanitize('subject').escape();
 // req.checkBody("name", "Insira apenas texto", 'pt-PT').matches(/^[a-z ]+$/i);
 // req.checkBody("email", "Insira um email válido.").isEmail();
 /* const errors = req.validationErrors();
  if (errors) {
   res.send(errors);
   return;
  }
  else {*/
 //  if (typeof(email) != "undefined" && typeof(subject) != "undefined" && typeof(name) != "undefined") {
 let password = Math.random().toString(36).slice(-10);

 let bodycontent = "";
 // bodycontent += 'Caro ' + req.body.name + ',<br>' + '<br>';
 bodycontent += 'Reposição de palavra-passe solicitada!' + '<br>' + '<br>';
 bodycontent += 'Atribuimos-lhe uma nova palavra-passe:<br>';
 bodycontent += password + '</blockquote><i>';
 console.log(password)
 bodycontent += 'Atenciosamente, a sua Equipa Security4All.';
 // bodycontent += req.body.subject + '<br>' + '<br>' + 'mensagem enviada por ' + req.body.name;
 // bodycontent += ' com o email <a href="mailto:' + req.body.email + '" target="_top">' + req.body.email + '</a>';
 bodycontent += '</i></blockquote>';

 const transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
   user: 'noreplybombeiros',
   pass: "equipad21"
  }
 }));
 transporter.verify(function(error, success) {
  if (error) {
   console.log(error);
   res.status(jsonMessages.mail.serverError.status).send(jsonMessages.mail.serverError);
  }
  else {
   console.log('Server is ready to take our messages');
  }
 });

 const mailOptions = {
  from: email,
  to: 'noreplybombeiros@gmail.com',
  cc: email,
  subject: 'Bombeiros - site contact',
  html: bodycontent
 };

 transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
   console.log(error);
   res.status(jsonMessages.mail.mailError.status).send(jsonMessages.mail.mailError);
  }
  else {
   console.log('Email sent: ' + info.response);
   res.status(jsonMessages.mail.mailSent.status).send(jsonMessages.mail.mailSent);
   
   
   var userPassword = alt(password);
   const update = [userPassword, email];
   console.log(update);
   const query = connect.con.query('UPDATE users SET password =? WHERE email=?', update, function(err, rows, fields) {
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
 });

}




function sendMail2(req, res) {
 const name = req.sanitize('name').escape();
 const email = req.sanitize('email').escape();
 // const subject = req.sanitize('subject').escape();
 // req.checkBody("name", "Insira apenas texto", 'pt-PT').matches(/^[a-z ]+$/i);
 // req.checkBody("email", "Insira um email válido.").isEmail();
 /* const errors = req.validationErrors();
  if (errors) {
   res.send(errors);
   return;
  }
  else {*/
 //  if (typeof(email) != "undefined" && typeof(subject) != "undefined" && typeof(name) != "undefined") {

 let bodycontent = "";
 bodycontent += 'Caro/a ' + name + ',<br>' + '<br>';
 bodycontent += 'Obrigado por confiar em nós!' + '<br>' + '<br>';
 bodycontent += 'O seu pedido foi registado e será análisado.' + '<br>' + '<br>';
 bodycontent += 'Atenciosamente, a sua Equipa Security4All.';
 // bodycontent += req.body.subject + '<br>' + '<br>' + 'mensagem enviada por ' + req.body.name;
 // bodycontent += ' com o email <a href="mailto:' + req.body.email + '" target="_top">' + req.body.email + '</a>';
 bodycontent += '</i></blockquote>';

 const transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
   user: 'noreplybombeiros',
   pass: "equipad21"
  }
 }));
 transporter.verify(function(error, success) {
  if (error) {
   console.log(error);
   res.status(jsonMessages.mail.serverError.status).send(jsonMessages.mail.serverError);
  }
  else {
   console.log('Server is ready to take our messages');
  }
 });

 const mailOptions = {
  from: email,
  to: 'noreplybombeiros@gmail.com',
  cc: email,
  subject: 'Bombeiros - site contact',
  html: bodycontent
 };

 transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
   console.log(error);
   res.status(jsonMessages.mail.mailError.status).send(jsonMessages.mail.mailError);
  }
  else {
   console.log('Email sent: ' + info.response);
   res.status(jsonMessages.mail.mailSent.status).send(jsonMessages.mail.mailSent);
  }
 });

}
//exportar as funções
module.exports = {
 sendMail: sendMail,
 sendMail2: sendMail2,
};
