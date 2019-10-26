const purchaseController = require('../controllers/purchase.controller');
const moment = require('moment');
module.exports = function(route,app){
    const purchaseOrderInfo = app.models.PurchaseOrderInfo;
    route.get('/purchase',function(req,res){
        res.render('./purchase');
    });
    route.get('/request_purchase/:id',function(req,res){
         purchaseController.requestPurchaseOrder(req,res,purchaseOrderInfo);
    });
    router.get('/purchase-history', function(req, res) {
        res.render('./purchase-history');
      });
      router.get('/purchase-request', function(req, res) {
        res.render('./purchase-request');
      });
      router.get('/preview', function(req, res) {
        res.render('./preview');
      });
}