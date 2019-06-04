var credential = require('../credential');
module.exports = function(app){
    app.get('/admin',function(req,res){
        if(credential.isAdmin(req)){
            res.render('admin');
        }
        else{
            res.redirect('/');
        }
    });
}