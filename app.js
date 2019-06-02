var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var mysql = require('mysql');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname+'/assets')));
app.use(session({
  secret : 'work hard',
  resave : false,
  saveUninitialized: false
}));
var taskController = require('./controllers/taskController');
var adminController = require('./controllers/adminController');
var credential = require('./credential');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var con = mysql.createConnection({
  host: "13.233.163.72",
  user: "root",
  password: "root",
  database : "construction"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/login',function (req,res) {  
  res.render('login') ;
});
app.get('/logout',function (req,res) {  
  req.session.destroy();
  res.redirect('login') ;
});
app.get('/',function (req,res) {  
 if(credential.isAdmin(req)){
   if(req.session.level==1){
     res.redirect('admin');
     return;
   }
 }
  res.redirect('/login') ;
});
app.post('/login',function (req,res) {  
  var id=req.body.id;
  var password =req.body.password;
  var sql = "select empid,password,auth_level from employeedata where (empid ='"+id+"' OR number = '"+id+"' ) AND password = '"+password+"'";
  con.query(sql,function(err,result,fields){
    if (err) throw err;
    if(result.length > 0){
      if(result[0].auth_level==1){
      req.session.level=1;
      res.redirect('admin') ;
      return;
      }
    }
    res.render('login');
  });
});
adminController(app,con);
taskController(app,con);
console.log("Listening on 3000");
app.listen(3000);