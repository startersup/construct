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
    app.post('/addemp',upload.single('EMP'),function(req,res){
        var filename = req.file.filename;
        var empid = filename.slice(0,-4);
        var name =req.body.name;
        var mail = req.body.mail;
        var address =  req.body.address;
        var number = req.body.number;
        var designation = req.body.designation;
        var auth = req.body.auth;
        var ctc = req.body.ctc;
        var joindate = req.body.joindate;
        var sql = "INSERT into employeedata(empid,name,mail,number,designation,auth_level,password,ctc,joining_date,address,photo) VALUES \
                    ('"+empid+"','"+name+"','"+mail+"','"+number+"','"+designation+"','"+auth+"','test','"+ctc+"','"+joindate+"','"+address+"','"+filename+"')";
        connection.executeQuery(sql,function(err,result){
            if(err) throw err;
            res.render('addemp.ejs');
        })
    });
}