var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var path = require('path');
var mysql = require('mysql');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname+'/assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "startersup@2019"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
app.get('/index',function (req,res) {  
    res.redirect('/') ;
});
app.get('/',function (req,res) {  
    console.log("Lets start");
    res.render('index') ;
});
app.get('/task',function (req,res) {  
   res.render('task');
});
app.get('/bills',function (req,res) {  
    res.render('bills');
 });
 app.get('/employees',function (req,res) {  
    res.render('empdata');
 });
 console.log("Listening on 3000");
app.listen(3000);