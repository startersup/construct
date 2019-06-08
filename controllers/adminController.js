var credential = require('../credential');
var connection = require('../connection');
var multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination : './assets/emp_photo/',
    filename : function(req, file, callback){
        callback(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage : storage})
function checkAccess(req){
    if(credential.isAdmin(req)){
        return true;
    }
    else{
        res.redirect('/');
    }
}
module.exports = function(app){
    app.get('/admin',function(req,res){
        if(checkAccess(req)){
            res.render('admin');
        }
    });
    app.get('/addemp',function(req,res){
        if(checkAccess(req)){
            res.render('addemp');
        }
    });
    app.post('/addemp',function(req,res){
        var empid = "EMP"+Date.now();
        var filename,ext,photo="";
        if (req.files) {
            var EMP = req.files.EMP;
            filename =  req.files.EMP.name ;
            ext = filename.substr(filename.length-4);
            EMP.mv('./assets/emp_photo/'+ empid+ ext, function(err) {
                if (err) throw err;
            });
             photo = empid+ ext;
          } 
        var name =req.body.name;
        var mail = req.body.mail;
        var address =  req.body.address;
        var number = req.body.number;
        var designation = req.body.designation;
        var auth = req.body.auth;
        var ctc = req.body.ctc;
        var joindate = req.body.joindate;
        var dynamic,dynamic1;
        if(!photo==""){
        dynamic = ",photo,status";
        dynamic1 = ",'"+photo+"','Active'";
        }
        else{
        dynamic = ",status";
        dynamic1 = ",'Active'";
        }
        var sql = "INSERT into employeedata(empid,name,mail,number,designation,auth_level,password,ctc,joining_date,address"+dynamic+") VALUES \
                    ('"+empid+"','"+name+"','"+mail+"','"+number+"','"+designation+"','"+auth+"','test','"+ctc+"','"+joindate+"','"+address+"'"+dynamic1+")";
        connection.executeQuery(sql,function(err,result){
            if(err) throw err;
            res.render('addemp');
        })
    });
    app.get('/empdata', function(req,res){
        var sql = "Select empid,name,mail,number,designation,auth_level,password,ctc,address,photo,status,DATE_FORMAT(joining_date,\'%Y-%m-%d\') as joining_date from employeedata";
        connection.executeQuery(sql,function(err,result){
            if(err) throw err;
            res.render('empdata',{result : result});
        })
    });
    app.post('/empdata', function(req,res){
        var empid = req.body.empid;
        var filename,ext,photo="";
        if (req.files) {
            var EMP = req.files.EMP;
            filename =  req.files.EMP.name ;
            ext = filename.substr(filename.length-4);
            EMP.mv('./assets/emp_photo/'+ empid+ ext, function(err) {
                if (err) throw err;
            });
             photo = empid+ ext;
          }        
        var name =req.body.name;
        var mail = req.body.mail;
        var address =  req.body.address;
        var number = req.body.number;
        var designation = req.body.designation;
        var auth = req.body.auth;
        var ctc = req.body.ctc;
        var status = req.body.status;
        var dynamic;
        if(!photo=="")
        dynamic = "photo='"+photo+"', name='"+name+"',";
        else
        dynamic = "name='"+name+"',";
        var sql = "UPDATE employeedata SET "+dynamic+" mail='"+mail+"', number='"+number+"', designation='"+designation+"', \
                   auth_level='"+auth+"', ctc='"+ctc+"', address='"+address+"', status='"+status+"' where empid = '"+empid+"' ";
        connection.executeQuery(sql,function(err,result){
            if(err) throw err;
            res.redirect('/empdata');
        })
    });
}