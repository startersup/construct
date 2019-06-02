var bodyParser = require('body-parser');
module.exports= function(app,con){
    app.get('/task',function (req,res) {  
        res.render('task');
     });
}