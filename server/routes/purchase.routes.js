const purchaseController = require('../controllers/purchase.controller');
module.exports = function(app){
    app.get('/purchase',function(req,res){
        res.render('./purchase');
    });
    app.get('/request_purchase/:id',function(req,res){
        var orderid = req.params.id;
        var purchaseOrderInfo = app.models.PurchaseOrderInfo;
        purchaseOrderInfo.find({where:{id:orderid},include:["orders","products"]},function(err,orderInfo){
            console.log(orderInfo.toJSON());
        });
        // purchaseController.requestPurchaseOrder(req,res);
    });
}