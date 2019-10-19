const mailer = require('nodemailer');
const ejs = require('ejs');
const moment = require('moment');
const path = require('path');
let controller = {
    requestPurchaseOrder : function(req,res,purchaseOrderInfo){
        var id = req.params.id;
        var transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mindtreeorg@gmail.com',
              pass: 'therock007'
            }
          });
          var renderedResponse = "<html>ERROR</html>";
          console.log(path.join(__dirname, '/../views/preview.ejs'));
          purchaseOrderInfo.find({where:{order_id:id},include:{orders:["vendors","purchase_status","products"]}},function(err,orderInfo){
            console.log(orderInfo);
            ejs.renderFile(path.join(__dirname, '/../views/preview.ejs'),{orderInfo:orderInfo[0].toJSON(),moment:moment},function(err,str){
                if(err) throw err;
                renderedResponse=str;
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
            });
           });

    }
}
module.exports =controller;