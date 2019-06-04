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
var taskController = require('./controllers/taskController');
var adminController = require('./controllers/adminController');
var credential = require('./credential');
var connection = require('./connection');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
adminController(app);
taskController(app);
app.get('/login',function (req,res) {  
  res.render('login') ;
});
app.get('/logout',function (req,res) {  
  req.session.destroy();
  res.redirect('login') ;
});
app.get('/',function (req,res) {  
 if(credential.isAdmin(req)){
     res.redirect('admin');
     return;
 }
 else if(credential.isLabor(req)){
    res.redirect('mytask');
    return;
 }
  res.redirect('/login') ;
});
app.post('/login',function (req,res) {  
  var id=req.body.id;
  var password =req.body.password;
  var sql = "select empid,auth_level from employeedata where (empid ='"+id+"' OR number = '"+id+"' ) AND password = '"+password+"'";
  connection.executeQuery(sql,function(err,result){
    if (err) throw err;
    if(result.length > 0){
      if(result[0].auth_level==1){
      req.session.level=1;
      res.redirect('admin') ;
      return;
      }
      else if(result[0].auth_level==2){
      req.session.level=2;
      res.redirect('mytask');
        return;
      }
    }
    res.render('login');
  });
});
console.log("Listening on 3000");
app.listen(3000);