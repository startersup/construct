const mailer = require('nodemailer');
const ejs = require('ejs');
let controller = {
    requestPurchaseOrder : function(req,res){
        var id = req.params.id;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'minicabee@gmail.com',
              pass: 'Minicabee@321'
            }
          });
          var renderedResponse = "<html>ERROR</html>"
          ejs.renderFile('../views/mail',{},function(err,str){
              if(err) throw err;
              renderedResponse=str;
          });
         var mailOptions = {
            from: 'minicabee@gmail.com',
            to: 'mindtreeorg@gmail.com',
            subject: 'Purchase Order From SVC',
            html: renderedResponse
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.status(500).send({message:error});
            } else {
              res.status(200).send({message:info.response});
            }
          });
    }
}
module.exports =controller;