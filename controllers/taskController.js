var bodyParser = require('body-parser');
var credential = require('../credential');
module.exports= function(app){
    app.get('/mytask',function (req,res) { 
        if(credential.isLabor(req)){ 
        res.render('mytask');
        }
        else{
            res.redirect('/');
        }
     });
}