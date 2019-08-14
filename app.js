var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname+'/assets')));
app.use(session({
  secret : 'work hard',
  resave : false,
  saveUninitialized: false
}));
var db = require('./config/database');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("Listening on 3000");
app.listen(3000);