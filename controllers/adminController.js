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
        var filename =  req.files.EMP.name ;
        var ext = filename.substr(filename.length-4);
        var EMP = req.files.EMP;
        EMP.mv('./assets/emp_photo/'+ empid+ ext, function(err) {
            if (err) throw err;
          });
        var photo = empid+ ext;
        var name =req.body.name;
        var mail = req.body.mail;
        var address =  req.body.address;
        var number = req.body.number;
        var designation = req.body.designation;
        var auth = req.body.auth;
        var ctc = req.body.ctc;
        var joindate = req.body.joindate;
        var sql = "INSERT into employeedata(empid,name,mail,number,designation,auth_level,password,ctc,joining_date,address,photo,status) VALUES \
                    ('"+empid+"','"+name+"','"+mail+"','"+number+"','"+designation+"','"+auth+"','test','"+ctc+"','"+joindate+"','"+address+"','"+photo+"','Active')";
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
        var EMP = req.files.EMP;
        var empid = req.body.empid;
        var filename =  req.files.EMP.name ;
        var ext = filename.substr(filename.length-4);
        EMP.mv('./assets/emp_photo/'+ empid+ ext, function(err) {
            if (err) throw err;
          });
        var photo = empid+ ext;
        var name =req.body.name;
        var mail = req.body.mail;
        var address =  req.body.address;
        var number = req.body.number;
        var designation = req.body.designation;
        var auth = req.body.auth;
        var ctc = req.body.ctc;
        var status = req.body.status;
        var sql = "UPDATE employeedata SET photo='"+photo+"', name='"+name+"', mail='"+mail+"', number='"+number+"', designation='"+designation+"', \
                   auth_level='"+auth+"', ctc='"+ctc+"', address='"+address+"', status='"+status+"' where empid = '"+empid+"' ";
        connection.executeQuery(sql,function(err,result){
            if(err) throw err;
            res.redirect('/empdata');
        })
    });
}